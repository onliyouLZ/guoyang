<!--水雨情实时监控-->
<template>
    <div id="real-time-rain"
         v-loading="loading"
         element-loading-text="加载中">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <!--<label>行政区:</label>-->
          <!--<el-select v-model="value" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in options"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
          <label>时间:</label>
          <el-date-picker
            v-model="value6"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
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
                label="市(县)"
                align="center">
              </el-table-column>
              <el-table-column
                prop="stnm"
                label="站名"
                align="center">
              </el-table-column>
              <el-table-column
                prop="drp"
                align="center"
                label="累积雨量">
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
          <div class="choice" v-if="multipleSelection.length>0"><span>当前页选中:{{multipleSelection.length>0 ? multipleSelection.length+"条" : ""}}</span></div>
        </div>
      </el-card>



    </div>
</template>

<script>
    export default {
        name: "real-time-rain",
        data(){
          return{
            pageSize: 10, // 每页大小默认值
            pageIndex: 1, // 默认第一页
            tableData: [ ],
            currentPage4: 1,
            options: [
              {value: '1',label: '涡阳县'}
            ],
            value: '',
            value6: '',
            multipleSelection:[],
            loading: true,
            typeNum:[]
          }
        },
        created(){
          setTimeout(()=>{
            this.loading=false;
            this.tableData=[
              {
                "drp": 3.5,
                "stcd": "180103",
                "hnnm": "涡河",
                "__index": 6,
                "rvnm": "涡河",
                "stnm": "朱楼闸",
                "lgtd": 108.67225,
                "adcd": "341621",
                "lttd": 30.321528,
                "sttp": "PP",
                "bsnm": "长江",
                "adnm": "涡阳县"
              },
              {
                "drp": 0.5,
                "stcd": "180104",
                "hnnm": "涡河",
                "__index": 38,
                "rvnm": "涡河",
                "stnm": "燕小庙闸",
                "lgtd": 110.32,
                "adcd": "341621",
                "lttd": 30.62,
                "sttp": "PP",
                "bsnm": "长江",
                "adnm": "涡阳县"
              },
              {
                "drp": 0.5,
                "stcd": "180105",
                "hnnm": "涡河",
                "__index": 134,
                "rvnm": "涡河",
                "stnm": "包河闸",
                "lgtd": 109.884894,
                "adcd": "341621",
                "lttd": 30.798794,
                "sttp": "PP",
                "bsnm": "长江",
                "adnm": "涡阳县"
              },
              {
                "drp": 5.5,
                "stcd": "180106",
                "hnnm": "涡河",
                "__index": 198,
                "rvnm": "涡河",
                "stnm": "曹市闸",
                "lgtd": 108.984444,
                "adcd": "341621",
                "lttd": 30.134167,
                "sttp": "PP",
                "bsnm": "长江",
                "adnm": "涡阳县"
              },
              {
                "drp": 0.5,
                "stcd": "180107",
                "hnnm": "涡河",
                "__index": 33,
                "rvnm": "涡河",
                "stnm": "青羊沟闸",
                "lgtd": 109.92,
                "adcd": "341621",
                "lttd": 30.27,
                "sttp": "PP",
                "bsnm": "长江",
                "adnm": "涡阳县"
              },
              {
                "drp": 3,
                "stcd": "180101",
                "hnnm": "涡河",
                "__index": 77,
                "rvnm": "涡河",
                "stnm": "武家河闸",
                "lgtd": 108.5885,
                "adcd": "341621",
                "lttd": 29.886444,
                "sttp": "PP",
                "bsnm": "长江",
                "adnm": "涡阳县"
              },
              {
                "drp": 3,
                "stcd": "180102",
                "hnnm": "涡河",
                "__index": 77,
                "rvnm": "涡河",
                "stnm": "五道沟闸",
                "lgtd": 108.5885,
                "adcd": "341621",
                "lttd": 29.886444,
                "sttp": "PP",
                "bsnm": "长江",
                "adnm": "涡阳县"
              }
            ];
            this.getOrderNumber();
            // console.log(this.typeNum);
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
              const tHeader = ['市(县)','站名','雨量'];
              const filterVal = ['adnm','stnm','drp'];
              const list = tableDatas;
              const data = this.formatJson(filterVal, list);
              export_json_to_excel(tHeader, data, ' 水雨情实时监控表');
            })
          },
          formatJson(filterVal, jsonData){
            return jsonData.map(v => filterVal.map(j => v[j]))
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
  #real-time-rain .el-card{
      height: calc(100vh - 89px);
  }
  #real-time-rain .footer{
    position: absolute;
    bottom: 10px;

  }
  #real-time-rain .el-pagination{
    float: left;
  }
  #real-time-rain .choice{
    float: left;
    padding: 2px 5px;

  }
  #real-time-rain .choice span{
    line-height: 28px;
    font-size: 13px;
    color: #606266;
  }
  #real-time-rain .el-scrollbar__bar{
    display: none;
  }
</style>

