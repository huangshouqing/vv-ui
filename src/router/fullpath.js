// 这里写全部路由表
// 引入vue
import Vue from 'vue'
// 引入vue-router
import Router from 'vue-router'
// 引入组件
import test from '@/pages/test.vue';
//注册router
Vue.use(Router)


export const defaultRoutes = [
  {
    path: '/',
    name: 'test',
    component: test
  },
]