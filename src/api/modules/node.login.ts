/**
 * node menu apis
 */

import { ApiProxy } from '@/config'
import { MenuMode } from '@/typings/data'
import { LoginMode, PromiseRo } from '@/typings/params'
import request from '../request'

// url 前缀
const prefix = ApiProxy.node.main

// 登录
export function nLogin (params: LoginMode) {
  return request({
    url: prefix + '/login/login',
    type: 'POST',
    params: params || {}
  })
}



// 获取登录信息
export function nGetLoginInfo () {
  return request({
    url: prefix + '/login/getUserInfo',
    type: 'GET',
  })
}

// 退出登录
export function nLoginout () {
  return request({
    url: prefix + '/login/loginOut',
    type: 'GET',
  })
}
