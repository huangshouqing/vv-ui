import editor from "./editor.vue";


// 向外暴露install函数，用于注册
export default {
  install: function (Vue) {
    Vue.component("vv-editor", editor)
  }
}
