<template>
   <div id="gates"
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
      name: "gates",
      data(){
        return{
          pageSize: 20, // 每页大小默认值
          pageIndex: 1, // 默认第一页
          tableData: [],
          currentPage4: 1,
          tableHeader:[
            {data:'',title:'',type:"selection"},
            {data:'wagaCode',title:'水闸代码'},
            {data:'wagaName',title:'水闸名称',type:"normal"},
            {data:'startLong',title:'起点经度(°)',type:"normal"},
            {data:'startLat',title:'起点纬度(°)',type:"normal"},
            {data:'endLong',title:'终点经度(°)',type:"normal"},
            {data:'endLat',title:'终点纬度(°)',type:"normal"},
            {data:'wagaLoc',title:'水闸所在位置',type:"normal"},
            {data:'wagaType',title:'水闸类型',type:"normal"},
            {data:'wagaUse',title:'水闸用途',type:"normal"},
            {data:'engGrad',title:'工程等别',type:"normal"},
            {data:'engScal',title:'工程规模',type:"normal"},
            {data:'wainWasoType',title:'取水水源类型',type:"normal"},
            {data:'lockDisc',title:'最大过闸流量(m³/s)',type:"normal"},
            {data:'gaorNum',title:'闸孔数量(孔)',type:"normal"},
            {data:'insPow',title:'装机功率(KW)',type:"normal"},
            {data:'desTotInsCap',title:'设计装机总容量(MW)',type:"normal"},
            {data:'engStat',title:'工程建设情况',type:"normal"},
            {data:'runStat',title:'运行状况',type:"normal"},
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
          oldData:[],
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
          this.$http.post(this.$url.baseUrl+'api/fhgc/v0.1/common-query/table',{tableName:'ATT_WAGA_BASE'})
            .then((res)=>{
              if(res.status===200){
                let data=res.data.result;
                $.each(data,(v,item)=>{
                  item.collDate=new Date(item.collDate).formatDate('yyyy-MM-dd');
                  //水闸类型
                  if(!item.wagaType){
                    item.wagaType='';
                  }
                  else if(item.wagaType==="1"){
                    item.wagaType='分（泄）洪闸';
                  }
                  else if(item.wagaType==="2"){
                    item.wagaType='节制闸';
                  }
                  else if(item.wagaType==="3"){
                    item.wagaType='排（退）水闸';
                  }
                  else if(item.wagaType==="4"){
                    item.wagaType='引（进）水闸';
                  }
                  else if(item.wagaType==="5"){
                    item.wagaType='挡潮闸';
                  }
                  else if(item.wagaType==="6"){
                    item.wagaType='船闸';
                  }
                  else if(item.wagaType==="9"){
                    item.wagaType='其他';
                  }
                  //工程等别
                  if(!item.engGrad){
                    item.engGrad='';
                  }
                  else if(item.engGrad==="1"){
                    item.engGrad='Ⅰ';
                  }
                  else if(item.engGrad==="2"){
                    item.engGrad='Ⅱ';
                  }
                  else if(item.engGrad==="3"){
                    item.engGrad='Ⅲ';
                  }
                  else if(item.engGrad==="4"){
                    item.engGrad='Ⅳ';
                  }
                  else if(item.engGrad==="5"){
                    item.engGrad='Ⅴ';
                  }
                  //工程规模
                  if(!item.engScal){
                    item.engScal='';
                  }
                  else if(item.engScal==="1"){
                    item.engScal='大（1）型';
                  }
                  else if(item.engScal==="2"){
                    item.engScal='大（2）型';
                  }
                  else if(item.engScal==="3"){
                    item.engScal='中型';
                  }
                  else if(item.engScal==="4"){
                    item.engScal='小（1）型';
                  }
                  else if(item.engScal==="5"){
                    item.engScal='小（2）型';
                  }
                  //取水水源类型
                  if(!item.wainWasoType){
                    item.wainWasoType='';
                  }
                  else if(item.wainWasoType==="1"){
                    item.wainWasoType='水库';
                  }
                  else if(item.wainWasoType==="2"){
                    item.wainWasoType='湖泊';
                  }
                  else if(item.wainWasoType==="3"){
                    item.wainWasoType='河流';
                  }
                  else if(item.wainWasoType==="4"){
                    item.wainWasoType='其他';
                  }
                  //工程建设情况
                  if(!item.engStat && item.engStat!=="0"){
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
                this.oldData=data;
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
              this.tableData=this.oldData.filter((tableData)=>{
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
  #gates .box-card{
    height: calc(100vh - 89px);
  }
  #gates .footer{
    position: absolute;
    bottom: 10px;

  }
  #gates .el-pagination{
    float: left;
  }
  #gates .choice{
    float: left;
    padding: 2px 5px;

  }
  #gates .choice span{
    line-height: 28px;
    font-size: 13px;
    color: #606266;
  }
  #gates .el-scrollbar__bar{
    /*display: none;*/
  }
</style>
