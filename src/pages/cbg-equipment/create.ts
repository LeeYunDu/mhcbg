import { nCreateEquipmentApi, nEquipmentListApi, nUpdateEquipmentApi } from "@/api";
import { ElementPlus } from "@element-plus/icons-vue/dist/types";
import { ElMessage, ElNotification } from "element-plus";
import { get } from "lodash-es";


let exportType = 'list' // list 、 collects
export let collects = [].concat(

).filter((item: any) => {

  if (exportType == 'collects') {
    // return item.status_desc === '买家取走' && new Date(item.create_time_desc).getTime() > new Date('2025-06-01').getTime()
    return new Date(item.create_time_desc).getTime() > new Date('2025-10-01').getTime()
  } else {
    return new Date(item.create_time).getTime() > new Date('2025-10-01').getTime()
  }


})






function convertUnderscoreToCamelCase (obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(convertUnderscoreToCamelCase);
  }
  const newObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      newObj[camelCaseKey] = obj[key];
    }
  }
  return newObj;
}

function handleHighlight (highlight: string[]) {
  let mockData = [
    [
      "遗志须弥",
      "#E44947"
    ],
    [
      "瞬法",
      "#E44947"
    ]
  ]
  // 如果有色值，则返回富文本格式的字符串
  if (highlight.length) {
    return highlight.map(item => {
      let color = item[1] || '#E44947'
      return `<span style="color: ${color};">${item[0]}</span>`
    }).join('')
  }

  return highlight.join('')
}


interface BatchImportEquipmentOptions {
  bySearchTag?: string,
  exportType?: string,
  dataSource?: string,
}

export async function batchImportEquipment (data: any[], options: BatchImportEquipmentOptions) {
  let failList: any[] = []
  let promiseList: Promise<any>[] = []
  // 新数据对比数据库里的数据，对比状态和价格
  let dbData = await nEquipmentListApi({
    pageNum: 1,
    pageSize: 10000,
    eids: data.map((item: any) => item.eid).join(','),
  })
  let dbkindIds = dbData.data?.list?.map((equip: any) => equip.kindid) || []

  let dbList = dbData.data?.list || []
  let dbEids = dbList.map((equip: any) => equip.eid)


  // 已存在数据库
  let existList = data.filter((item: any) => dbEids.includes(item.eid))

  let kindIds = existList.map((equip: any) => equip.kindid).filter((item: any) => item)
  let dbMap = dbList.map((equip: any) => {
    return {
      eid: equip.eid,
      status: equip.status,
      price: equip.price,
      kindid: equip.kindid,
    }
  })
  // 需要和数据库的数据做对比，比较price和status是否有变化
  let updateList = existList.filter((item: any) => {
    let dbItem = dbMap.find((db: any) => db.eid == item.eid)
    return dbItem.kindid != item.kindid || dbItem.price != item.price || dbItem.status != item.status || item.firstOnsaleTime != dbItem.firstOnsaleTime 
  })
  // 最后过滤掉 item.dataStatus == '0', 表示数据正在使用，没被删除
  
  console.log('需要更新的设备', updateList);

  // 需要新增的数据
  let newList = data.filter((item: any) => !dbEids.includes(item.eid))
  function handleData (list, type) {
    let arr: any[] = []
    list.forEach((e: any) => {
      if (!e.equip_detail_url) {
        e.equip_detail_url = `https://xyq-m.cbg.163.com/cgi/mweb/equip/${e.serverid}/${e.eid}`

      }
      if (options.exportType == 'list') {
        e.status = e.equip_status
      }

      let useParams = convertUnderscoreToCamelCase(e)
      

      useParams.cbgLink = e.equip_detail_url
      useParams.sellingTime = new Date(useParams.sellingTime || new Date())
      useParams.sellingInfo = JSON.stringify(useParams.sellingInfo || {})
      useParams.otherInfo = JSON.stringify(useParams.otherInfo || {})
      useParams.sellingInfoData = JSON.stringify(useParams.sellingInfoData || {})
      useParams.baseAttribute = useParams.descSumupShort || ''
      useParams.sumupTitle = handleHighlight(useParams.highlight) || get(e, 'agg_added_attrs', []).join('  ')
      useParams.highlight = JSON.stringify(useParams.highlight || [])
      useParams.cbgStatus = useParams.status
      useParams.sellerName = useParams.sellerNickname
      useParams.serverId = useParams.serverid
      // 首次上架时间
      useParams.firstOnsaleTime = e.create_time

      useParams.aggAddedAttrs = JSON.stringify(useParams.aggAddedAttrs || [])
      // 数据统计用
      useParams.bySearchTag = options.bySearchTag || ''
      useParams.dataSource = options.dataSource || ''
      if (type == 'add') {
        let promise = nCreateEquipmentApi(useParams)
        arr.push(promise)
      } else {
        let promise = nUpdateEquipmentApi(useParams)
        arr.push(promise)
      }
      // handleData.push(useParams)
    })
    return arr
  }

  let updatePromises = handleData(updateList, 'update')
  await Promise.allSettled(updatePromises)
  let newPromises = handleData(newList, 'add')
  await Promise.allSettled(newPromises)

  
  ElNotification({
    title: '批量导入',
    message: h('i', { style: 'color: teal' }, `更新${updateList.length}条，新增${newList.length}条`),
  })
  return {
    updateList: updateList.length,
    newList: newList.length,
  }

  return

  data.map(async (e: any) => {

    return useParams
  })

  let results = await Promise.allSettled(promiseList)
  results.forEach((item, index) => {
    if (item.status == 'rejected') {
      failList.push(item)
      if (item.reason.status == 409) {
        nUpdateEquipmentApi(handleData[index])
      }
    }
  })
  let result = {
    success: data.length - failList.length,
    failList,
  }
  console.log(result, 'result');

  return result
}