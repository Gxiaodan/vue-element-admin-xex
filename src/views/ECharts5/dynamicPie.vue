<template>
  <div>
    <p>echarts5</p>
    <!-- <v-chart▽ :options="option" style="width:100%; height:80%" :autoresize="true" /> -->
    <div id="main" style="width: 100%; height: 400px" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, onMounted } from '@vue/composition-api'
import * as echarts from 'echarts'

export default defineComponent({
  name: '',
  components: {},
  props: {
  },
  setup(props, { emit }) {
    var app = {}

    const legendArr = ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    var option

    option = {
      title: {
        text: '饼图程序调用高亮示例',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: legendArr,
        selected: { '直接访问': false, '邮件营销': false, '联盟广告': false, '视频广告': false, '搜索引擎': false }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    app.currentIndex = -1

    onMounted(() => {
      var chartDom = document.getElementById('main')
      var myChart = echarts.init(chartDom)
      setInterval(function() {
        var dataLen = option.series[0].data.length
        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        })
        app.currentIndex = (app.currentIndex + 1) % dataLen
        // 高亮当前图形
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        })
        // 显示 tooltip
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        })

        if (legendArr.length > app.currentIndex) {
          myChart.dispatchAction({
            type: 'legendSelect',
            // 图例名称
            name: legendArr[app.currentIndex]
          })
        }
      }, 1000)

      option && myChart.setOption(option)
    })
    return {
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
