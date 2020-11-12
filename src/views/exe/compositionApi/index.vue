<template>
  <div class="hello">
    compositionApi
    <!-- 不使用toRefs -->
    <!-- <h1>{{ state.count }}</h1> -->
    <!-- 使用toRefs -->
    <h1>{{ count }}</h1>
    <!-- <button @click="addCount"> 加 </button> -->
    <!-- 父子组件通信；增加按钮放到子组件中 -->
    <add @addCount="addCount" />
  </div>
</template>

<script>
import { reactive, toRefs, watch, watchEffect } from '@vue/composition-api'
import Add from './components/Add'

export default {
  setup() {
    const state = reactive({
      count: 0,
      msg: 'ha'
    })
    // watch监听一个数据的变化
    watch(
      () => state.count,
      (count, preCount) => {
        console.log(count, preCount)
      }
    )
    // 监听多个数据的变化
    watch(
      [() => state.count, () => state.msg],
      ([count, msg], [preCount, preMsg]) => {
        console.log(count, msg, preCount, preMsg)
      }
    )
    // watcheFFECT在组件初始化时，立即传入的一个副作用函数，
    // 并且在副作用函数中使用的属性有变化时，会重新执行
    watchEffect(
      () => {
        console.log(state.count, 'watchEffect')
      }
    )

    const addCount = () => {
      state.count++
    }
    // return { state, addCount}
    return { ...toRefs(state), addCount }
  },
  components: {
    Add
  }
}
</script>

<style scoped>

</style>

