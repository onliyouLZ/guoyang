<template>
  <div id="table1">
    <div class="prims_button" @click="show(flag)" >
      {{flagName}}
    </div>
    <div class="prims">
      <el-card class="box-card" >
        <div class="prims_card">
          <p class="prims_p_title">报表类型</p>
          <label>选择类型:</label>
          <el-radio v-model="radio" label="1">年报表</el-radio>
          <el-radio v-model="radio" label="2">日报表</el-radio>
        </div>
        <div class="prims_card">
          <p class="prims_p_title">时间范围</p>
          <label>年份选择:</label>
          <el-date-picker
            style="width: 193px"
            size="mini"
            v-model="value5"
            type="year"
            align="left"
            placeholder="选择年">
          </el-date-picker>
        </div>
        <hr />
        <div class="prims_card">
          <p class="prims_p_title">站点选择</p>
          <p class="prims_p_title_child">
            <label>水&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系:</label>
            <el-select
              v-model="value11"
              multiple
              size="mini"
              collapse-tags
              placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </p>
          <p class="prims_p_title_child"><label>报讯等级:</label>
            <el-select
              v-model="value12"
              multiple
              size="mini"
              collapse-tags
              placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select></p>
          <p class="prims_p_title_child">
            <label>站点搜索:</label>
            <el-input style="width: 193px" size="mini" v-model="input" placeholder="请输入内容"></el-input>
          </p>
        </div>
        <hr />
        <div class="prims_card">
          <z-tree></z-tree>
        </div>
        <hr />
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
      <el-button type="success">导出Excel</el-button>
      <div class="table-title">
        <p style="font-size: 20px;color: red"><span>金水闸(雨量)逐日降雨量</span></p>
        <p><span>年份：2018 单位：mm</span></p>
      </div>
      <el-table
        :data="tables"
        border
        height="calc(100vh - 300px)"
        style="width: 100%;"
        header-cell-class-name="table-header-public“”"
        :span-method="objectSpanMethod">
    <!--:span-method="objectSpanMethod-->
        <template v-for="(item,index) in tableHeader">
          <el-table-column
            :prop="item.data"
            align="center"
            :label="item.title">
          </el-table-column>
        </template>

      </el-table>
    <!--</el-scrollbar>-->
    <div class="footer" v-if="tableData.length>0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[40,60]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    import zTree from '../zTree'
    export default {
        name: "table1",
        components: {zTree},
        data(){
          return{
            pageSize: 40, // 每页大小默认值
            pageIndex: 1, // 默认第一页
            tableData: [

            ],
            typeNum:[],
            currentPage4: 1,
            activeName:"first",
            loading:true,
            flag:0,
            flagName:"显示",
            radio:"1",
            value5:"2018",
            value11: ["选项1"],
            value12: ["选项1"],
            input:"金水闸",
            options: [
              {
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
            tableHeader:[]
          }
        },
        methods:{
          handleSizeChange(val) {
            this.pageSize = val
          },
          handleCurrentChange(val) {
            this.pageIndex = val
          },
          objectSpanMethod({ row, column, rowIndex, columnIndex }){
            const _row=this.typeNum[rowIndex];
            if(columnIndex===0){
              if(rowIndex ===34){
                return{
                  colspan:2,
                  rowspan:_row
                }
              }else{
                return {
                  colspan:1,
                  rowspan:_row
                };
              }
            }
            else if(columnIndex===1){
              if(rowIndex ===34 || rowIndex ===35 || rowIndex ===36 || rowIndex ===37){
                return{
                  colspan:2,
                  rowspan:1
                }
              }else if(rowIndex ===38){
                return{
                  colspan:13,
                  rowspan:1
                }
              }
            }
            else if(columnIndex===2){
              if(rowIndex ===34){
                return{
                  colspan:4,
                  rowspan:1
                }
              }else if(rowIndex ===35 || rowIndex ===36 || rowIndex ===37){
                return{
                  colspan:2,
                  rowspan:1
                }
              }
            }
            else if(columnIndex===3){
              if(rowIndex ===34){
                return{
                  colspan:2,
                  rowspan:1
                }
              }else if(rowIndex ===35 || rowIndex ===36 || rowIndex ===37){
                return{
                  colspan:2,
                  rowspan:1
                }
              }
            }
            else if(columnIndex===4){
              if(rowIndex ===34){
                return{
                  colspan:4,
                  rowspan:1
                }
              }
              if(rowIndex ===35 || rowIndex ===36 || rowIndex ===37){
                return{
                  colspan:2,
                  rowspan:1
                }
              }
            }
            else if(columnIndex===5){
              if(rowIndex ===35 || rowIndex ===36 || rowIndex ===37){
                return{
                  colspan:2,
                  rowspan:1
                }
              }
            }
            else if(columnIndex===6){
              if(rowIndex ===35 || rowIndex ===36 || rowIndex ===37){
                return{
                  colspan:2,
                  rowspan:1
                }
              }
            }
          },
          getOrderNumber(){
            //排序
            let index=0;
            for(let i=0;i<this.tableData.length;i++){
              if(i===0){
                this.typeNum.push(1);
                index=i;
              }else{
                if(this.tableData[i].statistics===this.tableData[i-1].statistics){
                  this.typeNum[index]+=1;
                  this.typeNum.push(0);
                }else{
                  this.typeNum.push(1);
                  index=i;
                }
              }
            }
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
            this.loading=true;
            $('.prims').animate({left:-279}, "fast");
            $('.prims_button').animate({left: 0}, "fast");
            this.flag=0;
            this.flagName="显示";
            setTimeout(()=>{
              this.loading=false;
            },1000)
          },
          reset(){
            this.loading=true;
            $('.prims').animate({left:-279}, "fast");
            $('.prims_button').animate({left: 0}, "fast");
            this.flag=0;
            this.flagName="显示";
            setTimeout(()=>{
              this.loading=false;
            },1000)
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
        created(){
          this.$http.get('/api/rains').then((res)=>{
            this.loading=false;
            let data=res.data.data.result[64000001];
            let arr=[
              {"statistics":"年统计","date":"时段(天)","month01":"1","month02":"3","month03":"7","month04":"15","month05":"30"},
              {"statistics":"年统计","date":"最大降雨量","month01":"","month02":"","month03":"","month04":"","month05":""},
              {"statistics":"年统计","date":"开始时间","month01":"","month02":"","month03":"","month04":"","month05":""},
              {"statistics":"附注","date":""},
            ];

            let gridData = [];
            let daysData = {};
            $.each(data, function (index, item) {
              // daysData[item.IDTM]=item.ACCP;
              daysData[item.IDTM]=1;
              if(index===2){
                daysData[item.IDTM]=4;
              }else if(index===35){
                daysData[item.IDTM]=8;
              }
              // daysData1[new Date(item.IDTM).formatDate('yyyy-MM-dd')] = item.ACCP;
            });
             this.tableHeader = [
               {data: 'statistics', title: "统计"},
               {data: "date", title: "日期"},
               {data: "month01", title: "一月"},
               {data: "month02", title: "二月"},
               {data: "month03", title: "三月"},
               {data: "month04", title: "四月"},
               {data: "month05", title: "五月"},
               {data: "month06", title: "六月"},
               {data: "month07", title: "七月"},
               {data: "month08", title: "八月"},
               {data: "month09", title: "九月"},
               {data: "month10", title: "十月"},
               {data: "month11", title: "十一月"},
               {data: "month12", title: "十二月"}
             ];
            //日统计
            let _day;
            let _month;
            let _monthKey;
            for (let i = 1; i <= 31; i++) {
              let row = {statistics: '日统计',date: i};
              for (let j = 1; j <= 12; j++) {
                _month = j < 10 ? ('0' + j) : j;
                _monthKey = 'month' + _month;
                _day = '2018' + "-" + _month + "-" + (i < 10 ? ('0' + i) : i) + ' 08:00:00';
                row[_monthKey] = (daysData[_day] || daysData[_day] === 0) ? daysData[_day] : '';
              }
              gridData.push(row);
            }

            //月统计 && 年统计
            let monthTotalRow = {date: '总量', statistics: '月统计'};
            let monthMaxDayRainRow = {date: '最大日雨量', statistics: '月统计'};
            let monthRainyDayRow = {date: '降雨天数', statistics: '月统计'};
            let yearTotalRow = { date: '降雨量', statistics: '年统计', month01: '', month02: '降雨天数', month03: ''};
            for (let j = 1; j <= 12; j++) {
              _month = j < 10 ? ('0' + j) : j;
              _monthKey = 'month' + _month;
              monthTotalRow[_monthKey] = "";
              monthRainyDayRow[_monthKey] = "";
              monthMaxDayRainRow[_monthKey] = "";
              if (!yearTotalRow.hasOwnProperty(_monthKey)) {
                yearTotalRow[_monthKey] = '';
              }
              for (let i = 1; i <= 31; i++) {
                _day = '2018' + "-" + _month + "-" + (i < 10 ? ('0' + i) : i) + ' 08:00:00';
                if (daysData[_day] || daysData[_day] == 0) {
                  monthTotalRow[_monthKey] = monthTotalRow[_monthKey] === '' ? 0 : monthTotalRow[_monthKey];
                  monthTotalRow[_monthKey] += daysData[_day];
                  yearTotalRow[_monthKey] = yearTotalRow[_monthKey] === '' ? 0 : yearTotalRow[_monthKey];
                  yearTotalRow.month01 +=daysData[_day];
                  monthMaxDayRainRow[_monthKey] = daysData[_day] > monthMaxDayRainRow[_monthKey] ? daysData[_day] : monthMaxDayRainRow[_monthKey];
                  if (daysData[_day] > 0) {
                    //降雨日数
                    monthRainyDayRow[_monthKey] = (monthRainyDayRow[_monthKey] ? monthRainyDayRow[_monthKey] : 0) + 1;
                    yearTotalRow.month03 = (yearTotalRow.month03 ? yearTotalRow.month03 : 0) + 1;
                  }
                }
              }
            }
            gridData.push(monthTotalRow);
            gridData.push(monthMaxDayRainRow);
            gridData.push(monthRainyDayRow);
            gridData.push(yearTotalRow);
            this.tableData=gridData;
            this.tableData=this.tableData.concat(arr);
            this.getOrderNumber();
          });

        },
        watch:{
        }
    }
</script>

<style scoped>
  #table1 .prims{
    height: calc(100vh - 126px);
    position: absolute;
    left:-279px;
    top: 0;
    z-index: 99;
  }
  #table1 .el-radio+.el-radio{
    margin-left: 10px;
  }
  #table1 .table-title{
    text-align: center;
    padding: 5px;
  }
  #table1 .prims .prims_footer_button{
    text-align: center;
  }
  #table1 .prims_button{
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
  #table1 .prims .el-card{
    height:100%;
    background-color: #E5E5E5;
  }
  #table1 .prims hr{
    border: 1px dashed #c9c9c9;
    margin: 5px 0;
  }
  #table1 .prims .prims_card{
    padding:5px 0;
  }
  #table1 .prims .prims_card .prims_p_title_child{
    line-height: 40px;
  }
  #table1 .prims .prims_p_title{
    font-weight: 700;
    line-height: 24px;
    font-size: 14px;
  }
  #table1 .footer{
    position: absolute;
    bottom: 10px;
  }
</style>
<style>
  #table1 .el-tabs--border-card .el-tabs__content{
    height:calc(100vh - 157px);
  }
</style>
