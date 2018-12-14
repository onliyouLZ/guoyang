<template>
    <!--水情监视预警-->
    <div class="water-monitoring">
      <Breadcrumb :menu="menuArray"></Breadcrumb>
      <el-row>
        <el-col :span="3">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu   index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="21">
           <router-view></router-view>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    import Breadcrumb from '../components/Breadcrumb'
    export default {
        name: "water-monitoring",
        components:{
          Breadcrumb:Breadcrumb
        },
        data(){
          return{
            menuArray:[
              {name:"水情监视预警",path:""},
              {name:"雨水情实时监控",path:"/oneMap"},
            ],
          }
        },
        methods: {
          handleOpen(key, keyPath) {

          },
          handleClose(key, keyPath) {

          }

        },
        mounted(){
          console.log(this.$route.fullPath);
        }
    }
</script>

<style scoped>
.el-menu-vertical-demo{
  height: calc(100vh - 87px);
}
</style>
