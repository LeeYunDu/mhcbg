'use strict'
import axios from 'axios'
import { ElNotification, ElMessageBox, ElMessage } from 'element-plus'
import { tansParams } from '@/utils/ruoyi'
import { getToken } from '@/utils/auth'
import cache from '@/utils/cache'
import store from '@/store'
import { get } from 'lodash-es'

let errorCode = {
  '401': '认证失败，无法访问系统资源',
  '403': '当前操作没有权限',
  '404': '访问资源不存在',
  'default': '系统未知错误，请反馈给管理员'
}

export let isRelogin = { show: false }

// init
const service = axios.create({
  timeout: 1000 * 60
})
// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  // 是否需要防止数据重复提交
  const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.params = {}
    config.url = url
  }
  if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
    const requestObj = {
      url: config.url,
      data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
      time: new Date().getTime()
    }
    const requestSize = Object.keys(JSON.stringify(requestObj)).length // 请求数据大小
    const limitSize = 5 * 1024 * 1024 // 限制存放数据5M
    if (requestSize >= limitSize) {
      console.warn(`[${config.url}]: ` + '请求数据大小超出允许的5M限制，无法进行防重复提交验证。')
      return config
    }
    const sessionObj = cache.session.getJSON('sessionObj')
    if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
      cache.session.setJSON('sessionObj', requestObj)
    } else {
      const s_url = sessionObj.url                // 请求地址
      const s_data = sessionObj.data              // 请求数据
      const s_time = sessionObj.time              // 请求时间
      const interval = 100                      // 间隔时间(ms)，小于此时间视为重复提交
      if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
        const message = '数据正在处理，请勿重复提交'
        console.warn(`[${s_url}]: ` + message)
        return Promise.reject(new Error(message))
      } else {
        cache.session.setJSON('sessionObj', requestObj)
      }
    }
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  // 未设置状态码则默认成功状态
  const code = res.data.status || 200
  // 获取错误信息
  const msg = res.data.msg || res.data.message || errorCode[code] || errorCode['default']
  res.data.success = code === 200
  res.data.errMsg = res.data.msg
  // 二进制数据则直接返回
  if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
    return res.data
  }
  if (code === 401) {
    if (!isRelogin.show) {
      isRelogin.show = true
      ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', { confirmButtonText: '重新登录', cancelButtonText: '取消', type: 'warning' }).then(() => {
        isRelogin.show = false
        // router.replace({
        //   path: '/login',
        //   query: { redirect: router.currentRoute.value.fullPath }
        // })
        store.dispatch('clearUserStore')
        location.href = '#/login'
        // useUserStore().logOut().then(() => {
        //   location.href = '/index'
        // })
      }).catch(() => {
        isRelogin.show = false
      })
    }
    return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
  } else if (code === 500) {
    ElMessage({ message: msg, type: 'error' })
    return Promise.reject(new Error(msg))
  } else if (code === 601) {
    ElMessage({ message: msg, type: 'warning' })
    return Promise.reject(new Error(msg))
  } else if (code !== 200) {
    ElNotification.error({ title: msg })
    return Promise.reject('error')
  } else {
    return Promise.resolve(res.data)
  }
},
  error => {
    console.log('err' + error)
    let { message } = error
    if (message == "Network Error") {
      message = "后端接口连接异常"
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时"
    } else if (message.includes("Request failed with status code")) {
      message = get(error.response, 'data.message', message) || "系统接口" + message.substr(message.length - 3) + "异常"
    }
    ElMessage({ message: message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  }
)

// ajax entry
const suffix = '' // 后缀
const ajax = function (obj: any, config?: any) {
  const _suffix = obj.suffix !== undefined ? obj.suffix : suffix
  const url = obj.url + _suffix
  const type = obj.type ? obj.type.toUpperCase() : 'GET'
  const uConfig = Object.assign({}, config || {})
  const params = obj.params
  switch (type) {
    case 'POST':
      return service.post(url, params, { ...uConfig })
    case 'PUT':
      return service.put(url, params, { ...uConfig })
    case 'DELETE':
      return service.delete(url, { ...uConfig })
    default:
      return service.get(url, { params: params, ...uConfig })
      break
  }
}

export default ajax
