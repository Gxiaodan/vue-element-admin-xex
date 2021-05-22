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
import data from './line.json'

export default defineComponent({
  name: '',
  components: {},
  props: {
  },
  setup(props, { emit }) {
    function run(_rawData, myChart) {
      // var countries = ['Australia', 'Canada', 'China', 'Cuba', 'Finland', 'France', 'Germany', 'Iceland', 'India', 'Japan', 'North Korea', 'South Korea', 'New Zealand', 'Norway', 'Poland', 'Russia', 'Turkey', 'United Kingdom', 'United States'];
      var countries = ['Finland', 'France', 'Germany', 'Iceland', 'Norway', 'Poland', 'Russia', 'United Kingdom']
      var datasetWithFilters = []
      var seriesList = []
      echarts.util.each(countries, function(country) {
        var datasetId = 'dataset_' + country
        datasetWithFilters.push({
          id: datasetId,
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'Year', gte: 1950 },
                { dimension: 'Country', '=': country }
              ]
            }
          }
        })
        seriesList.push({
          type: 'line',
          datasetId: datasetId,
          showSymbol: false,
          name: country,
          endLabel: {
            show: true,
            formatter: function(params) {
              return params.value[3] + ': ' + params.value[0]
            }
          },
          labelLayout: {
            moveOverlap: 'shiftY'
          },
          emphasis: {
            focus: 'series'
          },
          encode: {
            x: 'Year',
            y: 'Income',
            label: ['Country', 'Income'],
            itemName: 'Year',
            tooltip: ['Income']
          }
        })
      })

      const option = {
        animationDuration: 10000,
        dataset: [{
          id: 'dataset_raw',
          source: _rawData
        }].concat(datasetWithFilters),
        title: {
          text: 'Income of Germany and France since 1950'
        },
        tooltip: {
          order: 'valueDesc',
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          nameLocation: 'middle'
        },
        yAxis: {
          name: 'Income'
        },
        grid: {
          right: 140
        },
        series: seriesList
      }

      myChart.setOption(option)
    }
    onMounted(() => {
      var chartDom = document.getElementById('main')
      var myChart = echarts.init(chartDom)
      const lineData = data
      run(lineData, myChart)
    })
    return {
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
