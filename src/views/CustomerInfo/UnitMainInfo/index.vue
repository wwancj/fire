<template>
  <!--作者：万智宇-->
  <div class="role-class table-auto">
    <el-row>
      <el-card shadow="never" class="card-10px">
        <!--模糊查询-->
        <!-- <el-input
          v-model="selectUserInfo"
          v-permission
          placeholder="请输入内容"
          clearable
          size="mini"
          style="width:400px"
          :disabled="isDisabled"
        >
          <el-select
            slot="prepend"
            v-model="topSearch"
            clearable
            placeholder="请选择"
            style="width:150px"
          >
            <el-option label="法人姓名" value="legalName" />
            <el-option label="法人电话" value="legalPhone" />
            <el-option label="使用名称" value="useName" />
          </el-select>
        </el-input> -->
        <el-select
          id="unitSelectTag"
          v-model="page.id"
          v-permission
          filterable
          clearable
          placeholder="请选择单位"
          size="mini"
        >
          <el-option
            v-for="item in $unitOptions"
            id="test"
            :key="item.customerUnitId"
            :label="item.unitName"
            :value="item.customerUnitId"
          />
        </el-select>
        <!-- <el-date-picker
          v-model="page.startDate"
          v-permission
          type="date"
          placeholder="起始日期(可单选)"
          validate-event
          value-format="yyyy-MM-dd"
          size="mini"
          class="date-picker"
        />
        <el-date-picker
          v-model="page.endDate"
          v-permission
          type="date"
          placeholder="终止日期(可单选)"
          validate-event
          value-format="yyyy-MM-dd"
          size="mini"
          class="date-picker"
        /> -->
        <el-button
          v-permission
          type="success"
          size="mini"
          icon="el-icon-search"
          @click="funSelectAllUnitWithBuildingName"
          plain
        >搜索</el-button>
        <el-button type="warning" size="mini" icon="el-icon-refresh-left" @click="reset" plain>重置</el-button>
        <el-button
          v-has="{action:'add'}"
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="userAdd"
          plain
        >新增</el-button>
      </el-card>
    </el-row>
    <!--单位信息展示部分-->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="never" class="el-table-custom-pgs">
          <div slot="header" class="clearfix">
            <span class="table-tree-top">单位信息</span>
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
              <el-button slot="reference" class="select-button" size="mini" style="float: right;" icon="el-icon-s-grid" />
            </el-popover>
            <el-tooltip class="item" effect="dark" content="刷新列表" placement="top">
              <el-button
                size="mini"
                style="float: right;"
                icon="el-icon-refresh"
                @click="funSelectAllUnitWithBuildingName"
                class="select-button"
              />
            </el-tooltip>
          </div>
          <!--通过表格展示单位信息-->
          <el-table
            :data="tableData"
            style="width: 100%;"
            stripe
            highlight-current-row
            :header-cell-style="$store.state.style.headerStyle"
            :cell-style="$store.state.style.cellStyle"
          >
            <el-table-column
              type="index"
              :index="indexMethod"
              align="center"
              label="#"
              min-width="60"
            />
            <el-table-column
              v-if="isShow('创建时间')"
              prop="createdTime"
              label="创建时间"
              width="100"
              show-overflow-tooltip
            />
            <el-table-column
              v-if="isShow('单位名称')"
              prop="unitName"
              label="单位名称"
              min-width="150"
              show-overflow-tooltip
            />
            <el-table-column
              v-if="isShow('单位地址')"
              prop="address"
              label="单位地址"
              min-width="200"
              show-overflow-tooltip
            />
            <el-table-column
              v-if="isShow('法人姓名')"
              prop="legalName"
              label="法人姓名"
              min-width="85"
              show-overflow-tooltip
            />
            <el-table-column
              v-if="isShow('法人电话')"
              prop="legalPhone"
              label="法人电话"
              min-width="125"
              show-overflow-tooltip
            />
            <el-table-column
              v-if="isShow('使用名称')"
              prop="useName"
              label="使用名称"
              min-width="85"
              show-overflow-tooltip
            />
            <el-table-column
              v-if="isShow('消防管辖地区')"
              prop="fullpathName"
              label="消防管辖地区"
              min-width="200"
              show-overflow-tooltip
            />
            <el-table-column
              v-if="isShow('邮箱')"
              prop="email"
              label="邮箱"
              min-width="100"
              show-overflow-tooltip
            />
            <el-table-column
              v-if="isShow('关联建筑')"
              prop="buildingName"
              label="关联建筑"
              min-width="85"
              show-overflow-tooltip
            />
            <el-table-column
              v-if="isShow('单位风险等级')"
              prop="riskLevel"
              label="单位风险等级"
              min-width="125"
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

    <!-- 添加单位主信息 :before-close="handleClose"-->
    <el-dialog
      title="新增单位主信息"
      :visible.sync="insertDialogVisible"
      width="770px"
      @close="cancel('insertUnitForm')"
      :modal-append-to-body="false"
      class="huise-class"
    >
      <el-form
        ref="insertUnitForm"
        :model="insertUnitForm"
        :rules="rules"
        label-width="100px"
        class="from-format100"
        :inline="true"
        size="small"
      >
        <el-form-item label="使用名称" prop="useName">
          <el-input v-model="insertUnitForm.useName" maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item label="单位名称" prop="unitName">
          <el-input v-model="insertUnitForm.unitName" maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item label="法人姓名" prop="legalName">
          <el-input v-model="insertUnitForm.legalName" maxlength="20" show-word-limit />
        </el-form-item>
        <el-form-item label="法人电话" prop="legalPhone">
          <el-input v-model="insertUnitForm.legalPhone" type="tel" maxlength="20" show-word-limit />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="insertUnitForm.email" type="email" maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item label="单位地址" prop="address">
          <el-input v-model="insertUnitForm.address" maxlength="100" show-word-limit />
        </el-form-item>

        <el-form-item label="所属地区" prop="areaId">
          <el-cascader v-model="insertUnitForm.areaId"
            :value="areaCascaderValue"
            :options="areaCascaderOptions"
            :props="areaCascaderProps"
            @change="areaCascaderChange"
            separator="-"
            clearable
          ></el-cascader>
        </el-form-item>

        <el-form-item label="单位风险等级">
          <el-select v-model="insertUnitForm.riskLevel" placeholder="请选择">
            <el-option
              v-for="item in riskLevelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="关联建筑" prop="buildingId" >
          <el-select v-model="insertUnitForm.buildingId" placeholder="请选择">
            <el-option
              v-for="item in building"
              :key="item.buildingId"
              :label="item.buildingName"
              :value="item.buildingId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="地理位置">
           <el-button title="选取地理位置" type="primary" @click="selectPostion(0,0)">位置</el-button>
        </el-form-item>

        <!--单位所在区域 已由建筑 即可确定， 此处待后续甲方意见
        <el-form-item label="消防管辖地区">
          <div class="block">
            <el-cascader
              v-model="insertUnitForm.fireScopeArea"
              :options="fireScopeAreaOptions"
              :props="props"
            />
          </div>
        </el-form-item>
        -->
          <!--单位选择建筑 即可确定位置， 此处待后续甲方意见
        <el-form-item label="地理位置">
          <el-button title="选取地理位置" type="primary" @click="selectPostion(0,0)">位置</el-button>
        </el-form-item>
        -->
      </el-form>
      <!-- 弹窗底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel('insertUnitForm')">取 消</el-button>
        <el-button type="primary" @click="addConfirm('insertUnitForm')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog
      title="编辑单位主信息"
      :visible.sync="updateDialogVisible"
      width="770px"
      :before-close="handleClose"
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
        <el-form-item label="使用名称" prop="useName">
          <el-input v-model="updates.useName" maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item label="单位名称" prop="unitName">
          <el-input v-model="updates.unitName" maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item label="法人姓名" prop="legalName">
          <el-input v-model="updates.legalName" maxlength="20" show-word-limit />
        </el-form-item>
        <el-form-item label="法人电话" prop="legalPhone">
          <el-input v-model="updates.legalPhone" type="tel" maxlength="20" show-word-limit />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updates.email" type="email" maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item label="单位地址" prop="address">
          <el-input v-model="updates.address" />
        </el-form-item>
        <el-form-item label="关联建筑" prop="buildingId">
          <el-select v-model="updates.buildingId" placeholder="请选择" clearable>
            <el-option
              v-for="item in building"
              :key="item.buildingId"
              :label="item.buildingName"
              :value="item.buildingId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="单位风险级别">
          <el-select v-model="updates.riskLevel" placeholder="请选择">
            <el-option
              v-for="item in riskLevelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属地区">
          <el-input
            v-model="updates.fullpathName"
            clearable
            maxlength="200"
            show-word-limit
            disabled
          ></el-input>
        </el-form-item>

        <el-form-item label="地理位置">
          <el-button
            title="选取地理位置"
            type="primary"
            @click="selectPostion(updates.longitude,updates.latitude)"
          >位置</el-button>
          <span>{{ updates.longitude }}</span><span>&nbsp;---&nbsp;&nbsp;{{ updates.latitude }}</span>
        </el-form-item>

         <!--单位所在区域 已由建筑 即可确定， 此处待后续甲方意见
        <el-form-item label="消防管辖地区">
          <div class="block">
            <el-cascader
              v-model="updates.fireScopeArea"
              :options="fireScopeAreaOptions"
              :props="props"
            />
          </div>
        </el-form-item>
          -->
        <!--单位选择建筑 即可确定位置， 此处待后续甲方意见
        <el-form-item label="地理位置">
          <el-button
            title="选取地理位置"
            type="primary"
            @click="selectPostion(updates.longitude,updates.latitude)"
          >位置</el-button>
        </el-form-item>
          -->
      </el-form>
      <!-- 弹窗底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel('updates')">取 消</el-button>
        <el-button type="primary" @click="editConfirm('updates')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog class="huise-class" title="选择位置" :visible.sync="mapDialogVisible" width="50%" :modal-append-to-body="false">
      <map-components v-if="mapDialogVisible" :lng-andlat="lngAndlat" @showClose="showClose" />
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { getAreaList } from "@/api/basic/area.js";

