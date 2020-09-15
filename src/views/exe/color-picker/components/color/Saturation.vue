<template>
  <div class="saturation-con">
    <div class="tool-con" :class="activeType == 'liner'? 'liner' : ''">
      <span
        v-for="(type, index) in colorType"
        :key="index"
        :class="[{'active': activeType == type}, type + '-span']"
        :style="type == 'liner'? linerBgStyle : ''"
        class="color-span"
        @click="chooseColorType(type)"
      />
      <div v-if="activeType == 'liner'" class="direction-box">
        <span class="name">角度</span>
        <input v-model="degValue" class="value">
        <span class="unit">deg</span>
      </div>
      <div
        v-if="activeType == 'liner'"
        class="liner-bar"
        @mousedown.prevent.stop="selectSlider"
      >
        <div
          class="slider-bar"
          :style="{width: `${width}px`, height: `${height}px`,
                   borderRadius: `${height/2}px`, background: `linear-gradient(90deg, ${sliderBarBgColor})`}"
        />
        <div
          v-for="(posX, index) in slidePosList"
          :key="`${index}`"
          :style="{left: `${posX -2 }px`}"
          :class="{'active': activeSlide == index}"
          class="slide"
        />
        <!-- <div
          v-for="(posX, index) in slidePosList"
          :key="`${index}_num`"
          :style="{left: `${posX -2 }px`}"
          class="slide-number"
        >{{Number.parseInt(linerColorList[index].per * 100) + '%'}}</div> -->
      </div>
    </div>
    <div
      ref="saturation"
      class="saturation"
      @mousedown.prevent.stop="selectSaturation"
    >
      <canvas ref="canvasSaturation" />
      <div
        :style="slideSaturationStyle"
        class="slide"
      />
    </div>
  </div>
</template>

