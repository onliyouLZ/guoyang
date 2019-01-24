<template>
  <div id="warehouseDliog">
    <el-dialog
      :visible.sync="visible"
      :title="dialogData.STNM"
      @close="childClose">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first" lazy>
          <span slot="label"><i class="fa fa-calendar-o"></i>&nbsp;仓库信息</span>
          <div>
            <p style="text-align: center;line-height: 40px;font-size: 20px;">基本信息</p>
            <table class="dilogTable" cellspacing="0">
              <tr>
                <td class="u-list-title">仓库名称</td>
                <td class="u-list-title">所属区域</td>
                <td class="u-list-title">主管部门</td>
              </tr>
              <tr>
                <td width="20%"><span >{{optionData.WH_NAME}}</span></td>
                <td width="20%"><span >{{optionData.ADDVNM}}</span></td>
                <td width="20%"><span >{{optionData.ORGNM}}</span></td>
              </tr>
            </table>
          </div>
          <div>
            <p style="text-align: center;line-height: 40px;font-size: 20px;">物资信息</p>
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              header-cell-class-name="table-header-public"
              height="300">
              <template v-for="item in tableHeader">
                <el-table-column
                  :prop="item.data"
                  :label="item.label"
                  align="center">
                </el-table-column>
              </template>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "warehouseDliog",
    data(){
      return{
        visible:this.wareVisible,
        activeName: 'first',
        isCollapsed:true,
        optionData:"",
        tableData:[],
        tableHeader:[
          {data:"ML_TYPE",label:"物资种类"},
          {data:"ML_NAME",label:"物资名称"},
          {data:"MD_SPECIFICATION",label:"规格"},
          {data:"INVENTORY_NUM",label:"库存数量"},
          {data:"MIR_NUMBER_SUM",label:"调用数量"},
        ]
      }
    },
    props:{
      wareVisible:{
        type:Boolean,
        default:false
      },
      dialogData:{
        type:Object,
        default:{}
      }
    },
    methods:{
      /**
       * tab切换事件
       */
      handleClick(tab, event){

      },
      //获取基本信息
      getBasic(){
        const _this=this;
        let parms={
          mdName:"",
          whCd:_this.dialogData.WH_CD,
          mlTypeList:[]
        };
        _this.$http.post(_this.$url.baseUrl+"api/guoYang/v0.1/material-manage/material/list",parms).then((res)=>{
          if(res.status===200){
            let data=res.data.result;

            $.each(data,(v,item)=>{
              if(item.ML_TYPE==="1"){
                item.ML_TYPE="防汛物资"
              }else if(item.ML_TYPE==="2"){
                item.ML_TYPE="抗旱物资"
              }else if(item.ML_TYPE==="3"){
                item.ML_TYPE="抢险机械设备"
              }
            });
            this.tableData=data;
          }
        })
      },


      childClose(){
        this.$emit('update:wareVisible',false);
      }
    },
    watch:{
      /**
       * 是否显示弹窗
       */
      wareVisible(){
        this.visible=this.wareVisible;
        if(this.visible){
          this.activeName="first";
          this.optionData=this.dialogData;
          this.getBasic();
        }
      }
    },
    mounted(){

    },
  }
</script>

<style  scoped>


</style>
<style>
  #warehouseDliog .search{
    padding:10px 20px;
  }


</style>
