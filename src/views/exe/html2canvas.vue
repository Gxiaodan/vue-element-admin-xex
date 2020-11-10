<template>
  <div>
    <svg :width="width" :height="height">
      <a v-for="(tag,index) in tags" :key="index">
        <svg :x="tag.x" :y="tag.y" :width="tag.width" :height="tag.height">
          <defs>
            <pattern id="img1" patternUnits="userSpaceOnUse" x="0" y="0" :width="tag.width" :height="tag.height">
              <image xlink:href="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2017348187,2473287815&fm=26&gp=0.jpg" />
            </pattern>
          </defs>
          <rect :width="tag.width" :height="tag.height" style="fill:url(#img1)" />
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">道沿停车管理</text>
        </svg>
      </a>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {},
  props: {
    size: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      width: 700,
      height: 700,
      tagsNum: 12,
      RADIUS: 200,
      speedX: Math.PI / 360,
      speedY: Math.PI / 360,
      tags: [],
      timer: null,
      rotateSpeed: 30
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
    this.timer = setInterval(() => {
      this.rotateX(this.speedX)
      this.rotateY(this.speedY)
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
      tag.width = this.size * 100 * 2
      tag.height = this.size * 100 * (9 / 16)
      tags.push(tag)
    }
    this.tags = tags
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
    #nodeBox {
        width: 300px;
        /* height: 300px; */
    }

    #downImg {
        width: 200px;
        /* height: 200px; */
    }

    .text_border {
        border: 1px solid red;
    }
</style>

