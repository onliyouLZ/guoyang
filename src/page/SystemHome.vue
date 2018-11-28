<template>
  <el-row>
    <el-col :span="24">
      <Breadcrumb :menu="menuArray"></Breadcrumb>
    </el-col>
    <div class="container">
      <el-row class="panel_tip mgb10">
        <el-col :span="2" style="text-align: center">
         <i class="fa fa-user-o"></i>&nbsp;&nbsp;<span style="font-weight: 700">今日值班:</span>
        </el-col>
        <el-col :span="22">
          <span>
            <template >
              <template v-for="item in dutyData">
                  <span style="font-weight: 700">{{item.dutyType}}</span>：{{item.people}}
              </template>
            </template>
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="mgb10">
        <el-col :span="24">
          <el-card shadow="hover" class="" :body-style="{padding:'5px'}">
            <el-col :span="8" style="padding: 5px">
              <div class="center-main-title">
                <div class="title-stick bg-blue">
                </div>
                <div class="title-name mgl10">
                  湖泊站超警统计
                </div>
              </div>
              <div>
                <div id="electric_prod_chart" style="width: 100%;height:250px;"></div>
              </div>
            </el-col>
            <el-col :span="16" style="padding: 5px">
              <div class="center-main-title">
                <div class="title-stick bg-blue">
                </div>
                <div class="title-name mgl10">
                  重要站点水情形势
                </div>
              </div>
              <div>
                <div id="current_prod_chart" style="width: 100%;height:250px;"></div>
              </div>
            </el-col>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-row>

</template>

<script>
    import Breadcrumb from '../components/Breadcrumb'
    // import {baseUrl} from  '../config'
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
              ],
              dutyData:[],
            }
        },
        created(){
            this.$http.get('http://localhost:8080/api/duty').then((res)=>{
              const data=res.data.data;
              console.log(data);
              var arr=[];
              $.each(data.tm,function(v,item){
                let peoples="";
                var obj={
                  dutyType:"",
                  people:""
                };
                obj.dutyType=item.dutyTypeName;
                if(item.leaders.length>0){
                  $.each(item.leaders,function(s,people){
                    peoples+=people.realName+"("+people.userMobilePhone+")"+"，";
                  })
                }
                if(item.persons.length>0){
                  $.each(item.persons,function(s,people){
                    peoples+=people.realName+"("+people.userMobilePhone+")"+"，";
                    obj.people=peoples
                  })
                }
                peoples=peoples.substr(0, peoples.length - 1);
                obj.people=peoples;
                arr.push(obj)
              });
              this.dutyData=arr
            })
        },
        methods: {

        },

    }
</script>

<style lang="less" scoped>
  .container{
    width: 1380px;
    margin:25px auto 0 auto;
    border: none;
    border-radius:0;
    /*background: red;*/
    padding: 10px!important;
  }
  .panel_tip{
    min-height: 50px;
    line-height: 50px;
    background-color: #f5f4ba;
    /*padding-left: 10px;*/
  }
  .center-main-title {
    height: 30px;
    .title-name {
      font-weight: bold;
      display: inline-block;
      line-height: 30px;
    }
    div {
      float: left;
    }
  }
</style>
