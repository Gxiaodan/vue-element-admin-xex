<template>
  <v-chart :ref="id" :options="option" :autoresize="true" />
</template>
<script>
import chartsOption from './index'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/graphic'
import 'echarts/lib/component/grid'
export default {
  name: 'Echart',
  components: {
    'v-chart': ECharts
  },
  props: {
    // width: {
    //   type: String,
    //   default: '200px'
    // },
    // height: {
    //   type: String,
    //   default: '200px'
    // },
    type: {
      required: true,
      type: String
    },
    id: {
      required: true,
      type: String
    },
    data: {
      required: false
    },
    color: {
      required: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
    option() {
      const data = this.data || {}
      return this.type ? chartsOption[this.type]({ color: this.color }, data) : {}
    }
  },
  watch: {
    // resize(n, o) {
    //   let ref = this.$refs[this.id]
    //   ref.resize()
    // },
    // width: {
    //   handler(n,o) {
    //     console.log('width=='+this.width+ ';;height==' + this.height)
    //     this.width = n;
    //     this.$nextTick(()=>{
    //       let ref = this.$refs[this.id]
    //       ref.resize()
    //     })
    //   },
    //   immediate: true
    // }
  },
  created() {}

}
</script>
<style lang="scss" scoped>

</style>
