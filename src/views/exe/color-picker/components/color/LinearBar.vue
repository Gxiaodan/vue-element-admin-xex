<template>
  <div
    class="liner-bar"
    @mousedown.prevent.stop="selectSlider"
  >
    <div class="slider-bar" :style="{width: `${width}px`, height: `${height}px`, borderRadius: `${height/2}px`}" />
    <div
      v-for="(posX, index) in slidePosList"
      :key="index"
      :style="{left: `${posX -2 }px`}"
      :class="{'active': activeSlide == index}"
      class="slide"
    />
  </div>
</template>

<script>
export default {
  props: {
    hsv: {
      type: Object,
      default: null
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 7
    }
  },
  data() {
    return {
      slidePosList: [0],
      activeSlide: -1,
      resultList: [{ num: 0, pre: 0 }]
    }
  },
  mounted() {
  },
  methods: {
    slidePrecent(left) {
      let pre = 0
      pre = left / this.width
      if ((left + 10) / this.width == 1) {
        pre = 1
      }
      return pre
    },
    selectSlider(e) {
      const { left: hueLeft } = this.$el.getBoundingClientRect()
      this.activeSlide = -1
      const x = e.clientX - hueLeft
      this.slidePosList.forEach((item, i) => {
        if (x >= (item - 7) && x <= (item + 7)) {
          this.activeSlide = i
        }
      })
      if (this.activeSlide == -1) {
        this.activeSlide = this.slidePosList.length
        this.slidePosList.push(x)
      }
      const mousemove = e => {
        let x = e.clientX - hueLeft
        if (x < 0) {
          x = 0
        }
        if (x > this.width - 10) {
          x = this.width - 10
        }
        this.slidePosList.splice(this.activeSlide, 1, x)
      }

      mousemove(e)

      const mouseup = () => {
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
        this.resultList = this.slidePosList.map(item => {
          return {
            num: item,
            pre: this.slidePrecent(item)
          }
        })
        console.log(this.resultList, '=====')
      }

      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
    }
  }
}
</script>

<style lang="scss">
.liner-bar {
    position: relative;
    margin-top: 8px;
    cursor: pointer;
    .slider-bar{
        background: #ccc;
    }
    .slide {
        position: absolute;
        left: 100px;
        top: -2px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 1px solid #fff;
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.3);
        pointer-events: none;
        &.active{
            border: 2px solid #fff;
        }
    }
}
</style>
