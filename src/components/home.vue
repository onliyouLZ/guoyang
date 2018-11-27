<template>
  <el-container>
    <v-nav></v-nav>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer></el-footer>
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
  .el-main{
    padding: 0;
  }
</style>
