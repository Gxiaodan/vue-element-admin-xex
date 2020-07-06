<template>
  <div>
    <div
      v-for="i in numList.length"
      :key="i"
      class="number"
      :style="isSplit && numList[i-1] == ',' ? splitStyle : numberContainerStyle"
    >
      <div v-if="isSplit && numList[i-1] == ','">
        <i>,</i>
      </div>
      <div v-else-if="isNaN(numList[i-1])" :class="['number-box', 'unit']">
        <i :style="numberStyle">{{ numList[i-1] }}</i>
      </div>
      <div
        v-else
        class="number-box"
        :style="{top: `${scrollHeight * numList[i-1]}px`, transition: `all ${animationTime}s`}"
      >
        <i
          v-for="j in 10"
          :key="j"
          :style="[numberStyle, i <= (numList.length - String(value).length - (unit || isSplit ? 1 : 0)) ? defaultStyle : '']"
        >{{ j-1 }}</i>
      </div>
    </div>
  </div>
</template>

<script>
/**
   * title:数字翻滚组件
   * Author: zhangkai
   * Date: 2019-07-22
   */
export default {
  name: 'Index',
  props: {
    // 数值
    value: {
      default: 0
    },
    // 数字长度，例如效果为000111111时，需要将0也展示出来，所以此处值则为3+6=9
    count: {
      type: Number,
      default: 0
    },
    // 数字翻转外层div样式
    numberContainerStyle: {
      type: Object,
      default: function() {
        return {
          width: '43px', // 此处width可由numberStyle width加上numberStyle magin左右的宽度计算
          height: '60px' // 此处height可由numberStyle height加上numberStyle magin上下的宽度计算
        }
      }
    },
    // 动画执行时间
    animationTime: {
      type: Number,
      default: 0.5
    },
    // 数字翻转数字div样式 只列举了部分样式，其余样式也自行添加
    numberStyle: {
      type: Object,
      default: function() {
        return {
          color: 'white',
          fontStyle: 'normal',
          fontSize: '20px',
          width: '33px',
          height: '50px', // 不能去掉
          lineHeight: '50px',
          textAlign: 'center',
          margin: '5px',
          border: 'red solid 1px',
          borderRadius: '3px',
          background: '#fff'
          // backgroundImage: "url(" + require('./img/device_number_bg.png') + ")",//图片自定义，该图片只作为demo使用
          // backgroundSize: "100% 100%"
        }
      }
    },
    defaultStyle: {
      type: Object,
      default: function() {
        return {
          color: '#7a7a7a'
        }
      }
    },
    // 滚动高度由numberStyle中的height加上numberStyle的magin得出
    scrollHeight: {
      type: Number,
      default: -55 // 此处为负数！！
    },
    // 是否进行千分位切割
    isSplit: {
      type: Boolean,
      default: false
    },
    unit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  computed: {
    numList() {
      var zeroStr = ''
      for (var index = 0; index < (this.count - String(this.value).length - (this.unit ? 1 : 0)); index++) {
        zeroStr += '0'
      }
      const value = this.isSplit ? this.toThousands(zeroStr + this.value) : this.unit ? zeroStr + this.value + this.unit : zeroStr + this.value
      return (value).split('')
    },
    splitStyle() {
      return {
        fontSize: this.numberStyle.fontSize || '20px',
        color: this.numberStyle.color || 'white'
      }
    }
  },
  watch: {
    // value:{
    //   handler: function(val, oldVal) {
    //     let bak = this.value
    //     this.value = parseInt(bak / 100) * 100
    //     this.animationTime = 0
    //     setTimeout(() => {
    //         this.animationTime = 1
    //         this.value = bak
    //     }, 0)
    //   },
    //   immediate: true
    // }
  },
  methods: {
    toThousands(num) {
      var num = (num || 0).toString()
      var result = ''
      while (num.length > 3) {
        result = ',' + num.slice(-3) + result
        num = num.slice(0, num.length - 3)
      }
      if (num) {
        result = num + result
      }
      return result
    }
  }
}
</script>

<style scoped>
  .number {
    display: inline-block;
    overflow: hidden;
  }

  .number-box {
    position: relative;
  }

  .number-box i {
    display: block;
    box-sizing: border-box;
  }

  .unit i {
    font-size: 24px !important;
  }
</style>
