
<template>
  <SimpleDialog
    v-model="state.show"
    :title="state.title"
    :footer-show="true"
    width="500px"
    @closed="onClosed"
    @confirm="onConfirm"
  >
    <UiForm
      v-bind="addDictChildFormOptions"
      ref="formRef"
      :model="state.params"
    >
    </UiForm>
  </SimpleDialog>
</template>

<script lang="ts" setup>
import SimpleDialog from '@/components/simple-components/simple-dialog/simple-dialog.vue'
import { UiForm } from '@/components/UI/form'
import { reactive, ref, computed } from 'vue'
import { addDictChildFormOptions } from '../json'
import { addDataApi, updateDataApi } from '@/api/modules/java.system.dict'

import { ElMessage } from 'element-plus'
import { get } from 'lodash-es'
import { nDictItemCreate, nDictItemUpdate } from '@/api'
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) },
  parentRow: { type: Object, default: () => ({}) }
})

const emits = defineEmits([ 'update:modelValue', 'update:row','update:model', 'reload' ])
const formRef = ref(null)
const row = computed(() => props.row || {})
const state = reactive({
  show: computed({
    get: () => {
      // 弹窗打开时，如果row有id，则请求详情
      if(props.modelValue){
        asyncDetailData()
      }
      return props.modelValue
    },
    set: val => emits('update:modelValue', val)
  }),
  title: computed(() => {
    return props.row.id ? '编辑' : '新增' + '字典项'
  })  ,
  data: {},
  params:{
    dictType:'',
    sortOrder:0,
    dictId:'',
    status:1
  }
})

function onClosed () {
  formRef.value?.resetFields()
  emits('update:row', {})
}

// 详情接口
async function asyncDetailData(){
  state.params.dictType = props.parentRow.name
  state.params.dictId = props.parentRow.id
  if(row.value.id){
    state.params =  Object.assign(state.params,row.value)

  }
}

async function onConfirm (cb) {
  try {
    await formRef.value?.validate()
    let useApi =  get(props.row, 'id') ? nDictItemUpdate : nDictItemCreate
    const { status, msg, data } = await useApi(Object.assign(
      {},
      state.params,
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
