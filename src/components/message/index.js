import Message from './message.vue'

const MESSAGE = {
  // 挂载函数
  install(Vue) {
    // 全局注册
    Vue.component('Message', Message)
    function msg(type, options) {
      // 创建构造器
      let Constructor = Vue.extend(Message)
      // 创建 newMessage 实例
      let Options = {
        type: type,
        message: options.message,
        autoclose: options.autoclose,
        duration: options.duration,
      }
      let newMessage = new Constructor({
        propsData: { ...Options }
      })
      //并挂载到一个元素上。
      let vm = newMessage.$mount()
      let el = vm.$el
      el.setAttribute('data-message', Math.random())
      //将伪数组转为真数组，为了使用数组的方法
      var bodychildrens = Array.prototype.slice.call(document.body.children);
      let flag = true
      let arr = []
      bodychildrens.forEach(item => {
        if (item.getAttribute('data-message')) {
          flag = false
          arr.push(item)
          document.body.removeChild(item)
        }
      })

      // 把生成的提示的dom插入body中
      document.body.appendChild(el)

    }
    // 挂载到vue原型上，暴露四个方法
    Vue.prototype.$message = {
      info(options) {
        if (!options) return
        msg('info', options)
      },
      success(options) {
        if (!options) return
        msg('success', options)
      },
      error(options) {
        if (!options) return
        msg('error', options)
      },
      warning(options) {
        if (!options) return
        msg('warning', options)
      }
    }
  }
}
export default MESSAGE