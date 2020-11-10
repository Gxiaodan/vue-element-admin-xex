<template>
  <div>
    <el-button>aaa</el-button>
    ggggggg
    <el-button @click="setImage">setImage</el-button>
    <div id="nodeBox" slot="content" class="content-body">
      <div class="body-box">
        eeeeeeeeeeeeeeeeee
        hjsa哈哈哈哈哈哈哈哈
        <div id="canvas1" />
      </div>
    </div>
    <img id="downImg" :src="dataurl" alt="">
    <img :src="dataurl2" alt="">
    <el-button @click="starTagCanvas">starTagCanvas</el-button>
    <div id="myCanvasContainer">
      <canvas id="myCanvas" width="300" height="300" />
      <div id="tags" style="display:none">
        <a
          v-for="(value,index) in textInfo"
          :key="index"
          href="#"
          :style="{color:value.color,fontSize:`${value.fontSize}px`,
                   fontFamily: '宋体'}"
        >{{ value.textKey }}</a>
      </div>
    </div>
    {{ colors }}
    <el-button @click="roatedFn('right')">右上</el-button>
    <el-button @click="roatedFn('left')">左上</el-button>
    <!-- <svg :width='width' :height='height' @mousemove='listener($event)'> -->
    <svg :width="width" :height="height">
      <!-- <svg :width='width' :height='height'  @mouseenter="mouseEnter($event)" @mouseleave="mouseLeave($event)"> -->
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
        <!-- <defs>
                <pattern id="polka-dots" x="tag.x" :y="tag.y" width="100" height="100" patternUnits="userSpaceOnUse">

                    <circle fill="#bee9e8" cx="50" cy="50" r="25">
                    </circle>filter
                </pattern>
            </defs>
            <rect :x="tag.x" :y="tag.y"  fill="url(#polka-dots)"></rect>
            <text  fill="#f00"  :x="tag.x" :y="tag.y" font-size="50">{{ tag.text }}</text> -->
      </a>
    </svg>
    <!-- <svg width="100%" height="100%">
    <defs>
        <filter x="0" y="0" width="1" height="1" id="solid">
        <feFlood flood-color="yellow"/>
        <feComposite in="SourceGraphic"/>
        </filter>
    </defs>
    <text filter="url(#solid)" x="20" y="50" font-size="50">solid background</text>
    </svg> -->
    <svg width="300" height="100">
      <defs>
        <pattern id="img2" patternUnits="userSpaceOnUse" x="0" y="0" width="1000" height="200">
          <image xlink:href="./bg.png" width="400" height="60" />
        </pattern>
      </defs>
      <path
        d="M5,5
            l0,60 l400,0 l0,-60 l-400,0"
        fill="url(#img2)"
      />
      <rect x="0" y="0" width="400" height="60" fill="url(#img2)" />
      <!-- <image x="0" y="0" xlink:href="./bg.png" width="300" height="100" />  -->
      <text fill="#f00" x="20" y="50" font-size="50">solid</text>
    </svg>

    <svg width="1000" height="700">
      <!-- <rect fill="#fff" width="100%" height="100%"></rect> -->

      <defs>
        <pattern id="img1" patternUnits="userSpaceOnUse" x="0" y="0" width="1000" height="700">
          <image xlink:href="https://lorempixel.com/600/450/" width="600" height="450" />
        </pattern>
      </defs>
      <path
        d="M5,5
            l0,680 l980,0 l0,-680 l-980,0"
        fill="url(#img1)"
      />
    </svg>

    <svg width="100%" height="100%">
      <defs>
        <pattern id="polka-dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">

          <circle fill="#bee9e8" cx="50" cy="50" r="25" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="100" height="100" fill="url(#polka-dots)" />
      <text fill="#f00" x="20" y="50" font-size="50">solid background</text>
    </svg>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import { Line } from '@antv/g2plot'
import '@/utils/tagcanvas'
export default {
  name: 'Html2canvas',
  components: { },
  data() {
    return {
      dataurl: '',
      dataurl2: '',
      data: [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 }
      ],
      width: 700,
      height: 700,
      tagsNum: 20,
      RADIUS: 200,
      speedX: Math.PI / 360,
      speedY: Math.PI / 360,
      tags: [],
      colors: [],
      timer: null,
      textInfo:
                [{
                  'textKey': '金融在线',
                  color: '#f00',
                  fontSize: 40
                },
                {
                  'textKey': '保险欺诈',
                  color: '#f00',
                  fontSize: 12
                },
                {
                  'textKey': '现金价值',
                  color: '#f00',
                  fontSize: 12
                },
                {
                  'textKey': '互联网产品',
                  color: '#f00',
                  fontSize: 12
                },
                {
                  'textKey': '线上资料库',
                  color: '#f00',
                  fontSize: 12
                },
                {
                  'textKey': '保单贷款',
                  color: '#f00',
                  fontSize: 12
                },
                {
                  'textKey': '风险意识',
                  color: '#f00',
                  fontSize: 12
                },
                {
                  'textKey': '保额确定',
                  color: '#ff0',
                  fontSize: 12
                },
                {
                  'textKey': 'E行销',
                  color: '#ff0',
                  fontSize: 12
                },
                {
                  'textKey': '分红险',
                  color: '#f0f',
                  fontSize: 12
                }
                ],
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
    const linePlot = new Line('canvas1', {
      title: {
        visible: true,
        text: '折线图'
      },
      data: this.data,
      xField: 'year',
      yField: 'value'
    })
    linePlot.render()
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
      debugger
    }
    this.tags = tags
  },
  methods: {
    roatedFn(directive) {
      debugger
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
      // 可以按照自己的需求，对context的参数修改,translate指的是偏移量
      var context = canvas2.getContext('2d')
      context.scale(10, 10)
      html2canvas(document.getElementById('nodeBox'), {
        canvas: canvas2
      }).then(function(canvas) {
        var blob = that.getBlob(canvas)
        var oMyForm = new FormData()
        var fileName = 'mobile' + '.jpg'
        oMyForm.append('file', blob, fileName)
        //              oMyForm.append("fileName", fileName);
        oMyForm.append('fileType', 'image')
        oMyForm.append('user_id', that)
      })
    },
    getBlob(canvas) { // 获取blob对象
      var data = canvas.toDataURL('image/jpeg', 1)
      this.dataurl = data
      console.log(this.dataurl)
      data = data.split(',')[1]
      data = window.atob(data)
      var ia = new Uint8Array(data.length)
      for (var i = 0; i < data.length; i++) {
        ia[i] = data.charCodeAt(i)
      }
      return new Blob([ia], {
        type: 'image/jpeg'
      })
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

