<template>
  <div class="page-view">
    <section class="page-header">
      <div class="table-query-form">
        <UiForm
          v-bind="tableQueryFormOptions"
          ref="formRef"
          :model="curParams"
          :labels="useTableQueryForm"
          @change="onFormChange"
        >
          <template #button>
            <div class="form-button-group">
              <ActionButtons :fields="formButtons" />
            </div>
          </template>

          <!-- label插槽示例 -->
          <template #questionnaireId="scopeProps">
            <el-select
              v-model="curParams.questionnaireId"
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
        </UiForm>
      </div>
      <div class="table-menu">
        <ActionButtons :fields="tableMneuButtons" />
      </div>
    </section>
    <section class="page-main">
      <div class="table-box">
        <UiTable
          v-bind="tableOptions"
          ref="uiTableRef"
          :data="state.data"
          @page-change="onPageChange"
        >
          <template #status="{$row}">
            <!-- 数据状态： 状态,1: 启用, 0: 禁用 -->
            <el-tag v-if="$row.status === 1" type="success">已启用</el-tag>
            <el-tag v-else-if="$row.status === 0" type="danger">禁用</el-tag>
          </template>

          <template #required="{$row}">
            <el-tag v-if="$row.required === 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </template>


          <template #action="{$row,config}">
            <template v-for="btn in actionButtons" :key="btn.key">
              <span
                v-if="showBtns(btn.key, $row)"
                class="action-btn"
                type="text"
                @click="onAction(btn.key, $row)"
              >{{ btn.label }}</span>
            </template>
          </template>
        </UiTable>
      </div>
    </section>
  </div>

  <AnswerDetailDialog
    v-model="state.showDetailDialog"
    :row="state.row"
    @reload="asyncData"
  />

  <AssessmentResultDialog
    v-model="state.showAssessmentResultDialog"
    :row="state.row"
    @reload="asyncData"
  />
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { questionAnswerQueryFormFields,tableQueryFormOptions } from './json'
import { UiTable } from '@/components/UI/table'
import { UiForm } from '@/components/UI/form'
import { useRouter } from 'vue-router'
import { get } from 'lodash-es'
import ActionButtons from '@/components/action-button/index.vue'
import { transformTableData } from '@/utils'
import { questionnaireAnswerTableColumn } from './json'
import AnswerDetailDialog from './components/answer-detail-dialog.vue'
import AssessmentResultDialog from './components/assessment-result-dialog.vue'

import {   deleteQuestionaireAnswerApi, getQuestionaireAnswerListApi, getQuestionnaireListApi } from '@/api'

let state = reactive({
  data:[] ,
  show:false,
  total:0,
  row:{},
  showFormDialog:false,
  showDetailDialog:false,
  showAssessmentResultDialog:false,
  questionnairdOptions: [],
})

async function asyncQuestionnaireList(){
  if(state.questionnairdOptions.length > 0 ) return
  const { status, msg, data } = await getQuestionnaireListApi({
    pageNum: 1,
    pageSize: 1000,
  })
  if (!(status===200)) return ElMessage.error(msg)
  state.questionnairdOptions = get(data || {}, 'list', [])
}


const curParams:any = ref({
  pageNum: 1,
  pageSize: 10,
  questionnaireId:21,
})


let useTableQueryForm = computed(()=>{
  return questionAnswerQueryFormFields
})

function onPageChange (opts:any){
  let { params } = opts
  Object.assign(curParams.value,params)
  asyncData()
}

function onSearch (){
  curParams.value.pageNum = 1
  asyncData()
}

let router = useRouter()
const actionButtons = ref([
  { label:'问答情况',key:'detail' },
  { label:'评估结果',key:'assessmentResult' },
  { label:'删除',key:'delete' },
])

const formRef = ref()
const formButtons = ref([
  {
    label:'查询',key:'search',icon:'',click:()=>{
      onSearch()
    } },
  {
    label:'重置',key:'reset',icon:'',click:()=>{
      formRef.value.resetFields()
      onSearch()
    } }
])

const tableMneuButtons = ref([

])

function showBtns (key:string, row:any):boolean {
  const active:any = {
    'detail': true,
    'delete':true,
    'assessmentResult':true,


  }
  return active[key]
}

function onFormChange (opts:any){
  let { params } = opts
  Object.assign(curParams.value,params,{ pageNum:1 })
}


let tableOptions = reactive({
  props:{
    border: false,
    height: undefined,
    select: false,
    rowKey: 'id',
    stripe: false,
    currentRowkey: 'id'
  },
  options:{
    pagination:{
      total:0,
      mapper:{
        currentPage:'pageNum',
      },
      props:{
        pageSize:10,
        pageNum:1,
        background:true,
      }
    },
  },

  columns:questionnaireAnswerTableColumn,
})


const onAction = (key:string, row:any) => {
  const actionMap:any = {
    'edit': () =>{
      state.show = true
    },
    'detail':()=>{
      state.showDetailDialog = true
    },
    'assessmentResult':()=>{
      state.showAssessmentResultDialog = true
    },
    'delete':async () => {
      ElMessageBox.confirm(
        '该操作将问卷回答删除,是否继续',
        '警告',
        {
          confirmButtonText: '是的',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(async () => {
          await deleteQuestionaireAnswerApi({ id: row.id })
          ElMessage.success('删除成功')
          asyncData()
        })
    },

  }
  state.row = row
  actionMap[key] && actionMap[key](row)
}


const asyncData = async () => {
  const params: any = Object.assign({},  curParams.value || {})
  const { status, msg, data } = await getQuestionaireAnswerListApi(params)
  if (!(status===200)) return ElMessage.error(msg)
  tableOptions.options.pagination.total = get(data || {}, 'total', 0)
  state.data = transformTableData(questionnaireAnswerTableColumn,get(data || {}, 'list', []))
}


asyncData()
asyncQuestionnaireList()
</script>

<style lang="scss" scoped>


</style>
