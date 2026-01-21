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
          <template #icon="{$row}">
            <img
              :src="imgPath('cbg/icon/'+$row.equipType + '.gif')"
              alt=""
              width="40"
              height="40"
              @error="(e)=>onLoadIconError(Icon,e)"
            >
          </template>

          <template #equipDesc="{$row}">
            {{ $row.equipLevel || '' }} - {{ $row.equipName || '' }}
          </template>

          <template #sellingTime="{$row}">
            <span v-if="$row.status === 2">{{ parseTime(new Date($row.firstOnsaleTime),'{y}-{m}-{d}') }}
              <el-tag type="primary" size="small">已上架{{ getDaysBetweenDates(new Date($row.firstOnsaleTime), new Date()) }}</el-tag>
            </span>
            <span v-else-if="$row.status === 6">{{ $row.sellingTime || '' }}
              <el-tag type="success" size="small">{{ getDaysBetweenDates(new Date($row.firstOnsaleTime), new Date($row.sellingTime)) }}售出</el-tag>
            </span>
            <span v-else>{{ $row.sellingTime || '' }}</span>
          </template>

          <template #status="{$row}">
            <el-tag v-if="$row.status === 2" type="primary" size="large ">上架中</el-tag>
            <el-tag v-else-if="$row.status === 6" type="success" size="large">已出售</el-tag>
            <el-tag v-else-if="$row.status === 4" type="success" size="large">买家已取走</el-tag>
            <el-tag v-else type="success" size="large">{{ equipStatusEnum[$row.status] || '' }}</el-tag>
          </template>


          <template #sumupTitle="{$row}">
            <div>{{ $row.descSumupShort }}</div>
            <div v-html="$row.sumupTitle"></div>
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
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { parseHistoryTableColumns, tableQueryFormFields,tableQueryFormOptions } from './json'
import { UiTable } from '@/components/UI/table'
import { UiForm } from '@/components/UI/form'
import { useRouter } from 'vue-router'
import { cloneDeep, get } from 'lodash-es'
import ActionButtons from '@/components/action-button/index.vue'
import { imgPath, parseTime, transformTableData } from '@/utils'
import { nDeleteEquipmentApi, nEquipmentDetailApi, nEquipmentListApi, nSearchAlgorithmListApi, nUpdateEquipmentApi } from '@/api'
import { equipStatusEnum } from '@/enums/cbgEnum'
import { handleCbgDetailDetail, mhxycbgUrlParse } from './utils'
import Icon from '@/layouts/components/common/icon.vue'

let state = reactive({
  data:[] ,
  show:false,
  total:0,
  row:{},
  tagOptions:[],
})


const curParams:any = ref({
  pageNum: 1,
  pageSize: 10,
  sort:'sellingTime_DESC',
})


let useTableQueryForm = computed(()=>{
  let useLables:any[] = cloneDeep(tableQueryFormFields)
  useLables.find((item:any)=>item.key === 'bySearchTag').options = state.tagOptions

  return useLables
})

async function getTagOptions(){
  let { status, msg, data } = await nSearchAlgorithmListApi({ 'pageNum':1,'pageSize':999,'sort':'lastExecuteTime_ASC','sortBy':'lastExecuteTime','sortOrder':'ASC' })
  if (!(status === 200)) return ElMessage.error(msg)
  state.tagOptions = data.list.map((item:any)=>{
    return {
      label:item.searchTag,
      value:item.id,
    }
  })
}
getTagOptions()
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
  { label:'详情',key:'detail' },
  { label:'更新状态',key:'updateStatus' },
  { label:'删除记录',key:'delete' },
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
    label:'开启状态刷新',key:'search',icon:'',click:()=>{
      refreshStatus()
    }
  },


])

// 存储设备列表数据
let equipmentList:any[] = []
// 定时任务ID
let statusUpdateTimer:number | null = null

async function refreshStatus (){
  // 按更新时间的正序获取最近100条数据
  let params = {
    pageNum:1,
    pageSize:1000,
    sort:'updateTime_ASC',
    sortBy:'updateTime',
    sortOrder:'ASC',
    // status:'6'
  }
  let { success,msg,data }  = await nEquipmentListApi(params)

  if(!success){
    return ElMessage.error(msg || '刷新状态失败')
  }
  // 存储获取到的数据集合
  equipmentList = data.list

  // 如果定时任务已存在，先清除
  if(statusUpdateTimer){
    clearTimeout(statusUpdateTimer)
    statusUpdateTimer = null
  }

  console.log(equipmentList)

  // 定义递归执行函数
  const processNextItem = async () => {
    // 当设备列表为空时，停止执行
    if(equipmentList.length === 0){
      console.log('设备列表为空，停止执行')
      statusUpdateTimer = null
      return
    }

    // 每次获取1个数据项
    const item = equipmentList.shift()
    if(item) {
      try {
        await updateEquipmentStatus(item)
      } catch (error) {
        console.error('更新装备状态失败:', error)
      }
    }

    // 等待10秒后执行下一次
    const intervalTime = 10 * 1000 // 10秒 = 1次执行间隔
    statusUpdateTimer = setTimeout(processNextItem, intervalTime)
  }

  // 立即开始第一次执行
  processNextItem()
}

