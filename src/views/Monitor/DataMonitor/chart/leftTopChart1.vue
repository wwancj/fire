<template>
  <div class="box">
    <div class="title">总体概况</div>

    <div class="bottom-data">
      <div class="shouye-top">
        <div class="top1-div">
          <svg-icon icon-class="topdanwei" class="home-svgs-top1"></svg-icon>
          <div class="top2-div">
            <div class="top4-div">{{ units }}</div>
            <div class="top3-div">联网单位</div>
          </div>
        </div>
        <div class="top1-div">
          <svg-icon icon-class="topweibao" class="home-svgs-top1"></svg-icon>
          <div class="top2-div">
            <div class="top4-div">{{ munits }}</div>
            <div class="top3-div">维保单位</div>
          </div>
        </div>
        <div class="top1-div" >
          <svg-icon icon-class="topjianzu" class="home-svgs-top1"></svg-icon>
          <div class="top2-div">
            <div class="top4-div">{{ builds }}</div>
            <div class="top3-div">建筑数量</div>
          </div>
        </div>
        <div class="top1-div">
          <svg-icon icon-class="topshebei" class="home-svgs-top1"></svg-icon>
          <div class="top2-div">
            <div class="top4-div">{{ equips }}</div>
            <div class="top3-div">设备数量</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      units: 0,
      munits: 0,
      builds: 0,
      equips: 0,
      flags: false,
      unitDialog: false,
      unitList: [],

      munitDialog: false,
      munitList: [],

      houseDialog: false,
      houseList: [],

      equipDialog: false,
      equipList: [],
      equipTotal: 0,
      pageNums: 1,
      pageSize: 10,
      flagId: 1,
    };
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
