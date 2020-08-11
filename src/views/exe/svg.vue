<template>
  <div>
    svg练习
    <el-button ref="aaa" @click="testFun"><el-rate v-model="value1" />aaa</el-button>
    <svg
      version="1.1"
      baseProfile="full"
      width="300"
      height="200"
      xmlns="http://www.w3.org/2000/svg"
    >

      <rect width="100%" height="100%" fill="red" />

      <circle cx="150" cy="100" r="80" fill="green" />

      <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>

    </svg>
    <!-- <img :src="svg1"/> -->
    <img src="@/assets/img/border01.svg" width="200">
    <hr>
    <svg width="500" height="500" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="30" height="30" stroke="black" fill="transparent" strock-width="5" />
      <rect x="60" y="10" rx="10" ry="10" width="100" height="30" stroke="black" fill="transparent" stroke-width="5" />
      <circle cx="50" cy="75" r="20" stroke="red" fill="transparent" stroke-width="5" />
      <ellipse cx="75" cy="75" rx="20" ry="5" stroke="red" fill="transparent" stroke-width="5" />
      <line x1="10" x2="50" y1="110" y2="150" stroke="orange" fill="transparent" stroke-width="5" />
      <polyline points="60 110 65 120 70 115 75 130 80 125 85 140 90 135 95 150 100 145" stroke="orange" fill="transparent" stroke-width="5" />
      <!-- <polygon points="50 160 55 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180" stroke="green" fill="transparent" stroke-width="5" /> -->
      <path d="M20,230 Q40,205 50,230 T90,230" fill="none" stroke="blue" stroke-width="5" />
      <polygon
        points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180"
        stroke="green"
        fill="transparent"
        stroke-width="5"
      />
      <polygon points="150 160, 155 180, 170 180, 160 190, 165 205, 150 195, 135 205, 140 190, 130 180, 145 180" />
    </svg>

    <svg width="500px" height="500px" version="1.1" fill="transparent" style="border:1px solid #f00" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 10 H 90 V 90 H 10 L 10 10" stroke="black" />
      <circle cx="10" cy="10" r="2" fill="red" />
      <circle cx="90" cy="90" r="2" fill="red" />
      <circle cx="10" cy="90" r="2" fill="red" />
      <circle cx="90" cy="10" r="2" fill="red" />
    </svg>
    <svg width="500px" height="500px" version="1.1" style="border:1px solid #f00" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 10 H 90 V 90 H 10 Z" fill="transparent" stroke="black" />
      <path d="M100 10 h 80 v 80 h-80 z" fill="transparent" stroke="#ff0" />
    </svg>
    <svg width="190px" height="160px" version="1.1" style="border:1px solid #f00" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent" />
      <path d="M70 10 C 70 20, 120 20, 120 10" stroke="black" fill="transparent" />
      <path d="M130 10 C 120 20, 180 20, 170 10" stroke="black" fill="transparent" />
      <path d="M10 60 C 20 80, 40 80, 50 60" stroke="black" fill="transparent" />
      <path d="M70 60 C 70 80, 110 80, 110 60" stroke="black" fill="transparent" />
      <path d="M130 60 C 120 80, 180 80, 170 60" stroke="black" fill="transparent" />
      <path d="M10 110 C 20 140, 40 140, 50 110" stroke="black" fill="transparent" />
      <path d="M70 110 C 70 140, 110 140, 110 110" stroke="black" fill="transparent" />
      <path d="M130 110 C 120 140, 180 140, 170 110" stroke="black" fill="transparent" />
    </svg>
    <svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 80 C 40 10, 95 10, 95 80 S 150 150, 180 80" stroke="black" fill="transparent" />
    </svg>
    <svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 80 Q 95 10 180 80" stroke="black" fill="transparent" />
    </svg>
    <svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 80 Q 52.5 10, 95 80 T 180 80" stroke="black" fill="transparent" />
      <rect
        x="50"
        y="50"
        width="100"
        height="100"
        stroke="blue"
        fill="purple"
        fill-opacity="0.5"
        stroke-opacity="0.5"
        stroke-width="5"
        stroke-linecap="butt"
      />
    </svg>
    <svg width="160" height="140" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <line x1="40" x2="120" y1="20" y2="20" stroke="black" stroke-width="20" stroke-linecap="butt" />
      <line x1="40" x2="120" y1="60" y2="60" stroke="black" stroke-width="20" stroke-linecap="square" />
      <line x1="40" x2="120" y1="100" y2="100" stroke="black" stroke-width="20" stroke-linecap="round" />
    </svg>
    <svg width="160" height="280" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <polyline
        points="40 60 80 20 120 60"
        stroke="black"
        stroke-width="20"
        stroke-linecap="butt"
        fill="none"
        stroke-linejoin="miter"
      />

      <polyline
        points="40 140 80 100 120 140"
        stroke="black"
        stroke-width="20"
        stroke-linecap="round"
        fill="none"
        stroke-linejoin="round"
      />

      <polyline
        points="40 220 80 180 120 220"
        stroke="black"
        stroke-width="20"
        stroke-linecap="square"
        stroke-linejoin="bevel"
        strtoke-dasharray="5,5"
        fill="transparent"
      />
    </svg>
  </div>
</template>

<script>
import svg1 from '@/assets/img/border01.svg'
export default {
  name: 'Svg',
  components: { },
  data() {
    return {
      svg1,
      value1: null
    }
  },
  mounted() {

  },
  created() {
  },
  methods: {
    testFun() {
      debugger
      const ele = this.$refs.aaa.$el
      // let width = ele.style.width;
      // let height = ele.style.height;
      ele.style.width = '200px'
      ele.style.height = '80px'
      console.log(width + '=========' + height)
    }

  }
}
</script>

<style scoped>

</style>

