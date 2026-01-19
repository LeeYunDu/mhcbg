<template>
  <SimpleDrawer
    v-model="state.show"
    :title="state.title"
    :footer-show="true"
    size="50%"
    body-padding="20"
    @closed="onClosed"
    @confirm="onConfirm"
  >
    <el-descriptions
      class="margin-top"
      :column="1"
      size="large"
      border
      label-width="120px"
    >
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            问卷名称
          </div>
        </template>
        {{ get(state.data, 'questionTitle', '') }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            评分机制
          </div>
        </template>
        {{ getDictValue('questionnaire_score_system.list', get(state.data, 'scoringSystem', '')) }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            问卷描述
          </div>
        </template>
        <span v-html="get(state.data, 'description', '')"></span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            题目数量
          </div>
        </template>
        <el-button type="primary" @click="onViewQuestions">{{ get(state.data, 'questionCount', 0) }} 道 </el-button>
      </el-descriptions-item>


      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            问卷设计人
          </div>
        </template>
        {{ get(state.data, 'createdByName', '') }}
      </el-descriptions-item>


      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            问卷状态
          </div>
        </template>
        <el-tag v-if="state.data.status === 1" type="success">已发布</el-tag>
        <el-tag v-else-if="state.data.status === 0" type="danger">禁用</el-tag>
        <el-tag v-else-if="state.data.status === 2" type="info">草稿</el-tag>
        <el-tag v-else-if="state.data.status === 3" type="danger">删除</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </SimpleDrawer>
  <PreviewQiestopmDialog
    v-model="state.previewShow"
    :row="state.data"
  />
</template>

<script setup lang="ts">
import SimpleDrawer from '@/components/simple-components/simple-dialog/simple-drawer.vue'
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { get } from 'lodash-es'
import { getQuestionnaireDetailApi } from '@/api'
import { parseTime,getDictValue } from '@/utils'
import PreviewQiestopmDialog from './preview-qiestopm-dialog.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) }
})

const emits = defineEmits(['update:modelValue', 'update:row', 'success'])
const row = computed(() => props.row || {})

const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap['default'] || marginMap.default,
  }
})

const state = reactive({
  show: computed({
    get: () => {
      props.modelValue && asyncData()
      return props.modelValue
    },
    set: val => emits('update:modelValue', val)
  }),
  title: '问卷详情',
  data: {},
  previewShow: false,
})

function onViewQuestions () {
  state.previewShow = true
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
    id: row.value.id
  }
  const { success, msg, data }: any = await getQuestionnaireDetailApi(params)
  if (!success) return ElMessage.error(msg)
  state.data = data
}

</script>

<style lang="scss" scoped></style>
