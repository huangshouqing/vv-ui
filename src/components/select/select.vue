<!-- 选择框组件
tabindex="1" 让div支持focus与blur事件-->
<template>
  <div class="select" :style="{width:width}" @blur="blur" tabindex="1">
    <!-- 模拟输入框 -->
    <div
      class="input"
      :focused="focused"
      @click="click"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
    >
      <!-- placeholder -->
      <transition name="text" mode="out-in">
        <span class="placeholder" v-if="valueList.length===0" key="placeholder">{{placeholder}}</span>
        <!-- 单选时选中的文本 -->
        <span class="value" v-if="valueList.length>0&&!multiple" key="single">{{valueList[0].des}}</span>
        <!-- 多选时选中的文本 -->
        <span
          class="value multiple"
          v-if="valueList.length>0&&multiple"
          @click.stop="deleteOne"
          key="multiple"
        >
          {{valueList[0].des}}
          <i class="iconfont icon-delete" :number="valueList[0].id"></i>
        </span>
      </transition>
      <transition name="text">
        <!-- 超出一个时其余选中文本的数量 -->
        <span
          class="value multiple"
          v-if="valueList.length>1&&multiple"
        >{{"+"+(valueList.length-1)}}</span>
      </transition>
      <!-- 右侧的图标 -->
      <transition name="icon" mode="out-in">
        <i
          class="iconfont icon-down"
          v-if="!clicked&&(!this.hovered&&valueList.length>0||valueList.length===0)"
          key="down"
        ></i>
        <i
          class="iconfont icon-up"
          v-if="clicked&&(!this.hovered&&valueList.length>0||valueList.length===0)"
          key="up"
        ></i>
      </transition>
      <!--  -->
      <transition name="delete" mode="out-in">
        <i class="iconfont icon-shanchu" v-if="valueList.length>0&&this.hovered" @click="deleteAll"></i>
      </transition>
    </div>
    <!-- 下拉列表 -->
    <transition
      v-on:before-enter="beforeApproveEnter"
      v-on:enter="ApproveEnter"
      v-on:leave="Approveleave"
    >
      <div class="approve" v-if="clicked">
        <ul>
          <li
            v-for="(item) in optionList"
            :key="item.id"
            @click.stop="chose(item,$event)"
            :class="{chose:item.chose}"
            :chose="item.chose"
            :number="item.id"
            ref="select"
          >{{item.des}}</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
