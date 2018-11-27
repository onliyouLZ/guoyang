<template>
  <div class="breadcrumb">
    <i class="el-icon-location-outline"></i>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <template v-for="item in menu">
       <el-breadcrumb-item :to="{ path: item.path }"><a href="javascript:;" style="font-weight: 700;cursor: pointer">{{item.name}}</a></el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>

    export default {
      components: {},
      name: "breadcrumb",
      props:{
        menu:{
          type:Array,
          default:[]
        }
      },
      mounted(){
      }
    }
</script>

<style lang="less" scoped>
  .breadcrumb{
    width: 100%;
    height: 25px;
    background-color: rgb(255, 208, 75);
    i{
      margin-left: 5px;
      float: left;
      line-height: 25px;
    }
   .el-breadcrumb{
     height: 25px;
     line-height: 25px;
     padding-left: 25px;

   }

  }
  a{
    font-weight: 700!important;
    cursor:pointer!important;
  }
  .el-breadcrumb__inner a:hover{
    color: black;
  }
</style>
