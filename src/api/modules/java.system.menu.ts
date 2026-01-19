/**
 * java system menu apis
 */
import { PromiseRo } from '@/typings/params'
import request from '../request'
import { ApiProxy } from '@/config'
const prefix = ApiProxy.java.main


// 查询菜单列表
export function listMenuApi (query: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/menu/list',
    type: 'GET',
    params: query
  })
}

// 查询菜单详细
export function getMenuApi (menuId: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/menu/' + menuId,
    type: 'GET'
  })
}

// 查询菜单下拉树结构
export function treeselectApi (): PromiseRo<any> {
  return request({
    url: prefix + '/system/menu/treeselect',
    type: 'GET'
  })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselectApi (roleId: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/menu/roleMenuTreeselect/' + roleId,
    type: 'GET'
  })
}

// 新增菜单
export function addMenuApi (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/menu',
    type: 'POST',
    data: data
  })
}

// 修改菜单
export function updateMenuApi (data: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/menu',
    type: 'PUT',
    params: data
  })
}

// 删除菜单
export function delMenuApi (menuId: any): PromiseRo<any> {
  return request({
    url: prefix + '/system/menu/' + menuId,
    type: 'DELETE'
  })
}
