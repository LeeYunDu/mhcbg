/**
 * node apis
 */

import { PromiseRo } from '@/typings/params'
import request from '../request'
import { ApiProxy } from '@/config'


// 角色新增参数
export interface CreateRoleDto {
  label: string
  key: string
  description?: string
  status?: number
  permission?: string
  createBy?: string
}

// url 前缀
const prefix = ApiProxy.node.main

// 角色获取
export function nRolePage (params: any): PromiseRo<any> {
  return request({
    url: prefix + '/role/list',
    type: 'POST',
    params
  })
}

// 角色详情 /role/detail
export function nRoleById (params: { id: string | number }): PromiseRo<any> {
  return request({
    url: prefix + '/role/detail',
    type: 'GET',
    params
  })
}

// 菜单新增
export function nRoleCreate (params: CreateRoleDto): PromiseRo<any> {
  return request({
    url: prefix + '/role/create',
    type: 'POST',
    params
  })
}

// 更新
export function nRoleUpdate (params: CreateRoleDto): PromiseRo<any> {
  return request({
    url: prefix + '/role/update',
    type: 'POST',
    params
  })
}

// 角色删除
export function nRoleDelete (params: { id: string | number }): PromiseRo<any> {
  return request({
    url: prefix + '/role/delete',
    type: 'GET',
    params

  })
}
