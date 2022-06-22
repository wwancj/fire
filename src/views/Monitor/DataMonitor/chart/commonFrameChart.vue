<template>
  <div class="box">
    <dv-decoration-2
      class="decoration2"
      :reverse="true"
      style="width:.133333rem;height:3rem;"
    />
    <dv-border-box-12
      backgroundColor=" rgba(19, 25, 47, 0.6)"
      class="dv-boder12"
    >
      <slot></slot>
    </dv-border-box-12>
    <div>
      <div class="dotted"></div>
      <div class="pulse1"></div>
      <div class="pulse2"></div>
      <div class="pulse3"></div>
    </div>

  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.box {
  position: relative;
  width: $showplatformwidth;
  height: $showplatformheight;
}
.dotted {
  position: absolute;
  top: 0.32rem;
  left: 0.39rem;
  width: 0.04rem;
  height: 0.04rem;
  background-color: #09f;
  border-radius: 50%;
  opacity: 0.7;
}

.box div[class^="pulse"] {
  /* 保证我们小波纹在父盒子里面水平垂直居中 放大之后就会中心向四周发散 */
  position: absolute;
  top: 0.34rem;
  left: 0.413333rem;
  transform: translate(-50%, -50%);
  width: 0.106667rem;
  height: 0.106667rem;
  box-shadow: 0 0 0.2rem #009dfd;
  border-radius: 50%;
  animation: pulse 1.2s linear infinite;
}

.city div.pulse2 {
  animation-delay: 0.4s;
}

.city div.pulse3 {
  animation-delay: 0.8s;
}

@keyframes pulse {
  0% {
  }

  70% {
    /* transform: scale(5);  我们不要用scale 因为他会让 阴影变大*/
    width: 0.13rem;
    height: 0.13rem;
    opacity: 1;
  }

  100% {
    width: 0.3rem;
    height: 0.3rem;
    opacity: 0;
  }
}
.decoration2 {
  position: absolute;
  top: 0.2rem;
  right: .0781rem;
}
.dv-boder12 {
  width: 100%;
  height: 100%;
}
</style>
