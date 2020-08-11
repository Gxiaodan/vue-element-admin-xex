<template>
  <div>
    <el-button>aaa</el-button>
    http://doc.huangsw.com/vue-easytable/app.html#/install
    editTable
    <v-table
      :width="1000"
      :columns="columns"
      :table-data="tableData"
      :show-vertical-border="false"
      :cell-edit-done="cellEditDone"
    />
  </div>
</template>

<script>
export default {
  name: 'EditTable',
  components: { },
  data() {
    return {
      tableData: [
        { 'name': '赵伟', 'tel': '156*****1987', 'hobby': '钢琴、书法、唱歌', 'address': '上海市黄浦区金陵东路569号17楼' },
        { 'name': '李伟', 'tel': '182*****1538', 'hobby': '钢琴、书法、唱歌', 'address': '上海市奉贤区南桥镇立新路12号2楼' },
        { 'name': '孙伟', 'tel': '161*****0097', 'hobby': '钢琴、书法、唱歌', 'address': '上海市崇明县城桥镇八一路739号' },
        { 'name': '周伟', 'tel': '197*****1123', 'hobby': '钢琴、书法、唱歌', 'address': '上海市青浦区青浦镇章浜路24号' },
        { 'name': '吴伟', 'tel': '183*****6678', 'hobby': '钢琴、书法、唱歌', 'address': '上海市松江区乐都西路867-871号' }
      ],
      columns: [
        { isEdit: true, field: 'name', title: '姓名', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true },
        { field: 'tel', title: '手机号码', width: 260, titleAlign: 'center', columnAlign: 'center' },
        { field: 'hobby', title: '爱好', width: 330, titleAlign: 'center', columnAlign: 'center' },
        { field: 'address', title: '地址', titleAlign: 'center', columnAlign: 'left' }
      ]
    }
  },
  mounted() {

  },
  created() {
  },
  methods: {
    cellEditDone(newValue, oldValue, rowIndex, rowData, field) {
      this.tableData[rowIndex][field] = newValue

      // 接下来处理你的业务逻辑，数据持久化等...
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./index.css";
</style>

