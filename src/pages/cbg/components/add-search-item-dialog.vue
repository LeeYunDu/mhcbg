
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
import { nCreateSearchAlgorithmApi, nUpdateSearchAlgorithmApi } from '@/api'
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
      state.title = row.value.id ? '编辑搜索算法' : '新增搜索算法'
      if (row.value.id) {
      state.params =  Object.assign({},state.params, row.value)
      }
      return props.modelValue
    },
    set: val => emits('update:modelValue', val)
  }),
  title:'新增搜索算法',
  data: {},
  params:{
    fileUrl:'',
    richText:''
  },
  parseUrlFormOptions: {
    labels: [
      {
        label: '搜索标签', key: 'searchTag', type: 'input',
        props: {
          gridItem: { span: 24 },
          formItem: { required: true },
          clearable: true,
        },
      },
      {
        label:'标签类型',key:'tagType',type:'select',options:[
          {label:'玉魄',value:'normal'},
          {label:'装备',value:'normal'},
          {label:'武器',value:'normal'},
          {label:'瞬法',value:'system'},
          {label:'鼓舞',value:'system'},
          {label:'壁垒',value:'system'},
          {label:'',value:'system'},
        ],
         props: {
          gridItem: { span: 24 },
          formItem: { required: false },
          clearable: true,
        },
      },
      {
        label: '说明', key: 'description', type: 'input',
        props: {
          gridItem: { span: 24 },
          formItem: { required: true },
          clearable: true,
          rows:3,
          type:'textarea',
        },
      },
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
    let useApi = row.value.id ? nUpdateSearchAlgorithmApi : nCreateSearchAlgorithmApi
    const { status, msg, data } = await useApi( state.params)
    if (!(status===200)) throw new Error(msg)
    ElMessage.success(state.title+'成功!')
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
