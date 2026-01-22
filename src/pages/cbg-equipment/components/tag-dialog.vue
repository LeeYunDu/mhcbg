
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
      v-bind="state.tagFormOptions"
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
import { cloneDeep, get } from 'lodash-es'
import { useStore } from 'vuex'
import { nUpdateEquipmentApi } from '@/api'
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) }
})

const emits = defineEmits([ 'update:modelValue', 'update:row','update:model', 'reload' ])
const formRef = ref(null)
const row = computed(() => props.row || {})
let store = useStore()

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
  title: '标签管理' ,
  data: {},
  params:{
    fileUrl:'',
    richText:''
  },
  tagFormOptions: {
    labels: [
      {
        label: '关联标签', key: 'bySearchTag', type: 'select' ,options:
        [{
          label:'无',
          value:0
        },...get(store.getters.dictData,'dict_cbg_tag.list',[])],

        props: {
          gridItem: { span: 24 },
          formItem: { required: true },
          clearable: true,
          filterable: true,
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

// 详情接口
async function asyncDetailData(){
  let data = cloneDeep(row.value)
  data.bySearchTag = 58
  state.params = data
}

async function onConfirm (cb) {
  try {
    await formRef.value?.validate()
    let handleApi = nUpdateEquipmentApi
    const { status, msg, data } = await handleApi(Object.assign(
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
