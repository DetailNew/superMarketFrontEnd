import Vue from "vue";
import Vuex from 'vuex'

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";



// 安装插件
Vue.use(Vuex)

// 抽离state
const state = {
    type: ['pop','new','sell'],
    page: 1,
    importGoods: [],
    cartGoods: [],
}

// 创建对象
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {}
})

// 导出对象
export default store