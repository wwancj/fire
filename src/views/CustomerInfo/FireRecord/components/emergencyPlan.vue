<template>
  <!--作者：万智宇-->
  <!--todo 应急预案-->
  <div class="role-class">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="never" class="card-10px">
          <!--单位选择 筛选器-->
          <el-select
            v-model="page.id"
            v-permission
            filterable
            clearable
            placeholder="请选择"
            style="width=250px"
            size="mini"
          >
            <el-option
              v-for="item in $unitOptions"
              :key="item.customerUnitId"
              :label="item.unitName"
              :value="item.customerUnitId"
            />
          </el-select>

          <el-button
            v-permission
            type="success"
            size="mini"
            icon="el-icon-search"
            @click="funSelectAllWithUnitName"
          >搜索</el-button>
          <el-button type="warning" size="mini" icon="el-icon-refresh-left" @click="reset">重置</el-button>
          <el-button
            v-has="{action: 'add'}"
            type="primary"
            size="mini"
            icon="el-icon-plus"
            @click="userAdd"
          >新增</el-button>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card shadow="never" class="el-table-custom-pgs table-auto">
          <div slot="header" class="clearfix">
            <span class="table-tree-top">应急预案</span>
            <el-popover placement="bottom-end" trigger="click">
              <div class="line-popver-pgs">
                <el-checkbox
                  v-model="checkAll"
                  :indeterminate="isIndeterminate"
                  @change="handleCheckAllChange"
                >全选</el-checkbox>
                <div style="margin: 15px 0;" />
                <el-checkbox-group v-model="checkedColumn" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in columnOptions" :key="city" :label="city">{{ city }}</el-checkbox>
                </el-checkbox-group>
              </div>
              <el-button slot="reference" size="mini" style="float: right;" icon="el-icon-s-grid" class="select-button" />
            </el-popover>
            <el-tooltip class="item" effect="dark" content="刷新列表" placement="top">
              <el-button
                size="mini"
                style="float: right;"
                icon="el-icon-refresh"
                @click="funSelectAllWithUnitName"
                class="select-button"
              />
            </el-tooltip>
          </div>
          <!--显示表格-->
          <el-table
            :data="tableData"
            :row-class-name="tableRowClassName"
            style="width: 100%; margin-bottom: 16px;"
            stripe
            :header-cell-style="$store.state.style.headerStyle"
            :cell-style="$store.state.style.cellStyle"
          >
            <el-table-column type="index" :index="indexMethod" align="center" label="#" width="60" />

            <el-table-column
              v-if="isShow('客户单位')"
              prop="unitName"
              label="客户单位"
              min-width="120"
              show-overflow-tooltip
            />
            <el-table-column
              v-if="isShow('演练日期')"
              prop="drillDate"
              label="演练日期"
              width="100"
              show-overflow-tooltip
            />
            <el-table-column v-if="isShow('负责人')" prop="principal" label="负责人" min-width="75" />
            <el-table-column
              v-if="isShow('演练地址')"
              prop="meetSrc"
              label="演练地址"
              min-width="150"
              show-overflow-tooltip
            />
            <el-table-column
              v-if="isShow('演练内容')"
              prop="meetContent"
              label="演练内容"
              min-width="200"
              show-overflow-tooltip
            />
            <el-table-column
              v-if="isShow('备注')"
              prop="remark"
              label="备注"
              min-width="200"
              show-overflow-tooltip
            />
            <el-table-column label="操作" fixed="right" width="160">
              <template slot-scope="scope">
                <el-button
                  v-has="{action: 'edit', effect: 'disabled'}"
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  title="修改"
                  @click="userEdit(scope.row)"
                />
                <el-popconfirm
                  icon="el-icon-info"
                  icon-color="red"
                  :title="`是否删除该数据`"
                  @confirm="userDel(scope.row)"
                >
                  <el-button
                    slot="reference"
                    v-has="{action: 'delete', effect: 'disabled'}"
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    title="删除"
                  />
                </el-popconfirm>
                <el-button type="info" size="mini" icon="el-icon-setting" title="查看附件" />
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="page.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
          <!--分页效果-->
        </el-card>
      </el-col>
    </el-row>

    <!-- 添加 -->
    <el-dialog
      title="新增"
      :visible.sync="insertPlanDialog"
      width="770px"
      @close="cancel('insertPlan')"
      :modal-append-to-body="false"
      class="huise-class"
    >
      <el-form
        ref="insertPlan"
        label-width="100px"
        class="from-format100"
        :inline="true"
        size="small"
        :model="insertPlan"
        :rules="rules"
      >
        <el-form-item label="客户单位" prop="customerUnitId">
          <el-select v-model="insertPlan.customerUnitId" filterable placeholder="请选择">
            <el-option
              v-for="item in $unitOptions"
              :key="item.customerUnitId"
              :label="item.unitName"
              :value="item.customerUnitId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="演练日期" prop="drillDate">
          <el-date-picker
            v-model="insertPlan.drillDate"
            type="date"
            placeholder="选择日期"
            validate-event
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="负责人" prop="principal">
          <el-input v-model="insertPlan.principal" />
        </el-form-item>
        <el-form-item label="演练地址" prop="meetSrc">
          <el-input v-model="insertPlan.meetSrc" />
        </el-form-item>
        <el-form-item label="演练内容" prop="meetContent">
          <el-input v-model="insertPlan.meetContent" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="insertPlan.remark" />
        </el-form-item>
        <el-form-item label="提交">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/">
            <el-button type="primary">点击提交附件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>

      <!-- 弹窗底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel('insertPlan')">取 消</el-button>
        <el-button type="primary" @click="addConfirm('insertPlan')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="编辑" class="huise-class" :visible.sync="updateUserDialog" width="770px" @close="cancel('updates')" :modal-append-to-body="false">
      <el-form
        ref="updates"
        label-width="100px"
        class="from-format100"
        :inline="true"
        size="small"
        :rules="rules"
        :model="updates"
      >
        <el-form-item label="客户单位">
          <el-select v-model="updates.customerUnitId" filterable placeholder="请选择">
            <el-option
              v-for="item in $unitOptions"
              :key="item.customerUnitId"
              :label="item.unitName"
              :value="item.customerUnitId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="演练日期">
          <el-date-picker
            v-model="updates.drillDate"
            type="date"
            placeholder="选择日期"
            validate-event
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="updates.principal" />
        </el-form-item>
        <el-form-item label="演练地址">
          <el-input v-model="updates.meetSrc" />
        </el-form-item>
        <el-form-item label="演练内容">
          <el-input v-model="updates.meetContent" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="updates.remark" />
        </el-form-item>

        <el-form-item label=" ">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/">
            <el-button type="primary">点击提交附件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 弹窗底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel('updates')">取 消</el-button>
        <el-button type="primary" @click="eaditConfirm('updates')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { verifyUserPermission } from '@/utils/validate'
