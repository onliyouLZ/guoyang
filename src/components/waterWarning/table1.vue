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
          <el-radio v-model="radio" label="1">逐日</el-radio>
          <el-radio v-model="radio" label="2">实时</el-radio>
        </div>
        <div class="prims_card">
          <p class="prims_p_title">时间范围</p>
          <label>年份选择:</label>
          <el-date-picker
            style="width: 193px"
            size="mini"
            v-model="year"
            type="year"
            align="right"
            placeholder="选择年">
          </el-date-picker>
        </div>
        <hr />
        <div class="prims_card">
          <p class="prims_p_title">站点选择</p>
          <p class="prims_p_title_child">
            <label>水&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系:</label>
            <el-select
              v-model="basin"
              multiple
              size="mini"
              collapse-tags
              @change="basinChange"
              placeholder="请选择">
              <el-option
                v-for="item in basinOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </p>
          <p class="prims_p_title_child"><label>报讯等级:</label>
            <el-select
              v-model="grade"
              multiple
              size="mini"
              collapse-tags
              @change="gradeChange"
              placeholder="请选择">
              <el-option
                v-for="item in gradeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select></p>
          <p class="prims_p_title_child">
            <label>站点搜索:</label>
            <el-input style="width: 193px" size="mini" v-model="keyWord" placeholder="请输入站点名称" @change="sxChange"></el-input>
          </p>
        </div>
        <hr />
        <div class="prims_card">
          <el-scrollbar
          style="height: 100%;">
            <z-tree class="trees" @checkTree="checkTree" :treeData="treeData" :treeID="treeValue"></z-tree>
          </el-scrollbar>
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

      <div class="table-title">
        <p style="font-size: 20px;color: red"><span>{{tableName}}降雨量</span></p>
        <p><span>年份：{{tableYear}} 单位：mm</span></p>
      </div>
       <div class="table-button">
         <i class="fa fa-file-excel-o"></i><el-button type="text" @click="exportExcel(tableData,multipleSelection,tableHeader)">导出</el-button>
       </div>
      <el-table
        :data="tables"
        border
        height="calc(100vh - 300px)"
        style="width: 100%;"
        header-cell-class-name="table-header-public"
        :span-method="objectSpanMethod">
    <!--:span-method="objectSpanMethod-->
        <template v-for="(item,index) in tableHeader">
          <el-table-column
            v-if="item.type==='normal'"
            :prop="item.data"
            align="center"
            :label="item.title">
          </el-table-column>
          <el-table-column
            v-if="item.type==='index'"
            :prop="item.data"
            align="center"
            width="50"
            :label="item.title">
          </el-table-column>
        </template>
      </el-table>
    <!--</el-scrollbar>-->
    <div class="footer" v-if="tableFooter">
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
    import zTree from '../zTree'

    import {convertP,Time} from '../../utils/utils'



    export default {
        name: "table1",
        components: {zTree},
        data(){
          return{
            pageSize: 40, // 每页大小默认值
            pageIndex: 1, // 默认第一页
            tableData: [],
            typeNum:[],
            currentPage4: 1,
            activeName:"first",
            flag:0,
            flagName:"显示",
            radio:"1",
            year:new Date('2018'),
            basin: [],
            grade: [],
            keyWord:"",
            basinOption: [],
            gradeOption: [
              {label: '中央（1）', value: "1"},
              {label: '省级重点（2）', value: "2"},
              {label: '省级一般（3）', value: "3"},
              {label: '其它（4）', value: "4"}
            ],
            tableHeader:[],
            tableName:"",
            tableYear:"",
            checkNode:"",
            treeData:[],
            treeValue:[],
            oldTableData:[],
            tableFooter:false,
            multipleSelection:[],
            screenWidth:document.body.clientWidth,
            ztreeData:[],
            tableFlag:1
          }
        },
        methods:{
          handleSizeChange(val) {
            this.pageSize = val
          },
          handleCurrentChange(val) {
            this.pageIndex = val;
            this.$emit('primary',{loading:true});
          },
          objectSpanMethod({ row, column, rowIndex, columnIndex }){
            if(this.typeNum.length>0){
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
          //查询
          primary(){
            if(this.checkNode.name){
              $('.prims').animate({left:-279}, "fast");
              $('.prims_button').animate({left: 0}, "fast");
              this.flag=0;
              this.flagName="显示";
              this.tableYear=new Date(this.year).getFullYear();
              if(this.radio==="2"){
                this.tableName=this.checkNode.name+'(雨量)实时';
                this.tableHeader=[
                  {data: '__index', title: "序号",type:"index"},
                  {data: "IDTM", title: "时间",type:"normal"},
                  {data: "ACCP", title: "降雨量(mm)",type:"normal"},
                  {data: "WTH", title: "天气状况",type:"normal"},
                ];
                $.each(this.oldTableData,(v,item)=>{
                    item.__index=item.__index+1;
                    if(item.WTH==='2'){
                        item.WTH='晴'
                    }
                });
                this.typeNum=[];
                this.tableFooter=true;
                this.pageSize=10;
                this.tableData=this.oldTableData;
                this.tableFlag=2;
              }else if(this.radio==="1"){
                this.tableName=this.checkNode.name+'(雨量)逐日';
                this.tableFooter=false;
                this.pageSize=40;
                this.typeNum=[];
                this.tableData=[];
                this.tableFlag=1;
                this.search();
                this.$emit('primary',{loading:true});
              };
              this.$emit('primary',{loading:true});
            }else{
              this.$message({
                message: '测站不能为空，请选择测站！',
                type: 'warning',
                duration:2000
              });
              return
            }
          },
          reset(){
            $('.prims').animate({left:-279}, "fast");
            $('.prims_button').animate({left: 0}, "fast");
            this.flag=0;
            this.flagName="显示";
            this.tableFooter=false;
            this.pageSize=40;
            this.search();
            this.$emit('primary',{loading:true});
          },
          getIntervalRain(interval, year, daysData1) {
            let result = {};
            let startDate = year + '-01-01';
            let endDate = (parseInt(year) + 1) + '-01-01';
            let group = {};
            let days = Time.getDateDiff(startDate, endDate, 'day');
            let count = Math.ceil(days / interval);

            for (let i = 0; i < count; i++) {
              let sum ='';
              for (let j = 0; j < interval; j++) {
                let oneDay = startDate.toDate().datePro("{%d+}" + (i * interval + j)).formatDate('yyyy-MM-dd');
                if (daysData1[oneDay] !== undefined && daysData1[oneDay] !== null && daysData1[oneDay] !== '') {
                  sum = sum === '' ? 0 : sum;
                  sum += Number(parseFloat(daysData1[oneDay]));
                }
              }
              group[i] = sum;
            }

            let max = 0, idx = 0;
            for (let p in group) {
              if (group.hasOwnProperty(p) && group[p] > max) {
                max = group[p];
                idx = p;
              }
            }

            result.sum = convertP(group[idx]);
            // TODO 得确定上面的算法是否是准确的.
            if (result.sum !== undefined && result.sum !== null && result.sum !== '') {
              result.startDate = startDate.toDate().datePro("{%d+}" + (idx * interval)).formatDate('yyyy-MM-dd');
            } else {
              result.startDate = '';
            }
            return result;
          },
          checkTree(data){
            this.checkNode=data;
          },
          //筛选数据
          filertData(){
            let params={
              HNNM:this.basin,
              FRGRD:this.grade,
              keyWord:this.keyWord
            };
            let treeData=this.ztreeData.filter((item)=>{
              if (params.keyWord || params.keyWord === 0) {
                if(item.STCD){
                  if (item.STCD.search(params.keyWord) < 0 && item.name.search(params.keyWord) < 0 ) {
                    return false;
                  }
                }
              }
              if (params.HNNM.length > 0 && $.inArray((item.HNNM === '' ? '暂无' : item.HNNM), params.HNNM) === -1) {
                return false;
              }
              if (params.FRGRD.length > 0 && $.inArray(item.FRGRD, params.FRGRD) === -1) {
                return false;
              }
              return true
            });
            return treeData;
          },
          basinChange(){
            this.treeData=this.filertData()
          },
          gradeChange(){
            this.treeData=this.filertData()
          },
          sxChange(){
            this.treeData=this.filertData()
          },
          //获取水系
          getRvnms(data){
            let rvnmObj = {};
            $.each(data, function (i, item) {
              item.HNNM = item.HNNM === null ? '暂无' : item.HNNM;
              if (!rvnmObj[item.HNNM]) {
                rvnmObj[item.HNNM] = [];
              }
              rvnmObj[item.HNNM].push(item);
            });
            let rvnmArr = [];
            for (let rvnm in rvnmObj) {
              if (rvnmObj.hasOwnProperty(rvnm)) {
                rvnmArr.push({stArr: rvnmObj[rvnm], label: rvnm, value: rvnm});
              }
            }
            // 根据名称排序
            rvnmArr.sort(function (a, b) {
              if (a.label === '暂无') {
                return 1;
              } else if (b.label === '暂无') {
                return -1;
              } else {
                return a.label.localeCompare(b.label, 'zh')
              }

            });
            return rvnmArr
          },
          //初始化
          search(){
            const that=this;
            let parmas={
              stcdList: [that.checkNode.STCD],
              sttdrcd: "1",
              // tmList: [{bgtm: new Date(that.year).formatDate('yyyy-MM-dd'), endtm: new Date(that.year).datePro('{%y+1}').formatDate('yyyy-MM-dd')}],
              tmList: [{bgtm: "2018-01-01", endtm: "2019-01-01"}],
            };
            this.$http.post(this.$url.baseUrl+'api/commonApi/sl323/v0.1/realtime/rain/sttdrcd',parmas).then((res)=>{
              that.tableYear=new Date(that.year).getFullYear();
              let data=res.data.result[that.checkNode.STCD];
              this.oldTableData=data;
              let gridData = [];
              let daysData = {};
              let daysData1 = {};
              $.each(data, function (index, item) {
                daysData[item.IDTM]=item.ACCP;
                daysData1[new Date(item.IDTM).formatDate('yyyy-MM-dd')] = item.ACCP;
              });
              this.tableHeader = [
                {data: 'statistics', title: "统计",type:"normal"},
                {data: "date", title: "日期",type:"normal"},
                {data: "month01", title: "一月",type:"normal"},
                {data: "month02", title: "二月",type:"normal"},
                {data: "month03", title: "三月",type:"normal"},
                {data: "month04", title: "四月",type:"normal"},
                {data: "month05", title: "五月",type:"normal"},
                {data: "month06", title: "六月",type:"normal"},
                {data: "month07", title: "七月",type:"normal"},
                {data: "month08", title: "八月",type:"normal"},
                {data: "month09", title: "九月",type:"normal"},
                {data: "month10", title: "十月",type:"normal"},
                {data: "month11", title: "十一月",type:"normal"},
                {data: "month12", title: "十二月",type:"normal"}
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
                  _day = that.tableYear + "-" + _month + "-" + (i < 10 ? ('0' + i) : i) + ' 08:00:00';
                  row[_monthKey] = (daysData[_day] || daysData[_day] === 0) ? daysData[_day] : '';
                }
                gridData.push(row);
              }

              //月统计 && 年统计
              let monthTotalRow = {date: '总量', statistics: '月统计'};
              let monthMaxDayRainRow = {date: '最大日雨量', statistics: '月统计'};
              let monthRainyDayRow = {date: '降雨天数', statistics: '月统计'};
              let yearTotalRow = { date: '降雨量', statistics: '年统计', month01:0, month02: '降雨天数', month03: ''};
              for (let j = 1; j <= 12; j++) {
                _month = j < 10 ? ('0' + j) : j;
                _monthKey = 'month' + _month;
                monthTotalRow[_monthKey] = '';
                monthRainyDayRow[_monthKey] = '';
                monthMaxDayRainRow[_monthKey] = '';
                if (!yearTotalRow.hasOwnProperty(_monthKey)) {
                  yearTotalRow[_monthKey] = '';
                }
                for (let i = 1; i <= 31; i++) {
                  _day =that.tableYear + "-" + _month + "-" + (i < 10 ? ('0' + i) : i) + ' 08:00:00';
                  if (daysData[_day] || daysData[_day] === 0) {
                    monthTotalRow[_monthKey] = monthTotalRow[_monthKey] === '' ? 0 : monthTotalRow[_monthKey];
                    yearTotalRow[_monthKey] = yearTotalRow[_monthKey] === '' ? 0 : yearTotalRow[_monthKey];
                    monthTotalRow[_monthKey] += daysData[_day];
                    yearTotalRow.month01 += daysData[_day];
                    monthMaxDayRainRow[_monthKey] = daysData[_day] > monthMaxDayRainRow[_monthKey] ? daysData[_day] : monthMaxDayRainRow[_monthKey];
                    if (daysData[_day] > 0) {
                      //降雨日数
                      monthRainyDayRow[_monthKey] = (monthRainyDayRow[_monthKey] ? monthRainyDayRow[_monthKey] : 0) + 1;
                      yearTotalRow.month03 = (yearTotalRow.month03 ? yearTotalRow.month03 : 0) + 1;
                    }
                  }
                }
              };
              if(yearTotalRow.month01===0){
                yearTotalRow.month01=""
              }
              gridData.push(monthTotalRow);
              gridData.push(monthMaxDayRainRow);
              gridData.push(monthRainyDayRow);
              gridData.push(yearTotalRow);

              // 年统计
              let interval1 = that.getIntervalRain(1, that.tableYear, daysData1);
              let interval3 = that.getIntervalRain(3, that.tableYear, daysData1);
              let interval7 = that.getIntervalRain(7, that.tableYear, daysData1);
              let interval15 = that.getIntervalRain(15,that.tableYear, daysData1);
              let interval30 = that.getIntervalRain(30, that.tableYear, daysData1);
              let arr=[
                {"statistics":"年统计","date":"时段(天)","month01":"1","month02":"3","month03":"7","month04":"15","month05":"30"},
                {
                  "statistics":"年统计",
                  "date":"最大降雨量",
                  "month01":interval1.sum,
                  "month02":interval3.sum,
                  "month03":interval7.sum,
                  "month04":interval15.sum,
                  "month05":interval30.sum
                },
                {
                  "statistics":"年统计",
                  "date":"开始时间",
                  "month01":interval1.startDate,
                  "month02":interval3.startDate,
                  "month03":interval7.startDate,
                  "month04":interval15.startDate,
                  "month05":interval30.startDate
                },
                {"statistics":"附注","date":""},
              ];
              this.tableData=gridData;
              this.tableData=this.tableData.concat(arr);
              this.getOrderNumber();
              setTimeout(()=>{
                this.$emit('primary',{loading:false});
              },500)
            });
          },
          //导出
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
            if(this.tableFlag===1){
              return this.tableData;
            }else if(this.tableFlag===2){
              return this.tableData.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
            }
          },
          total(){
            return this.tableData.length
          },
        },
        created(){

        },
        watch:{

        },
        mounted() {
          this.$nextTick(()=>{
            if(this.screenWidth>=1800){
              $('.trees').css('height',"300px")
            }else if(this.screenWidth<1800){
              $('.trees').css('height',"130px")
            };
            this.$http.post(this.$url.baseUrl+'api/commonApi/sl323/v0.1/basic/st/stStbprpB/selectAll')
              .then((res)=>{
                if(res.status===200){
                  let data=res.data.result;
                  this.basinOption=this.getRvnms(data);
                  $.each(data,(v,item)=>{
                    if(item.STNM==="孙土楼"){
                      item.checked=true;
                    }
                    let obj={
                      id:item.STCD,
                      STCD:item.STCD,
                      PHCD:item.PHCD,
                      pId:1,
                      name:item.STNM,
                      HNNM:item.HNNM === null ? '暂无' : item.HNNM,
                      FRGRD:item.FRGRD
                    };
                    if(item.checked){
                      obj.checked=item.checked;
                    }
                    this.treeData.push(obj);
                  });
                  this.ztreeData=this.treeData;
                  $.each(this.treeData,(v,item)=>{
                    if(item.checked){
                      this.tableName=item.name+'(雨量)逐日';
                      this.checkNode=item;
                      return false
                    }
                  });
                  this.$emit('primary',{loading:true});
                  this.search();
                }
              })
          })
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
  #table1 .table-button{
    padding-left: 5px;
    border-top: 1px solid #dddddd;
    border-left: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    background: linear-gradient(to top, #dbdada 0%,#E5E5E5 10%, #efeeee 100%,#ffffff)
  }
  #table1 .table-button .el-button{
    color: #666666;
    font-weight: 700;
    font-size: 14px;
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
