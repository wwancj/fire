<template>
  <div class="main">
      <div class="box left1">
        <leftTopChart></leftTopChart>
      </div>
      <div class="box left2">
        <leftMiddleChart></leftMiddleChart>
      </div>
      <div class="box left3">
           <rightTopChart></rightTopChart>
      </div>
      <div class="boxmiddletop middletop">
        <middleTop></middleTop>
      </div>
      <div class="box map">
      </div>
      <div class="box right1">
          <leftBottomChart></leftBottomChart>
      </div>
      <div class="box right2">
         <rightMiddleChart></rightMiddleChart>
      </div>
      <div class="box right3">
         <rightBottomChart></rightBottomChart>
      </div>
  </div>
</template>

<script>
import leftTopChart from "./chart/leftTopChart.vue";
import leftMiddleChart from "./chart/leftMiddleChart.vue";
import leftBottomChart from "./chart/leftBottomChart.vue";
import rightTopChart from "./chart/rightTopChart.vue";
import rightMiddleChart from "./chart/rightMiddleChart.vue";
import rightBottomChart from "./chart/rightBottomChart.vue";
// import middleMap from "./chart/middleMap.vue";
import middleTop from "./chart/middleTop.vue";
export default {
  components: {
  
    leftTopChart: leftTopChart,
    leftBottomChart: leftBottomChart,
    rightTopChart: rightTopChart,
    rightMiddleChart: rightMiddleChart,
    rightBottomChart: rightBottomChart,
    leftMiddleChart: leftMiddleChart,
    // middleMap: middleMap,
    middleTop: middleTop,
  },
};
</script>

<style scoped lang="scss">
.main {
  position: relative;
  height: 100%;
  .box {
    width: 5rem;
    height: 3.5rem;
    position: absolute;
  }
  .boxmiddletop {
    width: 11.5rem;
    height: 1.7rem;
    position: absolute;
  }
  .left1 {
    top: 0.2rem;
  }
  .left2 {
    top: 3.8rem;
  }
  .left3 {
    top: 7.4rem;
  }
  .middletop {
    top: 0.3rem;
    left: 5.2rem;
  }
  .map {
    width: 11.7rem;
    height: 7.5rem;
    top: 1.5rem;
    left: 6rem;
  }
  .right1 {
    top: 0.2rem;
    right: 0;
  }
  .right2 {
    top: 3.8rem;
    right: 0;
  }
  .right3 {
    top: 7.4rem;
    right: 0;
  }
}
</style>
