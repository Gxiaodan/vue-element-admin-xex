<template>
  <div>
    <el-button>aaa</el-button>
    ggggggg
    <div class="container">
      <el-input v-model="message" type="text" @change="changeVal" />
      <!-- <button type="button"
        v-clipboard:copy="message"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError">Copy!</button> -->
      <button
        v-clipboard:copy="message"
        type="button"
      >Copy!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Clipboard',
  components: { },
  data() {
    return {
      message: 'Copy These Text'
    }
  },

  computed: {
  },
  mounted() {
  },
  created() {
  },
  methods: {
    onCopy: function(e) {
      alert('You just copied: ' + e.text)
    },
    onError: function(e) {
      alert('Failed to copy texts')
    },
    changeVal(val) {
      debugger
      this.$copyText(val)
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

