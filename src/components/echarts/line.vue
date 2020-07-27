<!--  echarts 近12月消费金额-->
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
          text: "近12月消费金额",
          top: "0%",
          textStyle: { fontWeight: "normal" }
        },

        //背景颜色
        backgroundColor: "#fff",
        // 提示文本
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              width: 2,
              color: "#2B7DEE"
            }
          },
          formatter: `
          <div style='height:8px;line-height:8px'>{a0}: {c0}</div>
          <br /><div style='height:8px;line-height:8px'>{a1}: {c1}</div>
          <br /><div style='height:8px;line-height:8px'>{a2}: {c2}</div>`,
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
          data: [
            {
              name: "该学生",
              icon: "roundRect",
              textStyle: {
                // 图例文字颜色
              }
            },
            {
              name: "学生人均",
              icon: "roundRect",
              textStyle: {
                // 图例文字颜色
              }
            },
            {
              name: "受助指数",
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
            boundaryGap: false,
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
            name: "消费金额（元）",
            nameGap: "20",
            min: "0",
            max: "500",
            splitNumber: "6",
            axisTick: {
              show: false
            },
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
              }
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
          },
          {
            name: "受助指数",
            nameGap: "20",
            min: "0",
            max: "100",
            splitNumber: "6",
            axisTick: {
              show: false
            },
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
              }
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
            name: "学生人均",
            barWidth: 8,
            barGap: "80%" /*多个并排柱子设置柱子之间的间距*/,
            barCategoryGap: "50%" /*多个并排柱子设置柱子之间的间距*/,
            type: "line",
            color: ["#2197FC"],
            // 区域渐变色
            areaStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#DCEFFF" // 0% 处的颜色
                  },
                  {
                    offset: 0.6,
                    color: "#fff" // 100% 处的颜色
                  }
                ]) //背景渐变色
              }
            },
            // 数据
            data: [300, 400, 330, 340, 300, 350, 300, 350, 360, 370]
          },
          {
            name: "该学生",
            barWidth: 8,
            barGap: "80%" /*多个并排柱子设置柱子之间的间距*/,
            barCategoryGap: "50%" /*多个并排柱子设置柱子之间的间距*/,
            type: "line",
            color: ["#13B8FF"],
            // 数据
            data: [200, 300, 200, 300, 250, 260, 250, 240, 220, 321, 320, 250],
            // 区域渐变色
            areaStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#C4EDFF" // 0% 处的颜色
                  },
                  {
                    offset: 0.6,
                    color: "#fff" // 100% 处的颜色
                  }
                ]) //背景渐变色
              }
            }
          },
          {
            name: "受助指数",
            barWidth: 8,
            yAxisIndex: 1,
            barGap: "80%" /*多个并排柱子设置柱子之间的间距*/,
            barCategoryGap: "50%" /*多个并排柱子设置柱子之间的间距*/,
            type: "line",
            color: ["#40DBB4"],
            // 区域渐变色
            areaStyle: {
              normal: {
                //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#9BECD8" // 0% 处的颜色
                  },
                  {
                    offset: 0.7,
                    color: "#fff" // 100% 处的颜色
                  }
                ]) //背景渐变色
              }
            },
            // 数据
            data: [30, 30, 20, 30, 30, 25, 30, 35, 40, 35, 40, 38, 35]
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