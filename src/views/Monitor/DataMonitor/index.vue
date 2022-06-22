<template>
  <div class="main">
      <div class="box left1">
        <leftTopChart></leftTopChart>
      </div>
      <div class="box left2">
      </div>
      <div class="box left3">
      </div>
      <div class="boxmiddletop middletop">
        <middleTop></middleTop>
      </div>
      <div class="box map">
      </div>
      <div class="box right1">
      </div>
      <div class="box right2">
      </div>
      <div class="box right3">
      </div>
  </div>
</template>

<script>
import leftTopChart from "./chart/leftTopChart.vue";
import middleTop from "./chart/middleTop.vue";

export default {
  components: {
    leftTopChart:leftTopChart,
    middleTop: middleTop
  },
};
</script>

