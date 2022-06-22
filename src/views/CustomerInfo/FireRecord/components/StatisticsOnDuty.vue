<template>
  <!--作者：万智宇-->
  <!--todo 值班人员统计表-->
  <div class="role-class">
    <el-card shadow="never" class="card-10px table-auto">
      <!--单位选择 筛选器-->
      <el-select
        v-model="page.id"
        v-permission
        filterable
        clearable
        placeholder="请选择"
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
        @click="userSearch"
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

    <el-card shadow="never" class="el-table-custom-pgs card-10px table-auto">
      <div slot="header" class="clearfix">
        <span class="table-tree-top">值班人员统计表</span>
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
            @click="funSelectAllOperator"
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
        :max-height="maxHeight"
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
          v-if="isShow('姓名')"
          prop="name"
          label="姓名"
          min-width="75"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="isShow('值班人电话')"
          prop="phone"
          label="值班人电话"
          min-width="100"
          show-overflow-tooltip
        />
        <el-table-column
          v-if="isShow('所属单位')"
          prop="unitName"
          label="所属单位"
          min-width="75"
          show-overflow-tooltip
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
            <!-- <el-button type="warning" size="mini" icon="el-icon-setting" title="保留按钮" /> -->
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

    <!-- 添加 -->
    <el-dialog
      title="新增"
      :visible.sync="insertUserDialog"
      width="770px"
      @close="cancel('insertOperatorForm')"
      :modal-append-to-body="false"
      class="huise-class"
    >
      <el-form
        ref="insertOperatorForm"
        label-width="100px"
        class="from-format100"
        :inline="true"
        size="small"
        :rules="rules"
        :model="insertOperatorForm"
      >
        <el-form-item label="所属单位" prop="customerUnitId">
          <el-select
            v-model="insertOperatorForm.customerUnitId"
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
        <el-form-item label="姓名" prop="name">
          <el-input v-model="insertOperatorForm.name" />
        </el-form-item>
        <el-form-item label="值班人电话" prop="phone">
          <el-input
            v-model="insertOperatorForm.phone"
            maxlength="20"
            type="tel"
          />
        </el-form-item>
      </el-form>
      <!-- 弹窗底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel('insertOperatorForm')">取 消</el-button>
        <el-button type="primary" @click="addConfirm('insertOperatorForm')"
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
        :rules="rules"
        :model="updates"
      >
        <el-form-item label="所属单位" prop="customerUnitId">
          <el-select
            v-model="updates.customerUnitId"
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
        <el-form-item label="姓名" prop="name">
          <el-input v-model="updates.name" />
        </el-form-item>
        <el-form-item label="值班人电话" prop="phone">
          <el-input v-model="updates.phone" maxlength="20" type="tel" />
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
  selectAllOperator,
  insertOperator,
  updateOperatorByPrimaryKey,
  deleteOperatorByPrimaryKey,
} from "@/api/customer/operatorPeople";

export default {
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: "不能为空",
          },
          {
            max: 20,
            message: "最大20字符",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "不能为空",
          },
          {
            max: 20,
            message: "最大20字符",
            trigger: "blur",
          },
          {
            message: "请输入有效的手机号",
            pattern: /^1[34578]\d{9}$/,
          },
        ],
        customerUnitId: [
          {
            required: true,
            message: "不能为空",
          },
        ],
      },
      maxHeight: 600,
      searchOption: "",
      tableData: [],
      selectUserInfo: "",
      selectedOption: "",
      selectTime: "",

      columnOptions: ["姓名", "值班人电话", "所属单位"], // 源数据
      checkAll: true, // 全选
      checkedColumn: [], // checked组选项
      isIndeterminate: false, // 默认是否出现 半选
      columnlast: [], // 点击到最后一个的时候 保存一下 以便出现提示
      checkedColumnCopy: [], // 变成checked组选项 免得老是刷新抖动

      insertOperatorForm: {
        operatorPeopleId: null,
        name: "",
        phone: "",
        customerUnitId: "",
      },
      insertUserDialog: false,
      updateUserDialog: false,
      updates: {},
      //	行号
      row_index: "",
      page: {
        pageNum: 1,
        pageSize: 10,
        id: "",
      },
      total: 10,
    };
  },
  mounted() {
    this.maxHeight =
      this.$store.state.clientHeights - 50 - 28 - 71 - 65 - 40 - 32 - 17 - 71;
  },
  created() {
    // console.log(this.$commonPgs.getCurrentDate());
    this.columnOptions.forEach((element) => {
      this.checkedColumn.push(element);
      this.checkedColumnCopy.push(element);
    });
    this.funSelectAllOperator();
  },
  methods: {
    reset: function () {
      this.page.id = "";
      this.funSelectAllOperator();
    },
    indexMethod(index) {
      return index + 1 + (this.page.pageNum - 1) * this.page.pageSize;
    },
    funSelectAllOperator() {
      const temp = verifyUserPermission(this.$store.state.routersave.userInfo);
      this.page.id = temp || this.page.id;
      selectAllOperator(this.page).then((res) => {
        this.tableData = res.list;
        this.total = res.total;
      });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.funSelectAllOperator(this.page);
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.funSelectAllOperator(this.page);
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
    clearInsertForm() {
      // 清空值班人员表格
      for (var key in this.insertOperatorForm) {
        this.insertOperatorForm[key] = "";
      }
    },
    addConfirm(formName) {
      // 添加用户 确认

      this.$refs[formName].validate((valid) => {
        if (valid) {
          insertOperator(this.insertOperatorForm).then((res) => {
            if (res === 1) {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.clearInsertForm();
              this.funSelectAllOperator();
              this.insertUserDialog = false;
            }
          });
        } else {
          this.$message({
            message: "插入失败",
            type: "error",
          });
          return false;
        }
      });
    },
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.insertUserDialog = false;
      this.updateUserDialog = false;

      this.clearInsertForm();
      // dialog = false
    },
    userSearch() {
      // 搜索功能
      this.funSelectAllOperator();
    },
    userDel(row) {
      // 用户删除
      deleteOperatorByPrimaryKey(row.operatorPeopleId).then((res) => {
        if (res === 1) {
          this.$message({
            message: "删除成功",
            type: "succes",
          });
          this.page.pageNum = 1;
          this.funSelectAllOperator();
        } else if (res === 0) {
          this.$message({
            message: "该数据已被除,或不存在",
            type: "info",
          });
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
      //	编辑用户 确认
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateOperatorByPrimaryKey(this.updates).then((res) => {
            if (res === 1) {
              this.$message({
                message: "编辑成功",
                type: "succes",
              });
              this.funSelectAllOperator();
              this.updateUserDialog = false;
            }
          });
        }
      });
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
