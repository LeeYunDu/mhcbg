/**
 * java system user apis
 */
import { PromiseRo } from '@/typings/params'
import request from '../request'
import { ApiProxy } from '@/config'
const prefix = ApiProxy.java.main

// 用户列表 /system/user/list
export function getUserListApi (params: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/user/list',
    type: 'GET',
    params
  })
}

// 获取用户详情
export function getUserApi (userId: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/user/' + userId,
    type: 'GET'
  })
}

// 账户状态，启用和停用 system/user/changeStatus
export function changeUserStatusApi (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/user/changeStatus',
    type: 'PUT',
    params: data
  })
}

// 新增用户
export function addUserApi (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/user',
    type: 'post',
    params: data
  })
}


// 修改用户
export function updateUserApi (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/user',
    type: 'put',
    params: data
  })
}

// 删除用户
export function delUserApi (userId: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/user/' + userId,
    type: 'delete'
  })
}

// 用户密码重置
export function resetUserPwdApi (userId: any, password: any): PromiseRo<any> {
  const data = {
    userId,
    password
  }
  return request({
    url: prefix + '/system/user/resetPwd',
    type: 'put',
    params: data
  })
}


