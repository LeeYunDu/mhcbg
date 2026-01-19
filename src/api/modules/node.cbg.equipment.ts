/**
 * node menu apis
 */

import { ApiProxy } from '@/config'
import { MenuMode } from '@/typings/data'
import { PromiseRo, ResponseMode } from '@/typings/params'
import request from '../request'

// url 前缀
const prefix = ApiProxy.node.main

// 装备列表
export function nEquipmentListApi (params: any): PromiseRo<ResponseMode<any>> {
  return request({
    url: prefix + '/equipment/list',
    type: 'POST',
    params
  })
}



// delete 装备
export function nDeleteEquipmentApi (params: any): PromiseRo<ResponseMode<any>> {
  return request({
    url: prefix + '/equipment/delete',
    type: 'GET',
    params
  })
}


// create 装备
export function nCreateEquipmentApi (params: any): PromiseRo<ResponseMode<any>> {
  return request({
    url: prefix + '/equipment/create',
    type: 'POST',
    params
  })
}


// update 装备
export function nUpdateEquipmentApi (params: any): PromiseRo<ResponseMode<any>> {
  return request({
    url: prefix + '/equipment/update',
    type: 'POST',
    params
  })
}

// 装备详情
export function nEquipmentDetailApi (params: any): PromiseRo<ResponseMode<any>> {
  return request({
    url: prefix + '/equipment/detail-from-cbg',
    type: 'POST',
    params
  })
}
