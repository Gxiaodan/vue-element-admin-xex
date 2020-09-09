<template>
  <div class="page">
    vue-draggable-resizable
    <div style="height: 500px; width: 500px; border: 1px solid red; position: relative;">
      <vue-draggable-resizable :w="100" :h="100" :snap="true" :snap-tolerance="20" :parent="true" @dragging="onDrag" @resizing="onResize" @refLineParams="getRefLineParams">
        <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
          X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
      </vue-draggable-resizable>
      <vue-draggable-resizable
        :w="200"
        :h="200"
        :parent="true"
        :debug="false"
        :min-width="200"
        :min-height="200"
        :is-conflict-check="true"
        :snap="true"
        :snap-tolerance="20"
        @refLineParams="getRefLineParams"
      />
      <span
        v-for="item in vLine"
        v-show="item.display"
        class="ref-line v-line"
        :style="{ left: item.position, top: item.origin, height: item.lineLength}"
      />
      <span
        v-for="item in hLine"
        v-show="item.display"
        class="ref-line h-line"
        :style="{ top: item.position, left: item.origin, width: item.lineLength}"
      />
    </div>
    <hr>
    <div class="has-line-box">
      <vue-draggable-resizable :snap="true" :snap-tolerance="20" @refLineParams="getRefLineParams" />
      <vue-draggable-resizable :snap="true" :snap-tolerance="20" @refLineParams="getRefLineParams" />
      <span
        v-for="item in vLine"
        v-show="item.display"
        class="ref-line v-line"
        :style="{ left: item.position, top: item.origin, height: item.lineLength}"
      />
      <span
        v-for="item in hLine"
        v-show="item.display"
        class="ref-line h-line"
        :style="{ top: item.position, left: item.origin, width: item.lineLength}"
      />
    </div>
  </div>
</template>

<script>
import vueDraggableResizable from 'vue-draggable-resizable-gorkys'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
export default {
  name: 'DragResize',
  components: {
    vueDraggableResizable
  },
  data() {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      vLine: [],
      hLine: []
    }
  },
  computed: {

  },
  mounted() {

  },
  created() {

  },
  methods: {
    onResize: function(x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag: function(x, y) {
      this.x = x
      this.y = y
    },
    getRefLineParams(params) {
      const { vLine, hLine } = params
      this.vLine = vLine
      this.hLine = hLine
    }
  }

}
</script>

<style scoped>
  .has-line-box{
    position: relative;
  }
</style>

