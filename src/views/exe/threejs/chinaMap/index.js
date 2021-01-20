import './index.less'

import ThreeMapLightBar from './ThreeMapLightBar.js'
import ThreeMap from './ThreeMap.js'
import { util } from './util'

// 打包的时候，此代码不载入
if (process.env.NODE_ENV === 'development') {
  import('./index.html')
}

const datas = [
  { name: '海南省', value: 60 },
  { name: '北京市', value: 100 },
  { name: '山东省', value: 80 },
  { name: '海南省', value: 100 },
  { name: '四川省', value: 100 },
  { name: '台湾', value: 70 },
  { name: '黑龙江省', value: 80 },
  { name: '湖北省', value: 70 },
  { name: '内蒙古自治区', value: 50 },
  { name: '西藏自治区', value: 50 },
  { name: '新疆维吾尔自治区', value: 63 },
  { name: '甘肃省', value: 63 },
  { name: '山西省', value: 83 },
  { name: '上海市', value: 73 },
  { name: '福建省', value: 63 },
  { name: '广东省', value: 53 },
  { name: '云南省', value: 43 },
  { name: '辽宁省', value: 63 },
  { name: '青海省', value: 90 }
]

const flyDatas = [
  { source: { name: '海南省' }, target: { name: '四川省' }, value: 100 },
  { source: { name: '北京市' }, target: { name: '四川省' }, value: 150 },
  { source: { name: '山东省' }, target: { name: '四川省' }, value: 120 },
  { source: { name: '台湾' }, target: { name: '四川省' }, value: 80 },
  { source: { name: '黑龙江省' }, target: { name: '四川省' }, value: 40 },
  { source: { name: '湖北省' }, target: { name: '四川省' }, value: 60 },
  { source: { name: '内蒙古自治区' }, target: { name: '四川省' }, value: 70 },
  { source: { name: '西藏自治区' }, target: { name: '四川省' }, value: 10 },
  { source: { name: '新疆维吾尔自治区' }, target: { name: '四川省' }, value: 200 },
  { source: { name: '青海省' }, target: { name: '四川省' }, value: 20 }
]

$.get('/assets/map/china.json', d => {
  const mapData = util.decode(d)
  const map = new ThreeMapLightBar({ mapData })

  map.on('mouseFn', (e, g, p) => {
    const type = e.type
    if (type == 'mousemove') {
      map.setLabelPos(g, 'mousemove', p)
      // map.setAreaColor(g);
    } else if (type == 'mouseup') {
      map.setAreaColor(g)
      map.setLabelPos(g, 'mouseup', p)
    }
  })

  // 绘制光柱
  map.drawLightBar(datas)

  // 绘制线条
  map.drawFlyLine(flyDatas)
})

console.log('ok~~~')
