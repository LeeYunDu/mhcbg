<template>
  <SimpleDialog
    v-model="state.show"
    :title="state.title"
    :footer-show="true"
    width="50%"
    body-padding="20"
    @closed="onClosed"
    @confirm="onConfirm"
  >
    <div class="preview-container">
      <div v-if="state.data.questions && state.data.questions.length > 0" class="question-list">
        <div
          v-for="(question, index) in state.data.questions"
          :key="question.id"
          class="question-item"
        >
          <div class="question-header">
            <span class="question-number">{{ index + 1 }}.</span>
            <span class="question-title">
              <span>{{ question.title }}？ </span>

              <span class="action-menu">
                <el-button type="primary" :icon="Edit" @click="onAction('edit', question)" />
                <el-button type="danger" :icon="Delete" @click="onAction('delete', question)" />
              </span>
            </span>
            <span v-if="question.required" class="required-mark">*</span>
          </div>
          <div class="question-content">
            <!-- 单选题 -->
            <el-radio-group v-if="question.type === 22" v-model="state.answers[question.id]" class="radio-group">
              <el-radio v-for="option in question.questionOptions" :key="option.id" :label="option.value">{{ option.content }}</el-radio>
            </el-radio-group>

            <!-- 多选题 -->
            <el-checkbox-group v-else-if="question.type === 23" v-model="state.answers[question.id]">
              <div v-for="option in question.questionOptions" :key="option.id" class="option-item">
                <el-checkbox :label="option.id">{{ option.content }}</el-checkbox>
              </div>
            </el-checkbox-group>

            <!-- 图片题 -->
            <div v-else-if="question.type === 24" class="media-item">
              <el-image
                v-if="question.config"
                :src="JSON.parse(question.config).imageUrl || ''"
                :fit="'cover'"
                style="width: 200px; height: 150px;"
              >
                <template #error>
                  <div class="image-slot">
                    <el-icon><Picture /></el-icon>
                    <span>图片加载失败</span>
                  </div>
                </template>
              </el-image>
              <el-input
                v-model="state.answers[question.id]"
                type="textarea"
                placeholder="请输入图片描述"
                :rows="3"
              />
            </div>

            <!-- 视频题 -->
            <div v-else-if="question.type === 25" class="media-item">
              <el-input
                v-model="state.answers[question.id]"
                type="textarea"
                placeholder="视频题"
                :rows="3"
              />
            </div>

            <!-- 描述题 -->
            <el-input
              v-else-if="question.type === 26"
              v-model="state.answers[question.id]"
              type="textarea"
              placeholder="请输入您的回答"
              :rows="4"
            />

            <!-- 判断题 -->
            <el-radio-group v-else-if="question.type === 27" v-model="state.answers[question.id]">
              <div class="option-item">
                <el-radio :label="true">正确</el-radio>
              </div>
              <div class="option-item">
                <el-radio :label="false">错误</el-radio>
              </div>
            </el-radio-group>

            <!-- 默认输入框 -->
            <el-input
              v-else
              placeholder="请输入"
            />
          </div>
        </div>
      </div>
      <div v-else class="empty-state">
        <el-empty description="暂无问题数据" />
      </div>
    </div>
  </SimpleDialog>
  <AddQuestionDialog
    v-model="state.showEditDialog"
    v-model:row="state.row"
    :parent-row="row"
    @reload="asyncData"
  />
</template>

<script setup lang="ts">
import SimpleDialog from '@/components/simple-components/simple-dialog/simple-dialog.vue'
import { reactive, ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { get } from 'lodash-es'
import { deleteQuestionApi, previewQuestionApi } from '@/api'
import { Delete, Edit, Picture } from '@element-plus/icons-vue'
import AddQuestionDialog from './add-question-dialog.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) }
})

const emits = defineEmits(['update:modelValue', 'update:row', 'success'])
const row = computed(() => props.row || {})

const state = reactive({
  show: computed({
    get: () => {
      props.modelValue && asyncData()
      return props.modelValue
    },
    set: val => emits('update:modelValue', val)
  }),
  title: '预览问卷题目',
  data: {
    questions: []
  },
  answers: {},
  showEditDialog: false,
  row:{}
})

function onAction (action: string, question: any) {
  if (action === 'edit') {
    state.row = question
    state.showEditDialog = true
  } else if (action === 'delete') {
    ElMessageBox.confirm(
      '该操作将问卷删除,是否继续',
      '警告',
      {
        confirmButtonText: '是的',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(async () => {
        await deleteQuestionApi({ id: row.value.id })
        ElMessage.success('删除成功')
        asyncData()
      })
  }
}


function onClosed () {
  emits('update:row', {})
  emits('update:modelValue', false)
}

function onConfirm (cb: any) {
  onClosed()
  cb()
}

const curParams: any = ref({
  pageNum: 1,
  pageSize: 10
})

async function asyncData () {
  const params: any = {
    'pageNum': 1,
    'pageSize': 10,
    'questionnaireId': row.value.id
  }
  const { success, msg, data }: any = await previewQuestionApi(params)
  if (!success) return ElMessage.error(msg)
  state.data.questions = data
}
</script>

<style lang="scss" scoped>
.preview-container {
  max-height: 600px;
  overflow-y: auto;
  padding: 20px;
  background: #ffffff;
}

.question-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.question-item {
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  transition: all 0.3s;

  &:hover {
    border-color: #dcdfe6;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}

.question-header {
  display: flex;
  margin-bottom: 16px;
  font-weight: 500;
  align-items: center;
  position: relative;

  .question-number {
    font-weight: 600;
    margin-right: 10px;
    color: #303133;
    min-width: 24px;
  }

  .question-title {
    flex: 1;
    font-size: 15px;
    color: #303133;
    line-height: 1.5;
    display: flex;
    width: 100%;
    align-items: center;
    .action-menu {
      display: flex;
      gap: 8px;
      margin-left: auto;
    }
  }

  .required-mark {
    color: #f56c6c;
    margin-left: 4px;
    font-weight: bold;
    font-size: 16px;
    left: -16px;
    top: 5px;
    position: absolute;
  }
}

.question-content {
  margin-left: 34px;
}

:deep(.el-radio-group), :deep(.el-checkbox-group) {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.option-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  width: 100%;

  &:last-child {
    margin-bottom: 0;
  }

  :deep(.el-radio), :deep(.el-checkbox) {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 4px 0;
  }

  :deep(.el-radio__input), :deep(.el-checkbox__input) {
    flex-shrink: 0;
  }

  :deep(.el-radio__label), :deep(.el-checkbox__label) {
    margin-left: 10px;
    color: #606266;
    line-height: 1.5;
  }
}

.media-item {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .image-slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 150px;
    background: #f5f7fa;
    color: #909399;
    border: 1px dashed #dcdfe6;
    border-radius: 4px;

    :deep(.el-icon) {
      font-size: 24px;
      margin-bottom: 8px;
    }
  }
}

.empty-state {
  text-align: center;
  padding: 80px 0;
  background: #fafafa;
  border-radius: 8px;
  color: #909399;
}

// 输入框样式
:deep(.el-input__inner), :deep(.el-textarea__inner) {
  background: #fafafa;
  border-color: #e4e7ed;
  color: #606266;
}

// 滚动条样式
.preview-container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.preview-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.preview-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;

  &:hover {
    background: #a8a8a8;
  }
}

.radio-group {
  display: flex;
  flex-direction: row;
}
</style>
