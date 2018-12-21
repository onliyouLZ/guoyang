<template>
  <div id="table2">
    <div class="prims_button" @click="show(flag)" >
      {{flagName}}
    </div>
    <div class="prims">
      <el-card class="box-card" >
        <div class="prims_card">
          <p class="prims_p_title">查询条件</p>
          <p class="prims_p_title_child">
            <label>开始时间:</label>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
              align="right"
              style="width: 193px">
            </el-date-picker>
          </p>
          <p class="prims_p_title_child">
            <label>结束时间:</label>
            <el-date-picker
              v-model="value2"
              type="date"
              placeholder="选择日期"
              align="right"
              style="width: 193px">
            </el-date-picker>
          </p>
          <p class="prims_p_title_child">
            <label>对比年份:</label>
            <el-date-picker
              v-model="year"
              type="year"
              placeholder="选择年份"
              align="right"
              style="width: 193px">
            </el-date-picker>
          </p>
        </div>
        <div class="prims_footer_button">
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="primary">查询</el-button>
        </div>
      </el-card>
    </div>
    <!--<el-scrollbar-->
    <!--style="height: 100%;"-->
    <!--tag="table"-->
    <!--:viewStyle="{width:'100%'}">-->

    <div class="table-title">
      <p style="font-size: 20px;color: red"><span>政区面雨量统计</span></p>
    </div>
    <div class="table-button">
      <i class="fa fa-file-excel-o"></i><el-button type="text" @click="exportExcel(tableData,multipleSelection,tableHeader)">导出</el-button>
    </div>
    <el-table
      :data="tables"
      border
      height="calc(100vh - 300px)"
      style="width: 100%;"
      header-cell-class-name="table-header-public">
      <!--:span-method="objectSpanMethod-->
      <el-table-column
        type="index"
        align="center"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="adnm"
        label="政区"
        align="center">
      </el-table-column>
      <el-table-column
        prop="avp"
        label="面雨量（mm）"
        align="center">
      </el-table-column>
      <el-table-column
        prop="myavp"
        align="center"
        label="多年平均（mm）">
      </el-table-column>
      <el-table-column
        prop="pa"
        align="center"
        label="距平（%）">
      </el-table-column>
      <el-table-column
        prop="yp"
        align="center"
        :label="new Date(year).getFullYear()+'年同期（mm）'">
      </el-table-column>
      <el-table-column
        prop="mom"
        align="center"
        label="同比（%）">
      </el-table-column>
    </el-table>
    <!--</el-scrollbar>-->
    <div class="footer" v-if="tableData.length>0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10,50,100]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
        name: "table2",
        data(){
          return{
            pageSize: 40, // 每页大小默认值
            pageIndex: 1, // 默认第一页
            tableData: [],
            currentPage4: 1,
            flag:0,
            flagName:"显示",
            year:'2017',
            tableHeader:[],
            value1:"",
            value2:""
          }
        },
        methods:{
          handleSizeChange(val) {
            this.pageSize = val
          },
          handleCurrentChange(val) {
            this.pageIndex = val
            this.$emit('primary',{loading:true});
          },
          show(){
            if(this.flag===0){
              $('.prims').animate({left:0}, "fast");
              $('.prims_button').animate({left:279}, "fast");
              this.flag=1;
              this.flagName="隐藏"
            }else{
              $('.prims').animate({left:-279}, "fast");
              $('.prims_button').animate({left: 0}, "fast");
              this.flag=0;
              this.flagName="显示"
            }
          },
          primary(){
            $('.prims').animate({left:-279}, "fast");
            $('.prims_button').animate({left: 0}, "fast");
            this.flag=0;
            this.flagName="显示";
            this.$emit('primary',{loading:true});
          },
          reset(){
            $('.prims').animate({left:-279}, "fast");
            $('.prims_button').animate({left: 0}, "fast");
            this.flag=0;
            this.flagName="显示";
            this.$emit('primary',{loading:true});
          },

          search(){
            const that=this;
            this.$http.get('/api/rains').then((res)=>{
              this.tableData=[
                {
                  "pa": -70.64,
                  "tenantName": "st_pptn_r",
                  "myavp": "10.9",
                  "yp": "2.2",
                  "tenantId": "422800000000000",
                  "adcd": "341621",
                  "avp": "3.2",
                  "mom": "45.45",
                  "adnm": "涡阳县"
                },
                {
                  "pa": -70.64,
                  "tenantName": "st_pptn_r",
                  "myavp": "10.9",
                  "yp": "2.2",
                  "tenantId": "422800000000000",
                  "adcd": "341621",
                  "avp": "3.2",
                  "mom": "45.45",
                  "adnm": "涡阳县"
                },
                {
                  "pa": -70.64,
                  "tenantName": "st_pptn_r",
                  "myavp": "10.9",
                  "yp": "2.2",
                  "tenantId": "422800000000000",
                  "adcd": "341621",
                  "avp": "3.2",
                  "mom": "45.45",
                  "adnm": "涡阳县"
                },
              ]
            });
          },
          exportExcel(tableData,multipleSelection,tableHeader){
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

              const tHeader = [];
              const filterVal = [];
              $.each(tableHeader,(v,item)=>{
                tHeader.push(item.title);
                filterVal.push(item.data);
              });
              const list = tableDatas;
              const data = this.formatJson(filterVal, list);
              export_json_to_excel(tHeader, data, this.tableYear+'年'+this.tableName+'单站降雨量统计表');
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
          },
        },
        created(){
          this.search();
        },
        watch:{

        }
    }
</script>

<style scoped>
  #table2 .prims{
    height: calc(100vh - 126px);
    position: absolute;
    left:-279px;
    top: 0;
    z-index: 99;
  }
  #table2 .el-radio+.el-radio{
    margin-left: 10px;
  }
  #table2 .table-title{
    text-align: center;
    padding: 5px;
  }
  #table2 .table-button{
    padding-left: 5px;
    border-top: 1px solid #dddddd;
    border-left: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    background: linear-gradient(to top, #dbdada 0%,#E5E5E5 10%, #efeeee 100%,#ffffff)
  }
  #table2 .table-button .el-button{
    color: #666666;
    font-weight: 700;
    font-size: 14px;
  }
  #table2 .prims .prims_footer_button{
    text-align: center;
  }
  #table2 .prims_button{
    width: 15px;
    height: 55px;
    background-color: #3DAAEF;
    position: absolute;
    color: white;
    line-height: 26px;
    top:50%;
    transform: translate(0,-50%);
    left:0;
    cursor: pointer;
    text-align: center;
    font-size: 12px;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    z-index: 99;
  }
  #table2 .prims .el-card{
    height:100%;
    background-color: #E5E5E5;
  }
  #table2 .prims hr{
    border: 1px dashed #c9c9c9;
    margin: 5px 0;
  }
  #table2 .prims .prims_card{
    padding:5px 0;
  }
  #table2 .prims .prims_card .prims_p_title_child{
    line-height: 40px;
  }
  #table2 .prims .prims_p_title{
    font-weight: 700;
    line-height: 24px;
    font-size: 14px;
  }
  #table2 .footer{
    position: absolute;
    bottom: 10px;
  }
</style>
<style>
  #table2 .el-tabs--border-card .el-tabs__content{
    height:calc(100vh - 157px);
  }
</style>
