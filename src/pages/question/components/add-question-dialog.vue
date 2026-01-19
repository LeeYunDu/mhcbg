
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
      v-bind="questionAddFormOptions"
      ref="formRef"
      :model="state.params"
    >
      <!-- label插槽示例 -->
      <template #questionnaireId="scopeProps">
        <el-select
          v-model="state.params.questionnaireId"
          v-bind="scopeProps.item.props"
          placeholder="请选择关联问卷"
          filterable
        >
          <el-option
            v-for="item in state.questionnairdOptions"
            :key="item.id"
            :label="`${item.questionTitle}(${item.createdByName})`"
            :value="item.id"
          />
        </el-select>
      </template>


      <template #optionsIds="scopeProps">
        <div style="width: 100%;">
          <el-button type="primary" @click="addQuestionOption"> 添加选项 </el-button>
          <div class="table-box">
            <UiTable
              v-bind="tableOptions"
              :data="state.questionOptions"
            >
              <template #action="{$row,$column,$index}">
                <template v-for="btn in actionButtons" :key="btn.key">
                  <span
                    v-if="showBtns(btn.key, $row,$index)"
                    class="action-btn"
                    type="text"
                    @click="onAction(btn.key, $row,$index)"
                  >{{ btn.label }}</span>
                </template>
              </template>
            </UiTable>
          </div>
        </div>
      </template>
    </UiForm>
  </SimpleDrawer>

  <SimpleDialog
    v-model="state.showConfirmDialog"
    title="新增选项"
    width="500px"
    body-padding="20"
    :footer-show="true"
    @closed="state.showConfirmDialog = false"
    @confirm="addOption"
  >
    <UiForm
      :model="state.OptionParams"
      v-bind="addFormOptions"
    >
      <template #content="scopeProps">
        <el-input
          v-model="scopeProps.item.model"
          v-bind="scopeProps.item.props"
          placeholder="请输入选项内容"
        />
      </template>
    </UiForm>
  </SimpleDialog>
</template>

<script lang="ts" setup>
import SimpleDrawer from '@/components/simple-components/simple-dialog/simple-drawer.vue'
import SimpleDialog from '@/components/simple-components/simple-dialog/simple-dialog.vue'
import { UiForm } from '@/components/UI/form'
import { reactive, ref, computed } from 'vue'
import { questionAddFormOptions } from '../json'
import { createQuestionApi, updateQuestionApi,getQuestionDetailApi, getQuestionnaireListApi } from '@/api'
import { UiTable } from '@/components/UI/table'

import { ElMessage } from 'element-plus'
import { get } from 'lodash-es'
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) },
  enterType: { type: String, default: 'question' },
  questionnaire: { type: Object, default: () => ({}) }
})


const addFormOptions = {
  labels: [
    {
      label: '选项内容', key: 'content', type: 'input',
      props: {
        gridItem: { span: 24 },
        formItem: { required: true },
        clearable: true,
        maxlength: 30,
      },
    },
    {
      label: '分值', key: 'value', type: 'input',
      props: {
        gridItem: { span: 24 },
        formItem: { required: true },
        clearable: true,
        maxlength: 30,
      },
    },
  ],
  props: {
    inline: true,
    labelWidth: 'auto',
    labelPosition: 'right',
    rules: [],
    'validate-on-rule-change': false,
    ruleTrigger: 'change'
  },
  options: {
    gridItem: { span: 24 }
  }
}


const emits = defineEmits([ 'update:modelValue', 'update:row','update:model', 'reload' ])
const formRef = ref(null)
const row = computed(() => props.row || {})
const state = reactive({
  show: computed({
    get: () => {
      // 弹窗打开时，如果row有id，则请求详情
      if(props.modelValue && get(props.row, 'id') && props.enterType === 'question'){
        asyncDetailData()
      }

      if(props.enterType === 'questionnaire'){
        state.params.questionnaireId = get(props.questionnaire, 'id')
      }

      if(props.modelValue){
        asyncQuestionnaireList()
      }
      return props.modelValue
    },
    set: val => emits('update:modelValue', val)
  }),

  showConfirmDialog: false,
  title: computed(() => {
    return (props.row.id ? '编辑' : '新增') + '问题'
  })  ,

  OptionParams:{
    content: '',
    value: 0,
  },
  data: {},
  questionnairdOptions: [],
  questionOptions: [],
  params:{
    status: 1,
    settings: '',
    questionDesc: '',
    questionnaireId: '',
    type: 0,
    required: 1,
    sortOrder: 0,
    value:0
  },

})


let tableOptions = reactive({
  props:{
    border: true,
    height: '100%',
    width: '100%',
    select: false,
    rowKey: 'id',
    stripe: false,
    currentRowkey: 'id'
  },
  showPage: false,
  options:{
    autoScroll:false,
  },
  columns:[
    { label:'选项',key:'content' },
    { label:'分值',key:'value' },
    {
      label: '操作',
      key: 'action',
      type: 'slot',
      slotName: 'action',
      width: '210px',
    },
  ],
})


// 添加选项
function addQuestionOption(){
  // state.questionOptions.push({
  //   content: '',
  //   value: '',
  // })

  state.showConfirmDialog = true
}

const actionButtons = ref([
  { label:'上移',key:'up' },
  { label:'下移',key:'down' },
  { label:'删除',key:'delete' },
])

function showBtns (key:string, row:any,$index:number):boolean {
  const active:any = {
    'delete': true,
    'down': $index !== state.questionOptions.length - 1,
    'up': $index !== 0,
  }
  return active[key]
}

const onAction = (key:string, row:any,$index:number) => {
  state.row = row
  const actionMap:any = {
    'down': () => {
      if($index === state.questionOptions.length - 1) return
      let temp = state.questionOptions[$index]
      state.questionOptions[$index] = state.questionOptions[$index + 1]
      state.questionOptions[$index + 1] = temp
    },
    'up': () => {
      if($index === 0) return
      let temp = state.questionOptions[$index]
      state.questionOptions[$index] = state.questionOptions[$index - 1]
      state.questionOptions[$index - 1] = temp
    },
    'delete': () => {
      state.questionOptions.splice($index, 1)
    },
  }
  actionMap[key] && actionMap[key](row)
}


function onClosed () {
  formRef.value?.resetFields()
  state.questionnairdOptions = []
  state.questionOptions = []
  emits('update:row', {})
}

// 详情接口
async function asyncDetailData(){
  const { status, msg, data } = await getQuestionDetailApi({ id: get(props.row, 'id') })
  if (!(status===200)) return ElMessage.error(msg)
  state.params = data
  state.questionOptions = data.questionOptions
}

async function asyncQuestionnaireList(){
  if(state.questionnairdOptions.length > 0 ) return
  const { status, msg, data } = await getQuestionnaireListApi({
    pageNum: 1,
    pageSize: 1000,
  })
  if (!(status===200)) return ElMessage.error(msg)
  state.questionnairdOptions = get(data || {}, 'list', [])
}

function addOption(cb){
  state.questionOptions.push(state.OptionParams)
  cb()
  state.showConfirmDialog = false
}

async function onConfirm (cb) {
  try {
    await formRef.value?.validate()
    let useApi = get(props.row, 'id') ? updateQuestionApi : createQuestionApi
    let params = Object.assign(
      {},
      state.params,
      get(props.row, 'id') && { id: get(props.row, 'id') } // 如果是编辑接口则添加id
    )

    params.options = state.questionOptions
    const { status,success, msg, data } = await useApi(params )
    if (!success) return ElMessage.error(msg)

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
.table-box{
  overflow: auto;
  width: 100%;
  margin-top:12px;
}
</style>
