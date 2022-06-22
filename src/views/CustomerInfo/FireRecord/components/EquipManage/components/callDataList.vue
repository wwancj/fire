<template>
  <div>
    <el-table :data="callDataList" border style="width: 100%" max-height="300px">
      <el-table-column type="index" label="序号" width="60" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="报警类型" min-width="100" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ getEquipError(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column prop="equipNo" label="设备终端号" min-width="130" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="smokeValue" label="烟雾浓度" min-width="120" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="recordDate" label="记录时间" min-width="150" align="center" show-overflow-tooltip></el-table-column>
    </el-table>
    <!-- 报警日志分页区 -->
    <el-pagination
      @size-change="handleSizeChangeCommand"
      @current-change="handleCurrentChangeCommand"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="callLogTotal"
    ></el-pagination>
  </div>
</template>

<script>
  import { getEquipLogListByLevel } from '@/api/equip/EquipManage.js'
  export default {
    data() {
      return {

        // 报警日志数据列表
        callDataList: [],
        //报警日志总条数
        callLogTotal: 0,
      }
    },
    props:{
      // 获取报警日志的参数列表
      callQueryInfo: {
        typeNo: String,
        logLevel: String,
        pageNum: Number,
        pageSize: Number
      },
      //设备类型
      logEquipType:String
    },
    mounted() {
      this.getCallLog()
    },
    methods: {
      // 获取报警日志列表
      getCallLog() {
        getEquipLogListByLevel(this.callQueryInfo).then(res => {
          console.log(res.list)
          this.callDataList = res.list
          this.callLogTotal = res.total
        })
      },
      //获取报警类型
      getEquipError(row){
        if(row.smokeState === null){
         return '防拆报警'
            }
        else {
          if(row.smokeState === 0){
            return '烟雾报警'
          }
          else {
            return '烟雾报警解除'
          }
        }
      },
      // 监听报警日志页码值改变的事件
      handleCurrentChangeCommand(newPage) {
        this.callQueryInfo.pageNum = newPage
        this.getCallLog()
      },
      // 监听报警日志pagesize改变的事件
      handleSizeChangeCommand(newSize) {
        this.callQueryInfo.pageSize = newSize
        this.getCallLog()
      },
    }
  }
</script>

<style>
</style>
