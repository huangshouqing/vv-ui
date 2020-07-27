<!--  echarts 近12月中餐消费金额及用餐次数-->
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
          text: "近12月中餐消费金额及用餐次数",
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
          <div style='height:8px;line-height:8px'>{a0}: {c0}</div>
          <br /><div style='height:8px;line-height:8px'>{a1}: {c1}</div>
          <br /><div style='height:8px;line-height:8px'>{a2}: {c2}</div>
          <br /><div style='height:8px;line-height:8px'>{a3}: {c3}</div>`,
          extraCssText: "border-radius:10px",
          position: "left",
          padding: [30, 30, 30, 30]
        },
        // 距离四边的距离
        grid: {
          top: "100px",
          left: "55px",
          right: "50px",
          bottom: "30px"
        },
        //实例文本
        legend: {
          data: [
            {
              name: "该学校中餐消费金额",
              icon: "roundRect",
              textStyle: {
                // 图例文字颜色
              }
            },
            {
              name: "学生人均中餐消费金额",
              icon: "roundRect",
              textStyle: {
                // 图例文字颜色
              }
            },
            {
              name: "该学生用餐次数",
              textStyle: {
                // 图例文字颜色
              }
            },
            {
              name: "学生人均用餐次数",
              textStyle: {
                // 图例文字颜色
              }
            }
          ],
          itemGap: 25,
          borderRadius: 10,
          right: "2%"
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
              for (var i = 1; i < 13; i++) {
                list.push(i);
              }
              return list;
            })()
          }
        ],
        //y轴配置
        yAxis: [
          {
            name: "中餐消费金额（元）",
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
            name: "用餐次数",
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
            name: "该学校中餐消费金额",
            barWidth: "12",
            barGap: "20%" /*多个并排柱子设置柱子之间的间距*/,
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
              // 正常情况下柱状图圆角
              normal: {
                color: "#2197FC"
              }
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          },
          {
            name: "学生人均中餐消费金额",
            barWidth: "12",
            barGap: "20%" /*多个并排柱子设置柱子之间的间距*/,
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
              // 正常情况下柱状图圆角
              normal: {
                color: "#A6D5FE"
              }
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          },
          {
            name: "学生人均用餐次数",
            yAxisIndex: 1,
            type: "line",
            color: "#3BDAB3",
            data: [1, 2, 2, 3, 4, 3, 2, 1, 1, 2, 2, 3]
          },
          {
            name: "该学生用餐次数",
            yAxisIndex: 1,
            type: "line",
            color: "#F9827E",
            // 拐角大小

            data: [2, 3, 3, 4, 5, 4, 3, 2, 2, 3, 3, 4]
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