function showBtns (key:string, row:any):boolean {
  const active:any = {
    'detail':true,
    'delete':true,
    'updateStatus': true
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

  columns:parseHistoryTableColumns,
})

async function updateEquipmentStatus (row:any){
  if(row.serverId == 0){
    // let cbgLink = row.cbgLink
    // let serverId = cbgLink.split('/')[6]
    // row.serverId = serverId

    let urlParams = mhxycbgUrlParse.parseCbgUrl(row.cbgLink)
    row.serverId = urlParams.serverid
  }

  let { data,success } = await nEquipmentDetailApi({
    serverid:row.serverId,
    eid:row.eid,
  })
  if(!success){
    return ElMessage.error(data.msg || '更新状态失败')
  }

  let res = await nUpdateEquipmentApi(handleCbgDetailDetail(data))
  if(!success){
    return ElMessage.error(data.msg || '更新状态失败')
  }
  ElMessage.success('操作成功')
  // asyncData()
}

const onAction = (key:string, row:any) => {
  const actionMap:any = {
    'updateStatus': async ()=>{

      await updateEquipmentStatus(row)
    },
    'detail':async ()=>{
      if(row.serverId == 0){

        let detail = await nEquipmentDetailApi({
          serverid:row.serverId,
          eid:row.eid,
        })
        // nParseUrlApi({
        //   url:row.cbgLink,
        //   isReParse:0
        // })
        return ElMessage.error('服务器录入ID异常，请刷新装备信息')
      }
      if(row.cbgLink){
        window.open(row.cbgLink,'_blank')
      }
    },
    'delete':async () => {
      ElMessageBox.confirm(
        '该操作将删除记录,是否继续',
        '警告',
        {
          confirmButtonText: '是的',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(async () => {
          const params: any = {
            id:row.id
          }
          const { status, msg, data } = await nDeleteEquipmentApi(params)
          if (!(status===200)) return ElMessage.error(msg)
          ElMessage.success('操作成功')
          asyncData()
        })
    },
  }
  state.row = row
  actionMap[key] && actionMap[key](row)
}

// 根据2个时间戳计算天数
function getDaysBetweenDates(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000 // 1天的毫秒数
  const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime())
  // 如果小于1的话则返回小时
  if(diffInMilliseconds < oneDay){
    return Math.round(diffInMilliseconds / (60 * 60 * 1000)) + '小时'
  }else{
    return Math.round(diffInMilliseconds / oneDay) + '天'
  }
}

const asyncData = async () => {
  const params: any = Object.assign({},  curParams.value || {})

  if(params.sort){
    params.sortBy = params.sort.split('_')[0]
    params.sortOrder = params.sort.split('_')[1]
  }

  const { status, msg, data } = await nEquipmentListApi(params)
  if (!(status===200)) return ElMessage.error(msg)
  tableOptions.options.pagination.total = get(data || {}, 'total', 0)
  let useData = get(data || {}, 'list', []).map(e=>{
    if(e.bySearchTag == 0){
      e.bySearchTag = '无关联标签'
    }
    return e
  })
  state.data = transformTableData(parseHistoryTableColumns,useData)
}


function onLoadIconError (icon:string,e:any){
  console.log('加载图标失败',icon,e)
  e.target.src = imgPath('cbg/icon/role.webp')

}

let a = '{"desc":"#r等级 130  五行 火#r防御 +246#r耐久度 349#r锻炼等级 12  镶嵌宝石 翡翠石#r#G#G法防 +144#Y #G敏捷 +38#Y #G魔力 -2#Y#Y#r#c4DBAF4特技：#c4DBAF4笑里藏刀#Y#Y#r#G开运孔数：5孔/5孔#b#G#r符石: 气血 +15 速度 +1.5#n#G#r符石: 气血 +15 速度 +1.5#n#b#G#r符石: 气血 +15 速度 +1.5#n#G#r符石: 气血 +15 速度 +1.5#n#G#r符石: 气血 +15 速度 +1.5#n#G#r星位：法防 +3.5#n#G#r星相互合：耐力 +2#r#cEE82EE符石组合: 暗渡陈仓#r门派条件：无#r部位条件：无#r受到物理攻击时，降低3%所受伤害#Y#r#W制造者：”叼炸天ぐ强化打造#Y#r#Y熔炼效果：#r#Y#r+7防御#Y  ","main_attrs":[["防御","+246"]],"gem_level":12,"hole_num":5,"vice_attrs":[["敏捷","+38"],["魔力","-2"]],"melt_attrs":[["防御","+7"]],"agg_added_attrs":["敏捷 +38 魔力 -2 防御 +7"],"extra_desc_sumup_short":"","exclude_highlights":[],"summary":"防御 +246 锻炼12级 开5孔"}'
console.log(JSON.parse(a))

asyncData()
</script>

<style lang="scss" scoped>


</style>
