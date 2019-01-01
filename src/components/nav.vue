<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="header-logo">
      <i class="el-icon-menu"></i>
    </div>
    <div class="header-name">涡阳防汛抗旱系统</div>
    <div class="header-right">
      <el-menu
        :default-active="onRoutes"
        class="header-menu"
        mode="horizontal"
        background-color="#0a95ef"
        text-color="#fff"
        router
        active-text-color="#ffd04b">
        <template v-for="item in items">
          <template>
            <el-menu-item :index="item.path" :key="item.path">
              <!--<i :class="item.icon"></i>-->
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
      <div class="header-user-con">
        <!--消息中心-->
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
            <router-link to="/login">
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
        items:this.$router.options.routes[1].children
      };
    },
    methods: {
      // 用户名下拉菜单选择事件
      handleCommand(command) {
        if(command === 'loginout'){
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
        let routerPath=this.$route.path.replace('#','');
        let active;
        $.each(this.items,(v,item)=>{
          if(routerPath===item.path){
            active=item.path;
            return false
          }else if(routerPath==="/realTimeRain"){
            active='/waterMonitoring';
            return false
          }else if(routerPath==="/rainwater"){
            active='/waterMonitoring';
            return false
          }else if(routerPath==="/RainwaterReport"){
            active='/waterMonitoring';
            return false
          }else if(routerPath==="/gates"){
            active='/waterWorks';
            return false
          }else if(routerPath==="/river"){
            active='/waterWorks';
            return false
          }else if(routerPath==="/store"){
            active='/management';
            return false
          }else if(routerPath==="/goods"){
            active='/management';
            return false
          }else if(routerPath==="/materials"){
            active='/management';
            return false
          }else if(routerPath==="/organization"){
            active='/floodControl';
            return false
          }else if(routerPath==="/rescue"){
            active='/floodControl';
            return false
          }else if(item.path==="/home"){
            active=item.path;
            return false
          }
        });
        return active
        // return this.$route.path.replace('#','');
      }
    },
    mounted(){
      // this.items=;
      // console.log(this.items);
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
    background-color: #0a95ef;
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
      background-color: #0a95ef!important;
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
