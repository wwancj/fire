<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">中船消防设备管理系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.userLoginName"
          placeholder="账号"
          name="userLoginName"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.userPassword"
          :type="passwordType"
          placeholder="密码"
          name="userPassword"
          tabindex="2"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="Login"
        >登 录</el-button
      >

      <el-popover placement="top" title="" width="200" trigger="click">
        <el-image style="width: 200px; height: 200px" :src="appurl"></el-image>
        <el-button style="float: left" slot="reference">APP扫码下载</el-button>
      </el-popover>
      <el-button style="float: right" @click.native.prevent="loadClick">APP网页下载</el-button>
      <!-- <div class="tips">
        <span style="margin-right:20px;">测试账号: admin</span>
        <span> 测试密码: 111111</span>
      </div>-->
      
    </el-form>
  </div>
</template>

<script>
// import { loginInterface } from "@/api/login";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不少于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        userLoginName: "supadmin",
        userPassword: "123456",
      },
      loginRules: {
        userLoginName: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        userPassword: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,

      appurl: require("@/assets/images/appload.png"),
    };
  },
  watch: {
    // $route: {
    //   handler: function (route) {
    //     this.redirect = route.query && route.query.redirect;
    //   },
    //   immediate: true,
    // },
  },
  mounted() {

  },
  methods: {
    showPwd() {
    //   if (this.passwordType === "userPassword") {
    //     this.passwordType = "";
    //   } else {
    //     this.passwordType = "userPassword";
    //   }
    //   this.$nextTick(() => {
    //     this.$refs.password.focus();
    //   });
    },
    login(){
        this.$router.push("/home")
    }
    // async handleLogin() {
    //   this.$refs.loginForm.validate((valid) => {
    //     if (valid) {
    //       this.loading = true;
    //       loginInterface(this.loginForm)
    //         .then((res) => {
    //           console.log(" res0511 is "+res);
       
    //           if (res !== null) {
            
    //             sessionStorage.setItem("token", res.token);
    //             console.log( 'res.routerInfo', res.routerInfo)
    //             this.$store.commit("routersave/setRightList", res.routerInfo);
    //             this.$store.commit("routersave/setUserInfo", res);
    //             this.$router.push({ path: this.redirect || "/" });
    //           }
    //           this.loading = false;
    //         })
    //         .catch(() => {
    //           this.loading = false;
    //         });
    //     } else {
    //       return false;
    //     }
    //   });
    // },
    // loadClick(){
    //   window.open("http://114.115.206.130:8083/apk/zhongchuanxiaofang.apk");
    // },
    // loadClick1(){
    //   window.open("http://114.115.206.130:8084/downDemo");
    // }
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: calc(100% + 50px);
  width: 100%;
  height: 100vh;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
