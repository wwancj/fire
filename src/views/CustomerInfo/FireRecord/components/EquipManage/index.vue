<template>
  <div class="role-class">
    <el-row>
      <el-card shadow="never" class="card-10px">
        <!-- 下拉选择 -->
        <el-select
          v-model="queryInfo.type"
          size="mini"
          filterable
          clearable
          placeholder="请选择设备类型"
        >
          <el-option
            v-for="item in equipOptions"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <el-select
          v-model="queryInfo.subSystem"
          size="mini"
          filterable
          clearable
          placeholder="请选择子系统"
        >
          <el-option
            v-for="item in subsystemOptions"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        <el-select
          v-model="queryInfo.id"
          size="mini"
          filterable
          clearable
          placeholder="请选择单位"
          v-permission
        >
          <el-option
            v-for="item in unitOptions"
            :key="item.customerUnitId"
            :label="item.unitName"
            :value="item.customerUnitId"
          ></el-option>
        </el-select>
        <!-- 搜索，重置，新增按钮 -->
        <el-button
          @click="researchList"
          type="success"
          icon="el-icon-search"
          size="mini"
          >搜索</el-button
        >
        <el-button
          @click="resetBtn"
          type="warning"
          icon="el-icon-refresh-left"
          size="mini"
          >重置</el-button
        >
        <el-button
          @click="addEquipDialogVisible = true"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          >新增</el-button
        >
      </el-card>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-card
          shadow="never"
          class="el-table-custom-pgs card-10px table-auto"
        >
          <div slot="header" class="clearfix">
            <span class="table-tree-top">设备列表</span>
            <el-popover placement="bottom-end" trigger="click">
              <div class="line-popver-pgs">
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="checkAll"
                  @change="handleCheckAllChange"
                  >全选</el-checkbox
                >
                <div style="margin: 15px 0"></div>
                <el-checkbox-group
                  v-model="checkedColumn"
                  @change="handleCheckedCitiesChange"
                >
                  <el-checkbox
                    v-for="city in columnOptions"
                    :label="city"
                    :key="city"
                    >{{ city }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
              <el-button
                size="mini"
                slot="reference"
                style="float: right; margin-bottom: 0"
                icon="el-icon-s-grid"
              ></el-button>
            </el-popover>
            <el-tooltip
              class="item"
              effect="dark"
              content="刷新列表"
              placement="top"
            >
              <el-button
                @click="refreshList"
                size="mini"
                style="float: right"
                icon="el-icon-refresh"
              ></el-button>
            </el-tooltip>
          </div>

          <!-- 列表区域 -->
          <el-table
            :data="tableData"
            :row-class-name="tableRowClassName"
            style="width: 100%"
            stripe
            :header-cell-style="$store.state.style.headerStyle"
            :cell-style="$store.state.style.cellStyle"
          >
            <el-table-column
              :index="indexMethod"
              type="index"
              align="center"
              label="序号"
              width="60"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="unitName"
              v-if="isShow('所属单位')"
              label="所属单位"
              min-width="100"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="equipType"
              v-if="isShow('设备类型')"
              label="设备类型"
              min-width="100"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="subSystem"
              v-if="isShow('所属子系统')"
              label="所属子系统"
              min-width="150"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="equipNo"
              v-if="isShow('编号')"
              label="编号"
              min-width="100"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="isOnline"
              v-if="isShow('是否在线')"
              label="是否在线"
              min-width="100"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="操作"
              width="200"
              align="center"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="查看"
                  placement="top"
                  :enterable="false"
                >
                  <el-button
                    @click="showOperationDialog(scope.row)"
                    type="primary"
                    icon="el-icon-view"
                    size="mini"
                  ></el-button>
                </el-tooltip>
                <!-- 修改按钮 -->
                <el-button
                  @click="showEditDialog(scope.row)"
                  type="warning"
                  icon="el-icon-edit"
                  size="mini"
                  v-has="{ action: 'edit', effect: 'disabled' }"
                ></el-button>
                <!-- 删除按钮 -->
                <el-button
                  @click="removeUserById(scope.row.equipListId)"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  v-has="{ action: 'delete', effect: 'disabled' }"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页区域 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[10, 15, 20]"
            :page-size="1"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-card>
      </el-col>
    </el-row>

    <!-- 添加设备的对话框 -->
    <el-dialog
      @close="addDialogClosed"
      title="添加设备"
      :visible.sync="addEquipDialogVisible"
      width="800px"
      :modal-append-to-body="false"
    >
      <!--内容主体区 -->
      <el-form
        :model="addEquipForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        status-icon
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备类型" prop="equipType">
              <el-select
                v-model="addEquipForm.equipType"
                placeholder="请选择设备"
                clearable
              >
                <el-option
                  v-for="items in equipOptions"
                  :key="items"
                  :label="items"
                  :value="items"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="子系统类型" prop="subSystem">
              <el-select
                v-model="addEquipForm.subSystem"
                placeholder="请选择设备所属子系统"
                clearable
              >
                <el-option
                  v-for="items in subsystemOptions"
                  :key="items"
                  :label="items"
                  :value="items"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属单位" prop="customerUnitId">
              <el-select
                v-model="addEquipForm.customerUnitId"
                placeholder="请选择单位"
                clearable
              >
                <el-option
                  v-for="items in unitOptions"
                  :key="items.customerUnitId"
                  :label="items.unitName"
                  :value="items.customerUnitId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否在线" prop="isOnline">
              <el-select
                v-model="addEquipForm.isOnline"
                placeholder="请选择"
                clearable
              >
                <el-option value="在线" label="在线"></el-option>
                <el-option value="不在线" label="不在线"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="编号" prop="equipNo">
              <el-input v-model="addEquipForm.equipNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="阀值设定" prop="settingValue">
              <el-input v-model="addEquipForm.settingValue"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input
                type="textarea"
                :rows="1"
                placeholder="请输入备注"
                v-model="addEquipForm.remark"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安装时间" prop="installData">
              <el-date-picker
                v-model="addEquipForm.installData"
                type="date"
                placeholder="选择日期"
                validate-event
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备位置" prop="equipUrl">
              <el-input v-model="addEquipForm.equipUrl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!--底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addEquipDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEquip">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改的对话框 -->
    <el-dialog
      @close="editDialogColsed"
      title="修改设备信息"
      :visible.sync="editDiaologVisible"
      width="800px"
      :modal-append-to-body="false"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
        status-icon
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备类型">
              <el-input v-model="editForm.equipType" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="子系统类型" prop="subSystem">
              <el-select
                v-model="editForm.subSystem"
                filterable
                clearable
                placeholder="请选择子系统"
              >
                <el-option
                  v-for="item in subsystemOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属单位" prop="unitName">
              <el-select
                v-model="editForm.customerUnitId"
                placeholder="请选择单位"
                clearable
              >
                <el-option
                  v-for="items in unitOptions"
                  :key="items.customerUnitId"
                  :label="items.unitName"
                  :value="items.customerUnitId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否在线" prop="isOnline">
              <el-input v-model="editForm.isOnline"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备编号" prop="equipNo">
              <el-input v-model="editForm.equipNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="阀值设定" prop="settingValue">
              <el-input v-model="editForm.settingValue"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备位置" prop="equipUrl">
              <el-input v-model="editForm.equipUrl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDiaologVisible = false">取 消</el-button>
        <el-button type="primary" @click="editEquipInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 操作查看的对话框 -->
    <el-dialog
      @close="operationDialogClosed"
      title="查看"
      :visible.sync="operationViewDialogVisible"
      width="550"
      class="info-diolog"
      :modal-append-to-body="false"
    >
      <!--内容主体区 -->
      <el-tabs
        v-model="activeName"
        type="border-card"
        class="info-dialog"
        @tab-click="handleTabClick"
      >
        <el-tab-pane label="基本信息" name="first" class="info-page">
          <div style="height: 300px">
            <el-row>
              <el-col :span="12">
                <span>设备类型：</span>
                <span>{{ equipDetailList.equipType }}</span>
              </el-col>
              <el-col :span="12">
                <span>所属子系统：</span>
                <span>{{ equipDetailList.subSystem }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span>是否在线：</span>
                <span>{{ equipDetailList.isOnline }}</span>
              </el-col>
              <el-col :span="12">
                <span>所属单位：</span>
                <span>{{ equipDetailList.unitName }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span>编号：</span>
                <span>{{ equipDetailList.equipNo }}</span>
              </el-col>
              <el-col :span="12">
                <span>阀值设定：</span>
                <span>{{ equipDetailList.settingValue }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span>设备位置：</span>
                <span>{{ equipDetailList.equipUrl }}</span>
              </el-col>
              <el-col :span="12">
                <span>备注：</span>
                <span>{{ equipDetailList.remark }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span>安装时间：</span>
                <span>{{ equipDetailList.installData }}</span>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>

        <el-tab-pane label="报警日志" name="报警">
          <CallDateList
            v-if="CallDateListIsShow"
            :callQueryInfo="callQueryInfo"
            :logEquipType="logEquipType"
          ></CallDateList>
        </el-tab-pane>

        <el-tab-pane label="故障日志" name="故障">
          <ErrorDataList
            v-if="ErrorDataListIsShow"
            :callQueryInfo="callQueryInfo"
            :logEquipType="logEquipType"
          ></ErrorDataList>
        </el-tab-pane>

        <el-tab-pane label="操作日志" name="commandLog">
          <OperDataList
            v-if="OperDataListIsShow"
            :commandQueryInfo="commandQueryInfo"
          ></OperDataList>
        </el-tab-pane>

        <el-tab-pane label="运行日志" name="runLog">
          <RunDataList
            v-if="RunDataListIsShow"
            :commandQueryInfo="commandQueryInfo"
          ></RunDataList>
        </el-tab-pane>
        <el-tab-pane label="设备坐标" name="sixth"></el-tab-pane>
      </el-tabs>

      <!--底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="operationViewDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="operationViewDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getEquipListByCondition,
  updateEquip,
  insertEquip,
  deleteEquip,
  getEquipLogListByLevel,
} from "@/api/equip/EquipManage.js";

import CallDateList from "./components/callDataList";
import ErrorDataList from "./components/errorDataList";
import OperDataList from "./components/operDataList";
import RunDataList from "./components/runDataList";

export default {
  components: {
    CallDateList: CallDateList,
    ErrorDataList: ErrorDataList,
    OperDataList: OperDataList,
    RunDataList: RunDataList,
  },
  data() {
    return {
      //获取设备列表的查询参数
      queryInfo: {
        id: "",
        type: "",
        subSystem: "",
        pageNum: 1,
        pageSize: 10,
      },
      // 获取操作日志和运行日志列表的查询参数
      commandQueryInfo: {
        typeNo: "",
        pageNum: 1,
        pageSize: 10,
      },
      // 获取报警和隐患日志的参数列表
      callQueryInfo: {
        typeNo: "",
        logLevel: "",
        pageNum: 1,
        pageSize: 10,
      },
      logEquipType: "",
      // 主列表数据
      tableData: [],
      // 设备列表总数
      total: 0,
      // 下拉选择设备类型列表
      equipOptions: [],
      // 下拉选择子系统列表
      subsystemOptions: [],
      // 下拉选择的单位列表,
      unitOptions: [],
      // 控制添加设备的显示与隐藏
      addEquipDialogVisible: false,
      // 控制操作对话框的显示与隐藏
      operationViewDialogVisible: false,
      // 控制修改对话框的显示与隐藏
      editDiaologVisible: false,
      // 数据源
      columnOptions: ["设备类型", "所属子系统", "编号", "是否在线", "所属单位"],
      // checked组选项
      checkedColumn: ["设备类型", "所属子系统", "编号", "是否在线", "所属单位"],
      // 默认是否出现 半选
      isIndeterminate: false,
      // 点击到最后一个的时候 保存一下 以便出现提示
      columnlast: [],
      // 全选
      checkAll: true,
      columnCheckedCopy: [
        "设备类型",
        "所属子系统",
        "编号",
        "是否在线",
        "所属单位",
      ], // 变成checked组选项 免得老是刷新抖动
      // 被激活的页签名称
      activeName: "first",
      // 设备详情列表
      equipDetailList: [],
      //点击时选中的日志级别
      clickLogLevel: "",
      // 添加设备的表单
      addEquipForm: {
        equipType: "",
        customerUnitId: "",
        isOnline: "在线",
        settingValue: "",
        remark: "",
        subSystem: "",
        installData: "",
        equipUrl: "",
      },
      // 添加表单的验证规则对象
      addFormRules: {
        equipType: [
          { required: true, message: "请选择设备类型", trigger: "blur" },
        ],
        subSystem: [
          { required: true, message: "请选择子系统", trigger: "blur" },
        ],
        customerUnitId: [
          { required: true, message: "请选择所属单位", trigger: "blur" },
        ],
        equipState: [
          { required: true, message: "请选择状态", trigger: "blur" },
        ],
        equipNo: [
          { required: true, message: "请输入设备编号", trigger: "blur" },
        ],
      },
      // 修改表单的验证规则
      editFormRules: {
        equipType: [
          { required: true, message: "请选择设备类型", trigger: "blur" },
        ],
        equipIp: [{ required: true, message: "请输入设备IP", trigger: "blur" }],
        equipPort: [
          { required: true, message: "请输入设备端口", trigger: "blur" },
        ],
        equipNo: [
          { required: true, message: "请输入设备编号", trigger: "blur" },
        ],
        settingValue: [
          { required: true, message: "请输入阀值设定", trigger: "blur" },
        ],
        customerUnitId: [
          { required: true, message: "请选择所属单位", trigger: "blur" },
        ],
      },
      // 修改设备表单
      editForm: {},

      //控制组件是否显示
      CallDateListIsShow: false,
      ErrorDataListIsShow: false,
      OperDataListIsShow: false,
      RunDataListIsShow: false,

      //列表最大高度
      maxHeight: "600",
    };
  },
  created() {
    let userType = this.$store.state.routersave.userInfo;
    this.unitOptions = this.$unitOptions;
    if (userType.roleType === "custo") {
      this.queryInfo.id = userType.customerUnitId;
    }
    this.funGetEquipList();
    this.equipOptions = this.$equip_wx.equipType;
    this.subsystemOptions = this.$equip_wx.equipSubSys;
  },
  mounted() {
    this.maxHeight =
      this.$store.state.clientHeights -
      28 -
      68 -
      65 -
      40 -
      32 -
      15 -
      50 -
      20 -
      30 -
      20 -
      5;
  },
  methods: {
    // 根据查询条件获取设备列表
    funGetEquipList() {
      getEquipListByCondition(this.queryInfo).then((res) => {
        for (let i = 0; i < res.list.length; i++) {
          if (res.list[i].isOnline === 1) {
            res.list[i].isOnline = "在线";
          } else {
            res.list[i].isOnline = "不在线";
          }
        }
        this.tableData = res.list;
        this.total = res.total;
      });
    },
    // 点击按钮，添加新设备
    addEquip() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) {
          return;
        }
        if (this.addEquipForm.isOnline === "在线") {
          this.addEquipForm.isOnline = 1;
        } else {
          this.addEquipForm.isOnline = 0;
        }
        insertEquip(this.addEquipForm).then((res) => {
          this.funGetEquipList();
          this.addEquipDialogVisible = false;
        });
      });
    },
    // 全选，隐藏列
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
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.columnOptions.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.columnOptions.length;
        if (value.length === 1) this.columnlast = value;
        this.columnCheckedCopy = this.checkedColumn;
      } else {
        this.checkedColumn = this.columnlast;
        this.$notify({
          title: "请至少选择一列",
          type: "warning",
        });
      }
    },
    isShow(labelValue) {
      return this.columnCheckedCopy.indexOf(labelValue) == -1 ? false : true;
    },
    //全选，隐藏列结束

    // 监听主数据列表pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.funGetEquipList();
    },
    // 监听主数据列表页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.funGetEquipList();
    },

    // 监听查看按钮的对话框是否弹出
    showOperationDialog(equipDetail) {
      this.commandQueryInfo.typeNo = equipDetail.equipNo;
      this.callQueryInfo.typeNo = equipDetail.equipNo;
      this.logEquipType = equipDetail.equipType;
      this.equipDetailList = equipDetail;
      this.operationViewDialogVisible = true;
    },
    // 把每一行的索引放进row
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
    operationDialogClosed() {
      this.activeName = "first";
    },
    // 监听添加设备对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 监听修改设备对话框的关闭事件
    editDialogColsed() {
      this.$refs.editFormRef.resetFields();
    },
    // 点击按钮，修改用户信息并提交
    editEquipInfo() {
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) {
          return;
        }
        updateEquip(this.editForm).then((res) => {
          if (res != "1") {
            return this.$message.error("更新设备信息失败");
          }
          this.$message.success("更新设备信息成功");
          this.editDiaologVisible = false;
          this.funGetEquipList();
        });
      });
    },
    // 展示编辑用户的对话框
    showEditDialog(row) {
      this.editForm = row;
      this.editDiaologVisible = true;
    },
    // 重置
    resetBtn() {
      this.queryInfo.id = "";
      this.queryInfo.type = "";
      this.queryInfo.subSystem = "";
      this.queryInfo = {
        id: "",
        type: "",
        subSystem: "",
        pageNum: 1,
        pageSize: 5,
      };
    },
    // 校对行号
    indexMethod(index) {
      return (index =
        index + 1 + (this.queryInfo.pageNum - 1) * this.queryInfo.pageSize);
    },
    // 搜索
    researchList() {
      this.funGetEquipList();
    },
    // 根据设备id删除
    async removeUserById(id) {
      //弹框询问用户是否删除用户
      const confirmResult = await this.$confirm(
        "此操作将永久删除该设备, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 如果用户确认删除,则返回字符串confirm,如果取消删除则返回字符串cancel
      if (confirmResult !== "confirm") {
        return this.$message.info("已经取消删除");
      }
      deleteEquip(id).then((res) => {
        this.funGetEquipList();
      });
    },
    // 刷新列表
    refreshList() {
      this.funGetEquipList();
    },
    // tab页签点击事件的处理函数
    handleTabClick() {
      this.CallDateListIsShow = false;
      this.ErrorDataListIsShow = false;
      this.OperDataListIsShow = false;
      this.RunDataListIsShow = false;
      this.callQueryInfo.logLevel = this.activeName;
      if (this.activeName === "报警") {
        this.$nextTick(() => {
          this.CallDateListIsShow = true;
        });
      } else if (this.activeName === "故障") {
        this.$nextTick(() => {
          this.ErrorDataListIsShow = true;
        });
      } else if (this.activeName === "commandLog") {
        this.$nextTick(() => {
          this.OperDataListIsShow = true;
        });
      } else {
        this.$nextTick(() => {
          this.RunDataListIsShow = true;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 15px;
}
.info-dialog {
  height: 400px;
  .info-page {
    >>> .el-row {
      padding: 10px;
      font-size: 14px;
      color: #ed7562;
      font-weight: 700;
      .el-col {
        :nth-child(1) {
          font-size: 16px;
          color: #606266;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
