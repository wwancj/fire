<template>
  <div class="box" style="width: 11.5rem; height: 1.7rem">
    
    <dv-border-box-11
      backgroundColor=" rgba(19, 25, 47, 0.6)"
      title="警情信息展示"
      :style="{ width: '13.1rem', height: '1.7rem' }"
    >
      <el-row>
        <el-col :span="8">
          <div  class="cup">
            <svg-icon icon-class="huojing" className="icon"></svg-icon>
            <span class="text">
              {{ "火警" }}
            </span>
            <div class="div-middle-top-class"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="cup">
            <svg-icon icon-class="guzhang2" className="icon"></svg-icon>
            <span class="text">
              {{ "故障" }}
            </span>
            <div class="div-middle-top-class"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div   class="cup" >
            <svg-icon icon-class="weibao-copy" className="icon"></svg-icon>
            <span class="text">
              {{ "维保" }}
            </span>
            <div class="div-middle-top-class"></div>

          </div>
        </el-col>
      </el-row>
    </dv-border-box-11>

  </div>
</template> 

<script>
export default {
    data() {
    let font = 25;
    return {
      numberData: [
        {
          number: {
            number: [0],
            toFixed: 0,
            content: "{nt}",
            animationFrame: 6,
            style: {
              fontSize: font,
            },
          },
          text: "火警：",
        },
        {
          number: {
            number: [0],
            toFixed: 0,
            content: "{nt}",
            style: {
              fontSize: font,
            },
          },
          text: "故障：",
        },
        {
          number: {
            number: [0],
            toFixed: 0,
            content: "{nt}",
            style: {
              fontSize: font,
            },
          },
          text: "维保：",
        },
      ],
    };
  },
}
</script>

<style lang="scss" scoped>
.box {
  position: relative;
}
.dotted {
  position: absolute;
  top: 0.6rem;
  left: 0.4rem;
  width: 0.04rem;
  height: 0.04rem;
  background-color: #09f;
  border-radius: 50%;
  opacity: 0.7;
}

.box div[class^="pulse"] {
  /* 保证我们小波纹在父盒子里面水平垂直居中 放大之后就会中心向四周发散 */
  position: absolute;
  top: 0.62rem;
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
  left: 11.3rem;
}
.title {
  padding: 20px 0 0 300px;
  font-size: 0.3rem;
  color: #87c5ec;
}
.icon {
  width: 0.5rem;
  height: 0.5rem;
}
.el-row {
  position: absolute;
  top: 0.9rem;
  left: 0.7rem;
  width: 100%;
  height: 1rem;
  font-size: 0.3rem;
}
.el-col {
  border-radius: 4px;
  height: 100%;
}
.fire {
  position: absolute;
  left: 0.3rem;
  display: inline-block;
  width: 2.9rem;
  height: 0.5rem;
  line-height: 0.5rem;
}
.broken {
  position: absolute;
  left: 4.3rem;
  display: inline-block;
  width: 2.9rem;
  height: 0.5rem;
  line-height: 0.5rem;
}
.maintenance {
  position: absolute;
  left: 8.1rem;
  display: inline-block;
  width: 2.9rem;
  height: 0.5rem;
  line-height: 0.5rem;
}
.text {
  position: absolute;
  top: 0.15rem;
  color: #ffff00;
}
.digital {
  display: inline-block;
  width: 40%;
  height: 0.5rem;
  line-height: 0.5rem;
}
.cup {
  cursor: pointer;
  position: relative;
}
.fire-List {
  width: calc(100% - 40px);
  // border: 1px solid red;
  height: 600px;
}
.infos {
  height: 450px;
  border: 1px solid #255D5D;
  width: calc(100% - 10px);;
  overflow: auto;
}
.list1 {
  height: 40px;
  line-height: 40px;
  position: relative;
  padding: 0 20px;
  border-bottom: 1px solid #255D5D;
}
.warn-list {
  color: #B5B9BE;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
  display: inline-block;
  width: 600px;
}
.infos .times {
  font-size: 10px;
}
.xiangqing-class {
  position: absolute;
  right: 20px;
}

.info-dialog {
  margin-bottom: 15vh;
  .info-page {
    background: transparent;
    .el-divider{
      background: #255D5D;
    }
    .el-divider__text{
      background: #0D2F55;
      color: #50e3c2;
    }
    .row-class1 {
      position: initial;
      height: 100%;
    }
    .col-class1 {
      font-size: 14px;
      padding: 10px 0;
      font-weight: 700;
      color: #B9BDC1;
      :nth-child(1) {
        font-size: 16px;
        color: #50e3c2;
        font-weight: 700;
      }
    }
  }
}
// .info-row {
//   padding: 10px;
//   border-bottom: 1px solid #eee;
// }
.class-link {
  float: right;
  color: #67c23a !important;
}


.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-table .other-row {
  background: #f9ebeb;
}

.yuyue-info-class div{
  margin-bottom: 10px;
  font-size: 16px;
}

.yuyue-info-class div span:nth-child(1){
  color: red;
  display: inline-block;
  width: 100px;
  font-weight: 700;
}

.div-middle-top-class{
  position: absolute;
  top: .1563rem;
  color: #3adabf;
  // right: 0;
  left: 45%;
}

</style>
