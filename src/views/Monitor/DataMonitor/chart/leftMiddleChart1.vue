<template>
  <div class="box">
    <div class="title">今日信息</div>
    <div class="bottom-data">
      <div class="shouye-top">
        <div class="top1-div">
          <svg-icon icon-class="top-zhong-huojing" class="home-svgs-top1"></svg-icon>
          <div class="top2-div">
            <div class="top4-div">{{ huojing }}</div>
            <div class="top3-div">今日报警</div>
          </div>
        </div>
        <div class="top1-div">
          <svg-icon icon-class="top-zhong-huojing1" class="home-svgs-top1"></svg-icon>
          <div class="top2-div">
            <div class="top4-div">{{ huojing }}</div>
            <div class="top3-div">火警处理</div>
          </div>
        </div>
        <div class="top1-div">
          <svg-icon icon-class="top-zhong-guzhang" class="home-svgs-top1"></svg-icon>
          <div class="top2-div">
            <div class="top4-div">{{ guzhang }}</div>
            <div class="top3-div">今日故障</div>
          </div>
        </div>
        <div class="top1-div">
          <svg-icon icon-class="top-zhong-guzhang1" class="home-svgs-top1"></svg-icon>
          <div class="top2-div">
            <div class="top4-div">{{ guzhang1 }}</div>
            <div class="top3-div">故障处理</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { EquipLogLevel1 } from "@/api/home/EquipLog.js";

export default {
  data() {
    return {
      huojing: 0,
      huojing1: 0,
      guzhang: 0,
      guzhang1: 0,
      flags: false,
    };
  },
  mounted() {
    // this.changeTiming();
    this.funSelectAllUnitGeneral();
  },
  methods: {
    funSelectAllUnitGeneral() {
      // EquipLogLevel1().then((res) => {   
      //   this.huojing = res[0];
      //   this.huojing1 = res[1];
      //   this.guzhang = res[2];
      //   this.guzhang1 = res[3];
      //   this.flags = true;
      // });



    },

    // changeTiming() {
    //   setInterval(() => {
    //     this.changeNumber();
    //   }, 3000);
    // },
    // changeNumber() {
    //   this.numberData.forEach((item, index) => {
    //     item.number.number[0] += ++index;
    //     item.number = { ...item.number };
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.box {
  position: relative;
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
.bottom-data {
  position: absolute;
  top: 0.4688rem;
  left: 0.2344rem;
  width: 100%;
  height: 100%;
  .item-box {
    float: left;
    margin: 0.2344rem 0 0 0.4688rem;
    width: 100%;
    font-size: 0.25rem;
    color: #d3d6dd;
    position: relative;
    height: 0.5rem;
    cursor: pointer;
    .digital {
      display: inline-block;
      width: 30%;
      height: 0.3rem;
      line-height: 0.3rem;
      text-align: center;
      color: #3adabf;
    }
    .text {
      display: inline-block;
      color: #3adabf;
      width: 27%;
    }
  }
}
</style>
