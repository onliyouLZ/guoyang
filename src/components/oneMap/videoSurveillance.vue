<template>
  <el-collapse v-model="activeName">
    <el-collapse-item name="1">
      <template slot="title">
        <i class="fa fa-user-o" style="margin: 0 10px"></i>视频信息
      </template>
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
              label="名称"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              prop="CIP"
              label="摄像头IP"
              align="center"
              width="150">
            </el-table-column>
            <el-table-column
              prop="CPORT"
              label="摄像头端口"
              align="center"
              width="100">
            </el-table-column>
          </el-table>
        </div>
      </el-scrollbar>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
    export default {
      name: "videoSurveillance",
      data(){
        return{
          activeName: '1',
          tableData:[],
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
          return new Date(cellValue).formatDate('yyyy-MM-dd HH:mm:ss')
        },
        rsverHover(row, column, cellValue, index){
          this.$emit('move',row)
        },
        leaveHover(row, column, cellValue, index){
          this.$emit('move',"");
        },
        getTableData(){
          this.$http.post(this.$url.baseUrl+'api/system-video/v0.1/list?type',{stnm:""}).then((res)=>{
            if(res.status===200){
              let data=res.data.result;
              if(data.length>0){
                $.each(data,(v,item)=>{
                  item.type='video'
                });
                this.tableData=data;
              }else{
                console.error('暂无视频站数据');
              }
            }
          });
        }
      },
      mounted() {
        this.$nextTick(()=>{
          this.getTableData()
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
