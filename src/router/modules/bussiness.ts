import { get } from 'lodash-es'

export const bussinessRoutes: Array<any> = [
  // 问卷系统
  {
    path: '/question',
    name: 'Question',
    component: () => import('@/layouts/router.vue'),
    meta: { permission: true, title: '问卷系统', showHeader: true, showSide: true },
    redirect: '/question/list',
    children: [
      {
        path: 'list',
        name: 'QuestionList',
        component: () => import('@/pages/question-element-plus/list.vue'),
        meta: { permission: true, title: '问卷管理', showHeader: true, showSide: true }
      },
      {
        path: 'question-design',
        name: 'QuestionDesign',
        component: () => import('@/pages/question-element-plus/question-design.vue'),
        meta: { permission: true, title: '问题设计', showHeader: true, showSide: true }
      },
      {
        path: 'questionaire-answer',
        name: 'QuestionaireAnswer',
        component: () => import('@/pages/question-element-plus/questionaire-answer.vue'),
        meta: { permission: true, title: '问卷回答', showHeader: true, showSide: true }
      },

    ]
  },


]

export const systemRoutes: Array<any> = [
  // 系统管理
  {
    path: '/system',
    name: 'System',
    component: () => import('@/layouts/router.vue'),
    meta: { permission: true, name: '系统管理', title: '系统管理', showHeader: true, showSide: true },
    redirect: '/system/user',
    showMenu: true,
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/pages/system/user/index.vue'),
        meta: { permission: true, name: '用户管理', title: '用户管理', showHeader: true, showSide: true }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/pages/system/role/index.vue'),
        meta: { permission: true, name: '角色管理', title: '角色管理', showHeader: true, showSide: true }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/pages/system/menu/index.vue'),
        meta: { permission: true, name: '菜单管理', title: '菜单管理', showHeader: true, showSide: true }
      },
      {
        path: 'dict',
        name: 'Dict',
        component: () => import('@/pages/system/dict/index.vue'),
        meta: { permission: true, name: '字典管理', title: '字典管理', showHeader: true, showSide: true }
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/pages/system/log/index.vue'),
        meta: { permission: true, name: '日志管理', title: '日志管理', showHeader: true, showSide: true }
      },
      {
        path: 'dept',
        name: 'Dept',
        component: () => import('@/pages/system/dept/index.vue'),
        meta: { permission: true, name: '部门管理', title: '部门管理', showHeader: true, showSide: true }
      },

    ]
  },
]

export const cbgSystemRoutes: Array<any> = [
  // 藏宝阁
  {
    path: '/cbg',
    name: 'CBG',
    component: () => import('@/layouts/router.vue'),
    meta: { permission: true, name: '藏宝阁', title: '藏宝阁', showHeader: true, showSide: true },
    showMenu: true,
    redirect: '/cbg/parse-history',
    children: [
      {
        path: 'parse-history',
        name: 'ParseHistory',
        component: () => import('@/pages/cbg/parse-history.vue'),
        meta: { permission: true, name: '链接解析历史', title: '链接解析历史', showHeader: true, showSide: true }
      },
       {
        path: 'search-manage',
        name: 'SearchManage',
        component: () => import('@/pages/cbg/search-manage.vue'),
        meta: { permission: true, name: '搜索算法', title: '搜索算法', showHeader: true, showSide: true }
      },
    ]
  },
  {
    path: '/cbg-equipment',
    name: 'CBGEquipment',
    component: () => import('@/layouts/router.vue'),
    meta: { permission: true, name: '商品库', title: '商品库', showHeader: true, showSide: true },
    showMenu: true,
    redirect: '/cbg-equipment/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/pages/cbg-equipment/index.vue'),
        meta: { permission: true, name: '商品库', title: '商品库', showHeader: true, showSide: true }
      },
    ]
  },
]

export const useBussinessRoutes = () => {

  const routes = [ ...systemRoutes, ...cbgSystemRoutes]
  // 处理路由的数据结构，以达到aside侧边栏菜单组件的格式
  const handleRoutes = routes.map((module, index) => {
    const extra = {
      name: get(module, 'meta.title', '未命名菜单'),
      hidden: 1,// 0为隐藏，1为显示
      routerPath: get(module, 'path', ''),
      children: get(module, 'children', []).map((child: any) => {
        return {
          name: get(child, 'meta.title', '未命名菜单'),
          hidden: 1,// 0为隐藏，1为显示
          routerPath: module.path + '/' + get(child, 'path', ''),
        }
      })
    }
    return extra
  })

  return handleRoutes
}


