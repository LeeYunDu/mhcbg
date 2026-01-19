<template>
  <div class="page-view">
    <section class="page-header">
      <!-- <el-button type="primary" @click="onAddQuestion">新增问题</el-button> -->
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
            <!-- 数据状态： 1: 启用, 0: 禁用 ,2：草稿，3：删除 -->
            <el-tag v-if="$row.status === 1" type="success">已发布</el-tag>
            <el-tag v-else-if="$row.status === 0" type="danger">禁用</el-tag>
            <el-tag v-else-if="$row.status === 2" type="info">草稿</el-tag>
            <el-tag v-else-if="$row.status === 3" type="danger">删除</el-tag>
          </template>

          <template #description="{$row}">
            <div class="html" v-html="$row.description"></div>
          </template>

          <template #action="{$row,$column}">
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
  <AddDialog v-model="state.show" :row="state.row" @reload="onSearch" />
  <QuestionnaireDetailDialog v-model="state.showQuestionnaireDetailDialog" :row="state.row" @reload="onSearch" />
  <DesignQuestionDialog
    v-model="state.showDesignQuestionDialog"
    enter-type="questionnaire"
    :questionnaire="state.row"
    @reload="onSearch"
  />
  <AnswerHistoryDialog
    v-model="state.showAnswerHistoryDialog"
    v-model:row="state.row"
    @reload="onSearch"
  />
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { tableColumn, tableQueryFormFields,tableQueryFormOptions } from './json'
import { UiTable } from '@/components/UI/table'
import { UiForm } from '@/components/UI/form'
import { useRouter } from 'vue-router'
import { get } from 'lodash-es'
import ActionButtons from '@/components/action-button/index.vue'
import { transformTableData } from '@/utils'
import AddDialog from './components/add-dialog.vue'
import { changeQuestionnaireStatusApi, createQuestionApi, deleteQuestionnaireApi, getQuestionnaireListApi } from '@/api'
import QuestionnaireDetailDialog from './components/questionnaire-detail-dialog.vue'
import DesignQuestionDialog from './components/add-question-dialog.vue'
import AnswerHistoryDialog from './components/answer-history-dialog.vue'

let state = reactive({
  data:[] ,
  show:false,
  total:0,
  row:{},
  showFormDialog:false,
  showQuestionnaireDetailDialog:false,
  showDesignQuestionDialog:false,
  showAnswerHistoryDialog:false,
})

let mockParams = { 'title':'盼望美好事物','type':22,'sortOrder':0,'required':1,'config':null,'createTime':1766654640305,'updateTime':1766654640305,'status':1,'scoringDimension':12,'questionnaireId':23,'questionnaireTitle':'儿童抑郁障碍自评量表(DSRSC)','createdByName':'admin','questionOptions':[{ 'createTime':'1766654640317','updateTime':'1766654640317','id':229,'questionId':95,'content':'没有','mediaUrl':'','value':2,'sortOrder':0,'status':1 },{ 'createTime':'1766654640335','updateTime':'1766654640335','id':230,'questionId':95,'content':'有时有','mediaUrl':'','value':1,'sortOrder':0,'status':1 },{ 'createTime':'1766654640340','updateTime':'1766654640340','id':231,'questionId':95,'content':'经常有','mediaUrl':'','value':0,'sortOrder':0,'status':1 }],'options':[{ 'createTime':'1766654640317','updateTime':'1766654640317','id':229,'questionId':95,'content':'没有','mediaUrl':'','value':2,'sortOrder':0,'status':1 },{ 'createTime':'1766654640335','updateTime':'1766654640335','id':230,'questionId':95,'content':'有时有','mediaUrl':'','value':1,'sortOrder':0,'status':1 },{ 'createTime':'1766654640340','updateTime':'1766654640340','id':231,'questionId':95,'content':'经常有','mediaUrl':'','value':0,'sortOrder':0,'status':1 }] }


function onAddQuestion(){
  let questionArr= [
    '睡得很香',
    '总是想哭',
    '喜欢出去玩',
    '想离家出走',
    '肚子痛',
    '精力充沛',
    '吃东西香',
    '对自己有信心',
    '生活没意思',
    '做事令人满意',
    '喜欢各种事物',
    '爱与家人交谈',
    '做噩梦',
    '感到孤独',
    '容易高兴起来',
    '感到悲哀',
    '感到烦恼',
  ]
  let useApi = createQuestionApi
  let cloneParams = { ...mockParams }
  questionArr.map(item=>{
    cloneParams.title = item
    useApi(cloneParams).then(res=>{
      if(res.code === 200){
        ElMessage.success('新增成功')
      }
    })
  })
}

const curParams:any = ref({
  pageNum: 1,
  pageSize: 10,
  name:'',
})


let useTableQueryForm = computed(()=>{
  return tableQueryFormFields
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
  { label:'启用',key:'enable' },
  // { label:'禁用',key:'disable' },
  { label:'详情',key:'detail' },
  { label:'编辑',key:'edit' },
  { label:'问卷问题',key:'designQuestion' },
  { label:'填报记录',key:'designAnswer' },
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
  {
    label:'新增问卷',key:'search',icon:'',click:()=>{
      state.row = {}
      state.show = true
    }
  },
])

function showBtns (key:string, row:any):boolean {
  const active:any = {
    'detail': true,
    'edit':true,
    'add':true,
    'delete':true,
    'designQuestion':true,
    'designAnswer':true,
    // 开启/关闭
    'enable':row.status == 0,
    // 停用/开启
    'disable':row.status == 1,
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

  columns:tableColumn,
})


const onAction = (key:string, row:any) => {
  const actionMap:any = {
    'edit': () =>{
      state.show = true
    },
    'detail':()=>{
      state.showQuestionnaireDetailDialog = true
    },
    'designQuestion':()=>{
      state.showDesignQuestionDialog = true
    },
    'designAnswer':()=>{
      state.showAnswerHistoryDialog = true
    },
    'enable':()=>{
      ElMessageBox.confirm(
        '该操作将问卷删除,是否继续',
        '警告',
        {
          confirmButtonText: '是的',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(async () => {
          await changeQuestionnaireStatusApi({ id: row.id,status:1 })
          ElMessage.success('启用成功')
          asyncData()
        })
    },
    'disable':()=>{
      ElMessageBox.confirm(
        '该操作将问卷停用,是否继续',
        '警告',
        {
          confirmButtonText: '是的',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(async () => {
          await changeQuestionnaireStatusApi({ id: row.id,status:0 })
          ElMessage.success('停用成功')
          asyncData()
        })
    },

    'delete':async () => {
      ElMessageBox.confirm(
        '该操作将问卷删除,是否继续',
        '警告',
        {
          confirmButtonText: '是的',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(async () => {
          await deleteQuestionnaireApi({ id: row.id })
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
  params.questionTitle = '儿童抑郁障碍自评量表(DSRSC)'
  const { status, msg, data } = await getQuestionnaireListApi(params)
  if (!(status===200)) return ElMessage.error(msg)
  tableOptions.options.pagination.total = get(data || {}, 'total', 0)
  state.data = transformTableData(tableColumn,get(data || {}, 'list', []))
}


asyncData()
</script>

<style lang="scss" scoped>


</style>
