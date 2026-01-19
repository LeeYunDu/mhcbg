/**
 * node question apis
 */

import { ApiProxy } from '@/config'
import { PromiseRo } from '@/typings/params'
import request from '../request'

// url 前缀
const prefix = ApiProxy.node.main

// 创建问卷题目
export function createQuestionApi (params): PromiseRo<any> {
  return request({
    url: prefix + '/question/create',
    type: 'POST',
    params: params || {}
  })
}

// 获取问卷题目列表
export function getQuestionListApi (params): PromiseRo<any> {
  return request({
    url: prefix + '/question/list',
    type: 'POST',
    params: params || {}
  })
}

// 获取问卷题目详情
export function getQuestionDetailApi (params): PromiseRo<any> {
  return request({
    url: prefix + '/question/detail/',
    type: 'GET',
    params: params || {}
  })
}

// 更新问卷题目
export function updateQuestionApi (params): PromiseRo<any> {
  return request({
    url: prefix + '/question/update',
    type: 'POST',
    params: params || {}
  })
}

// 删除问卷题目 
export function deleteQuestionApi (params): PromiseRo<any> {
  return request({
    url: prefix + '/question/delete',
    type: 'GET',
    params: params || {}
  })
}

// /question/preview 预览问卷题目
export function previewQuestionApi (params): PromiseRo<any> {
  return request({
    url: prefix + '/question/preview',
    type: 'GET',
    params: params || {}
  })
}