
<template>
  <SimpleDialog
    v-model="state.show"
    :title="state.title"
    :footer-show="true"
    wuser-idth="700px"
    @closed="onClosed"
    @confirm="onConfirm"
  >
    <UiForm
      v-bind="addFormOptions"
      ref="formRef"
      :labels="useFields"
      :model="state.params"
    >
    </UiForm>
  </SimpleDialog>
</template>

<script lang="ts" setup>
import SimpleDialog from '@/components/simple-components/simple-dialog/simple-dialog.vue'
import { UiForm } from '@/components/UI/form'
import { reactive, ref, computed, onMounted  } from 'vue'
import { addFormOptions, formFields } from '../json'
import { nUserCreate,nUserById,nUserUpdate } from '@/api'
import { ElMessage } from 'element-plus'
import { get } from 'lodash-es'
import { useStore } from 'vuex'
// import { listDeptApi } from '@/api/modules/java.system.dept'
import { nRolePage, } from '@/api'
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
    return props.row.id ? '编辑' : '新增' + '用户'
  })  ,
  data: {},
  params:{
    sex:0,
    status:0,
    roleIds:[],
    deptId:[],
    password:'123456',
  },
  roleOptions:[],
  deptOptions:[]
})

let store = useStore()

let useFields = computed(()=>{
  let oriFields = formFields
  // 角色字段
  let roleFields = oriFields.find(item => item.key === 'roleIds')
  if(roleFields){
    roleFields.options = state.roleOptions
  }
  // 部门字段
  let deptFields = oriFields.find(item => item.key === 'deptId')
  if(deptFields){
    deptFields.options = state.deptOptions
  }

  return oriFields
})

function onClosed () {
  formRef.value?.resetFields()
  emits('update:row', {})
}


// 角色列表
async function getRoleOptions(){
  const { status, msg, data,total } = await nRolePage({ pageNum:1,pageSize:1000 })
  if (!(status===200)) return ElMessage.error(msg)
  state.roleOptions = data.list.map(item => ({
    label: item.label + `(${item.key})`,
    value: item.key
  }))
}

// 部门列表
async function getDeptOptions(){
  const { status, msg, data,total } = await listDeptApi({ pageNum:1,pageSize:1000 })
  if (!(status===200)) return ElMessage.error(msg)
  state.deptOptions = data.map(item => ({
    label: item.deptName,
    value: item.deptId
  }))
}


// 详情接口
async function asyncDetailData(){
  const { status, msg, data } = await nUserById({ id: get(props.row, 'id') })
  if (!(status===200)) return ElMessage.error(msg)

  data.roleIds = data.roleIds.split(',')

  state.params = data
}

async function onConfirm (cb) {
  try {


    await formRef.value?.validate()
    let handleApi = props.row.id ? nUserUpdate : nUserCreate

    let params = Object.assign(
      {},
      state.params,
      get(props.row, 'id') && { id: get(props.row, 'id') } // 如果是编辑接口则添加id
    )

    params.roleIds = params.roleIds.join(',')
    const { status, msg, data } = await handleApi(params || {})
    if (!(status===200)) throw new Error(msg)

    ElMessage.success('操作成功!')
    emits('update:modelValue', false)
    // 发送指令，刷新列表
    emits('reload')
    cb()
  } catch (e) {
    console.log(e,'e')

    cb()
  }
}


onMounted(()=>{
  getRoleOptions()
  getDeptOptions()
})

</script>

<style lang="scss" scoped>

</style>
