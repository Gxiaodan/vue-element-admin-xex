<template>
  <div class="dx-color-picker-container">
    <div ref="dxColorTrigger" class="dx-color-picker-trigger" :style="{width: triggerSize + 'px', height: triggerSize + 'px'}" @click="showPicker">
      <span class="color-picker-color" :style="{background: triggerColor}" />
    </div>
    <div
      v-show="showColorPicker"
      ref="dxColorPicker"
      class="dx-color-picker"
      :class="{ light: isLightTheme}"
      :style="{ width: totalWidth + 'px', marginLeft: `${colorPickerLeft}px`}"
    >
      <div class="color-set">
        <Saturation
          ref="saturation"
          :init-color="initColor"
          :cur-color="curColor"
          :size="hueWidth"
          :theme="theme"
          @changeColorObj="changeColorObj"
        />
        <Hue
          ref="hue"
          :hsv="hsv"
          :width="hueWidth"
          :height="hueHeight"
          @selectHue="selectHue"
        />
        <Alpha
          ref="alpha"
          :color="rgbString"
          :rgba="rgba"
          :width="hueWidth"
          :height="hueHeight"
          @selectAlpha="selectAlpha"
        />
      </div>
      <!-- <div
              :style="{ height: previewHeight + 'px' }"
              class="color-show"
          >
              <Preview
                  :color="rgbaString"
                  :width="previewWidth"
                  :height="previewHeight"
              />
              <Sucker
                  v-if="!suckerHide"
                  :sucker-canvas="suckerCanvas"
                  :sucker-area="suckerArea"
                  @openSucker="openSucker"
                  @selectSucker="selectSucker"
              />
          </div> -->
      <Box
        name="HEX"
        :color="modelHex"
        @inputColor="inputHex"
      />
      <Box
        name="RGBA"
        :color="modelRgba"
        @inputColor="inputRgba"
      />
      <Colors
        :color="triggerColor"
        @selectColor="selectColor"
      />
    </div>
  </div>
</template>

