  <!-- 模态框组件 
  -->
<template>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:before-leave="beforeLeave"
    v-on:leave="leave"
  >
    <div class="modal-backdrop" v-if="showModal">
      <transition name="table">
        <div class="modal" v-if="showModal">
          <!-- 头部插槽 -->
          <slot name="header"></slot>
          <!-- 内容区域插槽 -->
          <slot name="content"></slot>
          <!-- 底部插槽 -->
          <slot name="footer">
            <div class="modal-footer">
              <div style="float:right">
                <a class="btn-close" @click="close">{{cancleText?cancleText : '取消'}}</a>
                <a class="btn-confirm" @click="confirm">{{confirmText ? confirmText : '确定'}}</a>
              </div>
            </div>
          </slot>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
export default {
  name: "modal",
  props: {
    // midal标题
    title: {
      type: String,
      default: "提示"
    },
    // modal内容
    content: {
      type: String,
      default: ""
    },

    // 确认按钮文字
    confirmText: {
      type: String,
      default: "确认"
    },
    // 取消按钮文字
    cancleText: {
      type: String,
      default: "取消"
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.showModal = true;
      // 禁止滚动行为
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "hidden";
    });
  },
  destroyed() {
    // 开启滚动行为
    document.body.style.overflowX = "auto";
    document.body.style.overflowY = "auto";
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    // 关闭按钮事件
    close() {
      this.$emit("modalCancel");
    },
    // 确定按钮事件
    confirm() {
      this.$emit("modalConfirm");
    },
    beforeEnter: function(el) {
      el.style.opacity = 0;
    },
    enter: function(el, done) {
      Velocity(el, { opacity: 1 }, { duration: 200 });
      Velocity(el, { complete: done });
    },
    beforeLeave: function(el) {
      el.style.opacity = 1;
    },
    leave: function(el, done) {
      Velocity(el, { opacity: 0 }, { duration: 200 });
      Velocity(el, { complete: done });
    }
  }
};
</script>
<style lang='stylus' scoped>
.table-enter-active, .table-leave-active {
  transition: all 2s;
}

.table-enter {
  width: 0px;
  // opacity: 0;
}

.table-enter-to {
  width: 400px;
  // opacity: 1;
}

.table-leave {
  width: 400px;
}

.table-leave-to {
  width: 0px;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(80, 80, 80, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background-color: #fff;
  box-shadow: 2px 2px 5px 2px #7b7b7b;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  min-width: 400px;
  transition: all 1s ease 0s;
}

.modal-footer {
  padding: 15px;
  /* display: flex;
  justify-content: space-around;
  align-items: right; */
}

.btn-close, .btn-confirm {
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 12px;
  padding: 5px 15px;
}

.btn-close {
  color: #313131;
  background-color: transparent;
}

.btn-close:hover {
  color: #66a4ff;
  background-color: #ecf5ff;
}

.btn-confirm {
  color: #ffffff;
  background-color: #66a4ff;
}

.btn-confirm:hover {
  color: #ffffff;
  background-color: #66b1ff;
}
</style>
