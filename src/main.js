// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '@/assets/style/reset.css'
// 注册全局的组件，自己写的modal组件
import vvModal from '@/components/modal/index'
import vvUpload from '@/components/upload/index'
import vvMessage from '@/components/message/index'
import vvNotice from '@/components/notice/index'
import vvSelect from '@/components/select/index'
import vvinputNumber from '@/components/inputNumber/index'
import vvButton from '@/components/button/index'
import vvInput from '@/components/input/index'
import vvTree from '@/components/tree/index'
import layout from '@/components/container/index'
import table from '@/components/table/index'
import popover from '@/components/popover/index'
import popmessage from '@/components/popmessage/index'
import echarts from '@/components/echarts/index'
import myvideo from '@/components/video/index'
import myEditor from '@/components/editor/index'
Vue.use(myEditor)
Vue.use(vvButton)
Vue.use(vvSelect)
Vue.use(vvMessage)
Vue.use(vvNotice)
Vue.use(vvModal)
Vue.use(vvUpload)
Vue.use(vvinputNumber)
Vue.use(vvInput)
Vue.use(vvTree)
Vue.use(layout)
Vue.use(table)
Vue.use(popover)
Vue.use(popmessage)
Vue.use(echarts)
Vue.use(myvideo)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
