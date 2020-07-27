<!--  echarts 近12月消费构成-->
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
        // 定义样式和数据
        //标题
        title: {
          text: "近12月消费构成",
          top: "0%",
          textStyle: { fontWeight: "normal" }
        },
        //背景颜色
        backgroundColor: "#fff",
        // 提示文本
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            shadowStyle: {
              color: "#DAE8F8",
              opacity: 0.5
            }
          },
          formatter: `
          <div style='height:8px;line-height:8px'>{a0}消费占比: {c0}%</div>
          <br /><div style='height:8px;line-height:8px'>{a1}消费占比: {c1}%</div>
          <br /><div style='height:8px;line-height:8px'>{a2}消费占比: {c2}%</div>
          <br /><div style='height:8px;line-height:8px'>{a3}消费占比: {c3}%</div>`,
          extraCssText: "border-radius:10px",
          position: "left",
          padding: [30, 30, 30, 30]
        },
        // 距离四边的距离
        grid: {
          top: "100px",
          left: "50px",
          right: "50px",
          bottom: "30px"
        },
        //实例文本
        legend: {
          type: "scroll",
          orient: "vertical",
          data: [
            {
              name: "该学生超市",
              icon: "roundRect",
              textStyle: {
                // 图例文字颜色
              }
            },
            {
              name: "该学生食堂",
              icon: "roundRect",
              textStyle: {
                // 图例文字颜色
              }
            },
            {
              name: "学生人均超市",
              icon: "roundRect",
              textStyle: {
                // 图例文字颜色
              }
            },
            {
              name: "学生人均食堂",
              icon: "roundRect",
              textStyle: {
                // 图例文字颜色
              }
            }
          ],
          right: "2%",
          itemGap: 25,
          borderRadius: 10
        },
        calculable: true,
        //x轴配置
        xAxis: [
          {
            axisLine: {
              lineStyle: {
                color: "#eee",
                type: "dashed"
              }
            },
            //是否显示刻度
            axisTick: {
              show: false
            },
            //坐标的字体颜色
            axisLabel: {
              textStyle: {
                color: "#aaa"
              }
            },
            type: "category",
            boundaryGap: true,
            data: (function() {
              var list = [];
              for (var i = 1; i <= 12; i++) {
                list.push(i + "月");
              }
              return list;
            })()
          }
        ],
        //y轴配置
        yAxis: [
          {
            name: "消费占比",
            nameGap: "20",
            min: "0",
            max: "100",
            splitNumber: "6",
            nameTextStyle: {
              color: "#aaa"
            },
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#eee",
                type: "dashed"
              }
            },
            //坐标的字体颜色
            axisLabel: {
              textStyle: {
                color: "#aaa"
              },
              show: true,
              interval: "auto",
              formatter: "{value}%"
            },
            //grid网格线
            splitLine: {
              //网格线
              lineStyle: {
                color: "#eee",
                type: "dashed" //设置网格线类型 dotted：虚线   solid:实线
              },
              show: true //隐藏或显示
            }
          }
        ],
        //系列表格数据
        series: [
          {
            name: "该学生食堂",
            stack: "总量",
            barWidth: "12",
            barGap: "20%" /*多个并排柱子设置柱子之间的间距*/,
            barCategoryGap: "50%" /*多个并排柱子设置柱子之间的间距*/,
            type: "bar",
            symbol: "none",
            color: ["#36DAB1"],
            // 数据
            data: [10, 20, 30, 20, 10, 15, 13, 14, 15, 12, 11, 10, 11, 10],
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          },
          {
            name: "该学生超市",
            type: "bar",
            stack: "总量",
            barWidth: "12",
            color: "#2197FC",
            // 拐角大小
            symbolSize: 4,
            data: [10, 20, 30, 20, 10, 15, 13, 14, 15, 12, 11, 10, 11, 10]
          },
          {
            name: "学生人均食堂",
            type: "bar",
            stack: "人均",
            barWidth: "12",
            color: "#AFF0E0",
            // 拐角大小
            symbolSize: 4,
            data: [40, 20, 10, 10, 10, 15, 4, 10, 15, 12, 11, 10, 11, 60]
          },
          {
            name: "学生人均超市",
            type: "bar",
            barWidth: "12",
            stack: "人均",
            color: "#A6D5FE",
            // 拐角大小
            symbolSize: 4,
            data: [4, 20, 10, 10, 10, 15, 40, 10, 15, 12, 11, 10, 11, 60]
          }
        ]
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