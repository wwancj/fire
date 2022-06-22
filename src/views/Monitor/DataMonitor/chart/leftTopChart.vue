<template>
  <div class="box">
    <commonFrameChart>
      <leftTopChart1></leftTopChart1>
    </commonFrameChart>
  </div>
</template>

<script>
import commonFrameChart from "./commonFrameChart.vue";
import leftTopChart1 from "./leftTopChart1.vue";
export default {
  components: {
    commonFrameChart: commonFrameChart,
    leftTopChart1: leftTopChart1
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: $showplatformwidth;
  height: $showplatformheight;
}
</style>
