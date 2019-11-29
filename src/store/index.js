import Vue from 'vue'
import Vuex from 'vuex'
//导入user模块的vuex
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user     //挂载到vuex中
  }
})
