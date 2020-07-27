<!--content  
-->
<template>
  <div class="content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // this.$parent.$children.forEach(element => {
    //   if (element.$options.name === "vv-sider") {
    //     this.layoutSider = true;
    //   }
    // });
  }
};
</script>
<style lang='stylus' scoped>
.content {
  background-color: #E9EEF3;
  // 使用这个可以在未设置高度时，自适应高度
  height: 100%;
  width: 100%;
}
</style>