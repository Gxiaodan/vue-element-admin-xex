<template>
  <div>
    progress
    <hr>
    <Progress type="dashboard" :percentage="percentage" :color="colors" />
    <div>
      <el-button-group>
        <el-button icon="el-icon-minus" @click="decrease" />
        <el-button icon="el-icon-plus" @click="increase" />
      </el-button-group>
    </div>
    <hr>
    <el-progress type="circle" :percentage="25" />
    <hr>
    <el-progress :percentage="percentage" :color="colors" />
    <div>
      <el-button-group>
        <el-button icon="el-icon-minus" @click="decrease" />
        <el-button icon="el-icon-plus" @click="increase" />
      </el-button-group>
    </div>
    <hr>
    <el-progress :percentage="10" :format="format" />
    <hr>
    <el-progress :text-inside="true" :stroke-width="24" :percentage="80" status="success" />

    <hr>
    <step-progress :steps="mySteps" :current-step="currentStep" icon-class="fa fa-check" />

    <time-line />

  </div>
</template>

<script>
import Progress from './components/progress'
import TimeLine from './components/Timeline1'
import StepProgress from 'vue-step-progress'
import 'vue-step-progress/dist/main.css'

export default {
  name: 'Progress',
  components: { Progress, 'step-progress': StepProgress, TimeLine },
  props: {

  },
  data() {
    return {
      percentage: 10,
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      mySteps: ['Step 1', 'Step 2', 'Step 3'],
      currentStep: 2
    }
  },
  mounted() {

  },
  created() {
  },
  methods: {
    increase() {
      this.percentage += 10
      if (this.percentage > 100) {
        this.percentage = 100
      }
    },
    decrease() {
      this.percentage -= 10
      if (this.percentage < 0) {
        this.percentage = 0
      }
    },
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    }
  }
}
</script>

<style scoped>

</style>

