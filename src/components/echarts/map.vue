<!--  echarts 地图-->
<template>
  <div class="lastMonthConsume">
    <div ref="line" :style="{width: width, height: height}"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import "../../../node_modules/echarts/map/js/china.js"; // 引入中国地图数据

export default {
  name: "hello",
  data() {
    return {
      width: "100%",
      height: "100%",
      echarts: ""
    };
  },
  mounted() {
    this.drawLine();
    window.addEventListener("resize", this.resize);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.line);
      this.echarts = myChart;
      // 绘制图表
      let option = {
        backgroundColor: "#fff", //背景颜色
        title: {
          text: "全国主要城市空气质量",
          x: "center"
        },
        legend: {
          //图例组件。
          orient: "vertical",
          y: "bottom",
          x: "right",
          data: ["pm2.5"],
          textStyle: {
            color: "#fff"
          }
        },
        //是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
        visualMap: {
          min: 0, //最小值
          max: 600, //最大值
          calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
          inRange: {
            color: ["#4cb0dd", "#2d79ad", "#265da0"] //颜色
          },
          textStyle: {
            color: "#fff"
          }
        },
        // 提示框，鼠标移入
        tooltip: {
          show: true, //鼠标移入是否触发数据
          trigger: "item", //出发方式
          formatter: "{b}-销售数量：{c}"
        },
        //配置地图的数据，并且显示
        series: [
          {
            name: "地图",
            type: "map", //地图种类
            map: "china", //地图类型。
            data: [
              { name: "北京", value: Math.round(Math.random() * 500) },
              { name: "天津", value: Math.round(Math.random() * 500) },
              { name: "上海", value: Math.round(Math.random() * 500) },
              { name: "重庆", value: Math.round(Math.random() * 500) },
              { name: "河北", value: Math.round(Math.random() * 500) },
              { name: "河南", value: Math.round(Math.random() * 500) },
              { name: "云南", value: Math.round(Math.random() * 500) },
              { name: "辽宁", value: Math.round(Math.random() * 500) },
              { name: "黑龙江", value: Math.round(Math.random() * 500) },
              { name: "湖南", value: Math.round(Math.random() * 500) },
              { name: "安徽", value: Math.round(Math.random() * 500) },
              { name: "山东", value: Math.round(Math.random() * 500) },
              { name: "新疆", value: Math.round(Math.random() * 500) },
              { name: "江苏", value: Math.round(Math.random() * 500) },
              { name: "浙江", value: Math.round(Math.random() * 500) },
              { name: "江西", value: Math.round(Math.random() * 500) },
              { name: "湖北", value: Math.round(Math.random() * 500) },
              { name: "广西", value: Math.round(Math.random() * 500) },
              { name: "甘肃", value: Math.round(Math.random() * 500) },
              { name: "山西", value: Math.round(Math.random() * 500) },
              { name: "内蒙古", value: Math.round(Math.random() * 500) },
              { name: "陕西", value: Math.round(Math.random() * 500) },
              { name: "吉林", value: Math.round(Math.random() * 500) },
              { name: "福建", value: Math.round(Math.random() * 500) },
              { name: "贵州", value: Math.round(Math.random() * 500) },
              { name: "广东", value: Math.round(Math.random() * 500) },
              { name: "青海", value: Math.round(Math.random() * 500) },
              { name: "西藏", value: Math.round(Math.random() * 500) },
              { name: "四川", value: Math.round(Math.random() * 500) },
              { name: "宁夏", value: Math.round(Math.random() * 500) },
              { name: "海南", value: Math.round(Math.random() * 500) },
              { name: "台湾", value: Math.round(Math.random() * 500) },
              { name: "香港", value: Math.round(Math.random() * 500) },
              { name: "澳门", value: Math.round(Math.random() * 500) },
              { name: "南海诸岛", value: Math.round(Math.random() * 500) }
            ],
            itemStyle: {
              //地图区域的多边形 图形样式。
              emphasis: {
                //高亮状态下的样试
                label: {
                  show: true
                }
              }
            },
            zoom: 1, //放大比例
            label: {
              //图形上的文本标签，可用于说明图形的一些数据信息
              show: true
            }
          },
          {
            type: "scatter",
            showEffectOn: "render", //配置什么时候显示特效
            coordinateSystem: "geo", //该系列使用的坐标系
            symbolSize: 10, //标记的大小
            data: [{ name: "宜昌", value: [111.3, 30.7, 130] }],
            zlevel: 99999
          }
        ]
      };

      this.echarts.setOption(option);
      //点击事件,根据点击某个省份计算出这个省份的数据
      this.echarts.on("click", function(params) {
        console.log(params.name);
        //逻辑控制
      });
    },
    // 自适应
    resize() {
      this.echarts.resize();
    }
  }
};
</script>
<style lang='stylus' scoped>
.lastMonthConsume {
  height: 100%;
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
}
</style>
