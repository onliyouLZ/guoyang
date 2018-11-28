<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="header-logo">
      <i class="el-icon-menu"></i>
    </div>
    <div class="header-name">admin后台模板</div>
    <div class="header-right">
      <el-menu
        :default-active="onRoutes"
        class="header-menu"
        mode="horizontal"
        background-color="#242f42"
        text-color="#fff"
        router
        active-text-color="#ffd04b">
        <template v-for="item in items">
          <template>
            <el-menu-item :index="item.index" :key="item.index">
              <!--<i :class="item.icon"></i>-->
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
      <div class="header-user-con">
         <!--消息中心-->
        <div class="btn-bell">
        <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
        <router-link to="/tabs">
          <i class="el-icon-bell"></i>
        </router-link>
        </el-tooltip>
        <span class="btn-bell-badge" v-if="message"></span>
        </div>
         <!--用户头像-->
        <div class="user-avator"><img src="static/img/img.jpg"></div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="hover" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name:"",
        message:1,
        items:[
          {
            index: 'SystemHome',
            title: '首页'
          },
          {
            index: 'oneMap',
            title: '一张图'
          },
          {
            index: 'business',
            title: '业务管理'
          },
          {
            index: 'essential',
            title: '基础数据管理'
          },
          {
            index: 'system',
            title: '系统管理'
          }
        ]
      };
    },
    methods: {
      // 用户名下拉菜单选择事件
      handleCommand(command) {
        if(command == 'loginout'){
          localStorage.removeItem('ms_username');
          const weather=document.getElementById("tp-weather-widget");
          weather.style.display="none";
          this.$router.push('/login');
        }
      },
    },
    computed:{
      // 获取用户名
       username(){
         let username=localStorage.getItem('ms_username');

         return username ? username :this.name
       },
      onRoutes(){
        // this.indexClass=this.$route.path.replace('/', '');
        return this.$route.path.replace('/','');
      }
    },
    mounted(){

    }
  }
</script>
<style lang="less" scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    font-size: 22px;
    color: #fff;
  }
  .header-logo{
    float: left;
    padding: 0 21px;
    line-height: 60px;
  }
  .header .header-name{
    float: left;
    min-width:350px;
    line-height: 60px;
  }
  .header-right{
    float: right;
    padding-right: 50px;
  .header-menu {
    float: left;
    height: 59px;
  li {
    height: 60px;
    line-height: 60px;
  }
  }
  }
  .header-user-con{
    display: flex;
    height: 60px;
    align-items: center;
  }
  .btn-bell {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }
  .btn-bell-badge{
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }
  .btn-bell .el-icon-bell{
    color: #fff;
  }
  .user-name{
    margin-left: 10px;
  }
  .user-avator{
    margin-left: 20px;
  }
  .user-avator img{
    display: block;
    width:40px;
    height:40px;
    border-radius: 50%;
  }
  .el-dropdown-link{
    color: #fff;
    cursor: pointer;
  }
  .el-dropdown-menu__item{
    text-align: center;
  }
  .is-active{
    color: white!important;
    background-color:#efbb0d!important;
    border-bottom: #efbb0d!important;
  }

</style>
