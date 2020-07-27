import notice from './notice.vue'

const NOTICE = {
    // 挂载函数
    install(Vue) {
        // 全局注册
        Vue.component('vv-notice', notice)
        function msg(type, options, callBack) {
            // 创建构造器
            let Constructor = Vue.extend(notice)
            // 创建 newMessage 实例
            let Options = {
                type: type,
                message: options.message,
                autoclose: options.autoclose,
                duration: options.duration,
                buttonClose: {
                    buttonText: options.buttonClose.buttonText,
                    isShow: options.buttonClose.isShow,
                    callback: callBack
                }
            }
            let newMessage = new Constructor({
                propsData: { ...Options }
            })
            //并挂载到一个元素上。
            let vm = newMessage.$mount()
            let el = vm.$el
            el.setAttribute('data-notice', Math.random())
            //将伪数组转为真数组，为了使用数组的方法
            var bodychildrens = Array.prototype.slice.call(document.body.children);
            let flag = true
            let arr = []
            bodychildrens.forEach(item => {
                if (item.getAttribute('data-notice')) {
                    flag = false
                    arr.push(item)
                    document.body.removeChild(item)
                }
            })

            // 把生成的提示的dom插入body中
            document.body.appendChild(el)
            // flag && document.body.appendChild(el)

        }
        // 挂载到vue原型上，暴露四个方法
        Vue.prototype.$notice = {
            info(options, callBack) {
                if (!options) return
                msg('info', options, callBack)
            },
            success(options, callBack) {
                if (!options) return
                msg('success', options, callBack)
            },
            error(options, callBack) {
                if (!options) return
                msg('error', options, callBack)
            },
            warning(options, callBack) {
                if (!options) return
                msg('warning', options, callBack)
            }
        }
    }
}
export default NOTICE