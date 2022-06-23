<template>
    <div class="box">
        <div class="title">联网单位信息</div>
        <div class="myChart">
            <dv-scroll-ranking-board
                :config="config"
                style="width: 4.4rem; height: 2.5rem"
            />
        </div>
    </div>
</template>

<script>
// import { selectAllUnitWithBuildingName1 } from "@/api/home/customerunit.js";
export default {
    name: "myChart",
    data() {
        return {
            config: {
                data: [],
                color: [
                    "#FF5D1D",
                    "#FFA91F",
                    "#FFF803",
                    "#9DF90D",
                    "#11EA00",
                    "#00FFF8",
                    "#038CEA",
                    "#2948FF",
                    "#B283FC",
                    "#A000EA",
                    "#F746EA",
                    "#AF1E59",
                ],
                lineWidth: 30,
                unit: "单位：个",
                showValue: true,
                valueFormatter({ value }) {
                    //console.warn(arguments);
                    //console.log("999ssss");
                    const reverseNumber = (value + "").split("").reverse();
                    let valueStr = "";

                    while (reverseNumber.length) {
                        const seg = reverseNumber.splice(0, 3).join("");
                        valueStr += seg;
                        if (seg.length === 3) valueStr += ",";
                    }

                    return valueStr
                        .split("")
                        .reverse()
                        .join("");
                },
            },
        };
    },
    mounted() {
        this.funSelectAllUnitGeneral();
    },
    methods: {
        funSelectAllUnitGeneral() {
            // selectAllUnitWithBuildingName1().then((res) => {
            //   this.config.data = res;
            //   this.config = {...this.config}
            // });
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
    position: absolute;
    top: 0.65rem;
    left: 0.3rem;
    width: $showplatformwidth;
    height: $showplatformheight;
}
.title {
    position: absolute;
    top: 0.25rem;
    left: 0.6rem;
    font-size: $showplatformtitlefont;
    color: $showplatformcolor;
}
</style>
