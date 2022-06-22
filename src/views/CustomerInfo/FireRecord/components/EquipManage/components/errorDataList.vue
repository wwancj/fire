<template>
  <div>
    <el-table :data="errorDataList" border style="width: 100%" max-height="300px">
      <el-table-column type="index" label="序号" width="60" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="equipError" label="故障类型" min-width="190" align="center"></el-table-column>
      <el-table-column prop="equipNo" label="设备终端号" min-width="130" align="center"></el-table-column>
      <el-table-column prop="recordDate" label="记录时间" min-width="150" align="center"></el-table-column>
    </el-table>
    <!-- 故障日志分页区 -->
    <el-pagination
      @size-change="handleSizeChangeCommand"
      @current-change="handleCurrentChangeCommand"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="errorDataTotal"
    ></el-pagination>
  </div>
</template>

<script>
  import { getEquipLogListByLevel } from '@/api/equip/EquipManage.js'
  export default {
    data() {
      return {
        //故障日志总条数
        errorDataTotal: 0,
        // 故障日志数据列表
        errorDataList: [],
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
      this.getErrorLog()
    },
    methods:{
      // 获取故障日志列表
      getErrorLog() {
        getEquipLogListByLevel(this.callQueryInfo).then(res => {
          for(let i=0;i<res.list.length;i++){
            if(res.list[i].equipError === 1){
                res.list[i].equipError = '烟感故障'
            }
            else if(res.list[i].equipError === 2){
              res.list[i].equipError = '烟感故障解除'
            }
            else if(res.list[i].equipError === 3){
              res.list[i].equipError = '低压故障'
            }
            else{
              res.list[i].equipError = '低压故障解除'
            }
          }
          this.errorDataList = res.list
          this.errorDataTotal = res.total
        })
      },
      // 监听故障日志页码值改变的事件
      handleCurrentChangeCommand(newPage) {
        this.callQueryInfo.pageNum = newPage
        this.getErrorLog()
      },
      // 监听故障日志pagesize改变的事件
      handleSizeChangeCommand(newSize) {
        this.callQueryInfo.pageSize = newSize
        this.getErrorLog()
      },

    }
  }
</script>

<style>
</style>