import { selectAllToOptions } from "@/api/basic/building";
import { verifyUserPermission } from "@/utils/validate";
import { selectUnitWithId } from "@/api/customer/unit";
import {
  selectAllUnitWithBuildingName,
  insertUnit,
  deletetUnitByPrimaryKey,
  updateUnitByPrimaryKey,
} from "@/api/customer/unit";

export default {
  data() {
    const checkFullpathName = (rule, value, callback) => {
      if (this.areaCascaderValue === "" || this.areaCascaderValue === null) {
        //  如果级联选择器中没有数据
        callback(new Error("请选择所属地区"));
      } else {
        callback();
      }
    };
    return {
      areaCascaderValue: "", //  级联选择器绑定的 value
      areaCascaderOptions: [], //  初始的选项 第一级节点
      areaCascaderProps: {
        //  地区级联选择、懒加载、单选
        expandTrigger: "click", //  悬停触发
        checkStrictly: true, //  单选
        lazy: true, //懒加载
        lazyLoad(node, resolve) {
          //  node为当前点击的节点
          //  这里不能调用 methods对象 中的方法
          getAreaList(node.value).then(
            (res) => {
              const nodes = res.map((item) => ({
                value: item.areaId,
                label: item.areaName,
              }));
              resolve(nodes);
            },
            (err) => {
              console.log(err);
            }
          );
        },
      },

      areaList: [],
      /*
      props: {
        checkStrictly: true,
        lazy: true,
        lazyLoad(node, resolve) {
          if (node.value == undefined) {
            return;
          } else {
            getAreaList(node.value).then((res) => {
              const nodes = res.map((item) => ({
                value: item.areaId,
                label: item.areaName,
              }));
              resolve(nodes);
            });
          }
        },
      },
      */

      lngAndlat: { lng: 0, lat: 0 }, // 经纬度的对象
      rules: {
        longitude: [
          {
            max: 20,
            message: "最大20字符",
            trigger: "blur",
          },
        ],
        latitude: [
          {
            max: 20,
            message: "最大20字符",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "不能为空",
          },
          {
            type: "email",
            message: "请输入有效的邮箱",
            trigger: "blur",
          },
          {
            max: 50,
            message: "最大 50 字符",
          },
        ],
        fireScopeArea: [
          {
            max: 50,
            message: "最大50字符",
            trigger: "blur",
          },
        ],
        unitName: [
          {
            required: true,
            message: "请输入单位名称",
            trigger: "blur",
          },
          {
            max: 50,
            message: "长度最大 50 个字符",
            trigger: "blur",
          },
        ],
        legalName: [
          {
            required: true,
            message: "请输入单位名称",
            trigger: "blur",
          },
          {
            max: 50,
            message: "最大50字符",
            trigger: "blur",
          },
        ],
        legalPhone: [
          {
            required: true,
            message: "请输入有效的手机号,只支持中国11位手机号",
            pattern: /^1[34578]\d{9}$/,
            trigger: "blur",
          },
        ],
        useName: [
          {
            required: true,
            message: "请输入使用名称",
            trigger: "blur",
          },
          {
            max: 50,
            message: "最大50字符",
            trigger: "blur",
          },
        ],
        address: [
          {
            max: 100,
            message: "最大100字符",
            trigger: "blur",
          },
        ],
        areaId: [
          {
            required: true,
            validator: checkFullpathName,
            trigger: "blur",
          },
        ],
        riskLevel: [
          {
            max: 20,
            message: "最大20字符",
            trigger: "blur",
          },
        ],
      }, // Form表单约束
      mapDialogVisible: false,
      allowInfo: "请选择一个选项",
      topSearch: "", // 顶部搜索栏类型选择变量
      isDisabled: true,
      building: [],
      maxHeight: "600",
      total: 10,
      page: {
        pageNum: 1,
        pageSize: 10,
        id: "",
        legalName: "",
        legalPhone: "",
        useName: "",
        startTime: "",
        endTime: "",
      },
      riskLevelOptions: [
        {
          value: "消防安全重点单位",
          label: "消防安全重点单位",
        },
        {
          value: "九小场所",
          label: "九小场所",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      fireScopeAreaOptions: [],
      tableData: [],
      selectTime: "",

      columnOptions: [
        "单位编号",
        "经度",
        "纬度",
        "使用名称",
        "单位名称",
        "法人姓名",
        "法人电话",
        "消防管辖地区",
        "邮箱",
        "单位地址",
        "建筑编号",
        "关联建筑",
        "单位风险等级",
        "创建时间",
      ], // 源数据
      checkAll: true, // 全选
      checkedColumn: [], // checked组选项
      isIndeterminate: false, // 默认是否出现 半选
      columnlast: [], // 点击到最后一个的时候 保存一下 以便出现提示
      checkedColumnCopy: [], // 变成checked组选项 免得老是刷新抖动

      insertUnitForm: {
        customerUnitId: 0,
        areaId: null,
        longitude: "",
        latitude: "",
        email: "",
        fireScopeArea: "",
        unitName: "",
        legalName: "",
        legalPhone: "",
        useName: "",
        address: "",
        buildingId: null,
        riskLevel: "",
        createdTime: "",
      },
      insertDialogVisible: false,
      updateDialogVisible: false,
      updates: {},
      //	行号
      row_index: "",
    };
  },
  computed: {
    selectUserInfo: {
      get: function () {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isDisabled = false;
        if (this.topSearch === "legalName") {
          return this.page.legalName;
        } else if (this.topSearch === "legalPhone") {
          return this.page.legalPhone;
        } else if (this.topSearch === "useName") {
          return this.page.useName;
        } else {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.isDisabled = true;
          return this.allowInfo;
        }
      },
      set: function (newValue) {
        switch (this.topSearch) {
          case "legalName":
            this.clearPageAndSetOption({ legalName: newValue });
            break;
          case "legalPhone":
            this.clearPageAndSetOption({ legalPhone: newValue });
            break;
          case "useName":
            this.clearPageAndSetOption({ useName: newValue });
            break;
          default:
        }
      },
    },
  },
  created() {
    this.columnOptions.forEach((element) => {
      this.checkedColumn.push(element);
      this.checkedColumnCopy.push(element);
    });
    this.funSelectAllUnitWithBuildingName();
    selectAllToOptions().then((res) => {
      this.building = res;
    });
    /*
    getAreaList(0).then((res) => {
      this.fireScopeAreaOptions = res.map((item) => ({
        value: item.areaId,
        label: item.areaName,
      }));
    });
    */
  },
  mounted() {
    this.maxHeight =
    this.$store.state.clientHeights - 50 - 28 - 71 - 65 - 40 - 32 - 17;
    this.funGetAreaList(0);
  },
  methods: {
    funGetAreaList(id) {
      getAreaList(id).then(
        (res) => {
          for (let i = 0; i < res.length; i++) {
            let temp = {
              label: res[i].areaName,
              value: res[i].areaId,
            };
            this.areaCascaderOptions.push(temp);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },

    selectPostion(lng, lat) {
      this.lngAndlat.lng = lng;
      this.lngAndlat.lat = lat;
      this.mapDialogVisible = true;
    },
    showClose(flag, data = {}) {
      if (flag) {
        // 点击取消
      } else {
        // 点击确定
        this.lngAndlat = data;
      }
      this.mapDialogVisible = false;
    },
    clearPageAndSetOption({
      legalName = "",
      legalPhone = "",
      useName = "",
      id = "",
    }) {
      this.page.legalName = legalName;
      this.page.legalPhone = legalPhone;
      this.page.useName = useName;
      this.page.id = id;
    },
    reset() {
      this.clearPageAndSetOption({});
      this.funSelectAllUnitWithBuildingName();
    },
    indexMethod(index) {
      return index + 1 + (this.page.pageNum - 1) * this.page.pageSize;
    },
    funSelectAllUnitWithBuildingName() {
      const temp = verifyUserPermission(this.$store.state.routersave.userInfo);
      this.page.id = temp || this.page.id;
      selectAllUnitWithBuildingName(this.page).then((res) => {
        //debugger
        this.tableData = res.list.map((item) => {
          if (item.fullpathName == "" || item.fullpathName == null) {
            item.fullpathName = "";
          } else {
            item.fullpathName = item.fullpathName.slice(1, -1);
          }
          return item;
        });
        this.total = res.total;
      });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.funSelectAllUnitWithBuildingName();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.funSelectAllUnitWithBuildingName();
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
      this.insertDialogVisible = true;
    },
    addConfirm(formName) {
      // 添加用户 确认
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.insertUnitForm.longitude = this.lngAndlat.lng;
          this.insertUnitForm.latitude = this.lngAndlat.lat;
          /*
          try {
            this.insertUnitForm.fireScopeArea = this.insertUnitForm.fireScopeArea.pop();
          } catch {
            this.insertUnitForm.fireScopeArea = "";
          }
          */
         this.insertUnitForm.areaId = this.areaCascaderValue; // 区域 id（主键） 赋值

          this.insertUnitForm.createdTime = this.$commonPgs.getCurrentDate(
            false
          );
          insertUnit(this.insertUnitForm).then((res) => {
            if (res === 1) {
              this.$message({
                message: "插入成功",
                type: "success",
              });
              for (var key in this.insertUnitForm) {
                this.insertUnitForm[key] = "";
              }
              this.funSelectAllUnitWithBuildingName();
              this.insertDialogVisible = false;
              selectUnitWithId().then((res) => {
                Vue.prototype.$unitOptions = res;
              });
            }
          });
        } else {
          // this.$message({
          //   message: "插入失败",
          //   type: "error",
          // });

          return false;
        }
      });
    },
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.updateDialogVisible = false;

      if (formName === "insertUnitForm") {
        this.insertDialogVisible = false;
        for (const key in this.insertUnitForm) {
          this.insertUnitForm[key] = "";
        }
      }
      // dialog = false
    },
    userDel(row) {
      // 用户删除

      deletetUnitByPrimaryKey(row.customerUnitId).then((res) => {
        if (res === 1 || res === 0) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.page.pageNum = 1;
          this.funSelectAllUnitWithBuildingName();
          selectUnitWithId().then((res) => {
            Vue.prototype.$unitOptions = res;
          });
        }
      });
    },
    userEdit(row) {
      //	编辑用户
      this.row_index = row.index;
      //debugger
      this.updates = JSON.parse(JSON.stringify(row));
      delete this.updates.buildingName;
      //this.updates.fireScopeArea = this.updates.fireScopeArea.split(",");
      //delete this.updates.fullpathName;
      this.updateDialogVisible = true;
    },
    handleClose(done) {
      //  添加用户 确认关闭
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    editConfirm(formName) {
      //	编辑用户 确认
      this.$refs[formName].validate((valid) => {
        if (valid) {
          try {
            this.updates.fireScopeArea = this.updates.fireScopeArea.pop();
          } catch {
            this.updates.fireScopeArea = "";
          }
          this.updates.latitude = this.lngAndlat.lat;
          this.updates.longitude = this.lngAndlat.lng;
          updateUnitByPrimaryKey(this.updates).then((res) => {
            if (res === 1) {
              this.$message({
                message: "编辑成功",
                type: "success",
              });
              this.updateDialogVisible = false;
              this.funSelectAllUnitWithBuildingName();
            }
          });
        }
      });
    },
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex;
    },
    
    areaCascaderChange(value) {
      let tempArr = value;
      if (tempArr !== "" && tempArr !== null && tempArr !== undefined) {
        //debugger
        this.areaCascaderValue = tempArr[tempArr.length - 1];
        this.insertUnitForm.areaId= tempArr[tempArr.length - 1];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.date-picker {
  width: 140px;
}
</style>
