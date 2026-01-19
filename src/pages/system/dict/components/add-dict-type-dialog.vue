
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
      v-bind="addFormOptions"
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
import { addFormOptions } from '../json'
import { addTypeApi } from '@/api/modules/java.system.dict'

import { ElMessage } from 'element-plus'
import { cloneDeep, get } from 'lodash-es'
import { nDictCreate, nDictUpdate } from '@/api'
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
    return props.row.id ? '编辑' : '新增' + '字典类型'
  })  ,
  data: {},
  params:{
    status:'0'
  }
})

function onClosed () {
  formRef.value?.resetFields()

  emits('update:row', {})
}

// 详情接口
async function asyncDetailData(){
  state.params = cloneDeep(props.row)
}

async function onConfirm (cb) {
  try {
    await formRef.value?.validate()
    let useApi = props.row.id ? nDictUpdate : nDictCreate
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
