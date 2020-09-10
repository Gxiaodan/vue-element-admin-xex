<template>
  <div
    class="color-alpha"
    :style="{height: `${height}px`}"
    @mousedown.prevent.stop="selectAlpha"
  >
    <canvas ref="canvasAlpha" />
    <div
      :style="slideAlphaStyle"
      class="alpha-slide"
    />
  </div>
</template>

<script>
import mixin from './mixin'
export default {
  mixins: [mixin],
  props: {
    color: {
      type: String,
      default: '#000000'
    },
    rgba: {
      type: Object,
      default: null
    },
    width: {
      type: Number,
      default: 152
    },
    height: {
      type: Number,
      default: 15
    }
  },
  data() {
    return {
      slideAlphaStyle: {},
      alphaSize: 5
    }
  },
  watch: {
    color() {
      this.renderColor()
    },
    'rgba.a'() {
      this.renderSlide()
    }
  },
  mounted() {
    this.renderColor()
    this.renderSlide()
  },
  methods: {
    renderColor() {
      const canvas = this.$refs.canvasAlpha
      const width = this.width
      const height = this.height
      const size = this.alphaSize
      const canvasSquare = this.createAlphaSquare(size)

      const ctx = canvas.getContext('2d')
      canvas.width = width
      canvas.height = height

      ctx.fillStyle = ctx.createPattern(canvasSquare, 'repeat')
      ctx.fillRect(0, 0, width, height)

      this.createLinearGradient('l', ctx, width, height, 'rgba(255,255,255,0)', this.color)
    },
    renderSlide() {
      this.slideAlphaStyle = {
        left: this.rgba.a * this.width - 2 + 'px'
      }
    },
    selectAlpha(e) {
      const { left: hueLeft } = this.$el.getBoundingClientRect()

      const mousemove = e => {
        let x = e.clientX - hueLeft

        if (x < 0) {
          x = 0
        }
        if (x > this.width) {
          x = this.width
        }

        const a = parseFloat((x / this.width).toFixed(2))
        this.$emit('selectAlpha', a)
      }

      mousemove(e)

      const mouseup = () => {
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      }

      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
    }
  }
}
</script>

<style lang="scss">
.color-alpha {
    position: relative;
    margin-top: 8px;
    cursor: pointer;
    .alpha-slide {
        position: absolute;
        top: 0;
        left: 100px;
        width: 4px;
        height: 100%;
        background: #fff;
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.3);
        pointer-events: none;
    }
}
</style>
