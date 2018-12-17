<template>
    <!--水情监视预警-->
    <div class="water-monitoring">
      <Breadcrumb :menu="menuArray"></Breadcrumb>
      <el-row>
        <el-col :span="3">
          <el-menu
            :default-active="onRoutes"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <template v-for="(item,index) in items">
              <el-menu-item  :index="item.path" :key="index">
                <i class="el-icon-location"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </template>
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
              {name:" 水雨情实时监控",path:"/oneMap"},
            ],
            items:[]
          }
        },
        computed:{
          onRoutes(){
            return this.$route.path.replace('#','');
          }
        },
        methods: {
          handleOpen(key, keyPath) {

          },
          handleClose(key, keyPath) {

          },
        },
        mounted(){
          this.items=this.$router.options.routes[1].children[2].children;
        }
    }
</script>

<style scoped>
.el-menu-vertical-demo{
  height: calc(100vh - 87px);
}
</style>
