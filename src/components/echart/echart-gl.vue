<template>
  <!-- <img class="bg" src="@/assets/gl/starfield.jpg" /> -->
  <div :id="id" class="echarts" :options="option" />
</template>
<script>
import echarts from 'echarts'
import Options from './index'
import 'echarts-gl'
export default {
  name: 'EchartGl',
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    option() {
      return Options.earth
    }
  },
  mounted() {
    const myChart = echarts.init(document.getElementById(this.id))
    myChart.setOption(this.option)
  }
}
</script>
<style lang="scss" scoped>
.echarts {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
