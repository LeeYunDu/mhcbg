<template>
  <SimpleDrawer
    v-model="state.show"
    :title="state.title"
    :footer-show="true"
    size="60%"
    body-padding="0"
    @closed="onClosed"
    @confirm="onConfirm"
  >
    <div class="answer-detail-container">
      <!-- 基本信息 -->
      <div class="basic-info">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="info-item">
              <label class="info-label">问卷名称</label>
              <span class="info-value">{{ state.data.questionnaireTitle }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 16px;">
          <el-col :span="8">
            <div class="info-item">
              <label class="info-label">回答时间</label>
              <span class="info-value">{{ formatTime(state.data.createTime) }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="info-item">
              <label class="info-label">总得分</label>
              <span class="info-value score">{{ answerResult.totalScore }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="info-item">
              <label class="info-label">问题总数</label>
              <span class="info-value">{{ answerResult.questionCount }}</span>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 回答详情 -->
      <div class="answer-content">
        <h3 class="content-title">填报详情</h3>
        <el-table
          :data="questionAnswers"
          stripe
          border
          :default-expand-all="true"
          style="width: 100%"
        >
          <el-table-column prop="question" label="问题描述" min-width="400" />
          <el-table-column prop="content" label="用户填写" min-width="200" />
          <el-table-column label="状态" width="100">
            <template #default="scope">
              <el-tag size="small" :type="scope.row.content === '无' ? 'info' : 'success'">
                {{ scope.row.content === '无' ? '正常' : '需关注' }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </SimpleDrawer>
</template>

<script setup lang="ts">
import SimpleDrawer from '@/components/simple-components/simple-dialog/simple-drawer.vue'
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { get } from 'lodash-es'
import { getQuestionaireAnswerDetailApi } from '@/api'
import dayjs from 'dayjs'

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
  title: '问卷回答详情',
  data: {}
})

// 格式化时间
const formatTime = (timestamp: number) => {
  return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
}

// 解析用户问题组
const questionAnswers = computed(() => {
  if (!state.data.userQuestionGroup) return []
  try {
    return JSON.parse(state.data.userQuestionGroup)
  } catch (error) {
    return []
  }
})

// 解析回答结果
const answerResult = computed(() => {
  if (!state.data.answerResult) return { totalScore: 0, questionCount: 0 }
  try {
    return JSON.parse(state.data.answerResult)
  } catch (error) {
    return { totalScore: 0, questionCount: 0 }
  }
})


function onClosed () {
  emits('update:row', {})
  emits('update:modelValue', false)
}

function onConfirm (cb: any) {
  onClosed()
  cb()
}


async function asyncData () {
  const params: any = {
    id: row.value.id
  }
  const { success, msg, data }: any = await getQuestionaireAnswerDetailApi(params)
  if (!success) return ElMessage.error(msg)
  state.data = data
}

</script>

<style lang="scss" scoped>
.answer-detail-container {
  width: 100%;
  max-height: 700px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .basic-info {
    padding: 20px;
    background-color: #fafafa;
    border-bottom: 1px solid #e4e7ed;

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .info-label {
        font-size: 13px;
        color: #909399;
        font-weight: 500;
      }

      .info-value {
        font-size: 14px;
        color: #303133;
        font-weight: 500;

        &.score {
          font-size: 18px;
          color: #409eff;
          font-weight: 600;
        }
      }
    }
  }

  .answer-content {
    flex: 1;
    overflow: auto;
    padding: 20px;

    .content-title {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid #e4e7ed;
    }

    :deep(.el-table) {
      border-radius: 4px;
      overflow: hidden;

      .el-table__header-wrapper {
        .el-table__header {
          th {
            background-color: #f5f7fa;
            color: #303133;
            font-weight: 600;
            border-bottom: 1px solid #e4e7ed;
          }
        }
      }

      .el-table__body-wrapper {
        .el-table__body {
          td {
            color: #606266;
            border-bottom: 1px solid #ebeef5;
          }

          tr {
            transition: background-color 0.2s;

            &:hover {
              background-color: #f5f7fa;
            }
          }
        }
      }

      .el-table__empty-text {
        color: #909399;
      }
    }
  }
}

// 滚动条样式
.answer-content::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.answer-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.answer-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;

  &:hover {
    background: #a8a8a8;
  }
}
</style>
