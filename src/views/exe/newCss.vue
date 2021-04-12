<template>
  <div>
    css新特性
    <h1>css3渐变属性</h1>
    <h3>线性渐变linear-gradient</h3>
    <h3>径向渐变radial-gradient</h3>
    <div class="css-box liner-box liner1" />
    repeating-linear-gradient
    <div class="css-box liner-box liner2" />
    <div class="css-box radial-box radial1" />
    <div class="css-box radial-box radial2" />

    <h3>圆锥形渐变conic-gradient</h3>
    <div class="css-box conic-box conic1" />
    <div class="css-box conic-box conic2" />
    <div class="css-box conic-box conic3" />
    <div class="css-box conic-box conic4" />
    <div class="bg">
      <div class="point" />
    </div>
    <div class="progress" />
    <h3>border-radius/box-shadow新玩法</h3>
    <div class="css-box border-box" />
  </div>
</template>

<script>
export default {
  name: 'NewCss',
  components: {},
  props: {
  },
  data() {
    return {
    }
  },

  computed: {
  },
  mounted() {
  },
  created() {
  },
  methods: {
    getProgress(progress) {
      if (progress > 1) progress = 1
      // 角度加90，对称轴变换
      let deg = 360 * progress + 90
      if (deg >= 360) deg -= 360
      return `linear-gradient(${progress > 0.5 ? `-90deg, #02cb73` : `90deg, #f2f2f2`}             
      50%,transparent 50%),linear-gradient(${deg}deg, #02cb73 50%, #f2f2f2 50%)`
    }
  }
}
</script>

<style lang='scss'>
   .css-box{
     width: 500px;
     height: 500px;
     border: 1px solid #000;
     &.liner1{
      background-image:linear-gradient(to bottom right,orange 0,orange 49%,transparent 50%,transparent 100%);
     }
     &.liner2{
       background:repeating-linear-gradient(60deg,#f00,#0f0,5px ,#fff 0,#000  10px);
     }
     &.radial1{
       background-image:radial-gradient(transparent 0,transparent 49%,orange 50%,orange 100%)
     }
     &.conic1{
       background: conic-gradient(green, orange);;
     }
     &.conic2{
       background: conic-gradient(from 80deg at 50% 20% , green 20%, orange 50%);;
     }
     &.conic3{
       background: conic-gradient(red, magenta, blue, aqua, lime, yellow, red);
     }
     &.conic4{
       background: conic-gradient(#3ebd3e 0, #3ebd3e 30%, #ff9800 30%, #ff9800 70%, #03a9f4 70%, #03a9f4 100%);
     }
   }

     .bg {
        position: relative;
        margin: 50px auto;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: conic-gradient(#f1462c 0%, #fc5d2c 12.4%, #fff 12.5%, #fff 12.5%, #fc5d2c 12.5%, #fba73e 24.9%, #fff 24.9%, #fff 25%, #fba73e 25%, #e0fa4e 37.4%, #fff 37.4%, #fff 37.5%, #e0fa4e 37.5%, #12dd7e 49.9%, #fff 49.9%, #fff 50%, #12dd7e 50%, #0a6e3f 62.4%, #fff 62.4%, #fff 62.5%);
        transform: rotate(-112.5deg);
        transform-origin: 50% 50%;
    }

    .bg::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 370px;
        height: 370px;
        border-radius: 50%;
        background: #fff;
    }

    .bg::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 320px;
        height: 320px;
        border-radius: 50%;
        background:
            radial-gradient(#fff 0%, #fff 25%, transparent 25%, transparent 100%),
            conic-gradient(#f1462c 0, #f1462c 12.5%, #fba73e 12.5%, #fba73e 25%, #e0fa4e 25%, #e0fa4e 37.5%, #12dd7e 37.5%, #12dd7e 50%, #0a6e3f 50%, #0a6e3f 62.5%, #fff 62.5%, #fff 100%);
    }

    .point {
        position: absolute;
        width: 30px;
        height: 30px;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        background: radial-gradient(#467dc6 0%, #a4c6f3 100%);
        border-radius: 50%;
        z-index: 999;
    }

    .point::before {
        content: "";
        position: absolute;
        width: 5px;
        height: 350px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(0);
        border-radius: 100% 100% 5% 5%;
        background: linear-gradient(
            180deg,
            #9bc7f6 0,
            #467dc6 50%,
            transparent 50%,
            transparent 100%
        );
        animation: pointerRotate 3s cubic-bezier(.93, 1.32, .89, 1.15) infinite;
    }

    @keyframes pointerRotate {
        50% {
            transform: translate(-50%, -50%) rotate(150deg);
        }
        100% {
            transform: translate(-50%, -50%) rotate(150deg);
        }
    }
    .progress {
        width: 100px;
        height: 100px;
        padding: 4px; // padding属性设置线条宽度
      border-radius: 50%;
        background: linear-gradient(-90deg, #02cb73 50%, transparent 50%),linear-
        gradient(280deg, #02cb73 50%, #f2f2f2 50%);
    }
    .background {
        width: 100%;
        height: 100%;
        background: #ffffff;
        border-radius: inherit;
    }
    .border-box{
      background: conic-gradient(red, magenta, blue, aqua, lime, yellow, red);
      border-radius: 20% 80% 20% 80% / 20% 20% 80% 80%;
      box-shadow: 10px 10px 10px 20px #f00, 0px 0px 50px 20px #0f0, 0px 10px 50px 20px #ff0;
    }
</style>

