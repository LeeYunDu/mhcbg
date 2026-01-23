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
          :params="curParams"
          :data="state.data"
          @page-change="onPageChange"
        >
          <template #equipDesc="{$row}">
            {{ $row.equipLevel || '' }} - {{ $row.equipName || '' }}
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

  <ParseUrlDialog
    v-model="state.show"
    v-model:row="state.row"
    @reload="asyncData"
  />

  <AddHeaderDialog
    v-model="state.showAddHeaderDialog"
    v-model:row="state.row"
    @reload="asyncData"
  />

  <SimpleDialog
    v-model="state.showSimpleDialog"
  />
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { parseHistoryTableColumns, tableQueryFormFields,tableQueryFormOptions } from './json'
import { UiTable } from '@/components/UI/table'
import { UiForm } from '@/components/UI/form'
import { useRouter } from 'vue-router'
import { get } from 'lodash-es'
import ActionButtons from '@/components/action-button/index.vue'
import { transformTableData } from '@/utils'
import { nDeleteParseRecordApi, nParseRecordApi } from '@/api'
import ParseUrlDialog from '@/pages/cbg/components/parse-url-dialog.vue'
import AddHeaderDialog from '@/pages/cbg/components/add-header-dialog.vue'
import SimpleDialog from '@/pages/cbg/components/simple-dialog.vue'


let state = reactive({
  data:[] ,
  show:false,
  showAddHeaderDialog:false,
  total:0,
  row:{},
  showSimpleDialog:false,
  showFormDialog:false,
  showTableDialog:false,
})


const curParams:any = ref({
  pageNum: 1,
  pageSize: 10,
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
    label:'解析链接',key:'add',icon:'',click:()=>{
      state.row = {}
      state.show = true
    }
  },
  {
    label:'新增请求头',key:'add',icon:'',click:()=>{
      state.row = {}
      state.showAddHeaderDialog = true
    }
  },
  {
    label:'打开藏宝阁',key:'add',icon:'',click:()=>{
      state.row = {}
      state.showSimpleDialog = true
    }
  },
])

function showBtns (key:string, row:any):boolean {
  const active:any = {
    'delete':true,
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
    },
  },
  columns:parseHistoryTableColumns,
})


const onAction = (key:string, row:any) => {
  const actionMap:any = {
    'delete':async () => {
      ElMessageBox.confirm(
        '该操作将删除该解析记录,是否继续',
        '警告',
        {
          confirmButtonText: '是的',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(async () => {
          const { status, msg } = await nDeleteParseRecordApi({ id: row.id })
          if (!(status===200)) return ElMessage.error(msg)
          ElMessage.success('操作成功')
          asyncData()
        })
    },
  }
  state.row = row
  actionMap[key] && actionMap[key](row)
}


const asyncData = async () => {
  const params: any = Object.assign({},  curParams.value || {})
  const { status, msg, data } = await nParseRecordApi(params)
  if (!(status===200)) return ElMessage.error(msg)
  tableOptions.options.pagination.total = get(data || {}, 'total', 0)
  state.data = transformTableData(parseHistoryTableColumns,get(data || {}, 'list', []))
}


asyncData()
</script>

<style lang="scss" scoped>


</style>
