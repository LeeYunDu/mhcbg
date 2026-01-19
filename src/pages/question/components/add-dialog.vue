
<template>
  <SimpleDrawer
    v-model="state.show"
    :title="state.title"
    :footer-show="true"
    size="40%"
    @closed="onClosed"
    @confirm="onConfirm"
  >
    <UiForm
      v-bind="addFormOptions"
      ref="formRef"
      :model="state.params"
    >
      <!-- 富文本示例 -->
      <template #description="scopeProps">
        <RichText
          v-model="state.params.description"
          :props="scopeProps.item.props"
          height="300px"
        />
      </template>
    </UiForm>
  </SimpleDrawer>
</template>

<script lang="ts" setup>
import SimpleDrawer from '@/components/simple-components/simple-dialog/simple-drawer.vue'
import { UiForm } from '@/components/UI/form'
import { reactive, ref, computed } from 'vue'
import { addFormOptions } from '../json'
import RichText from '@/components/UI/richText/index.vue'
import { createQuestionnaireApi, updateQuestionnaireApi, getQuestionnaireDetailApi } from '@/api'

import { ElMessage } from 'element-plus'
import { get } from 'lodash-es'
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) }
})

const emits = defineEmits([ 'update:modelValue', 'update:row','update:model', 'reload' ])
const formRef = ref(null)
const row = computed(() => props.row || {})
const state = reactive({
  show: computed({
    get: () => {
      // 弹窗打开时，如果row有id，则请求详情
      if(props.modelValue && get(props.row, 'id')){
        asyncDetailData()
      }
      return props.modelValue
    },
    set: val => emits('update:modelValue', val)
  }),
  title: computed(() => {
    return props.row.id ? '编辑' : '新增' + '问卷'
  })  ,
  data: {},
  params:{
    status: 1,
    settings: '',
    questionTitle: '',
    questionDesc: '',
    description: '',
  }
})

function onClosed () {
  formRef.value?.resetFields()
  emits('update:row', {})
}

// 详情接口
async function asyncDetailData(){
  const { status, msg, data } = await getQuestionnaireDetailApi({ id:get(props.row, 'id') })
  if (!(status===200)) return ElMessage.error(msg)
  state.params = data
}

async function onConfirm (cb) {
  try {
    await formRef.value?.validate()
    let useApi = get(props.row, 'id') ? updateQuestionnaireApi : createQuestionnaireApi
    const { status, msg, data } = await useApi(Object.assign(
      {},
      state.params,
      get(props.row, 'id') && { id: get(props.row, 'id') } // 如果是编辑接口则添加id
    ))
    if (!(status===200)) throw new Error(msg)

    ElMessage.success('操作成功!')
    emits('update:modelValue', false)
    // 发送指令，刷新列表
    emits('reload')
    cb()
  } catch (e) {
    cb()
  }
}


</script>

<style lang="scss" scoped>

</style>
