

const app = {
  state: () => ({
    themes: [
      {
        name: 'default',
        label: '默认主题',
        color: '#409eff',
        description: 'Element Plus 默认蓝色'
      },
      {
        name: 'red',
        label: '党建红',
        color: '#c20c0c',
        description: '红色党建主题'
      }
    ],
    currentTheme: 'default'
  }),

  getters: {

  },

  mutations: {
    SET_THEME (state: any, data: any) {
      const theme = state.themes.find(t => t.name === data)
      if (!theme) return

      state.currentTheme = data
      localStorage.setItem('theme', data)

      // 更新根元素的 data-theme 属性
      const html = document.documentElement
      html.setAttribute('data-theme', data)

      // 动态加载主题样式
      const existingLink = document.getElementById('theme-style')
      if (existingLink) {
        existingLink.remove()
      }

      if (data !== 'default') {
        const link = document.createElement('link')
        link.id = 'theme-style'
        link.rel = 'stylesheet'
        link.href = `/src/styles/theme/${data}.scss`
        document.head.appendChild(link)
      } else {
        // 加载默认主题样式
        const defaultLink = document.createElement('link')
        defaultLink.id = 'theme-style'
        defaultLink.rel = 'stylesheet'
        defaultLink.href = '/src/styles/theme/element-plus.scss'
        document.head.appendChild(defaultLink)
      }

    }
  },

  actions: {

    async toggleTheme ({ commit, state }: any) {
      const currentIndex = state.themes.findIndex(t => t.name === state.currentTheme)
      const nextIndex = (currentIndex + 1) % state.themes.length
      commit('SET_THEME', state.themes[nextIndex].name)
    },

    async initTheme ({ commit, state }: any) {
      const saved = localStorage.getItem('theme')
      if (saved && state.themes.some(t => t.name === saved)) {
        state.currentTheme = saved
      }
      commit('SET_THEME', state.currentTheme)
    },
  }
}
export default app
