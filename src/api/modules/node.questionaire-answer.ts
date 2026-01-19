/**
 * node questionnaire apis
 */

import { ApiProxy } from '@/config'
import { PromiseRo } from '@/typings/params'
import request from '../request'

// url 前缀
const prefix = ApiProxy.node.main

// 新增问卷记录
export function createQuestionaireAnswerApi (params): PromiseRo<any> {
  return request({
    url: prefix + '/questionaireAnswer/create',
    type: 'POST',
    params: params || {}
  })
}

// 获取问卷回答列表
export function getQuestionaireAnswerListApi (params): PromiseRo<any> {
  return request({
    url: prefix + '/questionaireAnswer/list',
    type: 'POST',
    params: params || {}
  })
}

// 获取问卷回答详情
export function getQuestionaireAnswerDetailApi (params): PromiseRo<any> {
  return request({
    url: prefix + '/questionaireAnswer/detail',
    type: 'GET',
    params: params || {}
  })
}

// 删除问卷回答
export function deleteQuestionaireAnswerApi (params): PromiseRo<any> {
  return request({
    url: prefix + '/questionaireAnswer/delete',
    type: 'GET',
    params: params || {}
  })
}
