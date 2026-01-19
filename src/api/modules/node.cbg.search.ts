import { ApiProxy } from '@/config'
import { PromiseRo } from '@/typings/params'
import request from '../request'

// url 前缀
const prefix = ApiProxy.node.main

// 获取搜索算法列表
export function nSearchAlgorithmListApi (params: any): PromiseRo<any> {
  return request({
    url: prefix + '/searchAlgorithm/list',
    type: 'POST',
    params
  })
}

// 获取搜索算法详情
export function nSearchAlgorithmDetailApi (params: any): PromiseRo<any> {
  return request({
    url: prefix + '/searchAlgorithm/detail',
    type: 'GET',
    params
  })
}

// 创建搜索算法
export function nCreateSearchAlgorithmApi (params: any): PromiseRo<any> {
  return request({
    url: prefix + '/searchAlgorithm/create',
    type: 'POST',
    params
  })
}


// 更新搜索算法
export function nUpdateSearchAlgorithmApi (params: any): PromiseRo<any> {
  return request({
    url: prefix + '/searchAlgorithm/update',
    type: 'POST',
    params
  })
}


// 删除搜索算法
export function nDeleteSearchAlgorithmApi (params: any): PromiseRo<any> {
  return request({
    url: prefix + '/searchAlgorithm/delete',
    type: 'GET',
    params
  })
}


// 执行搜索算法
export function nExecuteSearchAlgorithmApi (params: any): PromiseRo<any> {
  return request({
    url: prefix + '/searchAlgorithm/execute',
    type: 'POST',
    params
  })
}
