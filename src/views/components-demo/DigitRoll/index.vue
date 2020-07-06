<template>
  <div ref="num" class="gmv-show-gmv">
    <template v-for="(n,i) in nums">
      <DigitAnimation :key="i" v-bind="$attrs" :show="frame[i].show" :num="frame[i].num" :speed="frame[i].speed" />
    </template>
  </div>
</template>
<script>
import DigitAnimation from './DigitAnimation'
import { getRollOption, init } from './frame'
export default {
  components: {
    DigitAnimation
  },
  props: {
    // 需要在多长时间内更新完整个增量数字
    time: {
      type: Number,
      default: 2000
    },
    // 数字的位数
    len: {
      type: Number,
      default: 9
    },
    // 初始化开始数字
    start: {
      type: Number,
      default: 0
    },
    // 当前增量
    incr: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      progress: 0,
      frame: [],
      timer: null,
      begin: 0, // 动画结束后的数字
      nums: []
    }
  },
  created() {
    const vm = this
    vm.begin = vm.start
    vm.showNums()
  },
  mounted() {
    const vm = this
    window.setTimeout(() => {
      vm.updata(vm.incr)
    }, 1000)
  },
  methods: {
    updata(incr) {
      const vm = this
      // 若当前动画未执行完
      if (vm.timer || vm.progress) {
        vm.stop()
      }
      const { time, begin, len } = vm
      const { freq, data, total } = getRollOption({ time, begin, incr, len })
      const { nums, changeMax, ends } = init({ start: begin, incr, len })
      // 提前更新结束后的数字，防止提前结束动画引起某个数字隐藏不显示
      vm.begin += incr
      let i = 0
      let show = true

      // 每10ms，进行一次检测
      vm.timer = window.setInterval(() => {
        if (vm.progress == 1) {
          this.$emit('begin')
        }
        const item = data[i]
        show = !show
        // 根据每一帧的数据切换动画
        if (item != undefined) {
          for (let l = 0; l < nums.length; l++) {
            if (l >= changeMax && item[l].change) {
              item[l].show = show
              vm.frame.splice(l, 1, item[l])
            }
          }
        }
        // 仅当进入动画时更新下一帧
        if (show) {
          i++
        }
        vm.progress++
        this.$emit('progress', vm.progress / total)
        if (i > total - 1) {
          vm.showNums()
          window.clearInterval(vm.timer)
          this.$emit('done')
        }
      }, freq)
    },
    showNums() {
      const vm = this
      vm.nums = vm.begin
        .toString()
        .padStart(vm.len, '0')
        .split('')
        .map(n => parseInt(n))
      vm.frame = []
      for (let i = 0; i < vm.nums.length; i++) {
        vm.frame.push({
          num: vm.nums[i],
          speed: 1000,
          show: true
        })
      }
    },
    stop() {
      this.progress = 0
      // 提前结束是，直接更新至最新
      this.showNums()
      window.clearInterval(this.timer)
    },
    parse() {
      window.clearInterval(this.timer)
    }
  }
}
</script>

<style lang="scss" scoped>
$msgbox-h: 750px;
$msgbox-c: 670px;
$msgbox-top: 70px;
//sidebar
$trans: #00000000;
$light: #00ffff;

$yellow: #fadb14;
$yellow1: #fadb1402;
$yellow2: #fadb1411;
$yellow3: #fadb1422;
$yellow4: #fadb1433;
$yellow5: #fadb1444;
$yellow6: #fadb1455;
$yellow7: #fadb1488;
$yellow8: #fadb14aa;
$yellow9: #fadb14dd;
$light1: #00ffff03;
$light2: #00ffff22;
$light3: #00ffff33;
$light4: #00ffff44;
$light5: #00ffff55;
$light6: #00ffff66;
$light7: #00ffff77;
$light8: #00ffffaa;
$light9: #00ffffdd;
$blue:#225ac0;
$blue1:#225ac011;
$blue2:#225ac022;
$blue3:#225ac033;
$blue4:#225ac044;
$blue5:#225ac055;
$blue6:#225ac066;
$blue7:#225ac088;
$blue8:#225ac0aa;
$blue9:#225ac0dd;
$danger: #a30100;

.gmv-show-gmv {
  width: 100%;
  display: flex;
  justify-items: start;
  align-items: center;
}
.box {
  margin: 3px;
  height: 40px;
  font-size: 1.7em;
  width: 28px;
  line-height: 40px;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid $light;
  color: $light;
  overflow: hidden;
  border-image: linear-gradient($trans, $trans, $light8) 1 round;
  background: linear-gradient($light8, $trans, $trans);
}

.box-light {
  @extend .box
}

.box-blue {
  border: 1px solid $blue;
  color: $blue;
  border-image: linear-gradient($trans, $trans, $blue8) 1 round;
  background: linear-gradient($blue8, $trans, $trans);
  @extend .box
}

.box-yellow {
  border: 1px solid $yellow;
  font-size: 1.5em;
  margin: 2.5px;
  color: $yellow;
  border-image: linear-gradient($trans, $trans, $yellow8) 1 round;
  background: linear-gradient($yellow8, $trans, $trans);
  @extend .box;
  width: 22px;
  height: 35px;
  line-height: 35px;
}
</style>
