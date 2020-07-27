<!--message  
使用方式
在组件中通过$vm.$message.[type](options)使用
属性：
type：类型
options{
message：提示文本，
duration：停留时长
},
-->

<template>
  <div>
    <transition
      appear
      appear-class="fade-enter"
      appear-to-class="fade-enter-to"
      appear-active-class="fade-enter-active"
      name="animate"
    >
      <div class="message" :class="type" v-if="show" :type="type">
        <i class="iconfont icon-chenggong" v-if="type==='success'"></i>
        <i class="iconfont icon-jinggao" v-if="type==='warning'"></i>
        <i class="iconfont icon-cuowu" v-if="type==='error'"></i>
        <i class="iconfont icon-zhengchang" v-if="type==='info'"></i>
        <span class="text">{{message}}</span>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "message",
  props: {
    //类型
    type: {
      type: String,
      default: "info",
      validator: val => ["info", "success", "warning", "error"].includes(val)
      //['info', 'success', 'warning', 'error'] 表示type只接收这四个字符串作为参数传入message组件
    },
    //提示文本
    message: {
      type: String,
      default: ""
    },


    //停留时长
    duration: {
      type: Number,
      default: 2000
      //停留时长
    }
  },
  data() {
    return {
      show: true
    };
  },
  mounted() {
    this.handleAutoClose();
  },
  methods: {
    //执行自动关闭
    handleAutoClose() {
      setTimeout(() => {
        this.close();
      }, this.duration);
    },
    // 关闭
    close() {
      this.show = false;
      setTimeout(() => {
        this.$el.remove();
        this.$destroy();
      }, 200);
    }
  }
};
</script>

<style scoped lang='stylus' >
.fade-enter-active {
  transition: all 0.2s ease;
  animation: fade-in-out 0.2s ease;
}

.fade-leave-active {
  transition: all 0.2s;
  animation: fade-in-out 0.2s reverse;
}

.animate-leave-active {
  opacity: 0;
  transition: all 0.2s;
  animation: fade-in-out 0.2s reverse;
}

// fade-in-out动画
@keyframes fade-in-out {
  0% {
    transform: translateY(-40px) translateX(-50%);
  }

  100% {
    transform: translateY(0px) translateX(-50%);
  }
}

.message {
  &[type='warning'] {
    background-color: #FDF6EC;
    color: #E6A23C;
  }

  &[type='error'] {
    background-color: #FEF0F0;
    color: #F56C6C;
  }

  &[type='success'] {
    background-color: #F0F9EB;
    color: #67C23A;
  }

  &[type='info'] {
    background-color: #EDF2FC;
    color: #909399;
  }



  position: fixed;
  top: 20px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  min-width: 100px;
  padding: 5px 10px;
  background: #EDF2FC;
  font-size: 14px;
  border-radius: 4px;
  z-index: 1000;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  .iconfont {
  }

  .icon-chenggong {
    color: #52c41a;
    font-size: 16px;
  }

  .icon-jinggao {
    color: #E6A23C;
    font-size: 16px;
  }

  .icon-cuowu {
    color: #fd6b6d;
    font-size: 16px;
  }

  .icon-zhengchang {
    color: #909399;
    font-size: 16px;
  }
}



</style>