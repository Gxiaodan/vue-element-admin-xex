<template>
  <div>
    <div class="chart-container">
      <div v-for="(item, index) in [1,2,3,4,5,6,7,8,9]" :id="`canvas${item}`" :key="index" />
    </div>
  </div>
</template>

<script>
// import { Line,StepLine,PercentageStackArea, Column,Bar,Pie  } from '@antv/g2plot';
import * as g2Charts from '@antv/g2plot'
export default {
  name: 'AntVg2Plot',
  components: { },
  data() {
    return {
      data: [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 }
      ],
      data1: [
        { country: 'Asia', year: '1750', value: 502 },
        { country: 'Asia', year: '1800', value: 635 },
        { country: 'Europe', year: '1750', value: 163 },
        { country: 'Europe', year: '1800', value: 203 }
      ]

    }
  },
  mounted() {
    this.initChart()
  },
  created() {
  },
  methods: {
    initChart() {
      const linePlot = new g2Charts['Line']('canvas1', {
        title: {
          visible: true,
          text: '折线图'
        },
        data: this.data,
        xField: 'year',
        yField: 'value'
      })
      linePlot.render()

      const step = new g2Charts['StepLine'](document.getElementById('canvas2'), {
        title: {
          visible: true,
          text: '单阶梯折线的基础用法'
        },
        description: {
          visible: true,
          text: '最基础简单的阶梯图使用方式，显示一个指标的趋势和变化'
        },
        forceFit: true,
        data: this.data,
        padding: 'auto',
        xField: 'year',
        yField: 'value',
        xAxis: {
          type: 'dateTime',
          tickCount: 5
        }
      })
      step.render()

      const areaPlot = new g2Charts['PercentageStackArea'](document.getElementById('canvas3'), {
        title: {
          visible: true,
          text: '百分比堆叠面积图'
        },
        data: this.data1,
        meta: {
          year: {
            alias: '年份',
            range: [0, 1]
          },
          value: {
            alias: '数量',
            formatter: (v) => { return `${v}个` }
          }
        },
        xField: 'year',
        yField: 'value',
        stackField: 'country'
      })
      areaPlot.render()

      const columnPlot = new g2Charts['Column'](document.getElementById('canvas4'), {
        title: {
          visible: true,
          text: '基础柱状图'
        },
        forceFit: true,
        data: this.data,
        padding: 'auto',
        xField: 'year',
        yField: 'value',
        meta: {
          type: {
            alias: '类别'
          },
          sales: {
            alias: '销售额(万)'
          }
        }
      })

      columnPlot.render()

      const barPlot = new g2Charts['Bar'](document.getElementById('canvas5'), {
        title: {
          visible: true,
          text: '基础条形图'
        },
        forceFit: true,
        data: this.data,
        xField: 'year',
        yField: 'value',
        label: {
          visible: true,
          formatter: (v) => Math.round(v / 10000) + '万'
        }
      })

      barPlot.render()

      const piePlot = new g2Charts['Pie'](document.getElementById('canvas6'), {
        forceFit: true,
        title: {
          visible: true,
          text: '多色饼图'
        },
        description: {
          visible: true,
          text:
              '指定颜色映射字段(colorField)，饼图切片将根据该字段数据显示为不同的颜色。指定颜色需要将color配置为一个数组。\n当把饼图label的类型设置为inner时，标签会显示在切片内部。设置offset控制标签的偏移值。'
        },
        radius: 0.8,
        data: this.data,
        angleField: 'value',
        colorField: 'year',
        label: {
          visible: true,
          type: 'inner'
        }
      })

      piePlot.render()

      const rosePlot = new g2Charts['Rose'](document.getElementById('canvas7'), {
        forceFit: true,
        title: {
          visible: true,
          text: '多色玫瑰图'
        },
        description: {
          visible: true,
          text:
        '指定颜色映射字段(colorField)，饼图切片将根据该字段数据显示为不同的颜色。指定颜色需要将color配置为一个数组。\n当把饼图label的类型设置为inner时，标签会显示在切片内部。设置offset控制标签的偏移值。'
        },
        radius: 0.8,
        data: this.data,
        radiusField: 'value',
        categoryField: 'year',
        colorField: 'year',
        label: {
          visible: true,
          type: 'outer',
          content: (text) => text.value
        }
      })

      rosePlot.render()

      const scatterPlot = new g2Charts['Scatter'](document.getElementById('canvas8'), {
        data: this.data,
        xField: 'year',
        yField: 'value',
        xAxis: {
          visible: true,
          min: -5
        }
      })
      scatterPlot.render()
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 300px;
  height: 300px;
}
#canvas{
  width: 300px;
  height: 300px;
}
</style>

