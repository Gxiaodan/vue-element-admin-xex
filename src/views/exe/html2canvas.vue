<template>
  <div>
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
        <a v-for="(value,index) in textInfo" :key="index" href="#" :style="{color:value.color}">{{ value.textKey }}</a>
      </div>
    </div>
    {{ colors }}
    <el-button @click="roatedFn('right')">右上</el-button>
    <el-button @click="roatedFn('left')">左上</el-button>
    <!-- <svg :width='width' :height='height' @mousemove='listener($event)'> -->
    <svg :width="width" :height="height">
      <!-- <svg :width='width' :height='height'  @mouseenter="mouseEnter($event)" @mouseleave="mouseLeave($event)"> -->
      <a v-for="(tag,index) in tags" :key="index" :href="tag.href">
        <el-button>11</el-button>
        <text :x="tag.x" :y="tag.y" :font-size="tag.f" :fill="colors[index]" :fill-opacity="(1-(tag.z)/600)">{{ tag.text }}</text>
      </a>
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
                  color: '#f00'
                },
                {
                  'textKey': '保险欺诈',
                  color: '#f00'
                },
                {
                  'textKey': '现金价值',
                  color: '#f00'
                },
                {
                  'textKey': '互联网产品',
                  color: '#f00'
                },
                {
                  'textKey': '线上资料库',
                  color: '#f00'
                },
                {
                  'textKey': '保单贷款',
                  color: '#f00'
                },
                {
                  'textKey': '风险意识',
                  color: '#f00'
                },
                {
                  'textKey': '保额确定',
                  color: '#ff0'
                },
                {
                  'textKey': 'E行销',
                  color: '#ff0'
                },
                {
                  'textKey': '分红险',
                  color: '#f0f'
                }
                ]
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
    }, 17)
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
      if (directive == 'right') {
        this.speedX = -Math.abs(this.speedX)
        this.speedY = Math.abs(this.speedY)
      } else if (directive == 'left') {
        this.speedX = -Math.abs(this.speedX)
        this.speedY = -Math.abs(this.speedY)
      }
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
        textColour: '#f00',
        outlineColour: '#fff',
        shape: 'sphere',
        textHeight: 14,
        reverse: true,
        noMouse: true,
        depth: 0.5,
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
#nodeBox{
  width: 300px;
  /* height: 300px; */
}
  #downImg{
    width: 200px;
    /* height: 200px; */
  }
</style>

