import { get } from "lodash-es";

export function handleEquipDetailUrl (row) {
  let mockUrl = 'https://xyq-m.cbg.163.com/cgi/mweb/equip/723/202510200600113-723-KOQ0B89RTRMF'
  let mockData = {
    "id": 71,
    "areaId": 27,
    "areaName": "山东3区",
    "serverId": 0,
    "serverName": "蓬莱岛",
    "price": 122200,
    "equipType": 27002,
    "equipName": "芙蓉戒",
    "equipLevel": 80,
    "isWeijianding": false,
    "sellingTime": "2026-01-02T13:42:50.000Z",
    "icon": "https://cbg-xyq.res.netease.com/images/big/27002.gif",
    "sumupTitle": "80级精炼等级5防御+18封印 +8速度 +7芙蓉戒",
    "status": 6,
    "cbgStatus": 0,
    "cbgLink": "https://xyq.cbg.163.com/equip?s=33&eid=202601022100113-33-D3LQJZUKH2OTA&client_type=web&o&view_loc=overall_search|%7B%22discover_tag%22%3A%20null%2C%20%22is_from_ad_reco%22%3A%200%2C%20%22suggestion_tag%22%3A%20null%2C%20%22tag%22%3A%20%22user%22%2C%20%22nlp_desc_tag%22%3A%20%22%22%7D&from_shareid=2209241500128-TK5IKFEDJ81BFZYT&reco_request_id=1767749326440FBw9q&equip_refer=1",
    "sellerName": "林花ㄟ翔舞",
    "createTime": 1768199704178,
    "updateTime": 1768199704178,
    "otherInfo": "{\"desc\":\"等级 80#r防御 +18#r耐久度 254#r精炼等级 5#r#G封印命中等级 +8 #cEE82EE[+20]#r#G速度 +10 #cEE82EE[+15]#r#G速度 +7 #cEE82EE[+15]#r#c4DBAF4特效：血气方刚（4级）#r#c4DBAF4气血 +28#r#c7D7E82【套装效果】#r气血上限提升一定比例（未生效）#r#W制造者：┽全⒐美强化打造#\",\"main_attrs\":[[\"防御\",\"+18\"]],\"jinglian_level\":5,\"added_attr_num\":3,\"agg_added_attrs\":[\"速度 +10 速度 +7 封印 +8\"],\"extra_desc_sumup_short\":null,\"exclude_highlights\":null,\"summary\":\"防御 +18 精炼等级5\"}"
  }
  // 202511251100113-40-RCLGH4A6WGYSH
  // pcUrl:'https://xyq.cbg.163.com/equip?s=40&eid=202511251100113-40-RCLGH4A6WGYSH&client_type=web&o&view_loc=overall_search|%7B%22discover_tag%22%3A%20null%2C%20%22is_from_ad_reco%22%3A%200%2C%20%22suggestion_tag%22%3A%20null%2C%20%22tag%22%3A%20%22user%22%2C%20%22nlp_desc_tag%22%3A%20%22%22%7D&from_shareid=2209241500128-TK5IKFEDJ81BFZYT&reco_request_id=1767511061237d9eo7&equip_refer=1'
}


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

  // 如果有色值，则返回富文本格式的字符串
  if (highlight.length) {
    return highlight.map(item => {
      let color = item[1] || '#E44947'
      return `<span style="color: ${color};">${item[0]}</span>`
    }).join('')
  }

  return highlight.join('')
}

export function handleCbgDetailDetail (e:any) {
  let useParams = convertUnderscoreToCamelCase(e)
  console.log(useParams);
  
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
  useParams.aggAddedAttrs = JSON.stringify(useParams.aggAddedAttrs || [])
  // 首次上架时间
  useParams.firstOnsaleTime = e.create_time
  return useParams
}



