<template>
  <div id="early-warning"
       v-loading="loading"
       element-loading-text="加载中">
    <Breadcrumb :menu="menuArray"></Breadcrumb>
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <label>站点名称:</label>
        <el-input
          placeholder="请输入内容"
          v-model="input10"
          style="width: 193px"
          clearable>
        </el-input>
        <label>报警时间:</label>
        <el-date-picker
          v-model="value1"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <label>报警类型:</label>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <label>报警级别:</label>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" @click="primary">查询</el-button>
        <el-button type="success" @click="exportExcel(tableData,multipleSelection)">导出</el-button>
      </div>
      <!--<el-scrollbar-->
        <!--style="height: 100%;"-->
        <!--tag="table"-->
        <!--:viewStyle="{width:'100%'}">-->
        <!--<div style="max-height: 650px">-->
          <el-table
            :data="tables"
            border
            class="tables"
            style="width: 100%"
            height="700"
            @row-click="rowClick"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            header-cell-class-name="table-header-public"
            :cell-style="cellStyles">
            <template v-for="item in tableHeader" >
              <el-table-column
                v-if="item.type==='selection'"
                type="selection"
                width="40">
              </el-table-column>
              <el-table-column
                v-if="item.type==='normal'"
                :prop="item.data"
                :label="item.title"
                align="center">
              </el-table-column>
              <el-table-column
                v-if="item.data==='bjdate'"
                :prop="item.data"
                :label="item.title"
                width="150"
                align="center">
              </el-table-column>
              <el-table-column
                v-if="item.data==='bjjb'"
                :prop="item.data"
                :label="item.title"
                :formatter="formatters"
                align="center">
              </el-table-column>
              <el-table-column
                v-if="item.data==='ydcl'"
                :prop="item.data"
                :label="item.title"
                width="500"
                show-overflow-tooltip
                align="center">
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
  import Breadcrumb from '../../components/Breadcrumb'
  export default {
    name: "Rainwater",
    components:{
      Breadcrumb
    },
    data(){
      return{
        menuArray:[
          {name:"水文预警预报",path:""},
          {name:"水文预警预报",path:"/earlyWarning"},
        ],
        pageSize: 10, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        currentPage4: 1,
        input10:"",
        value1:"",
        options1: [
          {
            value: '1',
            label: '高'
          },
          {
            value: '2',
            label: '中'
          },
          {
            value: '3',
            label: '低'
          }
        ],
        options2: [
          {
            value: '1',
            label: '一级'
          },
          {
            value: '2',
            label: '二级'
          },
          {
            value: '3',
            label: '三级'
          }
        ],
        value: '',
        tableData: [],
        multipleSelection:[],
        loading: true,
        //站点名称  报警类型  报警时间  报警值  阈值  报警级别 应对策略
        tableHeader:[
          {data:'',title:'',type:"selection"},
          {data:'stnm',title:'站点名称',type:"normal"},
          {data:'bjtype',title:'报警类型',type:"normal"},
          {data:'bjdate',title:'报警时间'},
          {data:'bjz',title:'报警值',type:"normal"},
          {data:'yz',title:'阈值',type:"normal"},
          {data:'bjjb',title:'报警级别'},
          {data:'ydcl',title:'应对策略'},
        ],
        screenWidth:document.body.clientWidth
      }
    },
    created(){
      setTimeout(()=>{
        this.loading=false;

        this.tableData=[
          {
            "stnm":"武家河闸",
            "bjtype":"水位报警",
            "bjdate":"2018-12-21 08:00:00",
            "bjz":"27.5m",
            "yz":"25m",
            "bjjb":1,
            "ydcl":"县防指办在通报气象、水情的同时，还要将相关情况向县政府分管领导报告....."
          },
          {
            "stnm":"武家河闸",
            "bjtype":"水位报警",
            "bjdate":"2018-12-21 08:00:00",
            "bjz":"27.5m",
            "yz":"25m",
            "bjjb":2,
            "ydcl":"县防指办在通报气象、水情的同时，还要将相关情况向县政府分管领导报告....."
          },
          {
            "stnm":"武家河闸",
            "bjtype":"水位报警",
            "bjdate":"2018-12-21 08:00:00",
            "bjz":"27.5m",
            "yz":"25m",
            "bjjb":3,
            "ydcl":"县防指办在通报气象、水情的同时，还要将相关情况向县政府分管领导报告....."
          },
          {
            "stnm":"武家河闸",
            "bjtype":"水位报警",
            "bjdate":"2018-12-21 08:00:00",
            "bjz":"27.5m",
            "yz":"25m",
            "bjjb":1,
            "ydcl":"县防指办在通报气象、水情的同时，还要将相关情况向县政府分管领导报告....."
          },
          {
            "stnm":"武家河闸",
            "bjtype":"水位报警",
            "bjdate":"2018-12-21 08:00:00",
            "bjz":"27.5m",
            "yz":"25m",
            "bjjb":1,
            "ydcl":"县防指办在通报气象、水情的同时，还要将相关情况向县政府分管领导报告....."
          },
          {
            "stnm":"武家河闸",
            "bjtype":"水位报警",
            "bjdate":"2018-12-21 08:00:00",
            "bjz":"27.5m",
            "yz":"25m",
            "bjjb":1,
            "ydcl":"县防指办在通报气象、水情的同时，还要将相关情况向县政府分管领导报告....."
          },
          {
            "stnm":"武家河闸",
            "bjtype":"水位报警",
            "bjdate":"2018-12-21 08:00:00",
            "bjz":"27.5m",
            "yz":"25m",
            "bjjb":1,
            "ydcl":"县防指办在通报气象、水情的同时，还要将相关情况向县政府分管领导报告....."
          },
          {
            "stnm":"武家河闸",
            "bjtype":"水位报警",
            "bjdate":"2018-12-21 08:00:00",
            "bjz":"27.5m",
            "yz":"25m",
            "bjjb":1,
            "ydcl":"县防指办在通报气象、水情的同时，还要将相关情况向县政府分管领导报告....."
          },
          {
            "stnm":"武家河闸",
            "bjtype":"水位报警",
            "bjdate":"2018-12-21 08:00:00",
            "bjz":"27.5m",
            "yz":"25m",
            "bjjb":1,
            "ydcl":"县防指办在通报气象、水情的同时，还要将相关情况向县政府分管领导报告....."
          },
          {
            "stnm":"武家河闸",
            "bjtype":"水位报警",
            "bjdate":"2018-12-21 08:00:00",
            "bjz":"27.5m",
            "yz":"25m",
            "bjjb":1,
            "ydcl":"县防指办在通报气象、水情的同时，还要将相关情况向县政府分管领导报告....."
          },
          {
            "stnm":"武家河闸",
            "bjtype":"水位报警",
            "bjdate":"2018-12-21 08:00:00",
            "bjz":"27.5m",
            "yz":"25m",
            "bjjb":1,
            "ydcl":"县防指办在通报气象、水情的同时，还要将相关情况向县政府分管领导报告....."
          },
          {
            "stnm":"武家河闸",
            "bjtype":"水位报警",
            "bjdate":"2018-12-21 08:00:00",
            "bjz":"27.5m",
            "yz":"25m",
            "bjjb":1,
            "ydcl":"县防指办在通报气象、水情的同时，还要将相关情况向县政府分管领导报告....."
          },
        ];
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
      primary(){
        this.loading=true;
        setTimeout(()=>{
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
          export_json_to_excel(tHeader, data, '水文预警预报统计表');
        })
      },
      formatJson(filterVal, jsonData){
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //下拉选择年份
      change(){
        console.error("发送请求！")
      },
      /**
      * 重绘表格颜色
       * @param row 表格数据
       * @param column 表格列属性
       * @param rowIndex 所有单元格索引
      *  @param columnIndex 表格列索引
      * */
      cellStyles({row, column, rowIndex, columnIndex}){
        if(columnIndex===6 && row.bjjb===1){
          return 'background-color: #ff9003'
        }else if(columnIndex===6 && row.bjjb===2){
          return 'background-color: #ffff24'
        }else if(columnIndex===6 && row.bjjb===3){
          return 'background-color: #03ff3d'
        }
      },
      /**
       * 重绘表格内容
       * @param row
       * @param column
       * @param cellValue
       * @param index
       * @return {string}
       */
      formatters(row, column, cellValue, index){
        let name="";
        if(cellValue===1){
          name="橙色二级"
        }else if(cellValue===2){
          name="浅黄三级"
        }else if(cellValue===3){
          name="四级轻度干旱"
        }
        return name
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
  #early-warning .box-card{
    height: calc(100vh - 87px);
    border: none;
  }
  #early-warning .footer{
    position: absolute;
    bottom: 10px;

  }
  #early-warning .el-pagination{
    float: left;
  }
  #early-warning .choice{
    float: left;
    padding: 2px 5px;

  }
  #early-warning .choice span{
    line-height: 28px;
    font-size: 13px;
    color: #606266;
  }
</style>
<style>
  .swyjTwo{
    background-color: #ff9003;
  }
  .swyjThree{
    background-color: #ffff24 ;
  }
  .swyjFour{
    background-color: #03ff3d ;
  }
</style>
