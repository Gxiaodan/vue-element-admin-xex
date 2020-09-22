<template>
  <div class="saturation-con" @click.prevent.stop="showRightBox = false">
    <div v-show="isMulti != false" class="tool-con" :class="activeType == 'liner'? 'liner' : ''">
      <el-tooltip v-for="(type, index) in colorType" :key="index" placement="top" :effect="theme == 'light' ? 'light' : 'dark'" :content="type == 'liner' ? '线性渐变':'单色'">
        <span
          :class="[{'active': activeType == type}, type + '-span']"
          :style="type == 'liner'? linerBgStyle : ''"
          class="color-span"
          @click="chooseColorType(type)"
        />
      </el-tooltip>
      <div v-if="activeType == 'liner'" class="direction-box">
        <span class="name" />
        <input v-model="degValue" class="value" @change="changeAngle">
        <span class="unit">deg</span>
      </div>
      <div
        v-if="activeType == 'liner'"
        class="liner-bar"
        @mousedown.prevent.stop.left="selectSlider"
      >
        <div
          ref="sliderBar"
          class="slider-bar"
          :style="{width: `${size}px`, height: `${height}px`,
                   borderRadius: `${height/2}px`, background: `linear-gradient(90deg, ${sliderBarBgColor})`}"
        />
        <div
          v-for="(posX, index) in slidePosList"
          :key="`${index}`"
          :style="{left: `${posX -2 }px`}"
          :class="{'active': activeSlide == index}"
          class="barSlide"
          @click.prevent.stop.right="deleteSlide(index, $event)"
        />
        <div
          v-for="(posX, index) in slidePosList"
          :key="`${index}_num`"
          :style="{left: `${posX -2 }px`}"
          class="slide-number"
        ><span v-show="activeSlide == index">{{ Number.parseInt(linerColorList[index].per * 100) + '%' }}</span></div>
      </div>
      <div v-show="showRightBox" class="right-box" :style="{left: rightBoxLeft+'px', top: rightBoxTop+'px'}" @click.prevent.stop.left="beSureDelete">
        删除
      </div>
    </div>
    <div class="saturation-tit" :style="{marginTop: activeType == 'liner' ? '10px' : '0'}">
      <span>拾色器</span>
      <i class="fold-box-icon fold-icon el-icon-arrow-down" :class="showSaturation ? 'fold' : ''" @click="showSaturation = !showSaturation" />
    </div>
    <div
      ref="saturation"
      class="saturation"
      :style="{height: showSaturation ? size + 'px' : 0}"
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
export default {
  components: {

  },
  mixins: [mixin],
  props: {
    initColor: {
      required: false,
      type: String,
      default: '#000'
    },
    curColor: { // 不需要
      required: false,
      type: String,
      default: '#000'
    },
    size: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 7
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    isMulti: {
      required: false,
      type: Boolean,
      default: true
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
      satuCurColor: '',
      sliderBarBgColor: '',
      showSaturation: true,
      a: 1,
      rightBoxLeft: 0,
      rightBoxTop: 0,
      showRightBox: false,
      delIndex: -1
    }
  },
  computed: {
    linerBgStyle() {
      return {
        background: `linear-gradient(${this.degValue}deg, #fff 0%, ${this.activeType == 'liner' ? '#00f' : '#2e333a'} 100%)`
      }
    }
  },
  // 不能监听，否则自己改变自己时，颜色也会发生变化
  watch: {
    curColor: {
      handler(n, o) {
        if (n != o) {
          this.satuCurColor = n
          this.linerColorList[this.activeSlide].color = n
          // this.renderColor(this.satuCurColor)
        }
      },
      immediate: true
    },
    initColor: {
      handler(n, o) {
        if (n != o) {
          if (n != o && n != undefined && !n.includes('undefined')) {
            if (this.initColor.includes('linear-gradient')) {
              this.activeType = 'liner'
              const colorObj = this.getLinerObj(this.initColor)
              this.linerColorList = colorObj.colorList
              this.degValue = colorObj.angle
              this.slidePosList = this.linerColorList.map(item => {
                let pos = item.per * this.size
                if (pos >= this.size - 10) pos = this.size - 10
                return pos
              })
              this.sliderBarBgColor = this.getlinerColor(this.linerColorList)
              if (this.activeSlide >= this.linerColorList.length) {
                this.activeSlide = 0
              }
            } else {
              this.activeType = 'single'
            }
            this.a = this.setColorValue(this.satuCurColor).a
          }
        }
      },
      immediate: true

    }
  },
  mounted() {
    this.renderColor(this.satuCurColor)
    this.renderSlide()
  },
  methods: {
    beSureDelete() {
      if (this.slidePosList.length == 1 ) {
        this.$message({ message: '色值不能少于一个', type: 'warning' })
        return
      }
      this.slidePosList.splice(this.delIndex, 1)
      this.linerColorList.splice(this.delIndex, 1)
      if (this.activeSlide == this.delIndex) {
        this.activeSlide = 0
      }
      this.showRightBox = false
      this.satuCurColor = this.linerColorList[this.activeSlide].color
      this.renderColor(this.satuCurColor)
      this.$emit('changeColorObj', { index: this.activeSlide, angle: this.degValue, colorList: this.linerColorList, type: this.activeType })
    },
    deleteSlide(index, e) {
      this.delIndex = index
      const { top: conTop, left: conLeft } = this.$refs.sliderBar.getBoundingClientRect()
      this.rightBoxLeft = e.clientX - conLeft
      this.rightBoxTop = e.clientY - conTop + 10
      this.showRightBox = true
    },
    changeAngle(val) {
      this.$emit('changeColorObj', { index: this.activeSlide, angle: this.degValue, colorList: this.linerColorList, type: this.activeType })
    },
    slidepercent(left) {
      let per = 0
      per = left / this.size
      if ((left + 10) / this.size == 1) {
        per = 1
      }
      return Number(per.toFixed(2))
    },
    getSortIndex(list, x) {
      list.sort(function(val1, val2) {
        if (val1 < val2) { // 正序
          return -1
        } else if (val1 > val2) {
          return 1
        } else {
          return 0
        }
      })
      const index = list.indexOf(x)
      return {
        index: index,
        list: list
      }
    },
    selectSlider(e) {
      const { left: hueLeft } = this.$refs.saturation.getBoundingClientRect()
      this.activeSlide = -1
      let x = parseInt(e.clientX - hueLeft)
      this.slidePosList.forEach((item, i) => {
        if (x >= (item - 7) && x <= (item + 7)) {
          this.activeSlide = i
        }
      })
      if (this.activeSlide == -1) {
        this.activeSlide = this.slidePosList.length
        this.slidePosList.push(x)
        const tmp = this.getSortIndex(this.slidePosList, x)
        this.slidePosList = tmp.list
        this.activeSlide = tmp.index
        this.linerColorList.splice(this.activeSlide, 0, {
          per: this.slidepercent(x),
          color: this.satuCurColor
        })
      } else {
        this.satuCurColor = this.linerColorList[this.activeSlide].color
        this.linerColorList.splice(this.activeSlide, 1, {
          per: this.slidepercent(x),
          color: this.satuCurColor
        })
      }
      this.renderColor(this.satuCurColor)
      this.$emit('changeColorObj', { index: this.activeSlide, angle: this.degValue, colorList: this.linerColorList, type: this.activeType })
      this.sliderBarBgColor = this.getlinerColor(this.linerColorList)
      const mousemove = e => {
        x = parseInt(e.clientX - hueLeft)
        if (x <= 0) {
          x = 0
        }
        if (x >= this.size - 10) {
          x = this.size - 10
        }
        this.slidePosList.splice(this.activeSlide, 1, x)
        this.linerColorList.splice(this.activeSlide, 1, {
          per: this.slidepercent(x),
          color: this.satuCurColor
        })
      }

      mousemove(e)

      const mouseup = () => {
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
        this.slidePosList.sort(function(val1, val2) {
          if (val1 < val2) { // 正序
            return -1
          } else if (val1 > val2) {
            return 1
          } else {
            return 0
          }
        })
        this.slidePosList.forEach((item, i) => {
          if (x >= (item - 7) && x <= (item + 7)) {
            this.activeSlide = i
          }
        })
        this.linerColorList = this.sortList(this.linerColorList, 'per')
        this.$emit('changeColorObj', { index: this.activeSlide, angle: this.degValue, colorList: this.linerColorList, type: this.activeType })
      }

      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
    },
    chooseColorType(type) {
      this.activeType = type
      this.$emit('changeColorObj', { index: this.activeSlide, angle: this.degValue, colorList: this.linerColorList, type: this.activeType })
    },
    renderColor(color) {
      if (this.$refs.canvasSaturation) {
        const canvas = this.$refs.canvasSaturation
        const size = this.size
        const ctx = canvas.getContext('2d')
        canvas.width = size
        canvas.height = size
        ctx.fillStyle = color
        ctx.fillRect(0, 0, size, size)

        this.createLinearGradient('l', ctx, size, size, '#FFFFFF', 'rgba(255,255,255,0)')
        this.createLinearGradient('p', ctx, size, size, 'rgba(0,0,0,0)', '#000000')
      }
    },
    renderSlide() {
      const colorObj = this.setColorValue(this.satuCurColor)
      this.slideSaturationStyle = {
        left: colorObj.s * this.size - 5 + 'px',
        top: (1 - colorObj.v) * this.size - 5 + 50 + 'px'
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
        this.satuCurColor = `rgba(${r}, ${g}, ${b}, ${this.a})`
        this.linerColorList[this.activeSlide].color = this.satuCurColor
        this.sliderBarBgColor = this.getlinerColor(this.linerColorList)
        this.$emit('changeColorObj', { index: this.activeSlide, angle: this.degValue, colorList: this.linerColorList, type: this.activeType })
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
    .barSlide {
        position: absolute;
        left: 100px;
        top: -2px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.3);
        z-index: 999;
        &:hover, &.active{
            width: 11px;
            height: 11px;
            border: 3px solid #fff;
        }
    }
    .slide-number{
      color: #999;
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
            position: relative;
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
    .saturation-tit{
      height: 20px;
      color: #999;
      font-size: 12px;
      .fold-box-icon{
          width: 16px;
          font-weight: bold;
          float: right;
          cursor: pointer;
          transition: all 0.5s ease;
          &:hover{
              color: #ccc;
              font-size: 14px;
          }
          &.fold-icon{
            &.fold{
                transform: rotate(180deg);
            }
        }
      }
    }
}
.saturation {
    position: relative;
    transition: all 0.2s ease;
    overflow: hidden;
    cursor: pointer;
    .slide {
        left: 100px;
        top: 0;
    }
}
</style>
