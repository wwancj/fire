<template>
  <div class="box">
    <commonFrameChart>
      <rightTopChart1></rightTopChart1>
    </commonFrameChart>
  </div>
</template>

<script>
import commonFrameChart from "./commonFrameChart.vue";
import rightTopChart1 from "./rightTopChart1.vue";
export default {
  components: {
    commonFrameChart: commonFrameChart,
    rightTopChart1: rightTopChart1
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: $showplatformwidth;
  height: $showplatformheight;
}
</style>
