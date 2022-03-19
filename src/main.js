import { Axios } from 'axios'
import Vue from 'vue'
// import Antd from 'ant-design-vue/es'
// import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
// 导入自己已经配置好的router
import router from './router/index'
import store from './store'
import toast from 'components/common/toast'
import Fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

// Vue.component(Button.name, Button);
// Vue.use(Antd)

Vue.config.productionTip = false
// 安装toast插件
Vue.use(toast)
// 解决移动端300ms延迟
Fastclick.attach(document.body)
// 使用懒加载图片插件，后续没有被真正使用上，因为有bscroll的高度刷新问题
Vue.use(VueLazyLoad)

new Vue({
  // 挂载自己的router
  router,
  store,
  render: h => h(App),
}).$mount('#app')
