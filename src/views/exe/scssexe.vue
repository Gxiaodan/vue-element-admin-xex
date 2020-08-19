<template>
  <div>

    <div class="con">
      jjjjjjjjjjjjjjjjjjjjjjjj你看看拉萨
      <div class="con-aaa" />
      <div class="con-bbb" />
      <div class="con-ccc" />
    </div>
    <div class="error seriousError">
      Oh no! You've been hacked!
    </div>
    <div class="seriousError bgStyle">
      Oh no! You've been hacked!
    </div>
    <div>
      <p v-for="item in 3" :key="item" :class="`item-${item}`"> {{ item }} </p>
      <div v-for="item in list" :key="item" :class="[item+'-icon', 'each-exe']" />
    </div>
    <div>
      <p class="error"> error </p>
      <p class="error intrusion">
        error intrusion
        <span class="inner">inner</span>
      </p>
      <p class="intrusion">intrusion
        <span class="inner">inner</span></p>
      <p class="seriousError intrusion">seriousError <span class="inner">inner</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Scssexe',
  components: { },
  data() {
    return {
      list: [
        'puma', 'sea-slug', 'egret', 'salamander'
      ]
    }
  },

  computed: {
  },
  mounted() {
  },
  created() {
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.con{
  font: {
    size:20px;
    color: #000;
    weight: bolder;
  }
  &-aaa {
    width: 100px;
    height: 100px;
    background: fuchsia;
  }
  &-bbb {
    width: 100px;
    height: 100px;
    background:goldenrod;
  }
}
  .error {
    border: 1px #f00;
    background-color: #fdd;
    font-weight: bold;
  }
  .seriousError {
    @extend .error;
    border-width: 3px;
  }
  .bgStyle.error{
    background: url('~@/assets/404_images/404.png');
  }
  @for $i from 1 to 4 {
    .item-#{$i} {
      width: 10 * $i * 1px;
      height: 20 * $i * 1px;
      border: 1px solid #f00;
    }
  }
  .each-exe{
    width: 300px;
    height: 300px;
    border: 1px solid #0f0;
  }
  @each $bb, $val in  (puma: aa, sea-slug: bb, egret: cc, salamander: dd) {
    .#{$bb}-icon {
      background: url('/images/#{$val}.png');
    }
  }
  .error {
    color:  #f00;
    background-color: #fdd;
  }
  .error.intrusion {
    font-weight: bold;
    .inner{
      font-size: 30px;
    }
  }
  .seriousError {
    @extend .error;
    border: 3px solid #0f0;
  }

</style>

