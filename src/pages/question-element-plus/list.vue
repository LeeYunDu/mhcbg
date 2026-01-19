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

let state = reactive({
  data:[] ,
  show:false,
  total:0,
  row:{},
  showFormDialog:false,
  showQuestionnaireDetailDialog:false,
  showDesignQuestionDialog:false,
})

let mockParams = { 'status':1,'settings':'','questionDesc':'','questionnaireId':21,'title':'某种小动作（如咬指甲、吸手指、拉头发、拉衣服上的布毛）','type':22,'scoringDimension':'品行问题','required':1,'value':'0','sortOrder':'0','options':[{ 'content':'无','value':'0' },{ 'content':'稍有','value':'1' },{ 'content':'相当多','value':'2' },{ 'content':'很多','value':'3' }] }


function onAddQuestion(){
  let questionArr= [
    '对大人粗鲁无礼',
    '在交朋友或保持友谊上存在问题',
    '易兴奋，易冲动',
    '爱指手划脚',
    '吸吮或咬嚼（拇指、衣服、毯子）',
    '容易或经常哭叫',
    '脾气很大',
    '白日梦',
    '学习困难',
    '扭动不发',
    '惧怕（新环境、陌生人、陌生地方、上学）',
    '坐立不定，经常“忙碌”',
    '破坏性',
    '撒谎或捏造情节',
    '怕羞',
    '造成的麻烦比同龄孩子多',
    '说话与同龄儿童不同（像要儿说话、口吃、别人不易听世）',
    '抵赖错误或归罪他人',
    '好争吵',
    '撅嘴和生气',
    '偷窃',
    '不服从或勉强服从',
    '优虑比别人多（忧虑、孤独、疾病、死亡）',
    '做事有始无终',
    '感情易受损害',
    '欺凌别人',
    '不能停止重复性活动',
    '残忍',
    '稚气或不成熟（自己会的事要人帮忙，依缠别人，常需别人鼓励、支持）',
    '容易分心或注意不集中成为一个问题',
    '头痛',
    '情绪变化迅速剧烈',
    '不喜欢或不遵从纪律或约束',
    '经常打架',
    '与兄弟姐妹不能很好相处',
    '在努力中容易泄气',
    '妨害其他儿童',
    '基本上是一个不愉快的小孩',
    '有饮食问题（食欲不佳、进食中常跑开）',
    '胃痛',
    '有睡眠问题（不能人睡、早醒、夜间起床）',
    '其他疼痛',
    '呕吐或恶心',
    '感到在家庭圈子中被欺骗',
    '自夸和吹牛',
    '让自己受别人欺编',
    '有大便问题（腹泻、排便不规则、便秘）',
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
  { label:'禁用',key:'disable' },
  { label:'详情',key:'detail' },
  { label:'编辑',key:'edit' },
  { label:'设计问题',key:'designQuestion' },
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
  // params.questionTitle = 'Conners'
  const { status, msg, data } = await getQuestionnaireListApi(params)
  if (!(status===200)) return ElMessage.error(msg)
  tableOptions.options.pagination.total = get(data || {}, 'total', 0)
  state.data = transformTableData(tableColumn,get(data || {}, 'list', [])).filter(e=>{
    return !(e.questionTitle.indexOf('儿童抑郁障') !== -1)
  })
}


asyncData()
</script>

<style lang="scss" scoped>


</style>
