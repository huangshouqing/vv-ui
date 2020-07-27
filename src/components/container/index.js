import header from "./header.vue";
import content from "./content.vue";
import footer from "./footer.vue";
import sider from "./sider.vue";
import layout from "./layout.vue";
// 向外暴露install函数，用于注册
export default {
    install: function (Vue) {
        Vue.component("vv-layout", layout)
        Vue.component("vv-footer", footer)
        Vue.component("vv-content", content)
        Vue.component("vv-header", header)
        Vue.component("vv-sider", sider)
    }
}
