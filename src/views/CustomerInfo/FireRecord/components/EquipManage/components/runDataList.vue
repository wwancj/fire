<template>
  <div>
    <el-table :data="runDataList" border style="width: 100%" max-height="300px">
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="equipNo" label="设备终端号" min-width="130" align="center"></el-table-column>
      <el-table-column prop="settingValue" label="值" min-width="130" align="center"></el-table-column>
      <el-table-column prop="recordDate" label="记录时间" min-width="150" align="center"></el-table-column>
    </el-table>
    <!-- 运行日志分页区 -->
    <el-pagination
      @size-change="handleSizeChangeRun"
      @current-change="handleCurrentChangeRun"
      :current-page="1"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="runLogTotal"
    ></el-pagination>
  </div>
</template>

<script>
  import { getEquipLogListByTypeId } from '@/api/equip/EquipManage.js'
  export default {
    data() {
      return {
        // 运行日志数据列表
        runDataList: [],
        // 运行日志总条数
        runLogTotal: 0,
      }
    },
    props: {
      // 获取操作日志和运行日志列表的查询参数
      commandQueryInfo: {
        typeNo: String,
        pageNum: Number,
        pageSize: Number
      },
    },
    mounted() {
      this.getRunLogDate()
    },
    methods: {
      // 获取运行日志数据列表
      getRunLogDate() {
        getEquipLogListByTypeId(this.commandQueryInfo).then(res => {
          this.runDataList = res.list
          this.runLogTotal = res.total
        })
      },
      // 监听运行日志pagesize改变的事件
      handleSizeChangeRun(newSize) {
        this.commandQueryInfo.pageSize = newSize
        this.getRunLogDate()
      },
      // 监听运行日志页码值改变的事件
      handleCurrentChangeRun(newPage) {
        this.commandQueryInfo.pageNum = newPage
        this.getRunLogDate()
      },
    }
  }
</script>

<style>
</style>
