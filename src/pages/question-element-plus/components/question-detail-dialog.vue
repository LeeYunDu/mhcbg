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
    <el-descriptions
      class="margin-top"
      :column="1"
      size="large"
      border
    >
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            关联问卷
          </div>
        </template>
        {{ get(state.data, 'questionnaireTitle', '') }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            题目名称
          </div>
        </template>
        {{ get(state.data, 'title', '') }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            题目类型
          </div>
        </template>
        {{ get(questionTypeOptions, get(state.data, 'type', ''), '').label }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            问题维度
          </div>
        </template>
        {{ get(state.data, 'scoringDimension', '') }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            是否必答
          </div>
        </template>
        {{ get(state.data, 'isRequired', false) ? '是required' : '否' }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            创建人
          </div>
        </template>
        <el-tag size="large" round>{{ get(state.data, 'createdByName', '') }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            创建时间
          </div>
        </template>
        <el-tag size="large" round>{{ parseTime(get(state.data, 'createTime', ''), '{y}-{m}-{d} {h}:{i}:{s}') }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            问题选项
          </div>
        </template>
        <div class="option-list">
          <el-tag
            v-for="(item,index) in get(state.data, 'questionOptions', [])"
            :key="index"
            size="large"
            type="success"
            round
            style="margin-right: 8px;"
          >
            {{ item.content }}
          </el-tag>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </SimpleDialog>
</template>

<script setup lang="ts">
import SimpleDialog from '@/components/simple-components/simple-dialog/simple-dialog.vue'
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { get } from 'lodash-es'
import { getQuestionDetailApi } from '@/api'
import { parseTime } from '@/utils'
import { questionTypeOptions } from '../json'
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
  title: '题目详情',
  data: {}
})


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
  const { success, msg, data }: any = await getQuestionDetailApi(params)
  if (!success) return ElMessage.error(msg)
  state.data = data
}

</script>

<style lang="scss" scoped></style>
