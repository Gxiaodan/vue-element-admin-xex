
const value = 1 // >0
const symbolSize = [18, 18]
const symbolMargin = 5

const formatData = (data) => {
  const dataY = []; const dataX = []; const dataXbg = []
  for (let i = 0; i < data.length; i++) {
    dataY.push(data[i].x)
    dataX.push({
      value: data[i].y,
      symbol: 'image://' + require('@/assets/chart/' + data[i].image + '.png')
    })
    dataXbg.push({
      value: data[i].y,
      symbol: 'image://' + require('@/assets/chart/' + data[i].image_bg + '.png')
    })
  }
  return { dataX, dataY, dataXbg }
}

const options = (props, data) => {
  let resultData = {
    dataY: [], dataX: [], dataXbg: []
  }
  if (data && Array.isArray(data)) {
    resultData = formatData(data)
  }

  let textColor = '#70eaff'
  if (props) {
    if (props.color) {
      textColor = props.color
    }
  }
  const defaultOption = {
    // backgroundColor: "#2c343c",
    grid: {
      left: '0%',
      top: '5%',
      bottom: '10%',
      right: '25%',
      containLabel: true
    },
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [{
      type: 'category',
      inverse: false,
      data: resultData.dataY,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        margin: 10,
        textStyle: {
          color: textColor,
          fontSize: 11
        }
      }
    }],
    series: [
      {
        tooltip: {
          show: false
        },
        z: 4,
        type: 'pictorialBar',
        symbolSize,
        symbolMargin,
        symbolRepeat: 'fixed',
        data: resultData.dataXbg
      },
      {
        z: 6,
        type: 'pictorialBar',
        symbolSize,
        animation: true,
        symbolRepeat: 'fixed',
        symbolClip: true,
        symbolMargin,
        symbolPosition: 'start',
        symbolOffset: [0, 0],
        data: resultData.dataX,
        label: {
          normal: {
            show: true,
            textStyle: {
              color: textColor,
              fontSize: 11
            },
            position: 'right',
            offset: [20, 0]
          }
        }
      }
    ]
  }

  return defaultOption
}

export default options
