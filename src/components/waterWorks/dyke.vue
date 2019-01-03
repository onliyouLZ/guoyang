<template>
  <div id="dyke"
       v-loading="loading"
       element-loading-text="加载中">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <label>名称:</label>
        <el-input v-model="input" placeholder="请输入内容" style="width: 150px"></el-input>
        <el-button type="primary" @click="primary">查询</el-button>
        <el-button type="success" @click="exportExcel(tableData,multipleSelection)">导出</el-button>
      </div>
      <!--<el-scrollbar-->
      <!--style="height: 100%;"-->
      <!--tag="table"-->
      <!--:viewStyle="{width:'100%'}">-->
      <!--<div style="max-height: 700px">-->
      <el-table
        :data="tables"
        border
        style="width: 100%"
        class="tables"
        height="700"
        @row-click="rowClick"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        header-cell-class-name="table-header-public">
        <template v-for="item in tableHeader">
          <el-table-column
            v-if="item.type==='selection'"
            type="selection"
            width="40"
            fixed>
          </el-table-column>
          <el-table-column
            v-if="item.data==='wagaCode'"
            :prop="item.data"
            :label="item.title"
            align="center"
            width="150"
            fixed>
          </el-table-column>
          <el-table-column
            v-if="item.type==='normal'"
            :prop="item.data"
            :label="item.title"
            align="center"
            min-width="150">
          </el-table-column>
        </template>
      </el-table>
      <!--</div>-->
      <!--</el-scrollbar>-->
      <div class="footer" v-if="tableData.length>0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[20,40,60]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <div class="choice" v-if="multipleSelection.length>0"><span>当前页选中:{{multipleSelection.length > 0 ? multipleSelection.length+"条" : " "}}</span></div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "dyke",
    data(){
      return{
        pageSize: 20, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        tableData: [],
        currentPage4: 1,
        tableHeader:[
          {data:'',title:'',type:"selection"},
          {data:'dikeCode',title:'堤防代码'},
          {data:'dikeName',title:'堤防名称',type:"normal"},
          {data:'startLong',title:'起点经度(°)',type:"normal"},
          {data:'startLat',title:'起点纬度(°)',type:"normal"},
          {data:'endLong',title:'终点经度(°)',type:"normal"},
          {data:'endLat',title:'终点纬度(°)',type:"normal"},
          {data:'startLoc',title:'起点所在位置',type:"normal"},
          {data:'endLoc',title:'终点所在位置',type:"normal"},
          {data:'dikeGrad',title:'堤防级别',type:"normal"},
          {data:'dikeType',title:'堤防类型',type:"normal"},
          {data:'dikePatt',title:'堤防型式',type:"normal"},
          {data:'dikeLen',title:'堤防长度(m)',type:"normal"},
          {data:'dikeStartNum',title:'堤防起点桩号',type:"normal"},
          {data:'dikeEndNum',title:'堤防终点桩号',type:"normal"},
          {data:'startDikeTopEl',title:'起点堤顶高程(m)',type:"normal"},
          {data:'endDikeTopEl',title:'终点堤顶高程(m)',type:"normal"},
          {data:'dikeHeigMin',title:'堤防高度:(最小值)(m)',type:"normal"},
          {data:'dikeHeigMax',title:'堤防高度:(最大值)(m)',type:"normal"},
          {data:'dikeTopWidMin',title:'堤顶宽度:(最小值)(m)',type:"normal"},
          {data:'dikeTopWidMax',title:'堤顶宽度:(最大值)(m)',type:"normal"},
          {data:'engStat',title:'工程建设情况',type:"normal"},
          {data:'runStat',title:'运行状况',type:"normal"},
          {data:'engTask',title:'工程任务',type:"normal"},
          {data:'startDate',title:'开工时间',type:"normal"},
          {data:'compDate',title:'建成时间',type:"normal"},
          {data:'admDep',title:'归口管理部门',type:"normal"},
          {data:'note',title:'备注',type:"normal"},
          {data:'collDate',title:'属性采集时间',type:"normal"},
          {data:'updDate',title:'属性更新时间',type:"normal"}
        ],
        input:"",
        multipleSelection:[],
        loading: true,
        screenWidth:document.body.clientWidth
      }
    },
    created(){
      setTimeout(()=>{
        this.loading=false;
        this.search();
      },1000)
    },
    methods:{
      search(){
        this.$http.post(this.$url.baseUrl+'api/fhgc/v0.1/common-query/table',{tableName:'ATT_DIKE_BASE'})
          .then((res)=>{
            if(res.status===200){
              let data=res.data.result;
              $.each(data,(v,item)=>{
                item.collDate=new Date(item.collDate).formatDate('yyyy-MM-dd');
                //堤防级别
                if(!item.dikeGrad && item.dikeGrad!==0){
                  item.dikeGrad='';
                }
                else if(item.dikeGrad==="0"){
                  item.dikeGrad='未知';
                }
                else if(item.dikeGrad==="1"){
                  item.dikeGrad='1级';
                }
                else if(item.dikeGrad==="2"){
                  item.dikeGrad='2级';
                }
                else if(item.dikeGrad==="3"){
                  item.dikeGrad='3级';
                }
                else if(item.dikeGrad==="4"){
                  item.dikeGrad='4级';
                }
                else if(item.dikeGrad==="5"){
                  item.dikeGrad='5级';
                }
                else if(item.dikeGrad==="9"){
                  item.dikeGrad='5级以下';
                }
                //堤防类型
                if(!item.dikeType){
                  item.dikeType='';
                }
                else if(item.dikeType==="1"){
                  item.dikeType='河（江）堤';
                }
                else if(item.dikeType==="2"){
                  item.dikeType='湖堤';
                }
                else if(item.dikeType==="3"){
                  item.dikeType='海堤';
                }
                else if(item.dikeType==="4"){
                  item.dikeType='围（圩、圈）';
                }
                //堤防型式
                if(!item.dikePatt){
                  item.dikePatt='';
                }
                else if(item.dikePatt==="1"){
                  item.dikePatt='土堤';
                }
                else if(item.dikePatt==="2"){
                  item.dikePatt='砌石堤';
                }
                else if(item.dikePatt==="3"){
                  item.dikePatt='土石混合堤';
                }
                else if(item.dikePatt==="4"){
                  item.dikePatt='钢筋混凝土防洪墙';
                }
                else if(item.dikePatt==="9"){
                  item.dikePatt='其他';
                }
                //工程建设情况
                if(!item.engStat && item.engStat!==0){
                  item.engStat='';
                }
                else if(item.engStat==="0"){
                  item.engStat='未建';
                }
                else if(item.engStat==="1"){
                  item.engStat='在建';
                }
                else if(item.engStat==="2"){
                  item.engStat='已建';
                }
                //运行状况
                if(!item.runStat){
                  item.runStat='';
                }
                else if(item.runStat==="1"){
                  item.runStat='在用良好';
                }
                else if(item.runStat==="2"){
                  item.runStat='在用故障';
                }
                else if(item.runStat==="3"){
                  item.runStat='停用';
                }
                //工程任务
                if(!item.engTask){
                  item.engTask='';
                }
                else if(item.engTask==="1"){
                  item.engTask='防洪';
                }
                else if(item.engTask==="2"){
                  item.engTask='防潮';
                }
                else if(item.engTask==='1,2'){
                  item.engTask='防洪,防潮';
                }
                //归口管理部门
                if(!item.admDep){
                  item.admDep='';
                }
                else if(item.admDep==="1"){
                  item.admDep='水利部门';
                }
                else if(item.admDep==="2"){
                  item.admDep='电力部门';
                }
                else if(item.admDep==="3"){
                  item.admDep='农业部门';
                }
                else if(item.admDep==="4"){
                  item.admDep='林业部门';
                }
                else if(item.admDep==="5"){
                  item.admDep='城建部门';
                }
                else if(item.admDep==="6"){
                  item.admDep='航运部门';
                }
                else if(item.admDep==="7"){
                  item.admDep='环保部门';
                }
                else if(item.admDep==="9"){
                  item.admDep='其他部门';
                }
              });
              this.tableData=data;
            }
          })
      },
      handleSizeChange(val) {
        this.pageSize = val
      },
      handleCurrentChange(val) {
        this.loading=true;
        this.pageIndex = val;
        setTimeout(()=>{
          this.loading=false;
        },1000)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      rowClick(row, event, column){
        this.$refs.multipleTable.toggleRowSelection(row);
      },
      primary(){
        this.loading=true;
        setTimeout(()=>{
          if(this.input){
            this.tableData=this.tableData.filter((tableData)=>{
              return tableData.wagaName.match(this.input)
            });
          }else{
            this.search();
          }
          this.loading=false;
        },1000)
      },
      /**
       * 导出
       * @param tableData 全部导出数据
       * @param multipleSelection 单选导出数据
       */
      exportExcel(tableData,multipleSelection){
        let tableDatas=[];
        if(multipleSelection.length>0){
          tableDatas=multipleSelection
        }else{
          tableDatas=tableData
        }
        require.ensure([], () => {
          const { export_json_to_excel } = require('../../vendor/Export2Excel');
          /**
           * 表头和数据需处理 此处写的死数据
           * @type {string[]}
           */
          const tHeader=[];
          const filterVal=[];
          $.each(this.tableHeader,(v,item)=>{
            if(item.title){
              tHeader.push(item.title);
              filterVal.push(item.data);
            }
          });
          const list = tableDatas;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, ' 涵闸统计表');
        })
      },
      formatJson(filterVal, jsonData){
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
    },
    computed:{
      tables(){
        //实现前端分页
        return this.tableData.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
      },
      total(){
        return this.tableData.length
      }
    },
    mounted(){
      this.$nextTick(()=>{
        if(this.screenWidth>=1920){
          $('.tables').css('height',"700px")
        }else if(this.screenWidth<1920){
          $('.tables').css('height',"400px")
        }
      })
    }
  }
</script>

<style scoped>
  #dyke .box-card{
    height: calc(100vh - 89px);
  }
  #dyke .footer{
    position: absolute;
    bottom: 10px;

  }
  #dyke .el-pagination{
    float: left;
  }
  #dyke .choice{
    float: left;
    padding: 2px 5px;

  }
  #dyke .choice span{
    line-height: 28px;
    font-size: 13px;
    color: #606266;
  }
  #dyke .el-scrollbar__bar{
    /*display: none;*/
  }
</style>
