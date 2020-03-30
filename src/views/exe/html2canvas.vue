<template>
  <div>
    ggggggg
    <el-button @click="setImage">setImage</el-button>
    <el-button @click="setImage2">setImage2</el-button>
    <div id="nodeBox" slot="content" class="content-body">
      <div class="body-box">
        eeeeeeeeeeeeeeeeee
        hjsa哈哈哈哈哈哈哈哈
        <div id="canvas1" />
      </div>
    </div>
    <img id="downImg" :src="dataurl" alt="">
    <img :src="dataurl2" alt="">
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import { Line } from '@antv/g2plot'
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
      ]
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
  },
  created() {
  },
  methods: {
    setImage2() {
      const vm = this
      const domObj = document.getElementById('nodeBox')
      html2canvas(domObj, {
        onrendered: function(canvas) {
          vm.dataurl2 = canvas.toDataURL()
        }
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

