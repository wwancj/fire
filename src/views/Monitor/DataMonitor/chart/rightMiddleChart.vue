<template>
  <div class="box">
    <commonFrameChart>
      <rightMiddleChart1></rightMiddleChart1>
    </commonFrameChart>
  </div>
</template>

<script>
import commonFrameChart from "./commonFrameChart.vue";
import rightMiddleChart1 from "./rightMiddleChart1.vue";
export default {
  components: {
    commonFrameChart: commonFrameChart,
    rightMiddleChart1: rightMiddleChart1
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: $showplatformwidth;
  height: $showplatformheight;
}
</style>
