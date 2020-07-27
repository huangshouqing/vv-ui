'<template>
  <div>
    <div class="inputNumber clearfix">
      <div @click="reduce" class="reduce">
        <a href="javascript:">-</a>
      </div>

      <div>{{number}}</div>

      <div @click="add" class="add">
        <a href="javascript:">+</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 数目
      number: 0,
      // 限制最大数
      limit: 100
    };
  },
  methods: {
    reduce() {
      if (this.number >= 1) {
        this.number--;
      }
    },
    add() {
      if (this.number >= this.limit) {
        return;
      }
      this.number++;
    }
  }
};
</script>
<style lang="" scoped
>
a {
  text-decoration: none;
  color: #aaa;
}
a:hover {
  color: #66a4ff;
}
.clearfix:before {
  display: block;
  content: "";
  clear: both;
  visibility: hidden;
  height: 0;
}
.inputNumber {
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid#ccc;
  border-radius: 4px 4px 4px 4px;
}
.inputNumber:hover {
  border: 1px solid #66a4ff;
}
.inputNumber div {
  float: left;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  font-size: 12px;
}
.inputNumber div:hover {
  color: #66a4ff;
}
.inputNumber div:first-child {
  border-radius: 4px 0px 0px 4px;
}
.inputNumber div:last-child {
  border-radius: 0px 4px 4px 0px;
}
.inputNumber div:nth-child(2) {
  width: 80px;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 0px;
  font-size: 12px;
  text-align: center;
  border-left: 1px solid #aaa;
  border-right: 1px solid #aaa;
}
.reduce {
  background-color: #ccc;
}
.add {
  background-color: #ccc;
}
</style>'