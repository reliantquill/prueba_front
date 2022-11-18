import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const stores = defineStore({
  id: 'crm_store',
  state: () => (
    useStorage('appprueba', {
      colores: null,
      rules: null,
      user: {},
      menus: {},
      token: { id: 0, text: '' },
      security: '',
      apiUrl: 'http://127.0.0.1:82/laravel/v9/apps/api_prueba/public/api/'
    })
  ),
  getters: {
    getColores: (state) => state.colores,
    getRules: (state) => state.rules,
    getUser: (state) => state.user,
    getMenus: (state) => state.menus,
    getToken: (state) => {
      const token = { id: state.token.id, text: state.token.text }
      return token
    },
    getUrlApi: (state) => state.apiUrl,
    getSecurity: (state) => state.security
  },
  actions: {
    setColores (colores) {
      this.colores = colores
    },
    setMenus (menus) {
      this.menus = menus
    },
    setRules (rules) {
      // this.rules = fnEncriptar(rules, ls.config.encryptionSecret)
      this.rules = rules
    },
    setUser (user) {
      this.user = user
    },
    setSecurity  (security) {
      this.security = security
    },
    setToken (token) {
      this.token.id = token.accessToken.id
      this.token.text = token.plainTextToken
    }
  }
})
