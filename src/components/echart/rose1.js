const bg = require('@/assets/chart/rose1_bg.png')
const formatData = (data) => {
  return data.map(item => {
    return {
      value: item.y, name: item.x
    }
  }).sort(function(a, b) { return a.value - b.value })
}
const options = (props, data) => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    graphic: {
      elements: [{
        type: 'image',
        z: 3,
        style: {
          image: bg,
          width: 250,
          height: 250
        },
        bounding: 'all',
        left: 'center',
        top: 'middle'
        // position: [120, 120]
      }]
    },
    series: [
      {
        color: [
          'rgba(22, 158, 214, .8)',
          'rgba(4, 201, 216, .8)',
          'rgba(22, 158, 214, .8)',
          'rgba(23, 211, 176, .8)',
          'rgba(191, 117, 121, .8)',
          'rgba(192, 87, 120, .8)',
          'rgba(175, 134, 175, .8)'
        ],
        name: '面积模式',
        type: 'pie',
        radius: '60%',
        center: ['50%', '50%'],
        roseType: 'radius',
        label: {
          formatter: '{b} ({d}%)',
          color: '#70eaff'
        },
        labelLine: {
          length: 10,
          length2: 10,
          lineStyle: {
            color: 'rgba(93, 193, 216, .6)'
          }
        },
        data: formatData(data)
      }
    ]
  }
}

export default options
