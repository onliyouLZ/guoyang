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
                  :row-class-name="tableRowClassName"
                  @row-dblclick="rowDbClick"
                  @cell-mouse-enter="enterHover"
                  @cell-mouse-leave="leaveHover" >
                  <el-table-column
                    label=" "
                    type="index"
                    width="40">
                  </el-table-column>
                  <template v-for="item in tableHeader">
                    <el-table-column
                      v-if="item.type==='normal'"
                      :prop="item.data"
                      :label="item.label"
                      align="center"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      v-if="item.type==='TM'"
                      :prop="item.data"
                      :label="item.label"
                      align="center"
                      width="200">
                    </el-table-column>
                  </template>
                </el-table>
              </div>
            </el-scrollbar>
          </div>
        </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script>
    import {Time,sort} from "../../utils/utils";
    export default {
        name: "riverRegime",
        data(){
          return{
            activeName: ["1"],
            tableData: [ ],
            swiperShow:false,
            tableHeader:[
              {data:"STNM",label:"河道名称",type:'normal'},
              {data:"Z",label:"水位",type:'normal'},
              {data:"TM",label:"时间",type:'TM'},
              {data:"WRQ",label:"警戒水位",type:'normal'},
              {data:"OWRQ",label:"超警戒水位",type:'normal'},
              {data:"GRZ",label:"保证水位",type:'normal'},
              {data:"OGRZ",label:"超保证水位",type:'normal'},
            ]
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
                sort(data,'OWRQ');
                this.tableData=data
              }
            });
          },
          tableRowClassName({row, rowIndex}){
            if(row.OWRQ>0){ //超警戒大于0
              return 'warning-row';
            }else{

            }
          },

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

  #riverRegime .is-scrolling-none::-webkit-scrollbar{
    width: 0;
  }
  #riverRegime .el-table .warning-row {
    color: red;
  }
</style>

