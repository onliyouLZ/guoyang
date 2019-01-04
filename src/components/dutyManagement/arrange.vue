<template>
  <div id="arrange"
       v-loading="loading"
       element-loading-text="加载中">
    <el-card class="box-card">
        <el-row>
          <el-col :span="1">1</el-col>
          <el-col :span="19">2</el-col>
          <el-col :span="4">3</el-col>
        </el-row>
    </el-card>
  </div>
</template>

<script>
  import {parserDate,groupByWeek} from '../../utils/utils'
  export default {
    name: "arrange",
    data(){
      return {
        loading:true
      }
    },
    methods:{
      search(){
        let _current = new Date();
        let queryParams = {
          bgtm: (_current.getFullYear() + 0) + '-01-01 00:00:00',
          endtm: (_current.getFullYear() + 0) + '-12-31 23:59:59'
        };
        this.$http.post(this.$url.baseUrl+'api/duty/v0.1/duty/manage',queryParams)
          .then((res)=>{
            console.log(res);
          })
      }
    },
    mounted(){
      this.$nextTick(()=>{
        setTimeout(()=>{
          this.loading=false;
          this.search()
        },500)
      })
    }
  }
</script>

<style scoped>
  #arrange .box-card{
    height: calc(100vh - 89px);
  }
</style>
