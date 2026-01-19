import { ResponseMode } from '@/typings/params'
import Config from '@/config'
import { get } from 'lodash-es'
import { transformToTree } from '@/utils'
import { jSingleChoose, jMultipleChoose, nDictTreeQuery } from '@/api'
import { listDeptApi } from '@/api/modules/java.system.dept'

export interface DictMode {
  id: number
  name: string
  parentId: number
  type: string | number
  childList?: DictMode[]
  path?: string
  valueRange?: string
}

interface DictListMode {
  levelList: DictMode[]
  resultList: DictMode[]
  type: number
}

// 创建dict key
export function createDictKey (type: number | string) {
  return `dict_${type}`
}

const dictApis = [
  {
    api: nDictTreeQuery,
    type: 'java',
    params: {
      "pageNum": 1,
      "pageSize": 10,
      "codes": ['question_item_type', 'questionnaire_score_system', 'question_option_type'].join(',')
    }
  },
  // {
  //   api: listDeptApi, // 部门接口
  //   type: 'java',
  //   params: {
  //     pageNum: 1,
  //     pageSize: 1000
  //   }
  // },
]

const app = {
  state: () => ({
    isLoadedDict: false,
    dictData: {},
    globalData: {
      // 是否开区麦克风
      isOpenMic: false,
      // 全局数据
    }
  }),

  getters: {
    dictDataOnly: (state: any) => (type: any) => {
      const isDictData = !!Object.keys(state.dictData).length
      return (isDictData && get(state.dictData, `dict_${type}`, [])) || []
    },
    isLoadedDict: (state: any) => state.isLoadedDict,
    dictData: (state: any): any =>
      Object.keys(state.dictData).length > 1
        ? state.dictData
        : JSON.parse(sessionStorage.getItem('dictData') || '{}')
  },

  mutations: {
    SET_DICT_DATA (state: any, data: any) {
      state.isLoadedDict = true
      state.dictData = data || {}
      sessionStorage.setItem('dictData', JSON.stringify(state.dictData))
    }
  },

  actions: {
    /**
     * 初始化多个字典值
     * @param param0
     * @returns
     */
    async initDict ({ commit, state }: any) {
      try {
        const datas = await Promise.all(
          dictApis.map((item: any) =>
            item.api(item.params).catch((err: any) => err)
          )
        )
        const dictData = state.dictData || {}
        datas.map((data: any, index: number) => {
          switch (index) {
            case 0:
              const list = get(data, 'data', [])
              list.map((item: any) => {
                const useType = createDictKey(item.code)
                const useOptions = item.items.map((e: any) => {
                  return {
                    label: e.label,
                    name: e.label,
                    value: e.id,
                    id: e.id
                  }
                })
                dictData[useType] = {
                  tree: useOptions,
                  list: useOptions,
                }
              })
              break
            case 1:
              const list2 = data.data
              const useType = createDictKey('sys_dept')
              const options = list2.map((item: any) => {
                return {
                  label: item.deptName,
                  name: item.deptName,
                  value: item.deptId,
                  id: item.deptId,
                }
              })
              dictData[useType] = {
                tree: options,
                list: options,
              }
              break
          }
        })
        commit('SET_DICT_DATA', dictData)
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * 获取单个字典值
     * @param param0
     * @param type
     * @returns
     */
    async getSingleChoose ({ commit, state }: any, type: number) {
      try {
        if (!type && type !== 0) return
        const useType = createDictKey(type)
        const dictData = state.dictData || {}
        if (dictData[useType]) {
          return dictData[useType]
        }

        const { data, status }: ResponseMode = await jSingleChoose({ type })
        if (status !== 200) return data
        const jsonData: DictListMode = data || {}
        const itemData = {
          tree: jsonData.resultList || [],
          list: jsonData.levelList || []
        }
        dictData[useType] = itemData
        commit('SET_DICT_DATA', dictData)
        return itemData
      } catch (error) {
        console.log(error)
      }
    }
  }
}
export default app
