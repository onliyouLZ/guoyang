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
                  width="150">
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
          options: [
            {value: '2017',label: '2017'},
            {value: '2016',label: '2016'},
            {value: '2015',label: '2015'},
          ],
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
          this.$http.get('/api/gates').then((res)=>{
            if(res.status===200){
              let data=res.data.data.result;
              $.each(data,(v,item)=>{
                item.collDate=new Date(item.collDate).formatDate('yyyy-MM-dd')
              });
              this.tableData=data;
            }
          });
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
