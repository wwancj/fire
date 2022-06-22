<template>
  <div>
    <div class="tab-info">
      <div :class="choice1" @click="tabclick(1)">值班人员统计表</div>
      <div :class="choice2" @click="tabclick(2)">竣工图纸</div>
      <div :class="choice3" @click="tabclick(3)">消防设备清单</div>
      <!-- <div :class="choice4" @click="tabclick(4)">报警系统地址码</div> -->
      <div :class="choice5" @click="tabclick(5)">应急预案</div>
      <div :class="choice6" @click="tabclick(6)">值班记录</div>
      <div :class="choice7" @click="tabclick(7)">日常巡检记录单</div>
    </div>

    <Statistics-On-Duty v-if="choice1 == 'class'"/>
    <completion-Drawings  v-if="choice2 == 'class'"/>
    <fire-Equipment v-if="choice3 == 'class'"/>
    <alarm-System-Address-Code v-if="choice4 == 'class'"/>
    <emergency-Plan v-if="choice5 == 'class'"/>
    <duty-Record v-if="choice6 == 'class'"/>
    <daily-Inspection-Record v-if="choice7 == 'class'"/>
  </div>
</template>

<script>
import completionDrawings from "./components/completionDrawings";
import fireEquipment from "./components/EquipManage/index";
import alarmSystemAddressCode from "./components/alarmSystemAddressCode";
import StatisticsOnDuty from "./components/StatisticsOnDuty";
import emergencyPlan from "./components/emergencyPlan";
import dutyRecord from "./components/dutyRecord";
import dailyInspectionRecord from "./components/dailyInspectionRecord";
export default {
  components: {
    "completion-Drawings": completionDrawings,
    "fire-Equipment": fireEquipment,
    "alarm-System-Address-Code": alarmSystemAddressCode,
    "Statistics-On-Duty": StatisticsOnDuty,
    "emergency-Plan": emergencyPlan,
    "duty-Record": dutyRecord,
    "daily-Inspection-Record": dailyInspectionRecord,
  },
  data() {
    return {
      choice1: "class",
      choice2: "",
      choice3: "",
      choice4: "",
      choice5: "",
      choice6: "",
      choice7: "",
    };
  },
  methods: {
    tabclick(i) {
      switch (i) {
        case 1:
          this.choice1 = "class";
          this.choice2 = "";
          this.choice3 = "";
          this.choice4 = "";
          this.choice5 = "";
          this.choice6 = "";
          this.choice7 = "";
          break;
        case 2:
          this.choice1 = "";
          this.choice2 = "class";
          this.choice3 = "";
          this.choice4 = "";
          this.choice5 = "";
          this.choice6 = "";
          this.choice7 = "";
          break;
        case 3:
          this.choice1 = "";
          this.choice2 = "";
          this.choice3 = "class";
          this.choice4 = "";
          this.choice5 = "";
          this.choice6 = "";
          this.choice7 = "";
          break;
        case 4:
          this.choice1 = "";
          this.choice2 = "";
          this.choice3 = "";
          this.choice4 = "class";
          this.choice5 = "";
          this.choice6 = "";
          this.choice7 = "";
          break;
        case 5:
          this.choice1 = "";
          this.choice2 = "";
          this.choice3 = "";
          this.choice4 = "";
          this.choice5 = "class";
          this.choice6 = "";
          this.choice7 = "";
          break;
        case 6:
          this.choice1 = "";
          this.choice2 = "";
          this.choice3 = "";
          this.choice4 = "";
          this.choice5 = "";
          this.choice6 = "class";
          this.choice7 = "";
          break;
        case 7:
          this.choice1 = "";
          this.choice2 = "";
          this.choice3 = "";
          this.choice4 = "";
          this.choice5 = "";
          this.choice6 = "";
          this.choice7 = "class";
          break;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.tab-info {
  > div {
    display: inline-block;
    width: 150px;
    height: 35px;
    border: 2px solid #10ff007d;
    font-size: 16px;
    margin: 0 20px 10px;
    line-height: 35px;
    text-align: center;
    cursor: pointer;
  }
  > div.class {
    box-shadow: 2px 2px 5px 5px #ff51007d;
  }
}
</style>