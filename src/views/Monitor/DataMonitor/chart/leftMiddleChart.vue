<template>
  <div class="box">
    <commonFrameChart>
      <leftMiddleChart1></leftMiddleChart1>
    </commonFrameChart>
  </div>
</template>

<script>
import commonFrameChart from "./commonFrameChart.vue";
import leftMiddleChart1 from "./leftMiddleChart1.vue";
export default {
  components: {
    commonFrameChart: commonFrameChart,
    leftMiddleChart1: leftMiddleChart1
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: $showplatformwidth;
  height: $showplatformheight;
}
</style>
