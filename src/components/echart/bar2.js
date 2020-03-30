import { formatData } from './utils'

const image = {
  man: require('@/assets/chart/man.png'),
  woman: require('@/assets/chart/woman.png')
}

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
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    color: ['#e2688d', '#5ff8fe'],
    legend: {
      data: [{
        name: resultData.s[0],
        icon: 'image://' + image.woman
      }, {
        name: resultData.s[1],
        icon: 'image://' + image.man
      }],
      selectedMode: false,
      textStyle: {
        color: 'transparent'
      },
      itemWidth: 13,
      itemHeight: 20,
      itemGap: 0,
      top: 'bottom',
      left: 'center'
    },
    grid: {
      top: '15%',
      left: '1%',
      right: '1%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [
      {
        show: false,
        type: 'value'
      }
    ],
    yAxis: [
      {
        type: 'category',
        position: 'right',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          margin: 10,
          textStyle: {
            color: '#70eaff',
            fontSize: 11
          }
        },
        data: resultData.x
      }
    ],
    series: [
      {
        name: resultData.s[0],
        type: 'bar',
        stack: '总量',
        label: {
          show: false
        },
        data: resultData.y[0].map(item => -item)
      },
      {
        name: resultData.s[1],
        type: 'bar',
        stack: '总量',
        barWidth: 12,
        label: {
          show: false
        },
        data: resultData.y[1]
      }
    ]
  }
  return defaultOption
}

export default options
