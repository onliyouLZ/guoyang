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
            v-model="times"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
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
          <!--</div>-->
        <!--</el-scrollbar>-->
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
            // times: [new Date().formatDate('yyyy-MM-dd 08:00'), new Date()],
            times: [new Date("2018-12-22 08:00"), new Date("2018-12-22 20:00")],
            multipleSelection:[],
            loading: true,
            typeNum:[],
            screenWidth:document.body.clientWidth
          }
        },
        methods:{
          search(){
            let parms={
              bgtm:new Date(this.times[0]).formatDate('yyyy-MM-dd HH:mm'),
              endtm:new Date(this.times[1]).formatDate('yyyy-MM-dd HH:mm')
            };
            this.$http.get(this.$url.baseUrl+'api/sl323/realtime/rain/ad/sum_x/341621/'+parms.bgtm+'/'+parms.endtm+'?bgtm='+parms.bgtm+'&endtm='+parms.endtm+'&ad=341621')
                .then((res)=>{
                  if(res.status===200){
                    let data=res.data.result.totalMap.rainTotal.list;
                    setTimeout(()=>{
                      this.loading=false;
                      this.tableData=data;
                      this.getOrderNumber();
                    },500)
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
            this.search();
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
                if(this.tableData[i].adcd===this.tableData[i-1].adcd){
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
          },

        },
        mounted(){
          this.$nextTick(()=>{
            if(this.screenWidth>=1800){
              $('.tables').css('height',"700px")
            }else if(this.screenWidth<1800){
              $('.tables').css('height',"400px")
            }
            this.search();
          })
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

