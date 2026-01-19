<template>
  <SimpleDialog
    v-model="state.show"
    :title="state.title"
    :footer-show="false"
    width="60%"
    body-padding="20"
    @closed="onClosed"
  >
    <div class="page-view">
      <div class="content">
        <div class="page-center">
          <div class="table-box">
            <UiTable
              v-bind="tableOptions"
              @page-change="onPageChange"
            >
              <template #action="{row,config}">
                <template v-for="btn in actionButtons" :key="btn.key">
                  <span
                    v-if="showBtns(btn.key, row)"
                    class="action-btn"
                    type="text"
                    @click="onAction(btn.key, row)"
                  >{{ btn.label }}</span>
                </template>
              </template>
            </UiTable>
          </div>
        </div>
      </div>
    </div>
  </SimpleDialog>
</template>

<script setup lang="ts">
import SimpleDialog from '@/components/simple-components/simple-dialog/simple-dialog.vue'
import { reactive,ref,computed } from 'vue'
import { ElMessage } from 'element-plus'
import { UiTable } from '@/components/UI/table'
import { get } from 'lodash-es'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) }
})


const emits = defineEmits(['update:modelValue','update:row'])

const row = computed(() => props.row || {})


const state = reactive({
  show: computed({
    get: () => {
      props.modelValue && asyncData()
      return props.modelValue
    },
    set: val =>  emits('update:modelValue', val)
  }),
  title: '表格弹窗',
  data:{},
  row:{},
  dialogShow:false
})

let tableOptions = reactive({
  props:{
    border: false,
    height: '100%',
    select: false,
    rowKey: 'id',
    stripe: false,
    currentRowkey: 'id'
  },
  options:{
    autoScroll:false,
    pagination:{
      total:0,
      mapper:{
        currentPage:'pageNum',
      },
      props:{
        pageSize:10,
        pageNum:1
      }
    },
  },
  data:[],
  columns:[
    { label:'政策匹配相关企业',key:'y1' },
    { label:'匹配企业关键标签信息',key:'y2' },
    { label:'匹配度',key:'y3' },
    { label:'是否申报',key:'y4' },
    { label:'原因描述',key:'y5' },
  ],
})

const actionButtons = ref([
  { label:'详情',key:'detail' },
  { label:'编辑',key:'edit' },
  { label:'下架',key:'down' },
  { label:'删除',key:'delete' },
])

function showBtns (key:string, row:any):boolean {
  const active:any = {
    'detail': true,
    'edit': true,
    'delete': true,
    'down': true,
  }
  return active[key]
}

const onAction = (key:string, row:any) => {
  state.row = row
  const actionMap:any = {
    'detail': () => ({}),
    'edit': () => ({}),
    'down': () => ({}),
    'delete': () => ({}),
  }
  actionMap[key] && actionMap[key](row)
}


function onPageChange (opts:any){
  let { params } = opts
  Object.assign(curParams.value,params)
  asyncData()
}

function onClosed () {
  emits('update:row', {})
}

const curParams:any = ref({
  pageNum: 1,
  pageSize: 10
})


const asyncData = async () => {
  const params: any = Object.assign({},  curParams.value || {})
  // const { success, msg, data }: any = await apiName(params)
  const  { success, msg, rows,total }: any = { success:true,msg:'',data:{
    list:new Array(10).fill({
      name:'mock'
    }),total:10
  } }
  if (!success) return ElMessage.error(msg)
  tableOptions.data = rows
  tableOptions.options.pagination.total = total
}
</script>

<style lang="scss" scoped>


</style>
