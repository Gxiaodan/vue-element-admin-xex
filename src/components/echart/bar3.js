import echarts from 'vue-echarts'
import { formatData } from './utils'

const options = (props, data) => {
  let color = ['rgba(0,244,255,1)', 'rgba(0,77,167,1)']
  if (props.color && Array.isArray(props.color.default)) {
    color = props.color.default
  }

  const colorGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    offset: 0,
    color: color[0] // 0% 处的颜色
  }, {
    offset: 1,
    color: color[1] // 100% 处的颜色
  }], false)

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
        type: 'shadow'
      }
    },
    grid: {
      top: '10%',
      right: '18%',
      left: '10%',
      bottom: 70
    },
    xAxis: {
      type: 'category',
      data: resultData.x,
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.12)'
        }
      },
      axisLabel: {
        margin: 10,
        color: '#e2e9ff',
        textStyle: {
          fontSize: 10
        },
        rotate: -45
      }
    },
    yAxis: {
      axisLabel: {
        formatter: '{value}',
        color: '#e2e9ff',
        fontSize: 11
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.12)'
        }
      }
    },
    series: [{
      type: 'bar',
      data: resultData.y,
      barWidth: 13,
      itemStyle: {
        normal: {
          color: colorGradient,
          shadowColor: 'rgba(0,160,221,1)',
          shadowBlur: 4
        }
      },
      label: {
        show: false
      }
    }]
  }

  return defaultOption
}

export default options
