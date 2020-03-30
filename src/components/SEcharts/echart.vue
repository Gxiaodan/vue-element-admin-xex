<template>
  <div>
    <!-- <el-button @click="edit" :size="'small'">edit</el-button> -->
    <div :id="id" :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from './utils/resize'
import chartsOption from './index'

export default {
  name: 'SEchart',
  mixins: [resize],
  props: {
    type: {
      required: true,
      type: String,
      default: 'bar1'
    },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      chartsOption
    }
  },
  watch: {
    width: {
      handler(n, o) {
        console.log('width==' + this.width + ';;height==' + this.height)
        this.width = n
        // if (this.chart){
        this.$nextTick(() => {
          this.chart.resize()
        })
        // }
      },
      immediate: true
    }

  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    edit() {
      this.$emit('editAction', true)
      console.log(this.chart, 'editAction')
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.chartsOption[this.type])
    }
  }
}
</script>
