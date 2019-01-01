<template>
  <div id="riverRegime">
    <el-collapse v-model="activeName">
      <el-collapse-item  name="1">
        <template slot="title">
          <i class="fa fa-user-o" style="margin: 0 10px"></i>河道信息
        </template>
        <div>
          <el-scrollbar
            style="height: 100%"
            tag="table">
            <div style="max-height: 500px">
              <el-table
                :data="tableData"
                stripe
                size="mini"
                height="400"
                style="width: 100%;font-size: 12px"
                header-cell-class-name="table-dliog-header"
                cell-class-name="table-dliog-body"
                @row-dblclick="rowDbClick"
                @cell-mouse-enter="enterHover"
                @cell-mouse-leave="leaveHover" >
                <el-table-column
                  label=" "
                  type="index"
                  width="40">
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
    </el-collapse>
  </div>
</template>

<script>
    import {Time} from "../../utils/utils";
    export default {
        name: "riverRegime",
        data(){
          return{
            activeName: ["1"],
            tableData: [ ],
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
          rowDbClick(row, event, column){
            /**
             * 向父组件传递一个方法
             */

            this.$emit('show',{show:true,data:row});
            $('.stationInfo').css({visibility:'hidden'});
          },
          //重定义时间
          tmFormatter(row, column, cellValue, index){
            // return Time.getNowSecond(cellValue)
            // return new Date(cellValue).formatDate('yyyy-MM-dd HH:mm:ss')
          },
          enterHover(row, column, cellValue, index){
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
                  item.type='river';
                  if(item.TM){
                    item.TM=new Date(item.TM).formatDate('yyyy-MM-dd HH:mm:ss');
                  }
                });
                this.tableData=data
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

<style lang="less">

  .is-scrolling-none::-webkit-scrollbar{
    width: 0;
  }
</style>

