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
    var option

    var data = []
    for (let i = 0; i < 5; ++i) {
      data.push(Math.round(Math.random() * 200))
    }

    option = {
      xAxis: {
        max: 'dataMax'
      },
      yAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 2 // only the largest 3 bars will be displayed
      },
      series: [{
        realtimeSort: true,
        name: 'X',
        type: 'bar',
        data: data,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true
        }
      }],
      legend: {
        show: true
      },
      animationDuration: 0,
      animationDurationUpdate: 3000,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear'
    }

    function run(myChart) {
      var data = option.series[0].data
      for (var i = 0; i < data.length; ++i) {
        if (Math.random() > 0.9) {
          data[i] += Math.round(Math.random() * 2000)
        } else {
          data[i] += Math.round(Math.random() * 200)
        }
      }
      myChart.setOption(option)
    }

    onMounted(() => {
      var chartDom = document.getElementById('main')
      var myChart = echarts.init(chartDom)
      setTimeout(function() {
        run(myChart)
      }, 0)
      setInterval(function() {
        run(myChart)
      }, 3000)

      option && myChart.setOption(option)
    })
    return {
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
