/**
  * java system dict apis
 */
import { PromiseRo } from '@/typings/params'
import request from '../request'
import { ApiProxy } from '@/config'
const prefix = ApiProxy.java.main


// 查询字典数据列表
export function listDataApi (query: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/dict/data/list',
    type: 'GET',
    params: query
  })
}

// 查询字典数据详细
export function getDataApi (dictCode: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/dict/data/' + dictCode,
    type: 'GET'
  })
}

// 根据字典类型查询字典数据信息
export function getDictsApi (dictType: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/dict/data/type/' + dictType,
    type: 'GET'
  })
}

// 新增字典数据
export function addDataApi (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/dict/data',
    type: 'POST',
    params: data
  })
}

// 修改字典数据
export function updateDataApi (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/dict/data',
    type: 'PUT',
    params: data
  })
}

// 删除字典数据
export function delDataApi (dictCode: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/dict/data/' + dictCode,
    type: 'DELETE'
  })
}


// 查询字典类型列表
export function listTypeApi (query: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/dict/type/list',
    type: 'GET',
    params: query
  })
}

// 查询字典类型详细
export function getTypeApi (dictId: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/dict/type/' + dictId,
    type: 'GET'
  })
}

// 新增字典类型
export function addTypeApi (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/dict/type',
    type: 'POST',
    params: data
  })
}

// 修改字典类型
export function updateTypeApi (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/dict/type',
    type: 'PUT',
    params: data
  })
}

// 删除字典类型
export function delTypeApi (dictId: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/dict/type/' + dictId,
    type: 'DELETE'
  })
}

// 刷新字典缓存
export function refreshCacheApi (): PromiseRo<any> {
  return request({
    url: prefix + '/system/dict/type/refreshCache',
    type: 'DELETE'
  })
}

// 获取字典选择框列表
export function optionselectApi (): PromiseRo<any> {
  return request({
    url: prefix + '/system/dict/type/optionselect',
    type: 'GET'
  })
}
