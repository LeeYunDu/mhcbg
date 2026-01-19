/**
 * node apis
 */

import { PromiseRo } from '@/typings/params'
import request from '../request'
import { ApiProxy } from '@/config'

export interface CreateUserDto {
  user: string
  userName: string
  password: string
  roleId: string
  remark: string
  status: number
  provinceCode: number
  cityCode: number
  countyCode: number
}

// url 前缀
const prefix = ApiProxy.node.main

// 角色获取
export function nUserPage (params: CreateUserDto): PromiseRo<any> {
  return request({
    url: prefix + '/user/list',
    type: 'POST',
    params
  })
}

// 用户详情
export function nUserById (params: { id: string | number }): PromiseRo<any> {
  return request({
    url: prefix + '/user/detail',
    type: 'GET',
    params
  })
}

// 用户新增
export function nUserCreate (params: CreateUserDto): PromiseRo<any> {
  return request({
    url: prefix + '/user/create',
    type: 'POST',
    params
  })
}

// 更新
export function nUserUpdate (params: CreateUserDto): PromiseRo<any> {
  return request({
    url: prefix + '/user/update',
    type: 'POST',
    params
  })
}

// 用户删除
export function nUserDelete (params: { id: string | number }): PromiseRo<any> {
  return request({
    url: prefix + '/user/delete',
    type: 'GET',
    params
  })
}
