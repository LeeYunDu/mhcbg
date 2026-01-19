import { nGetLoginInfo } from '@/api'
import { ActionContext } from 'vuex'
import { UserInfoMode, UserStoreMode } from '@/typings/store'
import Cookies from 'js-cookie'

const user = {
  state: () => ({
    user: JSON.parse(sessionStorage.getItem('user') || '{}'),
    role: JSON.parse(sessionStorage.getItem('role') || '{}'),
    isLogin: Cookies.get('LOGIN_TOKEN') ? true : false
  }),

  getters: {
    user: (state: any) => state.user,
    userId: (state: any) => state.userId,
    isLogin: (state: any) => {
      return state.isLogin
    },
    role: (state: any) => state.role,
    userType: (state: any) => state.role.roleKey
  },

  mutations: {
    SET_USER (state: any, data: UserInfoMode) {
      state.user = data || {}
      state.userId = data.userId
      state.isLogin = true
      sessionStorage.setItem('user', JSON.stringify(data))
      Cookies.set('user', JSON.stringify(data), { expires: new Date(Date.now() + 3600000) })
    },

    SET_USER_ROLE (state: any, data: any) {
      state.role = data
      Cookies.set('role', JSON.stringify(data), { expires: new Date(Date.now() + 3600000) })
    },

    CLEAR_USER_STORE (state: any) {
      state.user = {}
      state.isLogin = false
      state.userId = ''
      Cookies.remove('user')
      Cookies.remove('role')
      Cookies.remove('token')
      Cookies.remove('nick_name')
      Cookies.remove('token_type')
      Cookies.remove('user_id')
      Cookies.remove('LOGIN_TOKEN')
      sessionStorage.removeItem('user')
      localStorage.clear()
      sessionStorage.clear()
    }
  },

  actions: {
    async getUserInfo ({ commit }: ActionContext<UserStoreMode, any>) {
      try {
        const { data } = await nGetLoginInfo()

        commit('SET_USER', data || {})
        return { data, success: true, status: 200 }
      } catch (error) {
        console.log(error)
      }
    },


    setUserRole ({ commit }: any, data: any) {
      commit('SET_USER_ROLE', data)
    },

    /**
     * 清除
     */
    clearUserStore ({ commit }: ActionContext<string, any>) {
      commit('CLEAR_USER_STORE')
    }
  }
}
export default user
