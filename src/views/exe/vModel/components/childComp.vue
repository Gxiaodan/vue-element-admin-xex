<template>
  <div>
    childComp
    <p>{{ data }}</p>
    modelVal <el-button @click="add">modelVal</el-button>
    <p>{{ modelVal }}</p>
  </div>
</template>

<script>
export default {
  name: 'ChildComp',
  components: { },
  model: {
    prop: 'modelVal',
    event: 'update'
  },
  props: {
    data: {
      required: false,
      type: Object,
      default: () => {
        return {
          name: 'lala',
          age: '18'
        }
      }
    },
    modelVal: {
      type: String
    }

  },
  data() {
    return {
      parentVal: this.modelVal
    }
  },
  watch: {
    modelVal: {
      handler(n, o) {
        this.parentVal = n
      }
    }
  },
  mounted() {

  },
  created() {
  },
  methods: {
    add() {
      this.parentVal += '1'
      this.$emit('update', this.parentVal)
    }
  }
}
</script>

<style scoped>

</style>

