/**
 * node menu apis
 */

import { ApiProxy } from '@/config'
import { MenuMode } from '@/typings/data'
import { PromiseRo } from '@/typings/params'
import request from '../request'

// url 前缀
const prefix = ApiProxy.node.main

// 解析历史记录
export function nParseRecordApi (params: any): PromiseRo<any> {
  return request({
    url: prefix + '/mhxycbg/parse-record',
    type: 'POST',
    params
  })
}


// 解析链接
export function nParseUrlApi (params: any): PromiseRo<any> {
  return request({
    url: prefix + '/mhxycbg/parse-url',
    type: 'POST',
    params
  })
}

// delete 解析记录
export function nDeleteParseRecordApi (params: any): PromiseRo<any> {
  return request({
    url: prefix + '/mhxycbg/delete',
    type: 'GET',
    params
  })
}

// 解析链接
export function nPostCbgApi (params: any): PromiseRo<any> {
  return request({
    url: prefix + '/mhxycbg/post-cbg-api',
    type: 'POST',
    params
  })
}


// 新增请求头配置
export function nPostCbgHeadersApi (params: any): PromiseRo<any> {
  return request({
    url: prefix + '/mhxycbg/headers',
    type: 'POST',
    params
  })
}
