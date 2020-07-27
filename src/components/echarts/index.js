import echarts from "./echarts.vue";

export default {
    install: function (Vue) {
        Vue.component("vv-echarts", echarts)
    }
}
