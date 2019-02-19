<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">涡阳防汛抗旱系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {setCookie, getCookie, delCookie} from '../utils/cookie'
  export default {
    data: function(){
      return {
        ruleForm: {
          username: 'admin',
          password: '123123'
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.get(this.$url.baseUrl+'api/user/v0.1/ht/pda-user/pda-user').then((res)=>{
              if(res.status===200){
                let data=res.data.result;
                localStorage.setItem('ms_username',data.USER_NAME);
                let weather=document.getElementById("tp-weather-widget");
                weather.style.display="block";
                this.$router.push('/home');
                console.info("当前用户ID:%s,用户名:%s,真实姓名",data.USER_ID, data.USER_NAME, data.ACTUAL_NAME)
              }else{
                this.$router.push('/404')
              }
            });
            // localStorage.setItem('ms_username',this.ruleForm.username);
            // if(this.ruleForm.username==="admin"){
            //   let weather=document.getElementById("tp-weather-widget");
            //   weather.style.display="block";
            //   this.$router.push('/home');
            // }
          } else {

            return false;
          }
        });
      }
    },
    mounted(){
      let weather=document.getElementById("tp-weather-widget");
      weather.style.display="none";


      // let start=window.location.href.indexOf("=");
      // let end=window.location.href.indexOf("&");
      // let cookie=window.location.href.substring(start+1,end);
      // if(cookie){
      //   console.log(1);
      // }
      // setCookie("JSESSIONID",cookie);
      this.submitForm('ruleForm');
    }

  }
</script>

<style scoped>
  .login-wrap{
    position: relative;
    width:100%;
    height:100%;
    background-image: url(../assets/login-bg.jpg);
    background-size: 100%;
    /*background-color: #61baff;*/
  }
  .ms-title{
    width:100%;
    line-height: 50px;
    text-align: center;
    font-size:20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .ms-login{
    position: absolute;
    left:50%;
    top:50%;
    width:350px;
    margin:-190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255,255,255, 0.3);
    overflow: hidden;
  }
  .ms-content{
    padding: 30px 30px;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
    height:36px;
    margin-bottom: 10px;
  }
  .login-tips{
    font-size:12px;
    line-height:30px;
    color:#fff;
  }
</style>
