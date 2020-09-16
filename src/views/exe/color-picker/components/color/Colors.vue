<template>
  <div ref="colorsCon" class="colors-con" @click.prevent.stop="showRightBox = false">
    <div class="fold-box">
      <span>通用色值</span>
      <i class="fold-box-icon fold-icon el-icon-arrow-down" :class="isFold ? 'fold' : ''" @click="foldBox" />
      <i class="fold-box-icon el-icon-plus add-color-icon" @click="setcolors" />
    </div>
    <div v-show="showRightBox" class="right-box" :style="{left: rightBoxLeft+'px', top: rightBoxTop+'px'}" @click="beSureDelete">
      删除
    </div>
    <div class="color-box" :style="{height: isFold ? '0' : `${colorBoxHeight}px`}">
      <div v-show="colorsDefault.length == 0 && colorsLiner.length == 0" class="no-color">点击“+”新增色板</div>
      <ul v-show="colorsDefault.length" ref="colorBox" class="colors">
        <li
          v-for="item in colorsDefault"
          :key="item"
          class="item"
          @click="selectColor(item)"
          @click.prevent.stop.right="deleteColor(item, 'single', $event)"
        >
          <div
            :style="{ background: `url(${imgAlphaBase64})` }"
            class="alpha"
          />
          <div
            :style="{ background: item }"
            class="color"
          />
        </li>
      </ul>
      <ul
        v-show="colorsLiner.length"
        ref="linerColorBox"
        class="colors liner"
      >
        <li
          v-for="item in colorsLiner"
          :key="item"
          class="item"
          @click="selectColor(item)"
          @click.prevent.stop.right="deleteColor(item, 'liner', $event)"
        >
          <div
            :style="{ background: `url(${imgAlphaBase64})` }"
            class="alpha"
          />
          <div
            :style="{ background: item }"
            class="color"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import mixin from './mixin'
export default {
  mixins: [mixin],
  props: {
    colorList: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    },
    colorType: {
      type: String,
      required: false,
      default: 'single'
    },
    angle: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      imgAlphaBase64: '',
      colorsLiner: JSON.parse(localStorage.getItem('vue-colorpicker-liner')) || [],
      colorsDefault: JSON.parse(localStorage.getItem('vue-colorpicker-default')) || [],
      isFold: true,
      colorBoxHeight: 0,
      showRightBox: false,
      rightBoxLeft: 0,
      rightBoxTop: 0,
      curColor: '',
      curType: ''
    }
  },
  computed: {
    color() {
      let value = ''
      if (this.colorList.length == 1) {
        value = this.colorList[0].color
      } else {
        this.colorList.forEach((item, index) => {
          value += item.color
          value += ' '
          value += (Number.parseInt(item.per * 100) + '%')
          if (index < this.colorList.length - 1) { value += ',' }
        })
        value = `linear-gradient(${this.angle}deg, ${value})`
      }
      return value
    }
  },
  mounted() {
  },
  created() {
    this.imgAlphaBase64 = this.createAlphaSquare(4).toDataURL()
  },
  destroyed() {
    // this.setcolors(this.color)
  },
  methods: {
    beSureDelete() {
      this.showRightBox = false
      if (this.curType == 'liner') {
        const index = this.colorsLiner.indexOf(this.curColor)
        if (index >= 0) {
          this.colorsLiner.splice(index, 1)
          localStorage.setItem('vue-colorpicker-liner', JSON.stringify(this.colorsLiner))
        }
      } else {
        const index = this.colorsDefault.indexOf(this.curColor)
        if (index >= 0) {
          this.colorsDefault.splice(index, 1)
          localStorage.setItem('vue-colorpicker-default', JSON.stringify(this.colorsDefault))
        }
      }
    },
    deleteColor(color, type, e) {
      this.curColor = color
      this.curType = type
      const { top: conTop, left: conLeft } = this.$refs.colorsCon.getBoundingClientRect()
      this.rightBoxLeft = e.clientX - conLeft
      this.rightBoxTop = e.clientY - conTop - 28
      this.showRightBox = true
    },
    getFoldHeight() {
      this.colorBoxHeight = 10 + this.$refs.colorBox.getBoundingClientRect().height + this.$refs.linerColorBox.getBoundingClientRect().height
      if (this.colorsDefault.length === 0 && this.colorsLiner.length == 0) {
        this.colorBoxHeight += 30
      }
    },
    foldBox() {
      this.getFoldHeight()
      this.isFold = !this.isFold
    },
    selectColor(color) {
      this.$emit('selectColor', color)
    },
    setcolors(color) {
      this.getFoldHeight()
      if (this.colorType == 'liner') {
        if (this.colorsLiner.includes(this.color)) {
          this.$message({ message: '默认色值不能重复添加', type: 'warning' })
          return
        } else {
          this.colorsLiner.push(this.color)
          localStorage.setItem('vue-colorpicker-liner', JSON.stringify(this.colorsLiner))
        }
      } else {
        if (this.colorsDefault.includes(this.color)) {
          this.$message({ message: '默认色值不能重复添加', type: 'warning' })
          return
        } else {
          this.colorsDefault.push(this.color)
          localStorage.setItem('vue-colorpicker-default', JSON.stringify(this.colorsDefault))
        }
      }
    //   if (!color) {
    //     return
    //   }
    //   const colors = this.colorsLiner
    //   const index = colors.indexOf(color)
    //   if (index >= 0) {
    //     colors.splice(index, 1)
    //   }
    //   if (colors.length >= 8) {
    //     colors.length = 7
    //   }
    //   colors.unshift(color)
    //   this.colorsLiner = colors
    }
  }
}
</script>

<style lang="scss">
.colors-con{
    position: relative;
}
.fold-box{
    color: #999;
    font-size: 12px;
    margin-top: 15px;
    height: 16px;
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
    }
    .fold-icon{
        &.fold{
            transform: rotate(180deg);
        }
    }
    .add-color-icon{
        margin-right: 15px;
    }
}
.right-box{
    position: absolute;
    cursor: pointer;
    z-index: 9;
    width: 40px;
    font-size: 12px;
    padding: 5px;
    text-align: center;
    background: #f7f8f9;
    border-radius: 4px;
    box-shadow: 0 0 16px 0 rgba(0,0,0,0.16);
}
.color-box{
    transition: height 0.5s ease;
    color: #999;
    overflow: hidden;
    .no-color{
        font-size: 12px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border: 1px dashed #999;
    }
}
.colors {
    padding: 0;
    margin: 0;
    &.liner {
        margin-top: 10px;
        border-top: 1px solid #2e333a;
    }
    .item {
        position: relative;
        width: 16px;
        height: 16px;
        margin: 10px 0 0 10px;
        border-radius: 3px;
        box-sizing: border-box;
        vertical-align: top;
        display: inline-block;
        transition: all 0.1s;
        cursor: pointer;
        &:nth-child(8n + 1) {
            margin-left: 0;
        }
        &:hover {
            transform: scale(1.4);
        }
        .alpha {
            height: 100%;
            border-radius: 4px; // 大一像素，否则四个角会看到白点
        }
        .color {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 3px;
        }
    }
}
</style>
