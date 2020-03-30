const image = {
  man: require('@/assets/chart/man.png'),
  woman: require('@/assets/chart/woman.png'),
  couple: require('@/assets/chart/couple.png')
}

const formatData = (scaleData) => {
  const data = []
  scaleData.forEach(item => {
    data.push(
      {
        name: item.x,
        value: item.y
      },
      {
        value: 2,
        name: '',
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 0
          }
        }
      }
    )
  })
  return data
}

const options = (props, data) => {
  let dataF = []
  if (data && Array.isArray(data)) {
    dataF = formatData(data)
  }
  const option = {
    color: ['#e2688d', '#5ff8fe'],
    legend: {
      data: [{
        name: '女生',
        icon: 'image://' + image.woman
      }, {
        name: '男生',
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
    graphic: {
      elements: [{
        type: 'image',
        z: 3,
        style: {
          image: image.couple,
          width: 45,
          height: 45
        },
        left: 'center',
        top: 'middle'
      }]
    },
    series: [
      {
        type: 'pie',
        data: dataF,
        label: {
          show: false
        },
        center: ['50%', '50%'],
        radius: ['43%', '62%'],
        animation: true
      }
    ]
  }
  if (!props) return option

  if (props.graphicWidth) {
    option.graphic.elements[0].style.width = props.graphicWidth
  }
  if (props.graphicHeight) {
    option.graphic.elements[0].style.height = props.graphicHeight
  }

  return option
}

export default options
