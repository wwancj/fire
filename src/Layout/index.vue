<template>
  <div class="layout">
    <dv-full-screen-container class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 style="width: 33.3%; height: 0.0625rem" />
          <div class="d-flex jc-center">
            <dv-decoration-8 :color="['#568aea', '#000000']" style="width: 2.5rem; height: 0.625rem" />
            <div class="title">
              <span class="title-text">中船长安智慧消防物联监控平台</span>
              <!-- <dv-decoration-6
                class="title-bototm"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
                style="width: 3.125rem; height: 0.1rem"
              /> -->
            </div>
            <dv-decoration-8 :reverse="true" :color="['#568aea', '#000000']" style="width: 2.5rem; height: 0.625rem" />
          </div>
          <dv-decoration-10 style="width: 33.3%; height: 0.0625rem; transform: rotateY(180deg)" />
        </div>
      </div>
      <nav-bar></nav-bar>
      <div :style="{ overflow: 'auto', 'overflow-x': 'hidden', height: heights }">
        <router-view v-if="isRouterAlive"></router-view>
      </div>
      <!-- 退出登录模块 -->
      <div class="loginOut-class">
        <el-popover popper-class="popper-loginout-class" placement="bottom" trigger="hover">
          <!-- <el-button slot="reference">hover 激活</el-button> -->
          <!-- <div slot="reference" class="level1-class level1-active-class">{{item.text}}</div> -->
          <div slot="reference">
            {{ $store.state.routersave.userInfo.userName }}
          </div>
          <div solt="center">
            <div class="loginout1-class" @click="changePassword">修改密码</div>
            <div class="loginout1-class" @click="logout">退出登录</div>
          </div>
        </el-popover>
      </div>
    </dv-full-screen-container>
    
    <el-dialog
      title="修改密码"
      :visible.sync="changePasswordDialogIsVisible"
      width="500px"
      :append-to-body="true"
      :modal-append-to-body="false"
    >
      <el-form ref="changPasswordForm" :model="changPasswordForm" :rules="changPasswordFormRules" status-icon label-width="100px">
        <el-form-item label="旧密码:" prop="oldPass">
          <el-input
            type="password"
            v-model="changPasswordForm.oldPass"
            name="oldPass"
            minlength="6"
            maxlength="20"
            placeholder="请输入旧密码"
            clearable
          />
        </el-form-item>
        <el-form-item label="新密码:" prop="newPass">
          <el-input
            type="password"
            v-model="changPasswordForm.newPass"
            name="newPass"
            minlength="6"
            maxlength="20"
            placeholder="请输入新密码"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="确认密码:" prop="confirmNewPass">
          <el-input
            type="password"
            v-model="changPasswordForm.confirmNewPass"
            name="confirmNewPass"
            minlength="6"
            maxlength="20"
            placeholder="请再次输入新密码"
            show-word-limit
          />
        </el-form-item>
      </el-form>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="changePasswordCancel('changPasswordForm')">取 消</el-button>
        <el-button type="primary" @click="changePasswordConfirm('changPasswordForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import { changeUserPassword } from "@/api/user/userList.js";

export default {
  components: {
    NavBar,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.changPasswordForm.confirmNewPass !== "") {
          this.$refs.changPasswordForm.validateField("confirmNewPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.changPasswordForm.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading: true,
      stylemain: "",
      heights: "",
      isRouterAlive: true,
      changePasswordDialogIsVisible: false,
      changPasswordForm: {
        oldPass: "",
        newPass: "",
        confirmNewPass: "",
      }, //  修改密码对象
      changPasswordFormRules: {
        oldPass: [
          {
            required: true,
            message: "请输入旧密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 16,
            message: "长度大于 6 个字符且小于 16 个字符",
            trigger: "blur",
          },
        ],
        newPass: [
          {
            validator: validatePass,
            trigger: "blur",
          },
          {
            min: 6,
            max: 16,
            message: "长度大于 6 个字符且小于 16 个字符",
            trigger: "blur",
          },
        ],
        confirmNewPass: [
          {
            validator: validatePass2,
            trigger: "blur",
          },
          {
            min: 6,
            max: 16,
            message: "长度大于 6 个字符且小于 16 个字符",
            trigger: "blur",
          },
        ],
      }, //  修改密码 表单校验规则
    };
  },
  mounted() {
    this.cancelLoading();
    this.heights = document.documentElement.clientHeight - 126 + "px";
  },
  methods: {
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    async logout() {
      sessionStorage.clear();
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      location.reload();
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    changePassword() {
      //  点击修改密码按钮触发的事件
      this.changePasswordDialogIsVisible = true;
    },
    resetForm(formName) {
      /**
       * 重置 From 表单
       */
      this.$refs[formName].resetFields();
    },
    changePasswordCancel(formName) {
      /**
       * 修改密码 取消
       */
      this.changePasswordDialogIsVisible = false;
      this.resetForm(formName);
    },
    changePasswordConfirm(formName) {
      /**
       * 修改密码 确定
       */
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let tempObject = {
            oldPass: this.changPasswordForm.oldPass,
            newPass: this.changPasswordForm.newPass,
            userId: this.userID,
          };
          changeUserPassword(tempObject).then(
            (res) => {
              if (res === 1) {
                this.$message({
                  message: "密码修改成功",
                  type: "success",
                });
              } else {
                this.$message({
                  message: "原密码输入错误，密码修改失败",
                  type: "error",
                });
              }
            },
            (err) => {
              // this.$message({
              //     message: "原密码输入错误，密码修改失败",
              //     type: "error",
              // });
            }
          );
          this.changePasswordCancel(formName);
        } else {
          this.$message({
            message: "密码修改失败",
            type: "error",
          });
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../style/layout.scss";
.loginOut-class {
  position: fixed;
  right: 0.53333rem;
  top: 0.53333rem;
  padding: 0.08rem;
  font-size: 0.26667rem;
  line-height: 0.32rem;
  border: 2px solid #4394e478;
  border-radius: 0.13333rem;
  cursor: pointer;
}
</style>
