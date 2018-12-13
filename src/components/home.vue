<template>
  <el-container>
    <div class="header-nav">
      <v-nav></v-nav>
    </div>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer height="0"></el-footer>
  </el-container>
</template>

<script>
    import Nav from '../components/nav'
    export default {
        name: "home",
        components:{
          vNav:Nav
        }
    }
</script>

<style scoped>
  .el-container{
    height: 100%;
  }
  .el-main{
    padding: 0;
  }
  .header-nav{
    position: fixed;
    z-index: 999;
    width: 100%;
  }
  .el-main[data-v-957c9522]{
    margin-top: 60px;
  }
</style>
