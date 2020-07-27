<!-- 
组件所需属性
type:input类型
placeholder：提示文本
width：input宽度
v-model value 封装的input也可以用双向数据绑定
 -->
<template>
  <div class="input">
    <textarea
      cols="30"
      rows="10"
      @focus="change"
      @blur="change"
      @input="input"
      v-if="type==='textarea'"
      class="textarea"
      placeholder="请输入"
      :focused="focused"
      :style="{width:width}"
      :value="value"
    ></textarea>

    <input
      class="text"
      v-else
      :type="type"
      @focus="change"
      @blur="change"
      @input="input"
      :focused="focused"
      :placeholder="placeholder"
      :style="{width:width}"
      :value="value"
    />
    <span class="notice" v-if="type==='textarea'">{{number}}/50</span>
    <span class="icon-right" v-else @click="search">
      <slot name="right"></slot>
    </span>
  </div>
</template>

<script>
export default {
  name:'vvInput',
  props: {
    //类型
    type: {
      type: String,
      default: "text"
    },
    //
    placeholder: "",
    //宽度
    width: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      focused: false,
      text: ""
    };
  },
  methods: {
    change() {
      this.focused = !this.focused;
    },
    input() {
      this.$emit("input", event.target.value);
    },
    search() {
      this.$emit("search");
    }
  },
  computed: {
    number() {
      return this.value.trim().length;
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal.trim().length >= 50) {
        this.$emit("input", newVal.substr(0, 50));
      }
    }
  }
};
</script>
<style lang='stylus' scoped>
::-webkit-scrollbar {
  width: 0rem;
  height: 0.5rem;
  background: hsla(0, 0%, 100%, 0.6);
}

::-webkit-scrollbar-track {
  border-radius: 0;
}

::-webkit-scrollbar-thumb {
  border-radius: 0;
  background-color: rgba(95, 95, 95, 0.4);
  transition: all 0.2s;
  border-radius: 0.5rem;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(95, 95, 95, 0.7);
}

.input {
  position: relative;
  display: inline-block;

  .notice {
    position: absolute;
    bottom: 10px;
    left: 10px;
    font-size: 12px;
    color: #ccc;
  }

  .icon-right {
    position: absolute;
    right: 10px;
    top: 5px;
  }

  .textarea {
    min-height: 100px;
    height: 100px;
    min-width: 200px;
    font-size: 12px;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 10px 10px;

    &:hover {
      border: 1px solid #66a4ff;
    }

    // 修改
    &[focused] {
      border: 1px solid #66a4ff;
      outline: none;
      box-shadow: 0 0 5px #66a4ff;

      &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color: #eee;
      }

      &::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #eee;
      }

      &::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #eee;
      }

      &::-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #eee;
      }
    }

    &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
      color: #ccc;
    }

    &::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #ccc;
    }

    &::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #ccc;
    }

    &::-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #ccc;
    }
  }

  .text {
    display: inline-block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid #ccc;

    // 修改input框被hover时的样式
    &:hover {
      border: 1px solid #66a4ff;
    }

    // 修改
    &[focused] {
      border: 1px solid #66a4ff;
      outline: none;
      box-shadow: 0 0 5px #66a4ff;

      &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color: #eee;
      }

      &::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #eee;
      }

      &::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #eee;
      }

      &::-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #eee;
      }
    }

    &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
      color: #ccc;
    }

    &::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #ccc;
    }

    &::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #ccc;
    }

    &::-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #ccc;
    }
  }
}
</style>