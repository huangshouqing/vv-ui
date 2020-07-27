<template>
  <div>
    <div class="select" @click="change" tabindex="-1">
      <div :class="{selectDiv:true,selectDes:isChose}" v-show="!isShow">{{placeholder}}</div>
      <input
        ref="input"
        type="text"
        class="selectInput"
        :placeholder="placeholder"
        @input="search"
        v-if="isShow"
      />
      <div v-show="isShow" class="clearfix selectOptions">
        <div class="arrow-up"></div>
        <ul class="clearfix">
          <li
            v-for="(item,index) in optionList"
            :key="index"
            @click="choseOptions(item)"
            :class="{isChose:selectDes===item.des}"
          >{{item.des}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      placeholder: "请选择",
      // 值
      selectValue: "",
      //描述
      selectDes: "",
      // 列表项
      optionList: [
        {
          value: 1,
          des: "大闸蟹"
        },
        {
          value: 2,
          des: "烤鸭"
        },
        {
          value: 3,
          des: "烤鸭"
        },
        {
          value: 4,
          des: "烤鸭"
        },
        {
          value: 5,
          des: "烤鸭"
        },
        {
          value: 6,
          des: "烤鸭"
        },
        {
          value: 7,
          des: "烤鸭"
        }
      ],
      // 下拉列表是否展示
      isShow: false,
      // 是否选择了
      isChose: false,
      timeId: null
    };
  },
  watch: {},
  methods: {
    change() {
      this.isShow = !this.isShow;
      this.$nextTick(() => {
        if (this.isShow) {
          this.$refs.input.focus();
        }
      });
    },
    choseOptions(value) {
      this.placeholder = value.des;
      this.selectDes = value.des;
      this.selectValue = value.value;
      this.isChose = true;
    },
    //对input事件做限制
    search() {
      if (this.timeId) {
        clearInterval(this.timeId);
      }
      let id = setTimeout(() => {
        console.log("11");
      }, 200);
      this.timeId = id;
      this.optionList.forEach(item => {
        if (item.des === this.selectDes) {
          this.placeholder = item.des;
          this.selectDes = item.des;
          this.selectValue = item.value;
        }
      });
    }
  }
};
</script>
<style scoped>
/* 重置浏览器的滚动条样式 */

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

* {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}
.clearfix:before {
  display: block;
  content: "";
  clear: both;
  visibility: hidden;
  height: 0;
}
.clearfix:after {
  display: block;
  content: "";
  clear: both;
  visibility: hidden;
  height: 0;
}
.select {
  position: relative;
  width: 200px;
}
.selectInput {
  width: 100%;
  box-sizing: border-box;
  display: inline-block;
  padding: 10px 20px;
  outline-style: none;
  color: #aaa;
  font-size: 10px;
  border: 1px solid #ddd;
  border-radius: 2px;
}
.selectDiv {
  width: 100%;
  box-sizing: border-box;
  display: inline-block;
  padding: 9px 19px;
  color: #aaa;
  font-size: 10px;
  border: 1px solid #ddd;
  border-radius: 2px;
}
.selectDes {
  color: black;
}
.selectInput:hover {
  border: 1px solid #aaa;
}
.selectOptions {
  height: 200px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 50px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 5px 5px #eee;
  border-radius: 2px;
  padding: 5px 0px;
  overflow: auto;
  z-index: 999;
  background-color: #fff
}
.selectOptions ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.selectOptions ul li {
  box-sizing: border-box;
  width: 100%;
  float: left;
  padding: 10px 20px;
}
.selectOptions ul li:hover {
  background-color: #eee;
}
.isChose {
  color: blue;
}
.arrow-up {
  position: absolute;
  top: -5px;
  left: 20px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #fff;
}
/* .arrow-right {
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 20px solid green;
}
.arrow-down {
  width: 0;
  height: 0;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-top: 40px solid #ccc;
}
.arrow-left {
  width: 0;
  height: 0;
  border-top: 30px solid transparent;
  border-bottom: 30px solid transparent;
  border-right: 30px solid #00f;
} */
</style>