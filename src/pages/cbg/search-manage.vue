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
          <template #equipmentCount="{$row}">
            {{ $row.equipmentCount || 0 }}
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

  <AddSearchItemDialog
    v-model="state.showAddSearchItemDialog"
    v-model:row="state.row"
    @reload="asyncData"
  />
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { SearchTableColumn, tableQueryFormFields,tableQueryFormOptions } from './json'
import { UiTable } from '@/components/UI/table'
import { UiForm } from '@/components/UI/form'
import { useRouter } from 'vue-router'
import { get } from 'lodash-es'
import ActionButtons from '@/components/action-button/index.vue'
import { transformTableData } from '@/utils'
import { nDeleteSearchAlgorithmApi,  nExecuteSearchAlgorithmApi,  nSearchAlgorithmListApi } from '@/api'
import AddSearchItemDialog from '@/pages/cbg/components/add-search-item-dialog.vue'
import { batchImportEquipment } from '../cbg-equipment/create'
import { mockData } from './components/mock'


let state = reactive({
  data:[] ,
  total:0,
  row:{},
  showAddSearchItemDialog:false,

})


const curParams:any = ref({
  pageNum: 1,
  pageSize:999,
  sort:'lastExecuteTime_ASC',
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
  { label:'编辑',key:'edit' },
  { label:'执行',key:'execute' },
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
    label:'新增搜索算法',key:'add',icon:'',click:()=>{
      state.row = {}
      state.showAddSearchItemDialog = true
    }
  },
])

function showBtns (key:string, row:any):boolean {
  const active:any = {
    'delete':true,
    edit: true,
    execute: true,
  }
  return active[key]
}

function onFormChange (opts:any){
  let { params } = opts
  Object.assign(curParams.value,params,{ pageNum:1 })
}


let tableOptions = reactive({
  showPage:false,
  props:{
    border: true,
    height: '100%',
    select: false,
    rowKey: 'id',
    stripe: false,
    currentRowkey: 'id',

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
  columns:SearchTableColumn,
})


const onAction = (key:string, row:any) => {
  const actionMap:any = {
    'edit':async () => {
      state.row = row
      state.showAddSearchItemDialog = true
    },

    'delete':async () => {
      ElMessageBox.confirm(
        '该操作将删除该搜索算法,是否继续',
        '警告',
        {
          confirmButtonText: '是的',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(async () => {
          const { status, msg } = await nDeleteSearchAlgorithmApi({ id: row.id })
          if (!(status===200)) return ElMessage.error(msg)
          ElMessage.success('操作成功')
          asyncData()
        })
    },

    'execute':async () => {
      // let useMockData = mockData
      // console.log(useMockData,useMockData)
      // await batchImportEquipment(useMockData,{
      //   bySearchTag:row.id,
      //   exportType:'list',
      //   dataSource:'tag',
      // })

      // return
      const { status, msg ,data } = await nExecuteSearchAlgorithmApi({ id: row.id })
      if (!(status===200)) return ElMessage.error(msg)

      ElMessage.success(data.description)
      ElMessageBox.confirm(
        '是否继续将数据入库',
        '警告',
        {
          confirmButtonText: '是的',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(async () => {
          let list = data.list || []
          await batchImportEquipment(list,{
            bySearchTag:row.id,
            exportType:'list',
            dataSource:'tag',
          })
          asyncData()
        })
    },
  }
  state.row = row
  actionMap[key] && actionMap[key](row)
}


const asyncData = async () => {
  const params: any = Object.assign({},  curParams.value || {})

  if(params.sort){
    params.sortBy = params.sort.split('_')[0]
    params.sortOrder = params.sort.split('_')[1]
  }

  const { status, msg, data } = await nSearchAlgorithmListApi(params)
  if (!(status===200)) return ElMessage.error(msg)
  tableOptions.options.pagination.total = get(data || {}, 'total', 0)
  state.data = transformTableData(SearchTableColumn,get(data || {}, 'list', []))
}


asyncData()
</script>

<style lang="scss" scoped>

.table-box{
  height: 100%;
}
</style>
