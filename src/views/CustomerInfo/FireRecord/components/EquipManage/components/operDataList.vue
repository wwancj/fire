<template>
  <div>
    <el-table :data="operDataList" border style="width: 100%" max-height="300px">
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="settingValue" label="消音值" min-width="130" align="center"></el-table-column>
      <el-table-column prop="sendDate" label="记录时间" min-width="150" align="center"></el-table-column>
      <el-table-column prop="userName" label="操作人" min-width="150" align="center"></el-table-column>
    </el-table>
    <!-- 操作日志分页区 -->
    <el-pagination
      @size-change="handleSizeChangeCommand"
      @current-change="handleCurrentChangeCommand"
      :current-page="1"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="commandLogTotal"
    ></el-pagination>
  </div>
</template>

<script>
  import { getEquipCommandLogByTypeId } from '@/api/equip/EquipManage.js'
  export default {
    data() {
      return {
        //操作日志总条数
        commandLogTotal: 0,
        // 操作日志数据列表
        operDataList: [],
      }
    },
    props:{
      // 获取操作日志和运行日志列表的查询参数
      commandQueryInfo: {
        typeNo: String,
        pageNum: Number,
        pageSize: Number
      },
    },
    mounted() {
      this.getCommandLogDate()
    },
    methods:{
      // 获取操作日志参数的列表数据
      getCommandLogDate() {
        console.log(this.commandQueryInfo)
        getEquipCommandLogByTypeId(this.commandQueryInfo).then(res => {
          this.operDataList = res.list
          this.commandLogTotal = res.total
        })
      },
      // 监听操作日志页码值改变的事件
      handleCurrentChangeCommand(newPage) {
        this.commandQueryInfo.pageNum = newPage
        this.getCommandLogDate()
      },
      // 监听操作日志pagesize改变的事件
      handleSizeChangeCommand(newSize) {
        this.commandQueryInfo.pageSize = newSize
        this.getCommandLogDate()
      },
    }
  }
</script>

<style>
</style>
