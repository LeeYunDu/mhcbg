
<template>
  <SimpleDialog
    v-model="state.show"
    :title="state.title"
    :footer-show="true"
    width="50%"
    @closed="onClosed"
    @confirm="onConfirm"
  >
    <UiForm
      v-bind="addFormOptions"
      ref="formRef"
      :model="state.params"
    >
      <!-- label插槽示例 -->
      <template #label-y10="{label,props}">
        这是插槽显示的名称
      </template>

      <!-- 富文本示例 -->
      <template #richText="scopeProps">
        <RichText
          v-model="state.params.richText"
          :props="scopeProps.item.props"
        />
      </template>

      <!-- 附件上传示例 -->
      <template #upload="scopeProps">
        <UploadInput
          v-model="state.params[scopeProps.item.key]"
          v-bind="scopeProps.item.props"
        />
      </template>
    </UiForm>
  </SimpleDialog>
</template>

<script lang="ts" setup>
import SimpleDialog from '@/components/simple-components/simple-dialog/simple-dialog.vue'
import { UiForm } from '@/components/UI/form'
import { reactive, ref, computed } from 'vue'
import { addFormOptions } from '../json'
import UploadInput from '@/components/UI/upload/index.vue'
import RichText from '@/components/UI/richText/index.vue'

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
    return props.row.id ? '编辑' : '新增' + '模板'
  })  ,
  data: {},
  params:{
    fileUrl:'',
    richText:''
  }
})

function onClosed () {
  formRef.value?.resetFields()
  emits('update:row', {})
}

// 详情接口
async function asyncDetailData(){
  let useApi = (id:any)=>{}
  const { status, msg, data } = await useApi(get(props.row, 'id'))
  if (!(status===200)) return ElMessage.error(msg)
  state.data = data
}

async function onConfirm (cb) {
  try {
    function useApi (params:any){} // 到时候删除
    await formRef.value?.validate()
    let handleApi = useApi
    const { status, msg, data } = await handleApi(Object.assign(
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
