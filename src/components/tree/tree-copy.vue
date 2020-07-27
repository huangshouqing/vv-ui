
<!-- 列表递归组件最简单的实现方式之二
这个版本有个问题，当前组件不能默认获取到唯一标识id
调用方式如下
<vv-tree :list="treeList" width="400px"></vv-tree> 

 -->
<template>
  <div>
    <div class="item" v-for="(item) of mylist" :key="item.id" :style="{width:width}">
      <div class="item-title" @click="test(item.id)">
        <div class="level clearfix" ref="level">
          <transition name="icon" mode="out-in">
            <i
              class="iconfont icon-down"
              v-if="!item.open&&item.children"
              key="down"
              @click.stop="handleChangeList(item.id)"
            ></i>
            <i
              class="iconfont icon-up"
              v-if="item.open&&item.children"
              key="up"
              @click.stop="handleChangeList(item.id)"
            ></i>
          </transition>
        </div>
        {{item.title}}
      </div>
      <!-- 判断是否有子集，有就继续遍历自身 -->
      <transition name="rotate" mode="out-in" appear>
        <vv-tree
          :list="item.children"
          v-if="item.children&&item.open"
          class="item-chilren"
          :level="myLevel+1"
          @tongxing="fatongxing"
        ></vv-tree>
      </transition>
    </div>
  </div>
</template>

<script>
// 使用递归组件时，该组件一定要有名
export default {
  name: "vv-tree",
  props: {
    list: Array,
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
      // 当前节点的id(问题在不点击无法知晓当前节点的id)
      currentId: null,
      flag: false
    };
  },
  // 设置递进距离
  mounted() {
    this.$refs.level.forEach(item => {
      item.style.width = this.level * 10 + "px";
    });
  },
  methods: {
    // 切换
    handleChangeList(val) {
      this.currentId = val;
      this.changeCurrent(val, this.mylist);
    },
    // 展开当前节点
    changeCurrent(id, arr) {
      arr.forEach((item, index) => {
        if (id === item.id) {
          this.$set(item, "open", item.open ? false : true);
        } else {
          if (item.children) {
            this.changeCurrent(id, item.children);
          }
        }
      });
    },
    // 测试最顶层能否接受到通信
    test(val) {
      this.flag = !this.flag;
    },
    // 父组件传到子组件的通信函数
    fatongxing(val) {
      this.flag = !this.flag;
      console.log(val + "接收到11111");
    }
  },
  watch: {
    // 监听flag的变换，然后触发父组件
    flag: {
      handler() {
        this.$emit("tongxing", this.currentId);
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

// .icon-enter {
// transform: rotateZ(180deg);
// }

// .icon-enter-to {
// transform: rotateZ(0deg);
// }
.icon-leave {
  transform: rotateZ(0deg);
}

.icon-leave-to {
  transform: rotateZ(-180deg);
}

// 旋转动画
.rotate-leave-active, .rotate-enter-active {
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: all 0.5s linear;
}

.rotate-enter {
  // transform: rotateZ(90deg);
  opacity: 0;
  height: 0;
}

.rotate-enter-to {
  // transform: rotateZ(0deg);
  opacity: 1;
  height: 100%;
}

.rotate-leave {
  height: 100%;
  opacity: 1;
}

.rotate-leave-to {
  height: 0;
  opacity: 0;
}

.item {
  // padding: 0 0 0 10px;
  .item-title {
    position: relative;
    line-height: 30px;
    font-size: 16px;
    padding: 0 0 0 20px;
    border-radius: 2px;
    font-size: 14px;
    margin: 5px 0;

    // background-color: #eee;
    &:hover {
      background-color: #eee;
    }

    .level {
      display: inline-block;
      position: relative;
      height: 20px;

      .iconfont {
        display: inline-block;
        position: absolute;
        right: 0px;
        top: 0;
        cursor: pointer;
      }
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
