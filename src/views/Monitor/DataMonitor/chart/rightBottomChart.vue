<template>
  <div class="box">
    <commonFrameChart>
      <rightBottomChart1></rightBottomChart1>
    </commonFrameChart>
  </div>
</template>

<script>
import commonFrameChart from "./commonFrameChart.vue";
import rightBottomChart1 from "./rightBottomChart1.vue";
export default {
  components: {
    commonFrameChart: commonFrameChart,
    rightBottomChart1: rightBottomChart1
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: $showplatformwidth;
  height: $showplatformheight;
}
</style>
