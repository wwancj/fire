<template>
  <!--作者：万智宇-->
  <!--todo 日常巡检记录单-->
  <div class="role-class">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="never" class="card-10px table-auto">
          <!--单位选择 筛选器-->
          <el-select
            v-model="page.id"
            v-permission
            filterable
            clearable
            placeholder="请选择"
            :disabled="isAllowToSelectUnit"
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
            @click="funSelectAllDailyCheckWithUnitName"
            >搜索</el-button
          >
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-refresh-left"
            @click="reset"
            >重置</el-button
          >
          <el-button
            v-has="{ action: 'add' }"
            type="primary"
            size="mini"
            icon="el-icon-plus"
            @click="userAdd"
            >新增</el-button
          >
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card shadow="never" class="el-table-custom-pgs card-10px table-auto">
          <div slot="header" class="clearfix">
            <span class="table-tree-top">日常巡检记录单</span>
            <el-popover placement="bottom-end" trigger="click">
              <div class="line-popver-pgs">
                <el-checkbox
                  v-model="checkAll"
                  :indeterminate="isIndeterminate"
                  @change="handleCheckAllChange"
                  >全选</el-checkbox
                >
                <div style="margin: 15px 0" />
                <el-checkbox-group
                  v-model="checkedColumn"
                  @change="handleCheckedCitiesChange"
                >
                  <el-checkbox
                    v-for="city in columnOptions"
                    :key="city"
                    :label="city"
                    >{{ city }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
              <el-button
                slot="reference"
                size="mini"
                style="float: right"
                icon="el-icon-s-grid"
                class="select-button"
              />
            </el-popover>
            <el-tooltip
              class="item"
              effect="dark"
              content="刷新列表"
              placement="top"
            >
              <el-button
                size="mini"
                style="float: right"
                icon="el-icon-refresh"
                @click="funSelectAllDailyCheckWithUnitName"
                class="select-button"
              />
            </el-tooltip>
          </div>
          <!--显示表格-->
          <el-table
            :data="tableData"
            :row-class-name="tableRowClassName"
            style="width: 100%; margin-bottom: 16px"
            stripe
            :header-cell-style="$store.state.style.headerStyle"
            :cell-style="$store.state.style.cellStyle"
          >
            <el-table-column
              type="index"
              :index="indexMethod"
              align="center"
              label="#"
              width="60"
            />
            <el-table-column
              v-if="isShow('单位')"
              prop="unitName"
              label="单位"
              min-width="125"
            />
            <el-table-column
              v-if="isShow('日常巡检编号')"
              prop="dailyCheckId"
              label="日常巡检编号"
              min-width="100"
            />
            <el-table-column
              v-if="isShow('检查日期')"
              prop="dailyCheckDate"
              label="检查日期"
              min-width="75"
            />
            <el-table-column
              v-if="isShow('检查结果')"
              prop="checkResult"
              label="检查结果"
              min-width="75"
            />
            <el-table-column
              v-if="isShow('检查人')"
              prop="name"
              label="检查人"
              min-width="75"
            />
            <el-table-column label="操作" fixed="right" width="160">
              <template slot-scope="scope">
                <el-button
                  v-has="{ action: 'edit', effect: 'disabled' }"
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
                    v-has="{ action: 'delete', effect: 'disabled' }"
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    title="删除"
                  />
                </el-popconfirm>
                <el-button
                  type="info"
                  size="mini"
                  icon="el-icon-setting"
                  title="查看附件"
                />
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
      :visible.sync="insertUserDialog"
      width="770px"
      @close="cancel('insertUser')"
      :modal-append-to-body="false"
      class="huise-class"
    >
      <el-form
        ref="insertUser"
        label-width="100px"
        class="from-format100"
        :inline="true"
        size="small"
        :model="insertUser"
        :rules="rules"
      >
        <el-form-item label="单位" prop="customerUnitId">
          <el-select
            v-model="insertUser.customerUnitId"
            filterable
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in $unitOptions"
              :key="item.customerUnitId"
              :label="item.unitName"
              :value="item.customerUnitId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="检查日期" prop="dailyCheckDate">
          <el-date-picker
            v-model="insertUser.dailyCheckDate"
            type="date"
            placeholder="选择日期"
            validate-event
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="检查结果" prop="checkResult">
          <el-input v-model="insertUser.checkResult" />
        </el-form-item>
        <el-form-item label="检查人" prop="name">
          <el-input v-model="insertUser.name" />
        </el-form-item>
        <el-form-item label="附件">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/">
            <el-button type="primary">点击提交附件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>

      <!-- 弹窗底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel('insertUser')">取 消</el-button>
        <el-button type="primary" @click="addConfirm('insertUser')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog
      title="编辑"
      :visible.sync="updateUserDialog"
      width="770px"
      @close="cancel('updates')"
      :modal-append-to-body="false"
      class="huise-class"
    >
      <el-form
        ref="updates"
        label-width="100px"
        class="from-format100"
        :inline="true"
        size="small"
        :model="updates"
        :rules="rules"
      >
        <el-form-item label="单位" prop="customerUnitId">
          <el-select
            v-model="updates.customerUnitId"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in $unitOptions"
              :key="item.customerUnitId"
              :label="item.unitName"
              :value="item.customerUnitId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="检查日期" prop="dailyCheckDate">
          <el-date-picker
            v-model="updates.dailyCheckDate"
            type="date"
            placeholder="选择日期"
            validate-event
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="检查结果" prop="checkResult">
          <el-input v-model="updates.checkResult" />
        </el-form-item>
        <el-form-item label="检查人" prop="name">
          <el-input v-model="updates.name" />
        </el-form-item>
        <el-form-item label="附件">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/">
            <el-button type="primary">点击提交附件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 弹窗底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel('updates')">取 消</el-button>
        <el-button type="primary" @click="eaditConfirm('updates')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { verifyUserPermission } from "@/utils/validate";
import {
  selectAllDailyCheckWithUnitName,
  insertDailyCheck,
  deleteDailyCheckByPimaryKey,
  updateDailyCheckByPrimaryKey,
} from "@/api/customer/dailyCheck";
export default {
  data() {
    return {
      rules: {
        customerUnitId: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        dailyCheckDate: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        checkResult: [
          {
            required: true,
            message: "不能为空",
          },
          {
            max: 20,
            message: "最大20字",
          },
        ],
        name: [
          {
            required: true,
            message: "不能为空",
          },
          {
            max: 20,
            message: "最大20字",
          },
        ],
      },
      maxHeight: 600,
      searchOption: "",
      isAllowToSelectUnit: false,
      tableData: [],
      selectUserInfo: "",
      select1: "",
      selectTime: "",

      columnOptions: ["日常巡检编号", "单位", "检查日期", "检查结果", "检查人"], // 源数据
      checkAll: true, // 全选
      checkedColumn: [], // checked组选项
      isIndeterminate: false, // 默认是否出现 半选
      columnlast: [], // 点击到最后一个的时候 保存一下 以便出现提示
      checkedColumnCopy: [], // 变成checked组选项 免得老是刷新抖动

      // David
      insertUser: {
        customerUnitId: "",
        dailyCheckId: "",
        dailyCheckDate: "",
        checkResult: "",
        name: "",
        accessory: "",
      },
      insertUserDialog: false,
      updateUserDialog: false,
      updates: {},
      //	行号
      row_index: "",
      page: {
        pageNum: 1,
        pageSize: 10,
        id: null,
      },
      total: 10,
    };
  },
  mounted() {
    this.maxHeight =
      this.$store.state.clientHeights - 50 - 28 - 71 - 65 - 40 - 32 - 17 - 71;
  },
  created() {
    this.columnOptions.forEach((element) => {
      this.checkedColumn.push(element);
      this.checkedColumnCopy.push(element);
    });
    this.funSelectAllDailyCheckWithUnitName();
  },
  methods: {
    reset() {
      this.page.id = "";
      this.funSelectAllDailyCheckWithUnitName();
    },
    indexMethod(index) {
      return index + 1 + (this.page.pageNum - 1) * this.page.pageSize;
    },
    funSelectAllDailyCheckWithUnitName() {
      const temp = verifyUserPermission(this.$store.state.routersave.userInfo);
      this.page.id = temp || this.page.id;
      selectAllDailyCheckWithUnitName(this.page).then((res) => {
        this.tableData = res.list;
        this.total = res.total;
      });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.funSelectAllDailyCheckWithUnitName();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.funSelectAllDailyCheckWithUnitName();
    },

    // ----------------------- 可以主动隐藏列
    handleCheckAllChange(val) {
      if (val === true) {
        this.checkedColumn = val ? this.columnOptions : [];
        this.isIndeterminate = false;
      }
      this.checkAll = true;
      this.columnCheckedCopy = this.columnOptions;
    },
    handleCheckedCitiesChange(value) {
      if (value.length !== 0) {
        const checkedCount = value.length;
        this.checkAll = checkedCount === this.columnOptions.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.columnOptions.length;
        if (value.length === 1) this.columnlast = value;
        this.checkedColumnCopy = this.checkedColumn;
      } else {
        this.checkedColumn = this.columnlast;
        this.$notify({
          title: "请至少选择一列",
          type: "warning",
        });
      }
    },
    isShow(labelValue) {
      return this.checkedColumnCopy.indexOf(labelValue) !== -1;
    },
    // -----------------------------可以主动隐藏列 结束
    // ----------------------------- 增加相关 开始

    // David
    userAdd() {
      // 添加用户
      this.insertUserDialog = true;
    },
    clearInsertUserForm() {
      for (var key in this.insertUser) {
        this.insertUser[key] = "";
      }
    },
    addConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          insertDailyCheck(this.insertUser).then((res) => {
            if (res === 1) {
              this.$message({
                message: "成功添加",
                type: "success",
              });
              this.clearInsertUserForm();
              this.funSelectAllDailyCheckWithUnitName();
              this.insertUserDialog = false;
            }
          });
        }
      });
      // 添加用户 确认
    },
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.insertUserDialog = false;
      this.updateUserDialog = false;

      this.clearInsertUserForm();
      // dialog = false
    },
    userSearch(row) {
      // 搜索功能
    },
    userDel(row) {
      // 用户删除
      deleteDailyCheckByPimaryKey(row.dailyCheckId).then((res) => {
        if (res === 1) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.page.pageNum = 1;
          this.funSelectAllDailyCheckWithUnitName(this.page);
        }
      });
    },
    userEdit(row) {
      //	编辑用户
      this.row_index = row.index;
      this.updates = JSON.parse(JSON.stringify(row));
      this.updateUserDialog = true;
    },
    handleClose(done) {
      //  添加用户 确认关闭
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    eaditConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateDailyCheckByPrimaryKey(this.updates).then((res) => {
            if (res === 1) {
              this.$message({
                message: "编辑成功",
                type: "success",
              });
              this.funSelectAllDailyCheckWithUnitName(this.page);
              this.updateUserDialog = false;
            }
          });
        }
      });
      //	编辑用户 确认
    },
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex;
    },
  },
};
</script>

<style lang="scss" scoped>
select {
  width: 250px;
}
</style>
