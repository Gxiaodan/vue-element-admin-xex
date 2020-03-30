import echarts from 'vue-echarts'
import { formatData } from './utils'

const options = (props, data) => {
  let resultData = {
    x: [],
    y: [],
    s: []
  }
  if (data && Array.isArray(data)) {
    resultData = formatData(data, 3)
  }

  const defaultOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#57617B'
        }
      }
    },
    legend: {
      icon: 'rect',
      itemWidth: 14,
      itemHeight: 5,
      itemGap: 25,
      data: resultData.s,
      textStyle: {
        fontSize: 12,
        color: '#F1F1F3'
      },
      bottom: 0
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
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          fontSize: 12,
          color: '#fff'
        }
      },
      data: resultData.x
    },
    yAxis: [{
      type: 'value',
      name: '单位（%）',
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        margin: 10,
        textStyle: {
          fontSize: 12,
          color: '#fff'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#57617B'
        }
      }
    }],
    series: [{
      name: resultData.s[0],
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
            color: 'rgba(137, 189, 27, 0.3)'
          }, {
            offset: 0.8,
            color: 'rgba(137, 189, 27, 0)'
          }], false),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        }
      },
      itemStyle: {
        normal: {
          color: 'rgb(137,189,27)',
          borderColor: 'rgba(137,189,2,0.27)',
          borderWidth: 12
        }
      },
      data: resultData.y[0]
    }, {
      name: resultData.s[1],
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
            color: 'rgba(0, 136, 212, 0.3)'
          }, {
            offset: 0.8,
            color: 'rgba(0, 136, 212, 0)'
          }], false),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        }
      },
      itemStyle: {
        normal: {
          color: 'rgb(0,136,212)',
          borderColor: 'rgba(0,136,212,0.2)',
          borderWidth: 12
        }
      },
      data: resultData.y[1]
    }, {
      name: resultData.s[2],
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
            color: 'rgba(219, 50, 51, 0.3)'
          }, {
            offset: 0.8,
            color: 'rgba(219, 50, 51, 0)'
          }], false),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        }
      },
      itemStyle: {
        normal: {
          color: 'rgb(219,50,51)',
          borderColor: 'rgba(219,50,51,0.2)',
          borderWidth: 12
        }
      },
      data: resultData.y[2]
    }]
  }

  return defaultOption
}

export default options
