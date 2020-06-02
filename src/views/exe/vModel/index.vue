<template>
  <div>
    <p>
      注意：<br>
      prop和model结合；model：{prop：“”，event:"update"};<br>
      然后注意：传入子组件的属性在父组件不能改变，vue会警告；
      需要重新定义一个子组件的变量；然后进行赋值、改变；
      <br>
      最后在子组件利用this.$emit("update",子组件变量)；来进行回传
    </p>
    v-model
    <p>parentsVal</p><el-button @click="addVal">parentsVal</el-button>
    <p>{{ parentsVal }}</p>
    <child-comp v-model="parentsVal" :data="parentsData" />
  </div>
</template>

<script>
import childComp from './components/childComp'

export default {
  name: 'VModel',
  components: { childComp },
  props: {

  },
  data() {
    return {
      parentsData: {
        name: 'parents77',
        age: '1'
      },
      parentsVal: 'parent'
    }
  },
  mounted() {

  },
  created() {
  },
  methods: {
    addVal() {
      this.parentsVal += '0'
    }
  }
}
</script>

<style scoped>

</style>

