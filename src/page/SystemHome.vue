<template>
  <el-row>
    <el-col :span="24">
      <Breadcrumb :menu="menuArray"></Breadcrumb>
    </el-col>
    <div class="container">
111
    </div>
  </el-row>

</template>

<script>
    import Breadcrumb from '../components/Breadcrumb'
    export default {
        name: "SystemHome",
        components:{
          Breadcrumb:Breadcrumb,
        },
        data(){
            return{
              menuArray:[
                {name:"首页",path:""},
                {name:"首页",path:"/SystemHome"},
              ]
            }
        }

    }
</script>

<style scoped>
  .container{
    width: 1380px;
    margin:25px auto 0 auto;
    border: none;
    border-radius:0;
    background: red;
  }
</style>
