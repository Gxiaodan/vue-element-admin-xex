import echarts from 'vue-echarts'
import { formatData } from './utils'

const options = (props, data) => {
  let resultData = {
    x: [],
    y: []
  }
  if (data && Array.isArray(data)) {
    resultData = formatData(data)
  }
  const defaultOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: 'rgba(0, 212, 222, 0.4)'
        }
      }
    },
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(0, 212, 222, 0.4)'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          fontSize: 12,
          color: 'rgba(256, 256, 256, 0.5)'
        }
      },
      data: resultData.x
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(0, 212, 222, 0.4)'
        }
      },
      axisLabel: {
        show: false,
        textStyle: {
          fontSize: 12,
          color: 'rgba(256, 256, 256, 0.5)'
        }
      },
      splitLine: {
        show: false
      }
    },
    series: [{
      name: '移动',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      showSymbol: false,
      lineStyle: {
        normal: {
          width: 2
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(0, 212, 222, 0.4)'
          }, {
            offset: 0.8,
            color: 'rgba(3, 42, 73, 0.1)'
          }], false),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        }
      },
      itemStyle: {
        normal: {
          color: 'rgba(3, 213, 223, 0.4)',
          borderColor: 'rgba(3, 213, 223, 0.4)',
          borderWidth: 2
        }
      },
      data: resultData.y
    }]
  }
  return defaultOption
}

export default options
