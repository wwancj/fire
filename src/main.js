import Vue from 'vue'
import App from './App.vue'

import '@/icons/index.js'
import router from './router'

// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)



// 引入全局样式
import '@/style/style.scss'
import '@/style/pgs.scss'
import '@/style/auto.scss'
import '@/style/customer.scss'
// 引入大数据视图 dataV
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

new Vue({
    router,
  render: (h) => h(App),

}).$mount('#app')