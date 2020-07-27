
// 引入vue
import Vue from 'vue'
// 引入vue-router
import Router from 'vue-router'
// 导入路由表
import { defaultRoutes } from '@/router/fullpath.js'
//注册router
Vue.use(Router)


let router = new Router({
  routes: defaultRoutes,
  scrollBehavior(to, from, savedPosition) {
    // savedPosition跳转时保存的滚动位置
    // return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
export default router