<script>
import mixin from './mixin'
import { deepClone } from '@/utils/index.js'
export default {
  components: {

  },
  mixins: [mixin],
  props: {
    color: {
      type: String,
      default: '#000000'
    },
    hsv: {
      type: Object,
      default: null
    },
    rgba: {
      type: Object,
      default: null
    },
    size: {
      type: Number,
      default: 200
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 7
    },
    colorObj: {
      type: Object,
      required: false,
      default: () => {
        return {
          type: 'single',
          angle: 0,
          colorList: []
        }
      }
    }
  },
  data() {
    return {
      slideSaturationStyle: {},
      colorType: ['single', 'liner'],
      activeType: 'single',
      degValue: 180,
      slidePosList: [0],
      activeSlide: 0,
      linerColorList: [{ per: 0, color: '' }],
      curColor: `rgba(${this.rgba.r}, ${this.rgba.g}, ${this.rgba.b}, ${this.rgba.a})`,
      sliderBarBgColor: ''
    }
  },
  computed: {
    linerBgStyle() {
      return {
        background: `linear-gradient(${this.degValue}deg, #ccc 0%, ${this.activeType == 'liner' ? '#00f' : '#ccc'} 100%)`
      }
    }
  },
  // 不能监听，否则自己改变自己时，颜色也会发生变化
  watch: {
    rgba: {
      handler(n, o) {
        //   if(){

        //   }
        this.curColor = `rgba(${this.rgba.r}, ${this.rgba.g}, ${this.rgba.b}, ${this.rgba.a})`
        this.updateColorList()
      },
      immediate: true
    },
    degValue: {
      handler(n, o) {
        if (n != o) {
          this.$emit('updateColorList', { colorList: this.sortList(), angle: n, type: this.activeType })
        }
      },
      immediate: true
    },
    colorObj: {
      handler(n, o) {
        this.activeType = n.type
        this.degValue = n.angle
        this.slidePosList = n.colorList.map(item => {
          let pos = item.per * this.width
          if (pos >= this.width - 10) pos = this.width - 10
          return pos
        })
        this.linerColorList = deepClone(n.colorList)
        this.sliderBarBgColor = this.sliderBarBg()
      },
      immediate: true
    }
  },
  mounted() {
    this.renderColor()
    this.renderSlide()
  },
  methods: {
    sliderBarBg() {
      const list = this.sortList()
      let resStr = ''
      if (list.length == 1) {
        resStr = `${list[0].color} 0%, ${list[0].color} 100%`
      } else {
        list.forEach((item, index) => {
          resStr += item.color
          resStr += ' '
          resStr += (Number.parseInt(item.per * 100) + '%')
          if (index < list.length - 1) { resStr += ',' }
        })
      }
      return resStr
    },
    sortList() {
      const list = deepClone(this.linerColorList)
      list.sort(function(obj1, obj2) {
        var val1 = obj1['per']
        var val2 = obj2['per']
        if (val1 < val2) { // 正序
          return -1
        } else if (val1 > val2) {
          return 1
        } else {
          return 0
        }
      })
      return list
    },
    updateColorList() {
      if (this.activeSlide == this.slidePosList.length - 1 && this.linerColorList.length != this.slidePosList.length) {
        this.linerColorList.push({
          per: this.slidepercent(this.slidePosList[this.slidePosList.length - 1]),
          color: this.curColor
        })
      } else {
        this.linerColorList[this.activeSlide] = {
          per: this.slidepercent(this.slidePosList[this.activeSlide]),
          color: this.curColor
        }
      }
      this.sliderBarBgColor = this.sliderBarBg()

      // console.log({ colorList: this.sortList(), angle: this.degValue, type: this.activeType }, "changeColor")
      this.$emit('updateColorList', { colorList: this.sortList(), angle: this.degValue, type: this.activeType })
    },
    slidepercent(left) {
      let per = 0
      per = left / this.width
      if ((left + 10) / this.width == 1) {
        per = 1
      }
      return per
    },
    selectSlider(e) {
      const { left: hueLeft } = this.$refs.saturation.getBoundingClientRect()
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
      } else {
        this.curColor = this.linerColorList[this.activeSlide].color
        this.$emit('selectSlide', this.curColor)
      }
      const mousemove = e => {
        let x = e.clientX - hueLeft
        if (x <= 0) {
          x = 0
        }
        if (x >= this.width - 10) {
          x = this.width - 10
        }
        this.slidePosList.splice(this.activeSlide, 1, x)
        this.updateColorList()
      }

      mousemove(e)

      const mouseup = () => {
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      }

      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
    },
    chooseColorType(type) {
      this.activeType = type
    },
    renderColor() {
      const canvas = this.$refs.canvasSaturation
      const size = this.size
      const ctx = canvas.getContext('2d')
      canvas.width = size
      canvas.height = size
      const colorArr = this.curColor.replace(/rgba\(|\)|\s/ig, '').split(',')
      ctx.fillStyle = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`
      ctx.fillStyle = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`
      ctx.fillRect(0, 0, size, size)

      this.createLinearGradient('l', ctx, size, size, '#FFFFFF', 'rgba(255,255,255,0)')
      this.createLinearGradient('p', ctx, size, size, 'rgba(0,0,0,0)', '#000000')
    },
    renderSlide() {
      this.slideSaturationStyle = {
        left: this.hsv.s * this.size - 5 + 'px',
        top: (1 - this.hsv.v) * this.size - 5 + 50 + 'px'
      }
    },
    selectSaturation(e) {
      const { top: saturationTop, left: saturationLeft } = this.$refs.saturation.getBoundingClientRect()
      const ctx = e.target.getContext('2d')

      const mousemove = e => {
        let x = e.clientX - saturationLeft
        let y = e.clientY - saturationTop

        if (x < 0) {
          x = 0
        }
        if (y < 0) {
          y = 0
        }
        if (x > this.size) {
          x = this.size
        }
        if (y > this.size) {
          y = this.size
        }

        // 不通过监听数据变化来修改dom，否则当颜色为#ffffff时，slide会跑到左下角
        this.slideSaturationStyle = {
          left: x - 5 + 'px',
          top: y - 5 + 'px'
        }
        // 如果用最大值，选择的像素会是空的，空的默认是黑色
        const imgData = ctx.getImageData(Math.min(x, this.size - 1), Math.min(y, this.size - 1), 1, 1)
        const [r, g, b] = imgData.data
        this.curColor = `rgba(${this.rgba.r}, ${this.rgba.g}, ${this.rgba.b}, ${this.rgba.a})`
        this.$emit('selectSaturation', { r, g, b })
        this.sliderBarBgColor = this.sliderBarBg()
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
    .slide-number{
      color: #fff;
      position: absolute;
      top: 12px;
      font-size: 12px;
    }
}
.linear-slider{
    margin: 10px 0;
    width: 100%;
    height: 7px;
    border-radius: 4px;
    background: #ccc;
}
.slide {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid #fff;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.3);
    pointer-events: none;
}
.saturation-con{
    // position: relative;
    .tool-con{
        height: 30px;
        transition: all 0.5s ease;
        &.liner{
            height: 60px;
        }
        .color-span{
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 10px;
            background-color: #ccc;
            margin: 0 10px;
            cursor: pointer;
            &.active{
                background-color: #00f;
            }
        }
        .direction-box{
            display: flex;
            font-size: 12px;
            float: right;
            color: #999;
            .unit{
                line-height: 25px;
            }
            .name {
                height: 25px;
                float: left;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #252930;
            }
            .value {
                height: 25px;
                width: 50px; // 可以让flex起作用
                padding: 0 12px;
                border: 0;
                color: #fff;
                background: #2e333a;
                box-sizing: border-box;
                margin: 0 5px 0 10px;
            }
        }
    }
}
.saturation {
    position: relative;
    cursor: pointer;
    .slide {
        left: 100px;
        top: 0;
    }
}
</style>
