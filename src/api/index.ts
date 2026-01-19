import request from './request'

/**
 * java user, namespace: u
 */

/**
 * java common apis
 */
export * from './modules/java'

/**
 *  node apis
 */
export * from './modules/node.login'

/**
 * node questionnaire, namespace: nQuestionnaire
 */
export * from './modules/node.questionnaire'
export * from './modules/node.questionaire-answer'
export * from './modules/node.question'

/** 
 * node project, namespace: nProject
 */
export * from './modules/node.project'

/**
 * node page-view, namespace: nPageView
 */
export * from './modules/node.page-view'

/**
 * node menus, namespace: nMenu
 */
export * from './modules/node.menu'

/**
 * node files, namespace: nFile
 */
export * from './modules/node.file'

/**
 * node role, namespace: nRole
 */
export * from './modules/node.role'

/**
 * node user, namespace: nUser
 */
export * from './modules/node.user'



/**
 * node enums, namespace: nEnum
 */
export * from './modules/node.enum'

/**
 * node dict, namespace: nDict
 */
export * from './modules/node.dict'

export * from './modules/java.user'


/**
 * cbg
 */
export * from './modules/node.cbg.parse'
export * from './modules/node.cbg.equipment'
export * from './modules/node.cbg.search'



/**
 * 通用
 * @param options
 * @returns
 */
export function asyncConf (options: any) {
  let url = options && options.url
  if (url.substring(0, 1) !== '/') url = '/' + url
  return request({
    url,
    type: options.type || 'get',
    params: options.params || {}
  })
}


export default {}


