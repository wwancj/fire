<template>
  <div class="box">
    <!-- <div class="title">火警信息态势图</div> -->
    <div class="tab-title">
      <span :class="span1" @click="selectClick(1)">平台公告</span>
      <span :class="span2" @click="selectClick(2)">新闻政策</span>
      <span :class="span3" @click="selectClick(3)">制度法规</span>
    </div>
    <div class="tab-info">
      <ul>
        <li v-for="(item, index) in infosList" :key="index" @click="aClick(item)">【{{ item.begindate }}】{{ item.title }}</li>
      </ul>
    </div>

    <el-dialog :title="titleInfo" :visible.sync="infoDialog" :modal-append-to-body="false" class="huise-class">
      <div class="xinwen">
        <h2 class="h2">{{ infos.title }}</h2>
        <div class="xinwen-1">
          <div>发布时间：{{ infos.begindate }}</div>
          <div>发布人：{{ infos.creater }}</div>
          <div style="height: 20px"></div>
          <p v-html="infos.content"></p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getByHomeTimeDescNews, getByHomeTimeDescInstitution, getByHomeTimeDescPublicNotice } from "@/api/home/home.js";
export default {
  data() {
    return {
      span1: "tab-title-span",
      span2: "",
      span3: "",
      newsList: [],
      institutionList: [],
      publicNoticeList: [],
      infoDialog: false,
      infos: {},
      infosList: [],
      flagV: 1,
    };
  },
  mounted() {
    this.funGetByHomeTimeDescNews();
    this.funGetByHomeTimeDescInstitution();
    this.funGetByHomeTimeDescPublicNotice();
  },
  computed: {
    titleInfo: {
      get() {
        return this.flagV == 1 ? "平台公告" : this.flagV == 2 ? "新闻政策" : "制度法规";
      },
    },
  },
  methods: {
    selectClick(v) {
      this.flagV = v;
      this.span1 = "";
      this.span2 = "";
      this.span3 = "";
      switch (v) {
        case 1:
          this.span1 = "tab-title-span";
          this.infosList = this.newsList;
          break;
        case 2:
          this.span2 = "tab-title-span";
          this.infosList = this.institutionList;
          break;
        case 3:
          this.span3 = "tab-title-span";
          this.infosList = this.publicNoticeList;
          break;
      }
    },
    aClick(item) {
      this.infos = item;
      this.infoDialog = true;
    },
    shaxin() {
      this.selectClick(1);
      this.funGetByHomeTimeDescNews();
      this.funGetByHomeTimeDescInstitution();
      this.funGetByHomeTimeDescPublicNotice();
    },
    funGetByHomeTimeDescNews() {
      getByHomeTimeDescNews().then((res) => {
        this.newsList = res;
        this.infosList = this.newsList;
      });
    },
    funGetByHomeTimeDescInstitution() {
      getByHomeTimeDescInstitution().then((res) => {
        this.institutionList = res;
      });
    },
    funGetByHomeTimeDescPublicNotice() {
      getByHomeTimeDescPublicNotice().then((res) => {
        this.publicNoticeList = res;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  width: $showplatformwidth;
  height: $showplatformheight;
  // padding-top: 0.4688rem;
}
.tab-title {
  position: absolute;
  top: 0.25rem;
  left: 0.65rem;
  font-size: 0.18rem;
  span {
    display: inline-block;
    width: 1.4063rem;
    text-align: center;
    font-size: 0.18rem;
    cursor: pointer;
    color: #3adabf;
  }
  span:hover {
    color: $showplatformcolor;
  }
  .tab-title-span {
    color: $showplatformcolor;
  }
  i {
    font-size: 0.18rem;
    cursor: pointer;
    color: aqua;
  }
  i:hover {
    color: #409eff;
  }
}
.tab-info {
  // width: 93%;
  width: 4.5rem;
  border: 2px solid #2e6099;
  position: absolute;
  top: 0.6rem;
  left: 0.2813rem;
  height: 78%;
  overflow: auto;
  li {
    height: 0.3125rem;
    line-height: 0.3125rem;
    font-size: 0.125rem;
    border-bottom: 1px solid #2e5077;
    color: #36ab60;
    white-space: nowrap; // 文字不换行
    overflow: hidden; // 超出隐藏
    text-overflow: ellipsis;
    cursor: pointer;
  }
  li:hover {
    color: #409eff;
  }
}
</style>
