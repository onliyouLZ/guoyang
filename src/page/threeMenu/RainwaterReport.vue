<!--雨水情综合报表-->
<template>
    <div id="RainwaterReport"
         v-loading="loading"
         element-loading-text="加载中">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="单站降雨量" name="first" >
              <table1 v-if="activeName==='first'" @primary="primary"></table1>
            </el-tab-pane>
            <el-tab-pane label="政区面雨量统计" name="second">
              <table2 v-if="activeName==='second'" @primary="primary"></table2>
            </el-tab-pane>
            <!--<el-tab-pane label="降雨量对比统计表"  name="third">-->
              <!--<div v-if="activeName==='third'">33</div>-->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="雨情统计表" name="fourth">-->
              <!--<div v-if="activeName==='fourth'">44</div>-->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="水情统计表" name="six">-->
              <!--<div v-if="activeName==='six'">55</div>-->
            <!--</el-tab-pane>-->
        </el-tabs>
    </div>
</template>

<script>
    import table1 from '../../components/waterWarning/table1'
    import table2 from '../../components/waterWarning/table2'
    export default {
        name: "RainwaterReport",
        components:{table1,table2},
        data(){
          return{
            activeName:"first",
            loading:true,
            show:true
          }
        },
        methods:{
          handleClick(tab, event) {
            this.loading=true;
            setTimeout(()=>{
              this.loading=false;
            },1000)
          },
          primary(data){
            this.loading=data.loading;
            setTimeout(()=>{
              this.loading=false;
            },1000)
          }
        },
        computed:{
        },
        created(){
          setTimeout(()=>{
            this.loading=false
          },1000)
        }
    }
</script>

<style scoped>
  #RainwaterReport{
    background-color: white;
    height: calc(100vh - 87px);
  }
  #RainwaterReport .el-tabs--border-card{
    height: 100%;
    border: none;
  }
</style>
<style>
  #RainwaterReport .el-tabs--border-card .el-tabs__content{
    height:calc(100vh - 157px);
  }
</style>
