/**
 * node dict apis
 */

import { ApiProxy } from '@/config'
import { PromiseRo } from '@/typings/params'
import request from '../request'
const prefix = ApiProxy.node.main



// 字典树获取
export function nDictTreeQuery (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/dict/tree',
    type: 'POST',
    params: data || {}
  })
}

// /dict/list
export function nDictListQuery (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/dict/list',
    type: 'POST',
    params: data || {}
  })
}

// /dict/create
export function nDictCreate (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/dict/create',
    type: 'POST',
    params: data || {}
  })
}

// /dict/update
export function nDictUpdate (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/dict/update',
    type: 'POST',
    params: data || {}
  })
}

// /dict/delete
export function nDictDelete (params: any): PromiseRo<any> {
  console.log(params)
  return request({
    url: prefix + '/dict/delete',
    type: 'GET',
    params: params || {}
  })
}

// /dict/detail
export function nDictDetail (id: string | number): PromiseRo<any> {
  return request({
    url: prefix + '/dict/' + id,
    type: 'GET'
  })
}

// /dict/item/create
export function nDictItemCreate (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/dict/item/create',
    type: 'POST',
    params: data || {}
  })
}

// /dict/item/list
export function nDictItemListQuery (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/dict/item/list',
    type: 'GET',
    params: data || {}
  })
}

// /dict/item/update
export function nDictItemUpdate (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/dict/item/update',
    type: 'POST',
    params: data || {}
  })
}

// /dict/item/delete
export function nDictItemDelete (params: any): PromiseRo<any> {
  return request({
    url: prefix + '/dict/item/delete',
    type: 'GET',
    params: params || {}
  })
}