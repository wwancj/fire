<template>
  <div class="box">
    <div class="title">无线设备</div>
    <div class="myChart">
      <dv-capsule-chart :config="config" style="width: 4.4rem; height: 2.5rem" />
    </div>
    <div class="infos" @click="funGetTypeAll()">更多</div>
    <el-dialog title="设备数量列表" :visible.sync="equipDialogs" :modal-append-to-body="false" class="huise-class">
      <el-table
        :data="equipTypes"
        min-height="400"
        max-height="600"
        :header-cell-style="$store.state.style.headerStyle1"
        :cell-style="$store.state.style.cellStyle1"
      >
        <el-table-column label="#" type="index" align="center"></el-table-column>
        <el-table-column label="设备类型" prop="name"></el-table-column>
        <el-table-column label="设备数量">
          <template slot-scope="scope">
            <el-link type="primary" @click="infosClick(scope.row.id)">{{ scope.row.value }}</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="设备明细表" :visible.sync="listsDialog" :modal-append-to-body="false" width="1200px" class="huise-class">
      <el-table
        :data="equipListByTypes"
        height="400"
        class="huise-class"
       :header-cell-style="$store.state.style.headerStyle1"
        :cell-style="$store.state.style.cellStyle1"
      >
        <el-table-column label="#" type="index" width="70px"></el-table-column>
        <el-table-column label="所属单位" min-width="200px" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ $getUnitName($unitOptions, scope.row.customerUnitId) }}
          </template>
        </el-table-column>
        <el-table-column label="设备子系统" min-width="100px" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ $getSystemName($EquipSysType, scope.row.equipSubSystemId) }}
          </template>
        </el-table-column>
        <el-table-column label="设备类型" min-width="100px" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ $getEquipTypeName($EquipType, scope.row.equipTypeId) }}
          </template>
        </el-table-column>
        <el-table-column label="设备形态" min-width="100px" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.equipType1 == "独立" ? scope.row.equipType1 + "式设备" : "传统主机设备" }}
          </template>
        </el-table-column>
        <el-table-column label="编号" min-width="150px" show-overflow-tooltip>
          <template slot-scope="scope"> {{ scope.row.equipNo }}-{{ scope.row.equipIndex }} </template>
        </el-table-column>
        <el-table-column label="安装日期" prop="installData" min-width="100px" show-overflow-tooltip> </el-table-column>
        <el-table-column label="设备位置" prop="equipUrl" min-width="100px" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
// import { productListGetAllByName, productListGetAllByName3, getEquipListByTypeId } from "@/api/home/EquipList.js";
export default {
  name: "myChart",
  data() {
    return {
      config: {
        data: [],
        color: [
          "#FF5D1D",
          "#FFA91F",
          "#FFF803",
          "#9DF90D",
          "#11EA00",
          "#00FFF8",
          "#038CEA",
          "#2948FF",
          "#B283FC",
          "#A000EA",
          "#F746EA",
          "#AF1E59",
        ],
        lineWidth: 30,
        unit: "单位：个",
        showValue: true,
      },

      equipDialogs: false,
      equipTypes: [],

      listsDialog: false,
      equipListByTypes: [],
    };
  },
  mounted() {
    this.funSelectAll();
  },
  methods: {
    funSelectAll() {
      // productListGetAllByName().then((res) => {
      
      //   this.config.data = res;
       
      //   this.config = { ...this.config };
    
      // });
    },

    funGetTypeAll() {
      this.equipDialogs = true;
      // this.funProductListGetAllByName3();
    },

    // funProductListGetAllByName3() {
    //   productListGetAllByName3().then((res) => {
    //     console.log(res);
    //     this.equipTypes = res;
    //   });
    // },

    fungetEquipListByTypeId(id) {
      getEquipListByTypeId(id).then((res) => {
        console.log(res);
        this.equipListByTypes = res;
      });
    },

    infosClick(id) {
      this.fungetEquipListByTypeId(id);
      this.listsDialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  width: $showplatformwidth;
  height: $showplatformheight;
}
.myChart {
  position: absolute;
  top: 0.65rem;
  left: 0.3rem;
  width: $showplatformwidth;
  height: $showplatformheight;
}
.title {
  position: absolute;
  top: 0.25rem;
  left: 0.65rem;
  font-size: $showplatformtitlefont;
  color: $showplatformcolor;
}

.infos {
  position: absolute;
  top: 0.25rem;
  right: 0.65rem;
  font-size: $showplatformtitlefont;
  color: $showplatformcolor;
  cursor: pointer;
}
</style>
