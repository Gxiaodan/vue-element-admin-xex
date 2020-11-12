<template>
  <div>
    childComp
    <button @click="addCount">cild加</button>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from '@vue/composition-api'

export default {
  setup(props, { emit, root }) {
    //   context.root中，可以获取到2.x中的this.$store
    const store = root.$store
    const state = reactive({
      // 获取store中的值
      count: computed(
        () => store.state.app.count
      )
    })

    const addCount = () => {
      //   emit('addCount')
      store.commit('increase')
    }
    return { ...toRefs(state), addCount }
  }
}
</script>

<style scoped>

</style>

