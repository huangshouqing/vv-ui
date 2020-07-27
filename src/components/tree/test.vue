<!--  -->
<template>
  <div>
    <transition name="slide-fade" mode="out-in">
      <i class="iconfont icon-down" v-if="open" @click.stop="handleOpenList" key="down"></i>
      <i class="iconfont icon-up" v-else @click.stop="handleOpenList" key="up"></i>
    </transition>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      open: false
    };
  },
  computed: {},
  watch: {},
  methods: {
    handleOpenList() {
      this.open = !this.open;
    }
  }
};
</script>
<style lang='stylus' scoped>
// 图标(只需要进场动画)
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.iconfont{
    display inline-block
}

</style>