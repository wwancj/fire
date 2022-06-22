<template>
  <div class="box">
    <commonFrameChart>
      <leftBottomChart1></leftBottomChart1>
    </commonFrameChart>
  </div>
</template>

<script>
import commonFrameChart from "./commonFrameChart.vue";
import leftBottomChart1 from "./leftBottomChart1.vue";
export default {
  components: {
    commonFrameChart: commonFrameChart,
    leftBottomChart1: leftBottomChart1
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: $showplatformwidth;
  height: $showplatformheight;
}
</style>
