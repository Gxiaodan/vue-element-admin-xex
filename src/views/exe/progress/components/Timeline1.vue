<template>
  <div class="dx-timeline1" r>

    <div class="dx-progress-bar">
      曲线运动
      <el-button id="btn1" @click="btn1Click">顺时针旋转</el-button>
      <el-button id="btn2" @click="btn2Click">逆时针旋转</el-button>
      <el-button id="btn3" @click="btn3Click">暂停</el-button>
      <el-button id="reset" @click="resetClick">还原</el-button>
      <div ref="circle_path" style="height: 298px;width:298px;border:1px solid black;border-radius:50%;position: relative;top:50px;left:50px;">
        <div ref="circle_node" style="height: 40px;width: 40px;background-color:pink;position: absolute;left:130px;top:280px;border-radius:50%">
          我
        </div>
      </div>
      <canvas id="myCanvas" ref="canvas" />
      <canvas id="canvas" width="600" height="300" />
      <div class="wrapper">
        <!-- 第一张  -->
        <div class="obj">
          <div>111</div>
        </div>
        <!-- 第二张 -->
        <div class="obj obj--2">
          <div>222222</div>
        </div>
        <!-- 第三张 -->
        <div class="obj obj--3">
          33333
        </div>
        <!-- 轨迹图 -->
        <div class="wrapper-text">
          回转轨迹
        </div>

        <svg viewBox="0 0 431.7 422.6">
          <path
            d="M10,10   l300,0  0,300  -300,0  0,-300"
            fill="lightgreen"
            stroke="white"
            stroke-width="13"
            stroke-miterlimit="10"
          />
          <!-- ********************
                   M代表位置信息，二维位置XY；fill填none代表无填充；stroke线条颜色；stroke-width线条大小
			******************** -->
        </svg>
      </div>

      <div class="wrapper1">
        <!-- 第一张 -->
        <div class="obj1">
          111
        </div>
        <!-- 第二张 -->
        <div class="obj1 obj1--2">
          222
        </div>
        <!-- 第三张 -->
        <div class="obj1 obj1--3">
          333
        </div>
        <!-- 轨迹图 -->
        <div class="wrapper-text">
          导向轨迹
        </div>

        <svg viewBox="0 0 431.7 422.6">
          <path
            d="M10,10   l300,0  0,300  -300,0  0,120"
            fill="none"
            stroke="white"
            stroke-width="13"
            stroke-miterlimit="10"
          />
          <!-- ********************
                   M代表位置信息，二维位置XY；fill填none代表无填充；stroke线条颜色；stroke-width线条大小
			******************** -->
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Timeline1',
  props: {

  },
  data() {
    return {
      // activeLeft: 0,
      activeIndex: 0,
      time: 0 // 定义运动的执行次数
    }
  },
  computed: {
    activeLeft() {
      return this.data[this.activeIndex].left - (this.selectNodeSize[0] - this.nodeSize[0]) / 2
    },
    containerStyle() {
      const style = {}
      style.background = `url(${this.bgImage}) center / 100% 100%`
      return style
    },
    outerBarStyle() {
      const style = {}
      style.width = this.layout.w + 'px'
      style.height = this.outerBarHeight + 'px'
      style.top = (this.layout.h - this.outerBarHeight) / 2 + 'px'
      style.background = `${this.outerBarColor} url(${this.outerBarImg}) center / 100% 100%`
      return style
    },
    innerBarStyle() {
      const style = {}
      if (this.animateType == 'barMove') {
        if (this.data.length - 1 == this.activeIndex) {
          style.width = this.layout.w + 'px'
        } else if (this.activeIndex == 0) {
          style.width = 0
        } else {
          style.width = this.data[this.activeIndex].left + this.nodeSize[0] / 2 + 'px'
        }
        style.height = this.innerBarHeight + 'px'
        style.top = (this.outerBarHeight - this.innerBarHeight) / 2 + 'px'
        style.background = `${this.innerBarColor} url(${this.innerBarImg}) center / 100% 100%`
        if (this.isAnimate) { style.transition = `all ${this.animateTime}s ease` }
      }
      return style
    },
    activeNodeStyle() {
      const style = {}
      style.width = this.selectNodeSize[0] + 'px'
      style.height = this.selectNodeSize[1] + 'px'
      style.background = `url(${this.nodeSelectImg}) center / 100% 100%`
      style.top = (this.layout.h - this.selectNodeSize[1]) / 2 + 'px'
      style.transform = `rotate(-${this.barAngle}deg)`
      if (this.isAnimate) { style.transition = `all ${this.animateTime}s ease` }
      return style
    },
    nodeStyle() {
      const style = {}
      style.width = this.nodeSize[0] + 'px'
      style.height = this.nodeSize[1] + 'px'
      style.background = `url(${this.nodeImg}) center / 100% 100%`
      if (this.isAnimate) { style.transition = `all ${this.animateTime}s ease` }
      return style
    },
    commonLabelStyle() {
      const style = {}
      style.width = this.labelWidth + 'px'
      style.textAlign = this.labelAlign
      // style.verticalAlign = this.labelPosition;
      style.marginLeft = this.labelPadding[1] + 'px'
      return style
    },
    activeLabelStyle() {
      const style = {}
      style.fontSize = this.checkedLabelFontSize + 'px'
      style.color = this.checkedLabelColor
      style.fontFamily = this.checkedLabelFont
      style.fontWeight = this.checkedLabelFontWeight
      style.lineHeight = this.checkedLabelLineHeight + 'px'
      if (this.isAnimate) { style.transition = `all ${this.animateTime}s ease` }
      return style
    },
    labelStyle() {
      const style = {}
      style.fontSize = this.unCheckedLabelFontSize + 'px'
      style.color = this.unCheckedLabelColor
      style.fontFamily = this.unCheckedLabelFont
      style.fontWeight = this.unCheckedLabelFontWeight
      style.lineHeight = this.unCheckedLabelLineHeight + 'px'
      if (this.isAnimate) { style.transition = `all ${this.animateTime}s ease` }
      return style
    },
    activeDesStyle() {
      const style = {}
      style.fontSize = this.checkedDesFontSize + 'px'
      style.color = this.checkedDesColor
      style.fontFamily = this.checkedDesFont
      style.fontWeight = this.checkedDesFontWeight
      style.lineHeight = this.checkedDesLineHeight + 'px'
      if (this.isAnimate) { style.transition = `all ${this.animateTime}s ease` }
      return style
    },
    desStyle() {
      const style = {}
      style.fontSize = this.unCheckedDesFontSize + 'px'
      style.color = this.unCheckedDesColor
      style.fontFamily = this.unCheckedDesFont
      style.fontWeight = this.unCheckedDesFontWeight
      style.lineHeight = this.unCheckedDesLineHeight + 'px'
      if (this.isAnimate) { style.transition = `all ${this.animateTime}s ease` }
      return style
    },
    commonDesStyle() {
      const style = {}
      style.width = this.nodeDesWidth + 'px'
      style.textAlign = this.nodeDesAlign
      // style.verticalAlign = this.nodeDesPosition;
      style.marginLeft = this.nodeDesPadding[1] + 'px'
      return style
    },
    nodeConStyle() {
      const style = {}
      style.width = this.nodeSize[0] + 'px'
      style.height = this.nodeSize[1] + 'px'
      style.top = (this.layout.h - this.nodeSize[1]) / 2 + 'px'
      style.transform = `rotate(-${this.barAngle}deg)`
      style.transformOrigin = 'center center'
      return style
    }
  },
  watch: {
  },
  created() {

  },
  mounted() {
    // let index = this.data.findIndex(item => {
    //   return item.id == this.activeNode
    // })
    // index = index == -1 ? 0 : index
    // this.activeLeft = this.data[index].left - (this.selectNodeSize[0] - this.nodeSize[0]) / 2;
    // this.activeIndex = index
    this.activeChange({}, this.activeIndex, '-once')
  },
  methods: {
    // handleClick(item, index, event, once = '') {
    //   $bus.emit(this.id + once + '-' + 'click',item, event)
    // }
    activeChange(item, index, once = '') {
      this.activeIndex = index
      $bus.emit(this.id + once + '-' + 'click', this.data[this.activeIndex])
    },
    resetClick() {
      clearInterval(this.$refs.circle_node.timer)
      // 获取Canvas对象(画布)
      var canvas = document.getElementById('myCanvas') ? document.getElementById('myCanvas') : this.$refs.canvas
      console.log(canvas, this.$refs.canvas)
      // 简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误
      if (canvas.getContext) {
        // 获取对应的CanvasRenderingContext2D对象(画笔)
        var ctx = canvas.getContext('2d')
        // 注意，Canvas的坐标系是：Canvas画布的左上角为原点(0,0)，向右为横坐标，向下为纵坐标，单位是像素(px)。
        // 开始一个新的绘制路径
        ctx.beginPath()
        // 定义直线的起点坐标为(10,10)
        ctx.moveTo(10, 10)
        // 定义直线的终点坐标为(50,10)
        ctx.lineTo(10, 50)
        ctx.lineTo(200, 50)
        ctx.lineTo(200, 150)
        ctx.lineTo(10, 150)
        // 图形填充色
        // canvas.fillStyle="#FFFFFF"
        // ctx.fill();
        // 线条的颜色
        ctx.lineWidth = 30
        ctx.strokeStyle = '#F00'
        // 沿着坐标点顺序的路径绘制直线
        ctx.stroke()
        // //关闭当前的绘制路径
        ctx.closePath()
      }
    },
    btn1Click() {
      this.circleMove({ obj: this.$refs.circle_node, r: 150, x0: this.getCSS('circle_path', 'left') + 75, y0: this.getCSS('circle_path', 'top') + 75, a: this.$refs.circle_node.a, num: this.$refs.circle_node.num })
    },
    btn2Click() {
      this.circleMove({ obj: this.$refs.circle_node, r: 150, dir: '-', x0: this.getCSS('circle_path', 'left') + 75, y0: this.getCSS('circle_path', 'top') + 75, a: this.$refs.circle_node.a, num: this.$refs.circle_node.num })
    },
    run(cxt) {
      cxt.clearRect(0, 0, 1024, 728)
      this.drawNotChange(cxt)
      cxt.save()// 将当前以左上角坐标为(0,0)的上下文环境进行保存，这样是为了在接下来中要进行画布偏移后，可以进行还原当前的环境
      cxt.translate(500, 400) // 旋转的中心点
      cxt.rotate(this.time * Math.PI / 180)// 设定每次旋转的弧度数 = 角度数*Math.PI/180
      cxt.fillStyle = 'blue'
      cxt.beginPath()
      cxt.rect(0, -150, 100, 100)
      // cxt.arc(-150,0,30,0,2*Math.PI,false); // 小球位置 相对于原点的坐标 (x坐标，y坐标，半径，起始角度，结束角度，绘图方向：false顺时针true逆时针)
      cxt.closePath()
      cxt.fill()
      cxt.restore()// 将当前为(500,400)的点还原为（0,0）,其实在save中就是将上下文环境保存到栈中，在restore下面对其进行还原
      this.time += 1
    },

    // 绘制不变因素
    drawNotChange(context) {
      context.fillStyle = 'red'
      context.beginPath()
      context.arc(500, 400, 30, 0, 2 * Math.PI, true)
      context.closePath()
      context.fill()
      context.beginPath()
      context.arc(500, 400, 150, 1 / 2 * Math.PI, 3 / 2 * Math.PI, true) // 弧形轨迹
      // context.closePath();
      context.stroke()
    },
    btn3Click() {
      clearInterval(this.$refs.circle_node.timer)
      this.time = 0
      this.$refs.circle_node.timer = 0
      var canvas = document.getElementById('canvas')
      canvas.height = 728
      canvas.width = 1024
      var context = canvas.getContext('2d')
      this.drawNotChange(context)
      context.fillStyle = 'blue'
      context.beginPath()
      context.arc(500, 350, 30, 0, 2 * Math.PI, true) // 小球初始位置
      context.closePath()
      context.fill()
      this.$refs.circle_node.timer = setInterval(() => {
        this.run(context)
        if (this.time >= 180) {
          clearInterval(this.$refs.circle_node.timer)
        }
      }, 100)
    },
    getCSS(ele, style) {
      return this.$refs[ele].getBoundingClientRect()[style]
    },
    circleMove(json) {
      // 要操作的元素
      var obj = json.obj
      // 方向(顺时针'+'或逆时针'-')
      var dir = json.dir
      dir = dir || '+'
      // 最大圈数
      var max = json.max
      max = Number(max) || 'all'
      // 半径
      var r = json.r
      r = Number(r) || 100
      // 圆心x轴坐标
      var x0 = json.x0 || parseFloat(this.getCSS('circle_node', 'left'))
      // 圆心y轴坐标
      var y0 = json.y0 || parseFloat(this.getCSS('circle_node', 'top')) - r
      // 初始夹角，以角度为单位
      var a0 = json.a0
      a0 = Number(a) || 90
      // 当前夹角
      var a = json.a || a0
      // 当前圈数
      var num = json.num || 0
      // 清除定时器
      if (obj.timer) { return }
      // 声明当前值cur
      var cur = {}
      obj.timer = setInterval(() => {
        // 将这些瞬时值储存在obj对象中的属性中
        obj.a = a
        obj.x0 = x0
        obj.y0 = y0
        obj.x = x
        obj.y = y
        obj.num = num
        // 如果元素运动到指定圈数则停止定时器
        if (num == max) {
          clearInterval(obj.timer)
        }
        // 顺时针
        if (dir == '+') {
          a++
          if (a == a0 + 360) {
            a = a0
            num++
          }
          // 逆时针
        } else {
          a--
          if (a == a0 - 360) {
            a = a0
            num++
          }
        }
        // 更新当前值
        cur.left = parseFloat(this.getCSS('circle_node', 'left'))
        cur.top = parseFloat(this.getCSS('circle_node', 'top'))
        // 更新left和top值
        // var x = x0 + r*Math.cos(a*Math.PI/180);
        // var y = y0 + r*Math.sin(a*Math.PI/180)
        // this.$refs.circle_node.style.left = x - (this.getCSS('circle_path', 'left') -75 + 20) + 'px';
        // this.$refs.circle_node.style.top = y - (this.getCSS('circle_path', 'top') - 75 + 20)  + 'px';
        var x = r * Math.cos(a * Math.PI / 180)
        var y = r * Math.sin(a * Math.PI / 180)
        this.$refs.circle_node.style.left = x + 150 - 20 + 'px'
        this.$refs.circle_node.style.top = y + 150 - 20 + 'px'
      }, 20)
    }
  }
}
</script>
<style scoped>
/* * {
  box-sizing: border-box;
}

:root .wrapper {
  --delay: 0ms;
  --path: path("M10,10   l300,0  0,300  -300,0  0,-300");
}

body {
  margin: 0;
  padding: 2rem;
  min-height: 100vh;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
}

.wrapper {
  position: relative;
}

.obj {
  --color: white;
  position: absolute;
  top: 0;
  left: 0;
  offset-path: var(--path);
  offset-rotation: 0;
  motion-rotation: 0;
  animation: move 4500ms infinite ease-in-out var(--delay);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--color);
  opacity: 0;
  transform: scale(0);
}

.obj--2 {
  --delay: 1500ms;
  --color: hotpink;
  padding: 2.5% 0 0 2.5%;
  >div{

  }
}

.obj--3 {
  --delay: 3000ms;
  --color: turquoise;
  padding: 2.5% 0 0 2.5%;
}

:root .wrapper1 {
  --delay: 0ms;
  --path: path("M0,0a72.5,72.5 0 1,0 145,0a72.5,72.5 0 1,0 -145,0");
}

.wrapper1 {
  position: relative;
}

.obj1 {
  --color: white;
  position: absolute;
  top: 0;
  left: 0;
  offset-path: var(--path);
  offset-rotation: 0;
  motion-rotation: 0;
  animation: move 4500ms infinite ease-in-out var(--delay);
  animation: move 4500ms ease-in-out var(--delay);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--color);
  opacity: 0;
  transform: scale(0);
}

.obj1--2 {
  --delay: 1500ms;
  --color: hotpink;
  padding: 2.5% 0 0 2.5%;
}

.obj1--3 {
  --delay: 3000ms;
  --color: turquoise;
  padding: 2.5% 0 0 2.5%;
}

.wrapper-text {
  line-height: 1;
  position: absolute;
  top: 32%;
  left: 24%;
  color: white;
  font-size: 28px;
}
svg {
  width: 429px;
  height: 800px;
}

@keyframes appear {
  100% {
    opacity: 1;
  }
}
@keyframes move {
  10% {
    opacity: 1;
    offset-distance: 0%;
    transform: scale(1);
  }
  30% {
    box-shadow: -0.5rem 0 0.3rem var(--color, white);
  }
  70% {
    box-shadow: -0.5rem 0 0.3rem var(--color, white);
  }
  100% {
    opacity: 1;
    offset-distance: 100%;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    offset-distance: 100%;
    transform: scale(0.2);
  }
} */

</style>
