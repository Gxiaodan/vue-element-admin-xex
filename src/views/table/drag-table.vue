<template>
  <div class="app-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">

      <el-table-column
        v-for="(item, index) in cols"
        :key="`col_${index}`"
        :prop="dropCol[index].prop"
        :label="item.label"
      >
        <template slot-scope="{row}">
          <span v-if="dropCol[index].prop=='timestamp'">{{ row[dropCol[index].prop] | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          <span v-else-if="dropCol[index].prop=='Drag'">
            <svg-icon class="drag-handler" icon-class="drag" />
          </span>
          <span v-else-if="dropCol[index].prop== 'importance'">
            <svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="icon-star" />
          </span>
          <span v-else-if="dropCol[index].prop== 'status'">
            <el-tag :type="row.status | statusFilter">
              {{ row.status }}
            </el-tag>
          </span>
          <span v-else>{{ row[dropCol[index].prop] }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" label="ID" width="65" :prop="dropCol[getProp('ID')].prop">
        <template slot-scope="{row}">
          <span>{{ row[dropCol[getProp('ID')].prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date" :prop="dropCol[getProp('Date')].prop">
        <template slot-scope="{row}">
          <span>{{ row[dropCol[getProp('Date')].prop] | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="Author">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="Importance">
        <template slot-scope="{row}">
          <svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="icon-star" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="Readings" width="95">
        <template slot-scope="{row}">
          <span>{{ row.pageviews }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Drag" width="80">
        <template slot-scope="{}">
          <svg-icon class="drag-handler" icon-class="drag" />
        </template>
      </el-table-column> -->
    </el-table>
    <div class="show-d">
      <el-tag>The default order :</el-tag> {{ oldList }}
    </div>
    <div class="show-d">
      <el-tag>The after dragging order :</el-tag> {{ newList }}
    </div>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import Sortable from 'sortablejs'

export default {
  name: 'DragTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      sortable: null,
      dropCol: [
        {
          label: 'ID',
          prop: 'id'
        },
        {
          label: 'Date',
          prop: 'timestamp'
        },
        {
          label: 'Author',
          prop: 'author'
        },
        {
          label: 'Importance',
          prop: 'importance'
        },
        {
          label: 'Readings',
          prop: 'pageviews'
        },
        {
          label: 'Status',
          prop: 'status'
        },
        {
          label: 'Drag',
          prop: 'Drag'
        }
      ],
      cols: [
        {
          label: 'ID',
          prop: 'id'
        },
        {
          label: 'Date',
          prop: 'timestamp'
        },
        {
          label: 'Author',
          prop: 'author'
        },
        {
          label: 'Importance',
          prop: 'importance'
        },
        {
          label: 'Readings',
          prop: 'pageviews'
        },
        {
          label: 'Status',
          prop: 'status'
        },
        {
          label: 'Drag',
          prop: 'Drag'
        }
      ],
      oldList: [],
      newList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { data } = await fetchList(this.listQuery)
      this.list = data.items
      this.total = data.total
      this.listLoading = false
      this.oldList = this.list.map(v => v.id)
      this.newList = this.oldList.slice()
      this.$nextTick(() => {
        this.setSort()
        this.columnDrop()
      })
    },
    getProp(val) {
      const index = this.dropCol.findIndex(item => {
        return item.label = val
      })
      return index
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)

          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    },
    // 列拖拽
    columnDrop() {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: evt => {
          const oldItem = this.dropCol[evt.oldIndex]
          this.dropCol.splice(evt.oldIndex, 1)
          this.dropCol.splice(evt.newIndex, 0, oldItem)
        }
      })
    }
  }
}
</script>

<style>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>

<style scoped>
.icon-star{
  margin-right:2px;
}
.drag-handler{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d{
  margin-top: 15px;
}
</style>
