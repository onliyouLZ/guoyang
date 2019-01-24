<template>
  <div id="SoilMoisture">
    <el-collapse v-model="activeName">
      <el-collapse-item  name="1">
        <template slot="title">
          <i class="fa fa-user-o" style="margin: 0 10px"></i>墒情信息
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
                  width="20">
                </el-table-column>
                <el-table-column
                  prop="STNM"
                  label="墒情站名称"
                  align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="TM"
                  label="检测时间"
                  align="center"
                  min-width="160">
                </el-table-column>
                <el-table-column
                  prop="SLM10"
                  label="10cm"
                  align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="SLM20"
                  label="20cm"
                  align="center"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="SLM40"
                  label="40cm"
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
    import {Time,convertObjectToArray} from "../../utils/utils";
    export default {
      name: "SoilMoisture",
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
          this.$http.get(this.$url.baseUrl+'api/sys/drought/soil/latest?bgtm=2018-12-21 08:00&keyword=&ad=&type[]=1&type[]=2&type[]=3')
            .then((res)=>{
              if(res.status===200){
                let data=convertObjectToArray(res.data.result);
                if(data.length>0){
                  if(res.status===200){
                    $.each(data,(v,item)=>{
                      item.type='soil';
                      if(item.TM){
                        item.TM=new Date(item.TM).formatDate('yyyy-MM-dd HH:mm:ss');
                      }
                    });
                    this.tableData=data
                  }
                }else{
                  console.error('暂无墒情站数据');
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
