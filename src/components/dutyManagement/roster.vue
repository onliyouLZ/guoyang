<!--值班表-->
<template>
  <div id="roster"
       v-loading="loading"
       element-loading-text="加载中">
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
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
        <template v-for="item in tableHeader">
          <el-table-column
            v-if="item.type==='selection'"
            type="selection"
            width="40"
            fixed>
          </el-table-column>
          <el-table-column
            v-if="item.type==='normal'"
            :prop="item.data"
            :label="item.title"
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
        <div class="choice" v-if="multipleSelection.length>0"><span>当前页选中:{{multipleSelection.length>0 ? multipleSelection.length+"条" : ""}}</span></div>
      </div>
    </el-card>



  </div>
</template>

<script>
  export default {
    name: "roster",
    data(){
      return{
        pageSize: 10, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        tableData: [],
        currentPage4: 1,
        times: [new Date('2019-04-15').formatDate('yyyy-MM-dd 00:00:00'), new Date('2019-04-15').formatDate('yyyy-MM-dd 23:59:59')],
        // times: [new Date("2018-12-22 08:00"), new Date("2018-12-22 20:00")],
        multipleSelection:[],
        tableHeader:[
          {data:'',title:'',type:"selection"},
          {data:'date',title:'日期',type:"normal"},
          {data:'dutyTypeName',title:'班次',type:"normal"},
        ],
        loading: true,
        typeNum:[],
        screenWidth:document.body.clientWidth
      }
    },
    methods:{
      search(){
        const _this=this;
        let arr=[],dutyPty=[];
        function  getPersontype() {
           return _this.$http.get(_this.$url.baseUrl+'api/duty/v0.1/gy-duty/duty-person-type')
        }
        function getduty() {
          let parms={
            bgtm:new Date(_this.times[0]).formatDate('yyyy-MM-dd HH:mm:ss'),
            endtm:new Date(_this.times[1]).formatDate('yyyy-MM-dd HH:mm:ss')
          };
          return _this.$http.post(_this.$url.baseUrl+'api/duty/v0.1/gy-duty/duty-record-list/by-day',parms)
        }
        _this.$http.all([getPersontype(),getduty()]).then(_this.$http.spread((personType,duty)=>{
          let dutyPersonTypeArr = personType.data.result.sort(function (a,b) { return a.sortid - b.sortid });
          let leaderType = dutyPersonTypeArr[0].code;
          let dutyRecordMap = duty.data.result;
          for(let date in dutyRecordMap){
            if(dutyRecordMap.hasOwnProperty(date) && $.isArray(dutyRecordMap[date])){
              // dutyRecordMap[date] 某天所有单位的排班信息
              $.each(dutyRecordMap[date],function (i,departDayDutyItem) {
                // 某天某单位排班信息
                $.each(departDayDutyItem.tm,function (j, dutyDataItem) {
                  //dutyDataItem 某天某单位白班(或夜班/全天等)的排班信息
                  //1.初始化
                  $.each(dutyPersonTypeArr,function (k,dpTypeItem) {
                    dutyDataItem['dutyPersonType'+dpTypeItem.code] = [];
                  });
                  //2. 领导转换
                  dutyDataItem['dutyPersonType'+leaderType] = dutyDataItem.leaders;
                  delete dutyDataItem.leaders;
                  //3. 人员转换
                  if (dutyDataItem.persons.length > 0) {
                    $.each(dutyDataItem.persons,function (m, personItem) {
                      dutyDataItem['dutyPersonType'+personItem.dutyPersonType].push(personItem);
                    })
                  }
                  delete dutyDataItem.persons;
                })
              })

            }
          }
          let dutyRecord = dutyRecordMap;
          /**
           * 处理表头
           */
          for(let i=0;i<dutyPersonTypeArr.length;i++){
            let obj={};
            obj.data=dutyPersonTypeArr[i].type+dutyPersonTypeArr[i].sortid;
            obj.title=dutyPersonTypeArr[i].name;
            obj.type="normal";
            dutyPty.push(obj)
          }
          /**
           * 处理数据
           */
          $.each(dutyRecord, function(a, item) {
            $.each(item, function(b, dates) {
              $.each(dates.tm, function(c, typename) {
                let obj = {};
                $.each(dutyPty,function(i,item){
                  obj[item.data] = _this.getName(typename[item.data]);
                });
                obj.date=dates.date;
                obj.depart=dates.groupName;
                obj.dutyTypeName=typename.dutyTypeName;
                arr.push(obj)
              });
            })
          });
          setTimeout(()=>{
            this.loading=false;
            _this.tableHeader=_this.tableHeader.concat(dutyPty);
            _this.tableData=arr;
            _this.getOrderNumber();
          },500)
        }));


        // this.$http.get(this.$url.baseUrl+'api/sl323/realtime/rain/ad/sum_x/341621/'+parms.bgtm+'/'+parms.endtm+'?bgtm='+parms.bgtm+'&endtm='+parms.endtm+'&ad=341621')
        //   .then((res)=>{
        //     if(res.status===200){
        //       let data=res.data.result.totalMap.rainTotal.list;
        //       setTimeout(()=>{
        //         this.loading=false;
        //         this.tableData=data;
        //         this.getOrderNumber();
        //       },500)
        //     }
        //   })
      },
      //获取人员名称
      getName(arr){
        let result = '';
        if(arr){
          $.each(arr,function(i,item){
            if(!item.userMobilePhone){
              item.userMobilePhone="";
              result += item.realName;
            }else{
              result += item.realName+'('+item.userMobilePhone+')'+'、';
            }
          });
          result = result.substr(0, result.length - 1);
        }
        return result ? result.substr(0,result.length):result;
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
        setTimeout(()=>{
          this.tableHeader=[
            {data:'',title:'',type:"selection"},
            {data:'date',title:'日期',type:"normal"},
            {data:'dutyTypeName',title:'班次',type:"normal"},
          ];
        },500);
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
          export_json_to_excel(tHeader, data, ' 值班统计表');
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
  #roster .el-card{
    height: calc(100vh - 89px);
  }
  #roster .footer{
    position: absolute;
    bottom: 10px;

  }
  #roster .el-pagination{
    float: left;
  }
  #roster .choice{
    float: left;
    padding: 2px 5px;

  }
  #roster .choice span{
    line-height: 28px;
    font-size: 13px;
    color: #606266;
  }
  #roster .el-scrollbar__bar{
    display: none;
  }
</style>

