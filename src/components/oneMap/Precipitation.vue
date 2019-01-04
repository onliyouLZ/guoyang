<template>
  <el-collapse v-model="activeName">
    <el-collapse-item  name="1">
      <template slot="title">
        <i class="fa fa-user-o" style="margin: 0 10px"></i>仓库信息
      </template>
      <div>
        <el-scrollbar
          style="height: 100%"
          tag="table">
          <div style="max-height: 200px">
            <el-table
              :data="tableData"
              stripe
              size="mini"
              height="150"
              style="width: 100%;font-size: 12px"
              header-cell-class-name="table-dliog-header"
              cell-class-name="table-dliog-body"
              @row-dblclick="lakeDbClick"
              @cell-mouse-enter="rsverHover"
              @cell-mouse-leave="leaveHover" >
              <el-table-column
                label=" "
                type="index"
                width="20">
              </el-table-column>
              <el-table-column
                prop="WH_NAME"
                label="仓库名称"
                align="center"
                width="120">
              </el-table-column>
              <el-table-column
                prop="WH_AREA"
                label="占地面积"
                align="center"
                width="120">
              </el-table-column>
              <el-table-column
                prop="ORGNM"
                label="所在位置"
                align="center"
                min-width="160">
              </el-table-column>
              <el-table-column
                prop="ADDVNM"
                label="管理单位"
                align="center"
                width="120">
              </el-table-column>
              <el-table-column
                prop="MANAGE_DUTY_PERSON"
                label="责任人"
                align="center"
                width="120">
              </el-table-column>
            </el-table>
          </div>
        </el-scrollbar>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
    export default {
        name: "precipitation",
        data(){
          return{
            activeName: ["1"],
            tableData: [ ],
            tableDataRain:[],
            swiperShow:false,
          }
        },
        props:{
          show:{
            type:Boolean,
            default:false
          },
          childData:{
            type:Array,
            default:[]
          }
        },
        methods:{
          lakeDbClick(row, event, column){
            /**
             * 向父组件传递一个方法
             */
            this.$emit('show',{show:true,data:row});
            $('.stationInfo').css({visibility:'hidden'});
          },
          rsverDbClick(row, event, column){
            this.$emit('show',{show:true,data:row});
            $('.stationInfo').css({visibility:'hidden'});
          },
          //重定义时间
          tmFormatter(row, column, cellValue, index){
            // return Time.getNowSecond(cellValue)
            // return new Date(cellValue).formatDate('yyyy-MM-dd HH:mm:ss')
          },
          rsverHover(row, column, cellValue, index){
            this.$emit('move',row)
          },
          leaveHover(row, column, cellValue, index){
            this.$emit('move',"");
          },
          getTableData(){
            let prams={
              orgcd:"",
              whName:""
            };
            //仓库
            this.$http.post(this.$url.baseUrl+'api/guoYang/v0.1/material-manage/warehouse/list',prams).then((res)=>{
              if(res.status===200){
                let data=res.data.result;
                console.log(data);
                if(data.length>0){
                  $.each(data,(v,item)=>{
                    let LGTD=item.LGTD;
                    let LTTD=item.LTTD;
                    item.STNM=item.WH_NAME;
                  });
                  this.tableData=data;
                }else{
                  console.error('暂无仓库数据');
                }
              }
            });
          }
        },
        created(){

        },
        mounted() {
          this.$nextTick(()=>{
            this. getTableData()
          })
        }
    }
</script>

<style scoped>

</style>