export class mhxycbgUrlParse {
  static parseCbgUrl (cbgUrl: string) {
    // 判断是PC版还是H5版
    const isPcUrl = cbgUrl.includes('xyq.cbg.163.com');
    const isH5Url = cbgUrl.includes('xyq-m.cbg.163.com');

    if (isH5Url) {
      return this.parseH5Url(cbgUrl);
    } else if (isPcUrl) {
      return this.parsePcUrl(cbgUrl);
    } else {
      throw new Error('Unsupported CBG URL format');
    }
  }

  static parseH5Url (cbgUrl: string) {
    // 您原来的H5解析逻辑
    let urlParams = this.parseUrlParams(cbgUrl);
    const cbgUrlType = cbgUrl.split('/')[5];
    const serverid = cbgUrl.split('/')[6];
    const equipid = cbgUrl.split('/')[7].split('?')[0];

    return {
      ...urlParams,
      cbgUrlType,
      serverid,
      equipid
    };
  }

  static parsePcUrl (pcUrl: string) {


    try {
      // 处理URL可能没有协议的情况
      if (!pcUrl.startsWith('http')) {
        pcUrl = 'https://' + pcUrl;
      }

      const url = new URL(pcUrl);
      const params = new URLSearchParams(url.search);
      // 检查是否是登录页（包含show_login.py）
      if (url.pathname.includes('show_login.py')) {
        // 处理登录页情况
        const returnUrl = params.get('return_url');
        if (!returnUrl) {
          throw new Error('No return_url found in login page URL');
        }
        return this.parseEquipDetailUrl(decodeURIComponent(returnUrl));
      } else {
        // 直接处理装备详情页
        return this.parseEquipDetailUrl(pcUrl);
      }
    } catch (e) {
      console.error('Error parsing PC URL:', e);
      throw new Error('Failed to parse PC URL');
    }
  }

  static parseEquipDetailUrl (urlStr: string) {
    try {
      // 处理URL可能没有协议的情况
      if (!urlStr.startsWith('http')) {
        urlStr = 'https://' + urlStr;
      }

      const url = new URL(urlStr);
      const params = new URLSearchParams(url.search);

      // 处理服务器ID（PC版用s，H5用serverid）
      const serverid = params.get('s') || params.get('serverid');
      if (!serverid) {
        throw new Error('No serverid found in URL');
      }

      // 处理装备ID
      const equipid = params.get('eid');
      if (!equipid) {
        throw new Error('No eid found in URL');
      }

      // 处理view_loc（可能有多重编码）
      let view_loc = params.get('view_loc') || '';
      try {
        // 最多解码3次
        for (let i = 0; i < 3; i++) {
          if (view_loc.includes('%')) {
            view_loc = decodeURIComponent(view_loc);
          }
        }
      } catch (e) {
        console.warn('Failed to decode view_loc:', view_loc);
      }

      return {
        serverid,
        equipid,
        from_shareid: params.get('from_shareid') || '',
        view_loc,
        cbgUrlType: 'equip',
        // 其他可能有用的参数
        reco_request_id: params.get('reco_request_id') || '',
        equip_refer: params.get('equip_refer') || '',
        client_type: params.get('client_type') || 'web',
        h5_device: params.get('h5_device') || ''
      };
    } catch (e) {
      console.error('Error parsing equipment detail URL:', e);
      throw new Error('Failed to parse equipment detail URL');
    }
  }

  static parseUrlParams (url: string) {
    // 您的参数解析逻辑
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const result: any = {};

    for (const [key, value] of params.entries()) {
      result[key] = value;
    }

    return result;
  }
}

// 根据2个时间戳计算天数
export function getDaysBetweenDates(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000 // 1天的毫秒数
  const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime())
  // 如果小于1的话则返回小时
  if(diffInMilliseconds < oneDay){
    return Math.round(diffInMilliseconds / (60 * 60 * 1000)) + '小时'
  }else{
    return Math.round(diffInMilliseconds / oneDay) + '天'
  }
}