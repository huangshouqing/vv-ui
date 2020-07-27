<!--  echarts pie图-->
<template>
  <div class="lastMonthConsume">
    <div ref="line" :style="{width: width, height: height}"></div>
  </div>
</template>

<script>
import echarts from "echarts";

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
        title : {
        text: '同名数量统计',
        subtext: '纯属虚构',
        x:'left',
        y:'center'
    },
        color: [
          "#F9796C",
          "#00E7C0",
          "#3B82F4",
          "#2197FC",
          "#73BEFF",
          "#FFC820"
        ],
        dataset: {
          source: [
            ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
            [10, 20, 30, 40, 40]
          ]
        },
        // 距离四边的距离
        grid: {
          top: "100px",
          left: "50px",
          right: "50px",
          bottom: "30px"
        },
        xAxis: {
          axisLine: {
            show: false
          }
        },
        yAxis: {
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: "show",
            type: "pie",
            radius: ["35%", "60%"],
            seriesLayoutBy: "row",
            label: {
              normal: {
                show: true,
                position: "outside",
                color: "#000000",
                formatter: "{c}%"
              }
            },
          
          }
        ],
     
        graphic: {
          type: "text",
          left: "center",
          top: "54%",
          style: {
            text: "5年",
            textAlign: "center",
            fill: "#000",
            width: 30,
            fontSize: 18
            // height:60
          }
        }
      };

      this.echarts.setOption(option);
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