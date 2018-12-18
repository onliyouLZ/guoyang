<!--雨水情分析-->
<template>
    <div id="Rainwater"
         v-loading="loading"
         element-loading-text="加载中">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <label>时间:</label>
          <el-date-picker
            v-model="value6"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <label>对比年份:</label>
          <el-select v-model="value" placeholder="请选择" @change="change">
          <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
          </el-select>
          <el-button type="primary" @click="primary">查询</el-button>
          <el-button type="success" @click="exportExcel(tableData,multipleSelection)">导出</el-button>
        </div>
        <el-scrollbar
          style="height: 100%;"
          tag="table"
          :viewStyle="{width:'100%'}">
          <div style="max-height: 700px">
            <el-table
              :data="tables"
              border
              style="width: 100%"
              @row-click="rowClick"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
              :span-method="objectSpanMethod"
              header-cell-class-name="table-header-public">
              <el-table-column
                type="selection"
                width="40">
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
                :label="value+'年同期（mm）'">
              </el-table-column>
              <el-table-column
                prop="mom"
                align="center"
                label="同比（%）">
              </el-table-column>
            </el-table>
          </div>
        </el-scrollbar>
        <div class="footer" v-if="tableData.length>0">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10,20]"
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
        name: "Rainwater",
        data(){
          return{
            pageSize: 10, // 每页大小默认值
            pageIndex: 1, // 默认第一页
            tableData: [ ],
            currentPage4: 1,
            options: [
              {value: '2017',label: '2017'},
              {value: '2016',label: '2016'},
              {value: '2015',label: '2015'},
            ],
            value: '2017',
            value6: '',
            multipleSelection:[],
            loading: true,
            typeNum:[],
          }
        },
        created(){
          setTimeout(()=>{
            this.loading=false;
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
            ];
            this.getOrderNumber();
          },1000);

        },
        methods:{
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
          objectSpanMethod({ row, column, rowIndex, columnIndex }){
            const _row=this.typeNum[rowIndex];
            if(columnIndex===1){
              return {
                colspan:1,
                rowspan:_row
              }
            }
          },
          primary(){
            this.loading=true;
            setTimeout(()=>{
              this.loading=false;
            },1000)
          },
          //计算合并
          getOrderNumber(){
            //排序
            this.tableData.sort((a,b)=>a.adcd -b.adcd);
            let index=0;
            for(let i=0;i<this.tableData.length;i++){

              if(i===0){
                this.typeNum.push(1);
                index=i;
              }else{
                if(this.tableData[i].city===this.tableData[i-1].city){
                  this.typeNum[index]+=1;
                  this.typeNum.push(0);
                }else{
                  this.typeNum.push(1);
                  index=i;
                }
              }
            }
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
              const tHeader = ['政区','面雨量（mm）','多年平均（mm）','距平（%）',this.value+'年同期（mm）','同比（%）'];
              const filterVal = ['adnm','avp','myavp','pa','yp','mom'];
              const list = tableDatas;
              const data = this.formatJson(filterVal, list);
              export_json_to_excel(tHeader, data, ' 雨水情分析表');
            })
          },
          formatJson(filterVal, jsonData){
            return jsonData.map(v => filterVal.map(j => v[j]))
          },
          //下拉选择年份
          change(){
              console.error("发送请求！")
          }
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

        }
    }
</script>

<style scoped>
  #Rainwater .el-card{
    height: calc(100vh - 89px);
  }
  #Rainwater .footer{
    position: absolute;
    bottom: 10px;

  }
  #Rainwater .el-pagination{
    float: left;
  }
  #Rainwater .choice{
    float: left;
    padding: 2px 5px;

  }
  #Rainwater .choice span{
    line-height: 28px;
    font-size: 13px;
    color: #606266;
  }
  #Rainwater .el-scrollbar__bar{
    display: none;
  }
</style>
