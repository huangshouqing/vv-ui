<!--  echarts 销售金额及次数图-->
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
    // 绘制图表
    drawLine() {
      console.log("11");
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.line);
      this.echarts = myChart;
      // 绘制图表
      let option = {
        // 定义样式和数据
        //标题
        title: {
          text: "上月食堂消费金额及次数",
          top: "0%",
          textStyle: { fontWeight: "normal" }
        },
        //背景颜色
        backgroundColor: "#fff",
        // 提示文本
        tooltip: {
          trigger: "axis"
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
              name: "消费金额",
              icon: "roundRect",
              textStyle: {
                // 图例文字颜色
              }
            },
            {
              name: "消费次数",
              icon: "roundRect",
              textStyle: {
                // 图例文字颜色
              }
            }
          ],
          right: "2%"
        },
        calculable: true,
        //x轴配置
        xAxis: [
          {
            // axisTick: {length:10},
            // axisLabel: {
            //     interval: 30
            // },
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
              for (var i = 1; i < 30; i++) {
                list.push(i);
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
            name: "消费次数",
            nameGap: "20",
            min: "0",
            max: "5",
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
              }
            },
            //grid网格线
            splitLine: {
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
            name: "消费金额",
            barWidth: 8,
            barGap: "80%" /*多个并排柱子设置柱子之间的间距*/,
            barCategoryGap: "50%" /*多个并排柱子设置柱子之间的间距*/,
            type: "bar",
            symbol: "none",
            color: ["#1E9AFC"],
            // 数据
            data: [
              50,
              60,
              40,
              60,
              70,
              70,
              50,
              60,
              50,
              60,
              40,
              60,
              70,
              70,
              50,
              60,
              50,
              60,
              40,
              60,
              70,
              70,
              50,
              60
            ],
            itemStyle: {
              //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
              emphasis: {
                barBorderRadius: 30,
                label: {
                  show: true, //是否展示
                  textStyle: {
                    fontWeight: "bolder",
                    fontSize: "12",
                    fontFamily: "微软雅黑"
                  }
                }
              },
              // 正常情况下柱状图圆角
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [10, 10, 10, 10],
                color: new echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: "#00B3FF" // 0% 处的颜色
                    },
                    {
                      offset: 0.5,
                      color: "#2097FC" // 50% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#417CF9" // 100% 处的颜色
                    }
                  ],
                  false
                )
              }
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          },
          {
            name: "消费次数",
            yAxisIndex: 1,
            type: "line",
            color: "#F39F13",
            // 拐角大小
            symbolSize: 4,
            data: [
              1,
              2,
              2,
              3,
              4,
              3,
              2,
              1,
              1,
              2,
              2,
              3,
              4,
              3,
              2,
              1,
              1,
              2,
              2,
              3,
              4,
              3,
              2,
              1
            ]
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