import {
  selectAllMeetPlanWithUnitName,
  insertMeetPlan,
  updateMeetPlanByPrimaryKey,
  deleteMeetPlanByPrimaryKey
} from '@/api/customer/meetPlan'
export default {
  data() {
    return {
      maxHeight: 600,
      searchOption: '',
      unit: '所有单位',

      tableData: [],
      selectUserInfo: '',
      select1: '',
      selectTime: '',

      columnOptions: [
        '预案编号',
        '客户单位',
        '演练日期',
        '负责人',
        '演练地址',
        '演练内容',
        '备注'
      ], // 源数据
      checkAll: true, // 全选
      checkedColumn: [], // checked组选项
      isIndeterminate: false, // 默认是否出现 半选
      columnlast: [], // 点击到最后一个的时候 保存一下 以便出现提示
      checkedColumnCopy: [], // 变成checked组选项 免得老是刷新抖动

      rules: {
        meetPlanId: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        customerUnitId: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        drillDate: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        principal: [
          {
            max: 20,
            message: '最大20字'
          },
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        meetSrc: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        meetContent: [
          {
            max: 1000,
            message: '最大1000字'
          },
          {
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }
        ],
        remark: [
          {
            max: 200,
            message: '最大200字'
          }
        ],
        accessory: []
      },
      insertPlan: {
        meetPlanId: '',
        customerUnitId: '',
        drillDate: '',
        principal: '',
        meetSrc: '',
        meetContent: '',
        remark: '',
        accessory: ''
      },
      insertPlanDialog: false,
      updateUserDialog: false,
      updates: {},
      //	行号
      row_index: '',
      page: {
        pageNum: 1,
        pageSize: 10,
        id: null
      },
      total: 10
    }
  },
  created() {
    this.columnOptions.forEach((element) => {
      this.checkedColumn.push(element)
      this.checkedColumnCopy.push(element)
    })
    this.funSelectAllWithUnitName()
    // console.log(this.$commonPgs.getCurrentDate());
  },
  mounted() {
    this.maxHeight =
      this.$store.state.clientHeights - 50 - 28 - 71 - 65 - 40 - 32 - 17 - 71
  },
  methods: {
    reset: function() {
      this.page.id = ''
      const temp = verifyUserPermission(this.$store.state.routersave.userInfo)
      this.page.id = temp || this.page.id
      selectAllMeetPlanWithUnitName(this.page).then((res) => {
        this.tableData = res.list
        this.total = res.total
      })
    },
    indexMethod(index) {
      return index + 1 + (this.page.pageNum - 1) * this.page.pageSize
    },
    funSelectAllWithUnitName() {
      const temp = verifyUserPermission(this.$store.state.routersave.userInfo)
      this.page.id = temp || this.page.id
      selectAllMeetPlanWithUnitName(this.page).then((res) => {
        this.tableData = res.list
        this.total = res.total
      })
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.funSelectAllWithUnitName()
    },
    handleCurrentChange(val) {
      this.page.pageNum = val
      this.funSelectAllWithUnitName()
    },

    // ----------------------- 可以主动隐藏列
    handleCheckAllChange(val) {
      if (val === true) {
        this.checkedColumn = val ? this.columnOptions : []
        this.isIndeterminate = false
      }
      this.checkAll = true
      this.columnCheckedCopy = this.columnOptions
    },
    handleCheckedCitiesChange(value) {
      if (value.length !== 0) {
        const checkedCount = value.length
        this.checkAll = checkedCount === this.columnOptions.length
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.columnOptions.length
        if (value.length === 1) this.columnlast = value
        this.checkedColumnCopy = this.checkedColumn
      } else {
        this.checkedColumn = this.columnlast
        
        this.$notify({
          title: '请至少选择一列',
          type: 'warning'
        })
      }
    },
    isShow(labelValue) {
      return this.checkedColumnCopy.indexOf(labelValue) !== -1
    },
    // -----------------------------可以主动隐藏列 结束
    // ----------------------------- 增加相关 开始

    // David
    userAdd() {
      // 添加用户
      this.insertPlanDialog = true
    },
    clearInsertPlan() {
      for (var key in this.insertPlan) {
        this.insertPlan[key] = ''
      }
    },
    addConfirm(formName) {
      // 添加用户 确认

      this.$refs[formName].validate((valid) => {
        if (valid) {
          insertMeetPlan(this.insertPlan).then((res) => {
            if (res === 1) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.clearInsertPlan()
              this.funSelectAllWithUnitName()
              this.insertPlanDialog = false
            }
          })
        } else {
          this.$message({
            message: '插入失败',
            type: 'error'
          })
          return false
        }
      })
    },
    cancel(formName) {
      this.$refs[formName].resetFields()
      this.insertPlanDialog = false
      this.updateUserDialog = false

      this.clearInsertPlan()
      // dialog = false
    },
    userSearch(row) {
      // 搜索功能
    },
    userDel(row) {
      // 用户删除
      deleteMeetPlanByPrimaryKey(row.meetPlanId).then((res) => {
        if (res === 1) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.page.pageNum = 1
          this.funSelectAllWithUnitName()
        }
      })
    },
    userEdit(row) {
      //	编辑用户
      this.row_index = row.index
      this.updates = JSON.parse(JSON.stringify(row))
      this.updateUserDialog = true
    },
    handleClose(done) {
      //  添加用户 确认关闭
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    eaditConfirm(formName) {
      //	编辑用户 确认
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateMeetPlanByPrimaryKey(this.updates).then((res) => {
            if (res === 1) {
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
              this.funSelectAllWithUnitName()
              this.updateUserDialog = false
            }
          })
        }
      })
    },
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex
    }
  }
}
</script>

<style lang="scss" scoped>
select {
  width: 250px;
}
</style>
