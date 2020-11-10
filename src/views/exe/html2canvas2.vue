<template>
  <div>
    <!-- 无背景 -->
    <svg :width="width" :height="height">
      <!-- <svg :width='width' :height='height'  @mouseenter="mouseEnter($event)" @mouseleave="mouseLeave($event)"> -->
      <a v-for="(tag,index) in tags" :key="index" :href="tag.href">
        <el-button>11</el-button>
        <text :x="tag.x" :y="tag.y" :font-size="tag.f" font-family="黑体" font-weight="bold" :fill="colors[index]" :fill-opacity="(1-(tag.z)/600)">{{ tag.text }}</text>
      </a>
    </svg>
    <el-button @click="roatedFn('right')">右上</el-button>
    <el-button @click="roatedFn('left')">左上</el-button>
    <!-- 添加背景色 -->
    <svg :width="width" :height="height">
      <a v-for="(tag,index) in tags" :key="index" href="">
        <filter :id="'solid'+ '_' + tag.text" x="0" y="0" width="1.2" border-radius="10" height="1.2">
          <feFlood :flood-color="colors[index]" flood-opacity=".4" />
          <feComposite in="SourceGraphic" />
        </filter>
        <text
          :filter="`url(#solid_${tag.text})`"
          :x="tag.x"
          :y="tag.y"
          :font-size="tag.f"
          font-family="黑体"
          font-weight="bold"
          :fill="colors[index]"
          :fill-opacity="(1-(tag.z)/600)"
        >{{ tag.text }}</text>
      </a>
    </svg>
  </div>
</template>

<script>
import '@/utils/tagcanvas'
export default {
  name: 'Html2canvas',
  components: { },
  data() {
    return {
      dataurl: '',
      dataurl2: '',
      width: 700,
      height: 700,
      tagsNum: 20,
      RADIUS: 200,
      speedX: Math.PI / 360,
      speedY: Math.PI / 360,
      tags: [],
      colors: [],
      timer: null,
      rotateSpeed: 12
    }
  },

  computed: {
    CX() { // 球心x坐标
      return this.width / 2
    },
    CY() { // 球心y坐标
      return this.height / 2
    }
  },
  mounted() {
    console.log(`this.speedX = ${this.speedX}; this.speedY = ${this.speedY}`)
    this.timer = setInterval(() => {
      this.rotateX(this.speedX)
      this.rotateY(this.speedY)
      console.log(this.rotateSpeed)
    }, this.rotateSpeed)
  },
  created() {
    const tags = []
    for (let i = 0; i < this.tagsNum; i++) {
      const tag = {}
      const k = -1 + (2 * (i + 1) - 1) / this.tagsNum
      const a = Math.acos(k)
      const b = a * Math.sqrt(this.tagsNum * Math.PI)
      tag.text = i + 'tag'
      tag.x = this.CX + this.RADIUS * Math.sin(a) * Math.cos(b)
      tag.y = this.CY + this.RADIUS * Math.sin(a) * Math.sin(b)
      tag.z = this.RADIUS * Math.cos(a)
      tag.f = Math.round(Math.random() * 40)
      tag.href = 'https://imgss.github.io'
      tags.push(tag)
      this.colors.push(`rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},1)`)
    }
    this.tags = tags
  },
  methods: {
    roatedFn(directive) {
      if (directive == 'right') {
        this.speedX = -Math.abs(this.speedX)
        this.speedY = Math.abs(this.speedY)
        this.rotateSpeed = 100
      } else if (directive == 'left') {
        this.speedX = -Math.abs(this.speedX)
        this.speedY = -Math.abs(this.speedY)
        this.rotateSpeed = 10
      }
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.rotateX(this.speedX)
        this.rotateY(this.speedY)
        console.log(this.rotateSpeed)
      }, this.rotateSpeed)
      console.log(`this.speedX = ${this.speedX}; this.speedY = ${this.speedY}`)
    },
    mouseEnter() {
      clearInterval(this.timer)
    },
    mouseLeave() {
      this.timer = setInterval(() => {
        console.log(`this.speedX = ${this.speedX}; this.speedY = ${this.speedY}`)
        this.rotateX(this.speedX)
        this.rotateY(this.speedY)
      }, 17)
    },
    rotateX(speedX) {
      var cos = Math.cos(speedX)
      var sin = Math.sin(speedX)
      for (const tag of this.tags) {
        var y1 = (tag.y - this.CY) * cos - tag.z * sin + this.CY
        var z1 = tag.z * cos + (tag.y - this.CY) * sin
        tag.y = y1
        tag.z = z1
      }
    },
    rotateY(speedY) {
      var cos = Math.cos(speedY)
      var sin = Math.sin(speedY)
      for (const tag of this.tags) {
        var x1 = (tag.x - this.CX) * cos - tag.z * sin + this.CX
        var z1 = tag.z * cos + (tag.x - this.CX) * sin
        tag.x = x1
        tag.z = z1
      }
    },
    listener(event) { // 响应鼠标移动
      var x = event.clientX - this.CX
      var y = event.clientY - this.CY
      // console.log(`x=${x};y=${y}`)
      this.speedX = x * 0.0001 > 0 ? Math.min(this.RADIUS * 0.00002, x * 0.0001) : Math.max(-this.RADIUS * 0.00002, x * 0.0001)
      this.speedY = y * 0.0001 > 0 ? Math.min(this.RADIUS * 0.00002, y * 0.0001) : Math.max(-this.RADIUS * 0.00002, y * 0.0001)
    },

    starTagCanvas() {
      const vm = this
      TagCanvas.Start('myCanvas', 'tags', {
        interval: 20,
        textColour: null,
        outlineColour: '#fff',
        shape: 'vring(0.5)', // hring vring(0.5) hcylinder  vcylinder sphere
        textFont: null,
        reverse: true,
        noMouse: true,
        depth: 0.5,
        weight: true,
        dragControl: false,
        //                    decel:0.95,
        maxSpeed: 0.05,
        minSpeed: 0.05,
        initial: [-0.08, 0]
      })
    },
    setImage() {
      const that = this
      var canvas2 = document.createElement('canvas')
      // let _canvas = document.getElementById('child');
      const _canvas = document.getElementById('nodeBox')
      var w = parseInt(window.getComputedStyle(_canvas).width)
      var h = parseInt(window.getComputedStyle(_canvas).height)
      // 将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
      canvas2.width = w * 10
      canvas2.height = h * 10
      canvas2.style.width = w + 'px'
      canvas2.style.height = h + 'px'
    }
  }
}
</script>

<style scoped>
  @import "./index.css";
#nodeBox{
  width: 300px;
  /* height: 300px; */
}
  #downImg{
    width: 200px;
    /* height: 200px; */
  }
</style>

