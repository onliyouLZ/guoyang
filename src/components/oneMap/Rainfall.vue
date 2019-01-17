<template>
    <div id="Rainfall">
      <el-collapse v-model="activeName">
        <el-collapse-item  name="1">
          <template slot="title">
            <i class="fa fa-user-o" style="margin: 0 10px"></i>雨量站信息
          </template>
          <div>
            <el-scrollbar
              style="height: 100%"
              tag="table">
              <div style="max-height: 500px">
                <el-table
                  :data="tableDataRain"
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
      name: "Rainfall",
      data(){
        return{
          activeName:"1",
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
          this.$http.get(this.$url.baseUrl+'api/sl323/realtime/rain/ad/sum_x/341621/2018-12-22 08:00/2018-12-22 16:33?bgtm=2018-12-22 08:00&endtm=2018-12-22 16:33&ad=341621')
            .then((res)=>{
              if(res.status===200){
                let data=res.data.result.totalMap.rainOne.list;
                if(data.length>0){
                  $.each(data,(v,item)=>{
                    item.LGTD=item.lgtd;
                    item.LTTD=item.lttd;
                    item.STNM=item.stnm;
                    item.type='rain';
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

<style scoped>

</style>
