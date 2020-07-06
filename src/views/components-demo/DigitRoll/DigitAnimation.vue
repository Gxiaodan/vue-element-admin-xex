<template>
  <div>
    <div ref="num" class="gmv-show-gmv">
      <div :class="boxClass">
        <transition name="fade" @before-enter="beforeEnter" @before-leave="beforeLeave">
          <div v-if="show">
            {{ num }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: () => 'light', // 默认div的背景颜色
      validator(value) {
        return ['', 'light', 'yellow', 'blue'].indexOf(value) !== -1
      }
    },
    // 动画的速度，单位ms 必须为偶数，且>10
    speed: {
      type: Number,
      default: 100
    },
    show: {
      type: Boolean, // 动画的切换，进入动画show=true，离开动画，false
      default: true
    },
    num: {
      type: Number, // 进入动画时显示的数字
      default: 0
    }
  },
  data() {
    return {
      timer: null // 定时器
    }
  },
  computed: {
    // 动画时长,时间单位为秒
    duration() {
      const duration = this.speed / 2000
      return duration > 10 ? 10 : duration
    },
    // 范围 0.5 至1
    slow() {
      const slow = this.speed / 10000 + 0.3
      return slow > 1 ? 1 : slow
    },
    // 自定义定时器
    step() {
      return this.speed / 2
    },
    boxClass() {
      return 'box-' + this.color
    }
  },
  methods: {
    // 进入动画效果
    beforeEnter(el) {
      const { duration, slow } = this
      el.style.transition = `all ${duration}s cubic-bezier(0, 0,${slow}, 1)`
    },
    // 离开动画效果
    beforeLeave(el) {
      const { duration, slow } = this
      el.style.transition = `all ${duration}s cubic-bezier(${slow},0,1,1)`
    }
  }
}
</script>

<style lang="scss" scoped>
.gmv-show-gmv {
  width: 100%;
  display: flex;
  justify-items: start;
  align-items: center;
}
// 进入动画先快后慢
.fade-enter-active {
  transition: all 1s cubic-bezier(0, 0, 0.5, 1);
}
// 离开动画先慢后快
.fade-leave-active {
  transition: all 1s cubic-bezier(0.5, 0, 1, 1);
}
.fade-enter {
  transform: translateY(30px);
}
.fade-leave-to {
  transform: translateY(-30px);
}
</style>
