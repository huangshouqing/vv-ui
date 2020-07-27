import toastcom from './toast.vue'
const toast = {}
toast.install = vue => {
  const ToastCon = vue.extend(toastcom)
  const ins = new ToastCon()
  ins.$mount(document.createElement('div'))
  document.body.appendChild(ins.$el)
  //往vue上挂载$toast
  /**
   *duration 延长时间
   *msg 消息内容
   */
  vue.prototype.$toast = (msg, duration = 3000) => {
    ins.message = msg
    ins.visible = true
    setTimeout(() => {
      ins.visible = false
    }, duration)
  }
}
export default toast