// 引入动画库
import Velocity from "velocity-animate";
export default {
  name: "vvSelect",
  props: {
    width: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      // 是否聚焦
      focused: false,
      // 是否被点击
      clicked: false,
      // 列表项
      optionList: [
        {
          id: 1,
          des: "大闸蟹",
          chose: false
        },
        {
          id: 2,
          des: "烤鸭",
          chose: false
        },
        {
          id: 3,
          des: "烤鸡腿",
          chose: false
        },
        {
          id: 4,
          des: "烧鹅",
          chose: false
        }
      ],
      // 被选中的值
      valueList: [],
      // 被选中的所有项的描述
      valueSelect: [],
      // 是否鼠标移到组件输入框上了
      hovered: false
    };
  },
  computed: {
    listHeight() {
      const number = this.optionList.length;
      const singleSelectHeight = this.$refs.select[0].offsetHeight;
      return number * singleSelectHeight + "px";
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        newVal.forEach(item1 => {
          // optionList也受传值的影响
          this.optionList.forEach((item2, index) => {
            if (item1 === item2.des) {
              this.$set(item2, "chose", true);
            }
          });
        });
      }
    },
    // 当前组件所有的数据的变换都依托于optionList
    optionList: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        let arr = [];
        newVal.forEach((item, index) => {
          if (item.chose) {
            arr.push(item);
          }
        });
        // valueList依赖optionList而产生
        this.valueList = arr;
      }
    },
    // valueList依赖optionList而产生
    valueList: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        let arr = [];
        newVal.forEach(item => {
          arr.push(item.des);
        });
        // valueSelect依赖valueList产生
        this.valueSelect = arr;
      }
    },
    // valueSelect一改变就去修改value的值
    valueSelect(newVal, oldVal) {
      this.$emit("input", newVal);
    }
  },
  methods: {
    blur() {
      this.focused = !this.focused;
      this.clicked = false;
    },
    click() {
      this.focused = !this.focused;
      this.clicked = !this.clicked;
    },
    chose(item, el) {
      const targetStatus = el.target.getAttribute("chose");
      const targetId = +el.target.getAttribute("number");
      if (targetStatus) {
        // 当前点击的是已经被勾选过的
        if (this.multiple) {
          //多选
          this.optionList.forEach((item, index) => {
            if (item.id === targetId) {
              this.$set(item, "chose", false);
            }
          });
        } else {
          //单选
          this.optionList.forEach((item, index) => {
            this.$set(item, "chose", false);
          });
        }
      } else {
        // 当前点击的未被勾选过
        if (this.multiple) {
          // 多选
          this.optionList.forEach((item, index) => {
            if (item.id === targetId) {
              this.$set(item, "chose", true);
            }
          });
        } else {
          // 单选
          this.optionList.forEach((item, index) => {
            this.$set(item, "chose", false);
            if (item.id === targetId) {
              this.$set(item, "chose", true);
            }
          });
        }
      }
    },
    mouseleave() {
      this.hovered = false;
    },
    mouseenter() {
      this.hovered = true;
    },
    deleteAll() {
      this.optionList.forEach((item, index) => {
        this.$set(item, "chose", false);
      });
    },
    deleteOne(el) {
      if (el.target.className.substr(0, 5) === "iconf") {
        const targetId = +el.target.getAttribute("number");
        // 事件被触发
        this.optionList.forEach((item, index) => {
          if (item.id === targetId) {
            this.$set(item, "chose", false);
          }
        });
      }
    },
    // 数组去重(不需要使用)
    unique(arr) {
      if (!Array.isArray(arr)) {
        console.log("type error!");
        return;
      }
      var array = [];
      for (var i = 0; i < arr.length; i++) {
        if (array.indexOf(arr[i]) === -1) {
          array.push(arr[i]);
        }
      }

      this.valueList = array;
    },
    // 下拉列表动画
    beforeApproveEnter(el) {
      el.style.height = 0 + "px";
      el.style.opacity = 0;
    },
    ApproveEnter(el, done) {
      Velocity(el, { height: this.listHeight, opacity: 1 }, { duration: 200 });
      Velocity(el, { complete: done });
    },
    Approveleave(el, done) {
      Velocity(el, { opacity: 0, height: 0 + "px" }, { duration: 200 });
      Velocity(el, { complete: done });
    }
  }
};
</script>
<style lang='stylus' scoped>
// 文本
.text-enter-active, .text-leave-active {
  transition: opacity 0.3s;
}

.text-enter, .text-leave-to {
  opacity: 0;
}

// 图标(只需要进场动画)
.icon-enter {
  transform: rotateX(90deg);
}

.icon-enter-active {
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: all 0.6s ease;
}

.icon-enter-to {
  transform: rotateX(0deg);
}

// 删除图标(只需要进场动画)
.delete-enter {
  transform: rotateZ(180deg);
}

.delete-enter-active {
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: all 0.5s ease;
}

.delete-enter-to {
  transform: rotateX(0deg);
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

// 选择器的样式
.select {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  outline: none;

  .iconfont {
    position: absolute;
    top: 0px;
    right: 5px;
  }

  .icon-shanchu:hover {
    color: #aaa;
  }

  // 选择框样式
  .input {
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    color: #ccc;

    .placeholder {
      color: #ccc;
    }

    .value {
      color: black;
    }

    .multiple {
      background-color: #ccc;
      position: relative;
      padding: 2px 10px;
      border-radius: 3px;

      .icon-delete {
        position: relative;
        font-size: 12px;
        top: 1px;
        right: 0px;

        &:hover {
          cursor: pointer;
        }
      }
    }

    &:hover {
      border: 1px solid #66a4ff;
    }

    &[focused] {
      outline: none;
      border: 1px solid #66a4ff;
      box-shadow: 0 0 5px #66a4ff;
    }
  }

  // 下拉框样式
  .approve {
    position: absolute;
    top: 45px;
    width: 100%;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 2px 2px 4px 4px #eee;

    ul {
      box-sizing: border-box;
      width: 100%;
      height: 100%;

      li {
        box-sizing: border-box;
        width: 100%;
        float: left;
        padding: 10px 20px;

        &:hover {
          background-color: #eee;
        }
      }

      .chose {
        color: #66a4ff;
        font-weight: bolder;
        background-color: #FAFAFA;
      }
    }
  }
}
</style>
