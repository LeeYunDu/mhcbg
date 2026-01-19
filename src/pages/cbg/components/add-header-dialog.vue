
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
      v-bind="state.parseUrlFormOptions"
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

import { ElMessage } from 'element-plus'
import { get } from 'lodash-es'
import { nParseUrlApi, nPostCbgHeadersApi } from '@/api'
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
      return props.modelValue
    },
    set: val => emits('update:modelValue', val)
  }),
  title:'新增藏宝阁请求头',
  data: {},
  params:{
    fileUrl:'',
    richText:''
  },
  parseUrlFormOptions: {
    labels: [
      {
        label: 'fetch（node格式）请求', key: 'fetch', type: 'input',
        props: {
          gridItem: { span: 24 },
          formItem: { required: true },
          clearable: true,
          type:'textarea',
          rows:8,
        },
      },
    ],
    props: {
      inline: false,
      labelWidth: 'auto',
      labelPosition: 'top',
      rules: [],
      'validate-on-rule-change': false,
      ruleTrigger: 'change'
    },
    options: {
      gridItem: { span: 24 }
    }
  }

})

function onClosed () {
  formRef.value?.resetFields()
  emits('update:row', {})
}


async function onConfirm (cb) {
  try {
    await formRef.value?.validate()
    const { status, msg, data } = await nPostCbgHeadersApi( state.params)
    if (!(status===200)) throw new Error(msg)
    ElMessage.success('解析成功!')
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
