<template>
  <div class="page">
    <a
      v-for="(btn, i) in item.children"
      :key="i"
      :title="btn.name"
      :draggable="btn.data"
      @dragstart="onDrag($event, btn)"
    >
      <i :class="`iconfont ${btn.icon}`" />
    </a>
    <hr>
    拓扑图练习
    <div class="tools" />
    <div id="topology-canvas" class="full" />
    <div class="props" />
  </div>
</template>

<script>
// 1. 导入绘画引擎
import { Topology } from '@topology/core'
// 图形库
import { register as registerFlow } from '@topology/flow-diagram'
import { register as registerActivity } from '@topology/activity-diagram'
import { register as registerClass } from '@topology/class-diagram'
import { register as registerSequence } from '@topology/sequence-diagram'
import { register as registerChart } from '@topology/chart-diagram'

export default {
  name: 'Topology',
  components: {

  },
  data() {
    return {
		  // 左侧工具栏
      // tools: Tools,
      // 图形库
      canvas: {},
      // 图形库选项：https://www.yuque.com/alsmile/topology/canvas#hOupV
      canvasOptions: {
        rotateCursor: '/img/rotate.cur'
      },
      // 右侧属性栏数据
      props: {
        node: null,
        line: null,
        multi: false
      }
    }
  },
  computed: {

  },
  mounted() {
    this.canvasOptions.on = this.onMessage
    this.canvas = new Topology('topology-canvas', this.canvasOptions)
  },
  created() {
    // 注册图形库
    registerFlow()
    registerActivity()
    registerClass()
    registerSequence()
    registerChart()
  },
  methods: {
    onDrag(event, node) {
      event.dataTransfer.setData('Text', JSON.stringify(node.data))
    }
  }

}
</script>

<style scoped>

</style>

