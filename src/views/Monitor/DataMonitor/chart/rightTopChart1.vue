<template>
  <div class="box">
    <div class="title">设备故障</div>
    <div ref="myChart" class="myChart"></div>
  </div>
</template>

<script>
// import { productListGetAllByName2 } from "@/api/home/EquipList.js";
export default {
  data() {
    return {};
  },
  mounted() {
    //this.funSelectAllUnitGeneral()
    if (this.$refs.myChart != undefined) {
      console.log("");
      this.drawLine();
    }
  },
  updated() {
    this.drawLine();
  },
  methods: {
    //  funSelectAllUnitGeneral() {
    //   productListGetAllByName2().then((res) => {
    //     console.log(res[0].name)
    //     //this.config.data = res;
    //     console.log(this.drawLine.data);
    //     //this.config = {...this.config}
    //     //this.drawLine.option.legend.data=res[0].name
    //     // this.config.data = JSON.parse(JSON.stringify(this.config.data))
    //     //this.drawLine.option.legend.data = {...this.drawLine.option.legend.data}
    //   });
    // },

    async drawLine() {
      // 基于准备好的dom，初始化echarts实例
      console.log(this.$refs.myChart);
      let myChart = this.$echarts.init(this.$refs.myChart);
      // 绘制图表配置
      let option = {
        // title: {
        //   text: "设备故障", // 主标题名称
        //   subtext: "", // 副标题名称
        //   x: "10%", // 标题的位置
        //   y: "5%", // 标题的位置
        //   textStyle: {
        //     color: "#87c5ec",
        //     fontSize: 15, // 调节字体大小
        //     fontWeight: "normal"
        //   }
        // },
        //提示框
        tooltip: {
          trigger: "item",
          position: "inside",
          backgroundColor: "rgba(0,0,0,0.7)",
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.5)",
          formatter: "{b}</br>{c} ({d}%)",
          textStyle: {
            color: "#87c5ec",
            fontSize: 15,
          },
        },

        textStyle: {
          fontSize: ".1563rem", 
        },

        legend: {
          orient: "vertical", // 标签名称垂直排列
          x: "48%", // 标签的位置
          y: "25%",
          data: [],
          icon: "circle",
          itemHeight: 8,
          textStyle: {
            color: "#87c5ec",
          },
          formatter: (name) => {
            // 获取legend显示内容
            let data = option.series[0].data;
            let total = 0;
            let tarValue = 0;
            for (let i = 0, l = data.length; i < l; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                tarValue = data[i].value;
              }
            }
            let p = ((tarValue / total) * 100).toFixed(2);
            return p + "% --" + name;
          },
        }, // 标签变量名称
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: false, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
            },
            restore: { show: false },
            saveAsImage: { show: false }, // 保存图片
          },
        },
        calculable: true,
        series: [
          {
            name: "面积模式", // 图表名称
            type: "pie", // 图表类型
            radius: ["20%", "60%"], // 图表内外半径大小
            center: ["25%", "60%"], // 图表位置
            roseType: "area",
            label: {
              normal: {
                show: false,
                formatter: "{b}({d}%)", // 显示百分比
              },
            },
            data: [],
          },
        ],
      };

      let res = await productListGetAllByName2();
      res.forEach((element, index) => {
        option.legend.data[index] = element.name;
      });
      option.series[0].data = res;

      // 窗口大小自适应方案
      //console.log(111, option);
      myChart.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  position: relative;
  width: $showplatformwidth;
  height: $showplatformheight;
}
.myChart {
  width: 90%;
  height: 100%;
}
.title {
  position: absolute;
  top: 0.25rem;
  left: 0.65rem;
  font-size: $showplatformtitlefont;
  color: $showplatformcolor;
}
</style>
