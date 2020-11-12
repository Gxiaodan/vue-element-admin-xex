<template>
  <div>
    tagsInput
    <el-tag closable>tags</el-tag>
    <div class="tag_con">
      <el-tag
        v-for="tag in dynamicTags"
        :key="tag"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <div
        v-if="inputVisible"
      >
        <el-input
          ref="saveTagInput"
          v-model="inputValue"
          class="input-new-tag"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-select ref="tagSelect" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

      </div>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>

    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column
        label="Date"
        prop="date"
      />
      <el-table-column
        label="Name"
        prop="name"
      />
      <el-table-column
        align="right"
      >
        <template slot="header">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
          />
        </template>
        <template v-slot="scope">
          {{ scope.column }}
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: 'TagsInput',
  components: {},
  props: {

  },
  data() {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      search: ''
    }
  },

  computed: {

  },
  mounted() {
  },
  created() {
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        //   this.$refs.saveTagInput.$refs.input.focus();
        this.$refs.tagSelect.$refs.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }

  }
}
</script>

<style scoped>
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .tag_con{
      border: 1px solid #ccc;
  }
</style>

