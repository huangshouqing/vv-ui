<!-- layout
用于布局的容器组件，方便快速搭建页面的基本结构：
<vv-layout>：外层容器。当子元素中包含 <vv-header> 或 <vv-footer> 时，全部子元素会垂直上下排列，否则会水平左右排列。
<vv-header>：顶栏容器。
<vv-sider>：侧边栏容器。
<vv-content>：主要区域容器。
<vv-footer>：底栏容器。
以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，<vv-layout> 的子元素只能是后四者，后四者的父元素也只能是 <vv-layout>。 -->
<template>
  <div class="layout" :class="{'layout-has-sider':layoutSider}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      layoutSider: false
    };
  },
  mounted() {
    this.$children.forEach(element => {
      if (element.$options.name === "vv-sider") {
        this.layoutSider = true;
      }
    });
  },
  computed: {}
};
</script>
<style lang='stylus' scoped>
.layout {
  display: flex;
  /* *默认从上往下布局，如果layout里有sider就改变成左右布局 */
  flex-direction: column;
  width: 100%;
  height: 100%;
}

/* *有sider时layout的样式 */
.layout-has-sider {
  flex-direction: row;
  width: 100%;
  height: 100%;
}
</style>