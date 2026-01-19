/**
 * node questionnaire apis
 */

import { ApiProxy } from '@/config'
import { PromiseRo } from '@/typings/params'
import request from '../request'

// url 前缀
const prefix = ApiProxy.node.main

// 创建问卷
export function createQuestionnaireApi (params): PromiseRo<any> {
  return request({
    url: prefix + '/questionnaire/create',
    type: 'POST',
    params
  })
}

// 获取问卷列表
export function getQuestionnaireListApi (params): PromiseRo<any> {
  return request({
    url: prefix + '/questionnaire/list',
    type: 'POST',
    params
  })
}

// 获取问卷详情
export function getQuestionnaireDetailApi (params): PromiseRo<any> {
  return request({
    url: prefix + '/questionnaire/detail',
    type: 'GET',
    params
  })
}

// 更新问卷
export function updateQuestionnaireApi (params): PromiseRo<any> {
  return request({
    url: prefix + '/questionnaire/update',
    type: 'POST',
    params
  })
}

// 删除问卷
export function deleteQuestionnaireApi (params): PromiseRo<any> {
  return request({
    url: prefix + '/questionnaire/delete',
    type: 'GET',
    params
  })
}

export function changeQuestionnaireStatusApi (params): PromiseRo<any> {
  return request({
    url: prefix + '/questionnaire/change-status',
    type: 'POST',
    params
  })
}