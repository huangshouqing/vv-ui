<!-- 列表递归组件最简单的实现方式 -->
<template>
  <div>
    <div class="item" :style="{width:width}">
      <div class="item-title" @click="test" :class="{firstItem:!myLevel}">
        <div class="level clearfix" ref="level">
          <transition name="icon" mode="out-in" appear>
            <i
              class="iconfont icon-down"
              v-if="!list[0].open&&list[0].children"
              key="down"
              @click.stop="handleChangeList"
            ></i>
            <i
              class="iconfont icon-up"
              v-if="list[0].open&&list[0].children"
              key="up"
              @click.stop="handleChangeList"
            ></i>
          </transition>
        </div>
        {{list[0].title}}
      </div>
      <!-- 判断是否有子集，有就继续遍历自身 -->
      <transition :name="rotate" mode="out-in" appear>
        <!-- v-if="item.children&&item.open" -->
        <ul v-if="list[0].children&&list[0].open">
          <vv-tree
            v-for="item in list[0].children"
            :key="item.id"
            :list="[item]"
            class="item-chilren"
            :level="myLevel+1"
            @tongxing="fatongxing"
          ></vv-tree>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
// 使用递归组件时，该组件一定要有名
export default {
  name: "vv-tree",
  props: {
    list: {
      type: Array,
      default: []
    },
    width: {
      type: String,
      default: ""
    },
    // 从父级传过来的当前层级
    level: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      mylist: this.list,
      // 用于接收当前层级
      myLevel: this.level,
      // 只用来表示被点击时修改的数据，在watch中被监听
      flag: false,
      rotate: "bounce"
    };
  },
  computed: {
    currentId() {
      return this.list[0].id;
    }
  },
  // 设置递进距离
  mounted() {
    this.$refs.level.style.width = this.level * 10 + "px";
  },
  methods: {
    // 切换
    handleChangeList() {
      this.$set(this.mylist[0], "open", this.mylist[0].open ? false : true);
    },

    // 测试最顶层能否接受到通信
    test() {
      this.flag = !this.flag;
    },
    // 父组件传到子组件的通信函数
    fatongxing(val) {
      this.flag = !this.flag;
      this.mylist[0].open = false;
      // console.log(val + "接收到11111");
    }
  },
  watch: {
    // 监听flag的变换，然后触发父组件
    flag: {
      handler() {
        setTimeout(() => {
          this.$emit("tongxing", this.currentId);
        },200);
      }
    },
    // 从父组件传递来的数据
    list: {
      immediate: true,
      handler(val) {
        this.mylist = val;
      }
    },
    // 当前组件的层级
    level: {
      immediate: true,
      handler(val) {
        this.myLevel = val;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
// 图标动画
.icon-leave-active {
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: all 0.5s ease;
}

.icon-leave {
  transform: rotateZ(0deg);
}

.icon-leave-to {
  transform: rotateZ(-180deg);
}

// 列表动画
.bounce-leave-active, .bounce-enter-active {
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: all 0.5s ease;
  animation: bounce-in 0.5s;
}

.bounce-enter, .bounce-leave-to {
  opacity: 0;
  height: 0;
}

.bounce-enter-to, .bounce-leave {
  opacity: 1;
  height: 100%;
}

// bounce动画
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(0.7);
  }

  100% {
    transform: scale(0.6);
  }
}

.item {
  /* 每一行的样式 */
  .item-title {
    position: relative;
    line-height: 30px;
    font-size: 16px;
    padding: 0 0 0 20px;
    border-radius: 2px;
    font-size: 14px;
    margin: 5px 0;
    background-color: #F7F7F7;

    /* *hover状态 */
    &:hover {
      background-color: #eee;
    }

    /* *递进距离 */
    .level {
      display: inline-block;
      position: relative;
      height: 20px;

      /* *图标 */
      .iconfont {
        display: inline-block;
        position: absolute;
        right: 0px;
        top: 0;
        cursor: pointer;

        &:hover {
          color: #66a4ff;
        }
      }
    }
  }

  /* *每一个根节点的样式 */
  .firstItem {
    background-color: #ddd;

    /* *节点被hover的样式 */
    &:hover {
      background-color: #ddd;
    }
  }

  .item-chilren {
  }
}

// 清除浮动带来的影响
.clearfix:before {
  display: block;
  content: '';
  clear: both;
  visibility: hidden;
  height: 0;
}

.clearfix:after {
  display: block;
  content: '';
  clear: both;
  visibility: hidden;
  height: 0;
}
</style>