<script>
import mixin from './mixin'
import Saturation from './Saturation.vue'
import Hue from './Hue.vue'
import Alpha from './Alpha.vue'
import Preview from './Preview.vue'
import Sucker from './Sucker.vue'
import Box from './Box.vue'
import Colors from './Colors.vue'
export default {
  components: {
    Saturation,
    Hue,
    Alpha,
    Preview,
    Sucker,
    Box,
    Colors
  },
  mixins: [mixin],
  model: {
    prop: 'color',
    event: 'changeColor'
  },
  props: {
    color: {
      type: String,
      default: '#000000'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    suckerHide: {
      type: Boolean,
      default: true
    },
    suckerCanvas: {
      type: null, // HTMLCanvasElement
      default: null
    },
    suckerArea: {
      type: Array,
      default: () => []
    },
    triggerSize: {
      required: false,
      type: Number,
      default: 28
    }
  },
  data() {
    return {
      hueWidth: 200,
      hueHeight: 15,
      previewHeight: 30,
      modelRgba: '',
      modelHex: '',
      r: 0,
      g: 0,
      b: 0,
      a: 1,
      h: 0,
      s: 0,
      v: 0,
      angle: 180,
      type: 'single',
      triggerColor: '#000000',
      showColorPicker: false,
      colorPickerLeft: 0,
      colorPickerTop: 0,
      activeIndex: 0,
      initColor: '#000',
      curColor: '#000'
    }
  },
  computed: {
    isLightTheme() {
      return this.theme === 'light'
    },
    totalWidth() {
      return this.hueWidth + 20
    },
    previewWidth() {
      return this.totalWidth - (this.suckerHide ? 0 : this.previewHeight) - 20
    },
    rgba() {
      return {
        r: this.r,
        g: this.g,
        b: this.b,
        a: this.a
      }
    },
    hsv() {
      return {
        h: this.h,
        s: this.s,
        v: this.v
      }
    },
    rgbString() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`
    },
    rgbaStringShort() {
      return `${this.r}, ${this.g}, ${this.b}, ${this.a}`
    },
    rgbaString() {
      return `rgba(${this.rgbaStringShort})`
    },
    hexString() {
      return this.rgb2hex(this.rgba, true)
    }
  },
  watch: {
    triggerColor: {
      handler(n, o) {
        if (n != undefined && n != o && !n.includes('undefined')) {
          this.$emit('changeColor', n)
        }
      },
      immediate: true
    },
    color: {
      handler(n, o) {
        if (n != undefined && n != o && !n.includes('undefined')) {
          this.initColor = this.color
          if (this.initColor.includes('linear-gradient')) {
            const colorObj = this.getLinerObj(this.initColor)
            this.curColor = colorObj.colorList[this.activeIndex].color
          } else {
            this.curColor = this.initColor
          }
        }
      },
      immediate: true
    }
  },
  mounted() {
  },
  created() {
    // Object.assign(this, this.setColorValue(this.color))
    // this.setText()
    this.selectColor(this.color)
    // 避免初始化时，也会触发changeColor事件
    // this.$watch('rgba', () => {
    //   this.$emit('changeColor', this.getResObj())
    // })
  },
  methods: {
    changeColorObj(obj) {
      const { index, angle, colorList, type } = obj
      this.activeIndex = index
      this.angle = angle
      this.curColor = colorList[index].color
      const { r, g, b, a, h, s, v } = this.setColorValue(this.curColor)
      Object.assign(this, { r, g, b, a, h, s, v })
      this.setText()
      if (type == 'liner') {
        const value = this.getlinerColor(colorList)
        this.triggerColor = `linear-gradient(${this.angle}deg, ${value})`
      } else {
        this.triggerColor = this.curColor
      }
    },
    showPicker(e) {
      if (this.hueWidth / 2 > e.clientX) {
        this.colorPickerLeft = 0
      } else if (this.hueWidth > document.body.clientWidth - e.clientX) {
        this.colorPickerLeft = -1 * this.hueWidth
      } else {
        this.colorPickerLeft = -1 * this.hueWidth / 2
      }
      this.showColorPicker = !this.showColorPicker
    },
    selectHue(color) {
      const { r, g, b, h, s, v } = this.setColorValue(color)
      Object.assign(this, { r, g, b, h, s, v })
      this.$nextTick(() => {
        this.$refs.saturation.renderColor(`rgb(${r}, ${g}, ${b})`)
      })
      this.setText()
      if (this.triggerColor.includes('linear-gradient')) {
        const colorObj = this.getLinerObj(this.triggerColor)
        const list = colorObj.colorList
        list[this.activeIndex].color = `rgba(${r}, ${g}, ${b}, ${this.a})`
        const angle = colorObj.angle
        const value = this.getlinerColor(list)
        this.triggerColor = `linear-gradient(${angle}deg, ${value})`
      } else {
        this.triggerColor = `rgba(${r}, ${g}, ${b}, ${this.a})`
      }
    },
    selectAlpha(a) {
      this.a = a
      this.setText()
      if (this.triggerColor.includes('linear-gradient')) {
        const colorObj = this.getLinerObj(this.triggerColor)
        const list = colorObj.colorList
        list[this.activeIndex].color = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
        const angle = colorObj.angle
        const value = this.getlinerColor(list)
        this.triggerColor = `linear-gradient(${angle}deg, ${value})`
      } else {
        this.triggerColor = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
      }
    },
    inputHex(color) {
      const { r, g, b, a, h, s, v } = this.setColorValue(color)
      Object.assign(this, { r, g, b, a, h, s, v })
      this.modelHex = color
      this.modelRgba = this.rgbaStringShort
      this.$nextTick(() => {
        this.$refs.saturation.renderColor(`rgb(${r}, ${g}, ${b})`)
        this.$refs.saturation.renderSlide()
        this.$refs.hue.renderSlide()
      })
    },
    inputRgba(color) {
      const { r, g, b, a, h, s, v } = this.setColorValue(color)
      Object.assign(this, { r, g, b, a, h, s, v })
      this.modelHex = this.hexString
      this.modelRgba = color
      this.$nextTick(() => {
        this.$refs.saturation.renderColor(`rgb(${r}, ${g}, ${b})`)
        this.$refs.saturation.renderSlide()
        this.$refs.hue.renderSlide()
      })
    },
    setText() {
      this.modelHex = this.hexString
      this.modelRgba = this.rgbaStringShort
    },
    openSucker(isOpen) {
      this.$emit('openSucker', isOpen)
    },
    selectSucker(color) {
      const { r, g, b, a, h, s, v } = this.setColorValue(color)
      Object.assign(this, { r, g, b, a, h, s, v })
      this.setText()
      this.$nextTick(() => {
        this.$refs.saturation.renderColor()
        this.$refs.saturation.renderSlide()
        this.$refs.hue.renderSlide()
      })
    },
    selectColor(color) {
      this.triggerColor = color
      this.initColor = color
      let activeColor
      if (this.triggerColor.includes('linear-gradient')) {
        const colorObj = this.getLinerObj(color)
        activeColor = colorObj.colorList[0].color
      } else {
        activeColor = color
      }
      const { r, g, b, a, h, s, v } = this.setColorValue(activeColor)
      Object.assign(this, { r, g, b, a, h, s, v })
      this.setText()
      this.$nextTick(() => {
        this.$refs.saturation.renderColor(`rgb(${r}, ${g}, ${b})`)
      })
    }
  }
}
</script>

<style lang="scss">
.dx-color-picker-container{
  position: relative;
}
.dx-color-picker-trigger{
   display: inline-block;
    box-sizing: border-box;
    padding: 3px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    font-size: 0;
    position: relative;
    cursor: pointer;
    .color-picker-color{
      position: relative;
      display: block;
      box-sizing: border-box;
      border: 1px solid #999;
      border-radius: 2px;
      width: 100%;
      height: 100%;
      text-align: center;
    }
    .color-picker-icon{
      font-size: 12px;
    }
}
.dx-color-picker {
    padding: 10px;
    background: #1d2024;
    border-radius: 4px;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.16);
    z-index: 9999;
    transition: all 0.5s ease;
    position: fixed;
    &.light {
        background: #f7f8f9;
        .right-box{
          background: #f7f8f9;
          color: #999;
        }
        .color-box{
          .liner{
              border-top: 1px solid #ccc;
          }
        }
        .direction-box{
          .name{
            background: #f7f8f9;
          }
          .value{
            background: #eceef0;
            color: #666;
          }
        }
        .color-show {
            .sucker {
                background: #eceef0;
            }
        }
        .color-type {
            .name {
                background: #e7e8e9;
            }
            .value {
                color: #666;
                background: #eceef0;
            }
        }
        .colors.history {
            border-top: 1px solid #eee;
        }
    }
    canvas {
        vertical-align: top;
    }
    .color-set {
        // display: flex;
    }
    .color-show {
        margin-top: 8px;
        display: flex;
    }
}
</style>
