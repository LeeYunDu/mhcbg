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
          <template #expand="data">
            <DictChildrenTable :row="data" />
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
  <AddDictTypeDialog v-model="state.show" v-model:row="state.row" @reload="onSearch" />
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { tableColumn, tableQueryFormFields,tableQueryFormOptions } from './json'
import { UiTable } from '@/components/UI/table'
import { UiForm } from '@/components/UI/form'
import { get } from 'lodash-es'
import ActionButtons from '@/components/action-button/index.vue'
import AddDictTypeDialog from './components/add-dict-type-dialog.vue'
import { nDictDelete, nDictTreeQuery } from '@/api'
import DictChildrenTable from './components/dict-children-table.vue'

let state = reactive({
  data:[] ,
  show:false,
  total:0,
  row:{},
  showSimpleDialog:false,
  showFormDialog:false,
  showTableDialog:false,
})


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

const actionButtons = ref([
  { label:'编辑',key:'edit' },
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
    label:'新增字典类型',key:'search',icon:'',click:()=>{
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
    'enable':get(row, 'status') == '停用',
    'disable':get(row, 'status') == '正常',
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
    border: true,
    height: undefined,
    select: false,
    rowKey: 'id',
    stripe: false,
    currentRowkey: 'id',
  },
  options:{
    pagination:{
      total:0,
    },
  },

  columns:tableColumn,
})


const onAction = (key:string, row:any) => {
  const actionMap:any = {
    'edit': () =>{
      state.row = row
      state.show = true
    },
    'detail':()=>{
      ElMessage.info('查看详情')
    },
    'delete':async () => {
      ElMessageBox.confirm(
        '该操作将删除字典类型,是否继续',
        '警告',
        {
          confirmButtonText: '是的',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(async () => {
          const { status,msg } = await nDictDelete({ id:row.id })
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
  const { status, msg, data,rows,total } = await nDictTreeQuery  (params)
  if (!(status===200)) return ElMessage.error(msg)
  state.data = data

}


asyncData()
</script>

<style lang="scss" scoped>


</style>
