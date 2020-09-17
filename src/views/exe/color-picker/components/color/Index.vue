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
          :colorObj="colorObj"
          @changeActiveSlide = 'changeActiveSlide'
          @updateColor = "updateColor"
          :size="hueWidth"
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
      triggerColor: '#000000',
      showColorPicker: false,
      colorPickerLeft: 0,
      colorPickerTop: 0,
      activeIndex: 0,
      colorObj: {}
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
    // Object.assign(this, this.setColorValue(this.color))
    // this.setText()
    this.selectColor(this.color)
    // 避免初始化时，也会触发changeColor事件
    // this.$watch('rgba', () => {
    //   this.$emit('changeColor', this.getResObj())
    // })
  },
  methods: {
    updateColor(val) {
      // this.color = val
    },
    changeActiveSlide({ index, color, per, isAdd }) {
      debugger
      const { r, g, b, a, h, s, v } = this.setColorValue(color)
      Object.assign(this, { r, g, b, a, h, s, v })
      this.activeIndex = index
      this.colorObj = this.getLinerObj(this.triggerColor)
      const list = this.colorObj.colorList
      if (isAdd) {
        list.splice(index, 0, {
          per: per,
          color: color
        })
      } else {
        list.splice(index, 1, {
          per: per,
          color: color
        })
      }
      console.log(this.activeIndex,'activeIndex')
      list[this.activeIndex].color = `rgba(${r}, ${g}, ${b}, ${this.a})`
      const angle = this.colorObj.angle
      const value = this.getlinerColor(list)
      this.triggerColor = `linear-gradient(${angle}deg, ${value})`
    },
    showPicker(e) {
      const { top, left } = this.$refs.dxColorTrigger.getBoundingClientRect()
      this.colorPickerLeft = left - (this.hueWidth + 20 - 40) / 2
      this.colorPickerTop = top + 40
      this.showColorPicker = !this.showColorPicker
    },
    updateColorList(obj) {
      this.colorList = obj.colorList
      this.angle = obj.angle
      this.type = obj.type
    },
    selectSaturation(color) {
      this.selectAlpha(color.a)
      const { r, g, b, h, s, v } = this.setColorValue(color)
      Object.assign(this, { r, g, b, h, s, v })
      // this.activeColor = `rgba(${r}, ${g}, ${b}, ${this.a})`
      this.setText()
    },
    selectHue(color) {
      debugger
      const { r, g, b, h, s, v } = this.setColorValue(color)
      Object.assign(this, { r, g, b, h, s, v })
      this.setText()
      if (this.triggerColor.includes('linear-gradient')) {
        this.colorObj = this.getLinerObj(this.triggerColor)
        const list = this.colorObj.colorList
        list[this.activeIndex].color = `rgba(${r}, ${g}, ${b}, ${this.a})`
        const angle = this.colorObj.angle
        const value = this.getlinerColor(list)
        this.triggerColor = `linear-gradient(${angle}deg, ${value})`
      } else {
        this.triggerColor = `rgba(${r}, ${g}, ${b}, ${this.a})`
        this.colorObj = {color: this.triggerColor }
      }
    },
    selectAlpha(a) {
      this.a = a
      this.setText()
      if (this.triggerColor.includes('linear-gradient')) {
        this.colorObj = this.getLinerObj(this.triggerColor)
        const list = this.colorObj.colorList
        list[this.activeIndex].color = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
        const angle = this.colorObj.angle
        const value = this.getlinerColor(list)
        this.triggerColor = `linear-gradient(${angle}deg, ${value})`
      } else {
        this.triggerColor = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
        this.colorObj = {color: this.triggerColor }
      }
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
      this.triggerColor = color
      let activeColor
      if (this.triggerColor.includes('linear-gradient')) {
        this.colorObj = this.getLinerObj(color)
        activeColor = this.colorObj.colorList[0].color
      } else {
        activeColor = color
        this.colorObj = {color: this.triggerColor }
      }
      const { r, g, b, a, h, s, v } = this.setColorValue(activeColor)
      Object.assign(this, { r, g, b, a, h, s, v })
      this.setText()
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
    z-index: 9999;
    transition: all 0.5s ease;
    position: fixed;
    &.light {
        background: #f7f8f9;
        .liner{
            border-top: 1px solid #ccc;
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
