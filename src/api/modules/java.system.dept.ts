/**
 * java system dept apis
 */
import { PromiseRo } from '@/typings/params'
import request from '../request'
import { ApiProxy } from '@/config'
const prefix = ApiProxy.java.main
// 查询部门列表
export function listDeptApi (query: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/dept/list',
    type: 'GET',
    params: query
  })
}

// 查询部门列表（排除节点）
export function listDeptExcludeChildApi (deptId: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/dept/list/exclude/' + deptId,
    type: 'GET'
  })
}

// 查询部门详细
export function getDeptApi (deptId: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/dept/' + deptId,
    type: 'GET'
  })
}

// 新增部门
export function addDeptApi (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/dept',
    type: 'POST',
    data: data
  })
}

// 修改部门
export function updateDeptApi (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/dept',
    type: 'PUT',
    data: data
  })
}

// 删除部门
export function delDeptApi (deptId: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/dept/' + deptId,
    type: 'DELETE'
  })
}
