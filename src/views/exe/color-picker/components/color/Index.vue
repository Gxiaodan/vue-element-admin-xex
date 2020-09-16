<template>
  <div class="dx-color-picker-container">
    <div ref="dxColorTrigger" class="dx-color-picker-trigger" @click="showPicker">
      <span class="color-picker-color" :style="{background: triggerColor}" />
    </div>
    <div
      v-show="showColorPicker"
      ref="dxColorPicker"
      class="dx-color-picker"
      :class="{ light: isLightTheme}"
      :style="{ width: totalWidth + 'px', left: colorPickerLeft + 'px', top: colorPickerTop + 'px'}"
    >
      <div class="color-set">
        <Saturation
          ref="saturation"
          :color="rgbString"
          :rgba="rgba"
          :hsv="hsv"
          :size="hueWidth"
          :color-obj="{type, angle, colorList}"
          @updateColorList="updateColorList"
          @selectSaturation="selectSaturation"
          @selectSlide="selectColor"
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
        :color-list="colorList"
        :angle="angle"
        :color-type="type"
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
  props: {
    color: {
      type: String,
      default: '#000000'
    },
    theme: {
      type: String,
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
      colorList: [],
      angle: 180,
      type: 'single',
      triggerColor: '',
      showColorPicker: false,
      colorPickerLeft: 0,
      colorPickerTop: 0
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
  created() {
    Object.assign(this, this.setColorValue(this.color))
    this.setText()

    // 避免初始化时，也会触发changeColor事件
    this.$watch('rgba', () => {
      this.$emit('changeColor', this.getResObj())
    })
  },
  methods: {
    showPicker(e) {
      const { top, left } = this.$refs.dxColorTrigger.getBoundingClientRect()
      this.colorPickerLeft = e.clientX - left
      this.colorPickerTop = e.clientY - top
      this.showColorPicker = !this.showColorPicker
    },
    getResObj() {
      let rgba = ''
      let hex = ''
      let list = []
      if (this.type == 'single') {
        rgba = this.rgbaString
        hex = this.modelHex
        list = [
          {
            per: 0,
            color: {
              rgba: this.rgbaString,
              hex: this.modelHex
            }
          }
        ]
      } else {
        this.colorList.forEach((item, index) => {
          rgba += item.color
          hex += this.rgb2hex(item.color, true)
          rgba += ' '
          hex += ' '
          rgba += (Number.parseInt(item.per * 100) + '%')
          if (index < this.colorList.length - 1) { rgba += ',' }
          hex += (Number.parseInt(item.per * 100) + '%')
          if (index < this.colorList.length - 1) { hex += ',' }
        })
        rgba = `linear-gradient(${this.angle}deg, ${rgba})`
        hex = `linear-gradient(${this.angle}deg, ${hex})`
        list = this.colorList.map(item => {
          return {
            per: 0,
            color: {
              rgba: item.color,
              hex: this.rgb2hex(item.color, true)
            }
          }
        })
      }
      this.triggerColor = rgba
      return {
        rgba: rgba,
        hex: hex,
        colorList: list
      }
    },
    updateColorList(obj) {
      this.colorList = obj.colorList
      this.angle = obj.angle
      this.type = obj.type
      this.$emit('changeColor', this.getResObj())
    },
    selectSaturation(color) {
      this.selectAlpha(color.a)
      const { r, g, b, h, s, v } = this.setColorValue(color)
      Object.assign(this, { r, g, b, h, s, v })
      this.setText()
    },
    selectHue(color) {
      const { r, g, b, h, s, v } = this.setColorValue(color)
      Object.assign(this, { r, g, b, h, s, v })
      this.setText()
      this.$nextTick(() => {
        this.$refs.saturation.renderColor()
        this.$refs.saturation.renderSlide()
      })
    },
    selectAlpha(a) {
      this.a = a
      this.setText()
    },
    inputHex(color) {
      const { r, g, b, a, h, s, v } = this.setColorValue(color)
      Object.assign(this, { r, g, b, a, h, s, v })
      this.modelHex = color
      this.modelRgba = this.rgbaStringShort
      this.$nextTick(() => {
        this.$refs.saturation.renderColor()
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
        this.$refs.saturation.renderColor()
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
      let curColor = ''
      if (color.includes('linear-gradient')) {
        this.$nextTick(() => {
          this.angle = Number(color.match(/\d{0,}deg/)[0].match(/\d{0,}/)[0])
          this.type = 'liner'
        })
        const perList = color.match(/\d{0,}%/ig).map(item => {
          return Number(item.match(/\d{1,}/)[0])
        })
        const colors = []
        color.match(/rgba.*/)[0].trim().split('%').forEach(item => {
          if (item.includes('rgba')) {
            colors.push(item.match(/rgba.*\)/ig)[0])
          }
        })
        const colorList = perList.map((item, index) => {
          return {
            per: item / 100,
            color: colors[index]
          }
        })
        this.updateColorList({
          colorList: colorList,
          angle: this.angle,
          type: this.type
        })
        curColor = colors[0]
      } else {
        this.type = 'single'
        curColor = color
      }
      const { r, g, b, a, h, s, v } = this.setColorValue(curColor)
      Object.assign(this, { r, g, b, a, h, s, v })
      this.setText()
      this.$nextTick(() => {
        this.$refs.saturation.renderColor()
        this.$refs.saturation.renderSlide()
        this.$refs.hue.renderSlide()
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
    height: 40px;
    width: 40px;
    padding: 4px;
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
    z-index: 1;
    transition: all 0.5s ease;
    position: absolute;
    &.light {
        background: #f7f8f9;
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
