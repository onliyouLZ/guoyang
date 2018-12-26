<template>
  <div id="warning">
    <el-collapse v-model="activeName">
      <el-collapse-item  name="1">
        <template slot="title">
          <i class="fa fa-user-o" style="margin: 0 10px"></i>河道信息
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
                  prop="STNM"
                  label="河道名称"
                  align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="Z"
                  label="水位"
                  align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="TM"
                  label="时间"
                  align="center"
                  min-width="160">
                </el-table-column>
                <el-table-column
                  prop="WRQ"
                  label="警戒水位"
                  align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="OWRQ"
                  label="超警戒水位"
                  align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="GRZ"
                  label="保证水位"
                  align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="OGRZ"
                  label="超保证水位"
                  align="center"
                  width="120">
                </el-table-column>
              </el-table>
            </div>
          </el-scrollbar>
        </div>
      </el-collapse-item>
      <el-collapse-item  name="2">
        <template slot="title">
          <i class="fa fa-user-o" style="margin: 0 10px"></i>雨量站信息
        </template>
        <div>
          <el-scrollbar
            style="height: 100%"
            tag="table">
            <div style="max-height: 200px">
              <el-table
                :data="tableDataRain"
                stripe
                size="mini"
                height="150"
                style="width: 100%;font-size: 12px"
                header-cell-class-name="table-dliog-header"
                cell-class-name="table-dliog-body"
                @row-dblclick="rsverDbClick"
                @cell-mouse-enter="rsverHover"
                @cell-mouse-leave="leaveHover" >
                <el-table-column
                  label=" "
                  type="index"
                  width="40">
                </el-table-column>
                <el-table-column
                  prop="STNM"
                  label="雨量站名称"
                  align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="drp"
                  label="雨量"
                  align="center"
                  width="60">
                </el-table-column>
                <el-table-column
                  prop="adnm"
                  label="行政区"
                  align="center"
                  width="180">
                </el-table-column>
              </el-table>
            </div>
          </el-scrollbar>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
    import {Time} from "../../utils/utils";
    export default {
        name: "warning",
        data(){
          return{
            activeName: ["1","2"],
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
            let parms={
              "bgtm": "2018-12-22 08:00",
              "endtm": "2018-12-22 18:40",
              "ad": "341621000000000",
              "hnnm": "",
              "warntp": "",
              "keyword": ""
            };
            this.$http.post(this.$url.baseUrl+'api/sys/river/jx-real',parms).then((res)=>{
              if(res.status===200){
                let data=res.data.result;
                $.each(data,(v,item)=>{
                  if(item.TM){
                    item.TM=new Date(item.TM).formatDate('yyyy-MM-dd HH:mm:ss');
                  }
                });
                this.tableData=data
              }
            });
            this.$http.get(this.$url.baseUrl+'api/sl323/realtime/rain/ad/sum_x/341621/2018-12-22 08:00/2018-12-22 16:33?bgtm=2018-12-22 08:00&endtm=2018-12-22 16:33&ad=341621')
              .then((res)=>{
                if(res.status===200){
                  let data=res.data.result.totalMap.rainOne.list;
                  console.log(data);
                  if(data.length>0){
                    $.each(data,(v,item)=>{
                      item.LGTD=item.lgtd;
                      item.LTTD=item.lttd;
                      item.STNM=item.stnm;
                    });
                    this.tableDataRain=data;
                  }else{
                    console.error('暂无雨量站数据');
                  }
                }
              })
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

<style lang="less">

  .is-scrolling-none::-webkit-scrollbar{
    width: 0;
  }

  /**
 表格
  */
  .table-dliog-body{
      color: red;
      padding: 0!important;
      font-size: 14px;
  }
  .el-table__row{
    cursor: pointer;
  }
  .table-dliog-header{
    background-color: #A4D0EF !important;
    border-bottom: 1px solid #bbb!important;
    padding: 0!important;
    line-height: 25px;
    color: #333333;
    font-weight: normal;
    font-size: 14px;
  }
  .el-table--striped .el-table__body tr.el-table__row--striped td{
    background-color: #e0eef8!important;
  }

</style>

