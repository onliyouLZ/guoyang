<template>
  <div id="riverDliog">
    <el-dialog
      :visible.sync="visible"
      :title="dialogData.STNM"
      @close="childClose">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first" lazy>
          <span slot="label"><i class="fa fa-calendar-o"></i>&nbsp;基本信息</span>
          <table class="dilogTable" cellspacing="0">
            <tr>
              <td class="u-list-title">测站编码</td>
              <td ><span>{{optionData.STCD}}</span></td>
              <td class="u-list-title">测站名称</td>
              <td ><span>{{optionData.STNM}}</span></td>
            </tr>
            <tr>
              <td class="u-list-title">河流名称</td>
              <td><span>{{optionData.RVNM}}</span></td>
              <td class="u-list-title">水系名称</td>
              <td><span>{{optionData.HNNM}}</span></td>
            </tr>
            <tr>
              <td class="u-list-title">流域:</td>
              <td><span>{{optionData.BSNM}}</span></td>
              <td class="u-list-title">县（市）</td>
              <td><span>{{optionData.ADNM}}</span></td>
            </tr>
            <tr>
              <td class="u-list-title">经度</td>
              <td><span>{{optionData.LGTD}}</span></td>
              <td class="u-list-title">纬度</td>
              <td><span>{{optionData.LTTD}}</span></td>
            </tr>
            <tr>
              <td class="u-list-title">站类</td>
              <td><span>{{optionData.zl}}</span></td>
              <td class="u-list-title">站址</td>
              <td><span>{{optionData.STLC}}</span></td>
            </tr>
            <tr>
              <td class="u-list-title">报讯等级</td>
              <td><span>{{optionData.FRGRD}}</span></td>
              <td class="u-list-title">测站岸别</td>
              <td><span>{{optionData.STBK}}</span></td>
            </tr>
            <tr>
              <td class="u-list-title">测站方位</td>
              <td><span>{{optionData.STAZT}}</span></td>
              <td class="u-list-title">至河口距离</td>
              <td><span>{{optionData.DSTRVM}}</span></td>
            </tr>
            <tr>
              <td class="u-list-title">集水面积</td>
              <td><span>{{optionData.DRNA}}</span></td>
              <td class="u-list-title">拼音码</td>
              <td><span>{{optionData.PHCD}}</span></td>
            </tr>
            <tr>
              <td class="u-list-title">备注</td>
              <td colspan="3"><span>{{optionData.COMMENTS}}</span></td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane name="second" lazy>
          <span slot="label"><i class="fa fa-calendar-o"></i>&nbsp;水位过程线</span>
          <div class="search">
            <el-date-picker
              v-model="firstTime"
              type="datetimerange"
              align="left"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              style="float: left;">
            </el-date-picker>
            <el-button type="primary" style="margin-left: 10px;" @click="primary">查询</el-button>
          </div>
          <div id="electric_prod_char_river" :style="{width:width,height:height}" ></div>
          <div class="echartTable" :class="{'collosed':isCollapsed===false}">
            <el-table
              :data="tableData"
              border
              size="mini"
              style="width:100%"
              height="400"
              cell-class-name="table-body"
              header-cell-class-name="table-header">
              <el-table-column
                type="index"
                width="50"
                label="序号"
                align="center">
              </el-table-column>
              <el-table-column
                prop="TM"
                align="center"
                label="时间">
              </el-table-column>
              <el-table-column
                prop="Z"
                align="center"
                label="水位">
              </el-table-column>
              <el-table-column
                prop="Q"
                align="center"
                label="流量">
              </el-table-column>
            </el-table>
            <div class="collseBtn"  @click="toggleTable">
              <span>{{isCollapsed ? collseTitle='显示':collseTitle='隐藏'}}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane  name="third" lazy>
          <span slot="label"><i class="fa fa-calendar-o"></i>&nbsp;历史同时期对比</span>
          <div class="search">
            <el-date-picker
              v-model="secondTime"
              type="datetimerange"
              align="left"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :default-time="['08:00:00', '08:00:00']"
              style="float: left;">
            </el-date-picker>
            <el-select
              v-model="oldYear"
              multiple
              collapse-tags
              style="margin-left: 20px;width: 150px"
              placeholder="请选择">
              <el-option
                v-for="item in yearOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-radio-group v-model="radio">
              <el-radio  label="水位">水位</el-radio>
              <el-radio  label="流量">流量</el-radio>
            </el-radio-group>
            <el-button type="primary" style="margin-left: 10px;" @click="historyPrimary">查询</el-button>
          </div>
          <div id="electric_prod_char_river1" :style="{width:width,height:height}" ></div>
          <div class="echartTable" :class="{'collosed':isCollapsed===false}">
            <el-table
              :data="tableData1"
              border
              size="mini"
              style="width:100%"
              height="400"
              cell-class-name="table-body"
              header-cell-class-name="table-header">
              <el-table-column
                type="index"
                width="50"
                label="序号"
                align="center">
              </el-table-column>
              <template v-for="item in historyHeader">
                <el-table-column
                  :prop="item.data"
                  align="center"
                  :label="item.label">
                </el-table-column>
              </template>
            </el-table>
            <div class="collseBtn"  @click="toggleTable">
              <span>{{isCollapsed ? collseTitle='显示':collseTitle='隐藏'}}</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {convertObjectToArray} from '../../../utils/utils'
  export default {
    name: "riverDliog",
    data(){
      return{
        visible:this.riverVisible,
        activeName: 'first',
        collseTitle:"显示",
        isCollapsed:true,
        tableData: [],
        tableData1:[],
        historyHeader:[],
        radio:"水位",
        width:"100%",
        height:"350px",
        // firstTime: [new Date().datePro('{%d-1}'), new Date()],
        firstTime: [new Date("2018-12-22 08:00:00"), new Date("2018-12-22 20:00:00")],
        secondTime:[new Date("2018-12-22 08:00:00"), new Date("2018-12-22 20:00:00")],
        oldYear:["2017"],
        yearOption: [],
        optionData:"",
      }
    },
    props:{
      riverVisible:{
        type:Boolean,
        default:false
      },
      dialogData:{
        type:Object,
        default:{}
      }
    },
    methods:{
      /**
       * tab切换事件
       */
      handleClick(tab, event){
        if(this.activeName==="first"){
          this.historyHeader=[];
        }else if(this.activeName==="second"){
          this.$nextTick(()=>{
            this.getRealtime();
            this.historyHeader=[]
          });
        }else if(this.activeName==="third"){
          this.$nextTick(()=>{
            this.historyHeader.push({data:"TM",label:"时间"});
            this.getHistory()
          });
        }
      },
      //获取基本信息
      getBasic(){
        const _this=this;
        _this.$http.get(_this.$url.baseUrl+"api/sl323/basic/st/"+_this.dialogData.STCD).then((res)=>{
          if(res.status===200){
            let data=convertObjectToArray(res.data.result);
            $.each(data,(v,item)=>{
              if(item.STTP==="ZQ"){
                item.zl="河道水文站"
              }else if(item.STTP==="ZZ"){
                item.zl="河道水位站"
              }
            });
            _this.optionData=data[0];
          }
        })
      },
      //获取水位流量过程线
      getRealtime(){
        const _this=this;
        let parms={};
        if(_this.firstTime){
          parms.bgtm=_this.firstTime[0].formatDate('yyyy-MM-dd HH:00');
          parms.endtm=_this.firstTime[1].formatDate('yyyy-MM-dd HH:00')
        }else{
          parms.bgtm="";
          parms.endtm="";
        }
        _this.$http.get(_this.$url.baseUrl+"api/sl323/realtime/river/list/?bgtm="+parms.bgtm+'&endtm='+parms.endtm+'&STCD='+_this.dialogData.STCD)
          .then((res)=>{
            if(res.status===200){
              let data=res.data.result;
              _this.tableData=data;
              $.each(data,(v,item)=>{
                item.TM=new Date(item.TM).formatDate('yyyy-MM-dd HH:00');
              });
              _this.initWater(data);
            }
          })
      },
      //获取历史同时期对比
      getHistory(){
        const _this=this;
        let parms={
          "stcdList":[this.dialogData.STCD],
          "tmList":
            [
              {"bgtm":new Date(_this.secondTime[0]).formatDate('yyyy-MM-dd HH:00'),"endtm":new Date(_this.secondTime[1]).formatDate('yyyy-MM-dd HH:00')},
            ]
        };
        let baseBgMDHMS = parms.tmList[0].bgtm.substr(4);
        let baseEndMDHMS = parms.tmList[0].endtm.substr(4);
        let findMaxLength = function (arr) {
          let maxLength = 0, index;
          $.each(arr, function (i, item) {
            if (item.length >= maxLength) {
              index = i;
              maxLength = item.length;
            }
          });
          return index;
        };
        $.each(_this.oldYear,(v,item)=>{
          let obj={
            bgtm:item+baseBgMDHMS,endtm:item+baseEndMDHMS
          };
          parms.tmList.push(obj);
        });
        _this.$http.post(_this.$url.baseUrl+"api/commonApi/sl323/v0.1/realtime/river/list-by-tms",parms)
          .then((res)=>{
            if(res.status===200){
              let data=convertObjectToArray(res.data.result);
              let yearDataList = [], bgyear =new Date(_this.secondTime[0]).formatDate('yyyy-MM-dd HH:00').substr(0, 4);
              let years = $.extend(true, [], _this.oldYear);
              if ($.inArray(bgyear, years) === -1) {
                years.push(bgyear);
              };
              //排序年
              years.sort(function (a, b) {
                return parseInt(b) - parseInt(a);
              });
              for (let i = 0; i < years.length; i++) {
                let tempArr = [],obj={};
                if(this.radio==="水位"){
                  obj.data=years[i]+'_z';
                }else{
                  obj.data=years[i]+'_q';
                }
                obj.label=years[i];
                $.each(data, function (j, item) {
                  let tempObj = {};
                  item.DATETM = item.TM.toDate();
                  item.TM = item.DATETM.formatDate('yyyy-MM-dd HH:mm:ss');
                  let y = item.TM.substr(0, 4);
                  if (y === years[i].toString()) {
                    tempObj.year = y;
                    tempObj.TM = item.TM.substr(5);
                    tempObj.Z = item.Z;
                    tempObj.Q = item.Q;
                  }
                  if (tempObj.year) {
                    tempArr.push(tempObj);
                  }
                });
                if (tempArr.length > 0) {
                  yearDataList.push(tempArr);
                };
                _this.historyHeader.push(obj)
              }
              let arr=[];
              if(yearDataList.length>0){
                let index = findMaxLength(yearDataList);
                //组装tableData数据
                $.each(yearDataList[index], function (i, item) {
                  let tempObj = {};
                  tempObj.TM = item.TM;
                  tempObj.DATETM = item.DATETM;
                  for (let j = 0; j < yearDataList.length; j++) {
                    for (let k = 0; k < yearDataList[j].length; k++) {
                      if (yearDataList[j][k].TM.substr(0, 11) === item.TM.substr(0, 11)) {
                        tempObj[yearDataList[j][k].year + '_z'] = yearDataList[j][k].Z;
                        tempObj[yearDataList[j][k].year + '_q'] = yearDataList[j][k].Q;
                        break;
                      }
                    }
                  }
                  arr.push(tempObj);
                });
               _this.tableData1=arr;
               _this.initHistory(arr);
              }else{
                _this.tableData1=data;
                _this.initHistory(data);
              }
            }
          });
      },

      //初始化水位流量过程线图
      initWater(echartData){
        let data=echartData;
        if(data){//有数据时
          let electric_prod_chart = $('#electric_prod_char_river');
          if(electric_prod_chart[0]){
            let electric_prod_chart =  echarts.init(document.getElementById('electric_prod_char_river'));
            // 设置option
            let electric_prod_chart_option = {
              title: {
                text: this.optionData.STNM+'水位过程线',
                left: 'center'
              },
              color:['#60acfc','#d14a61'],
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: "cross",
                  lineStyle: {
                    color: "#60acfc",
                    width: 2,
                    type: "solid"
                  },
                  crossStyle: {
                    color: "#60acfc",
                    width: 1,
                    type: "dashed"
                  },
                  shadowStyle: {
                    color: "rgba(150,150,150,0.3)",
                    width: "auto",
                    type: "default"
                  }
                },
              },
              legend: {
                data:['水位','流量'],
                bottom:0
              },
              xAxis: {
                type: 'category',
                data: data.map(function (item) {
                  return item.TM;
                }),
                boundaryGap: false,
                lineWidth: 2.5,
                splitLine: false,
                onZero: true,   //x轴的位置
                nameLocation: 'end',
                labelFormatter: null,
                position: 'bottom',
                show: true,
                gridIndex: 0
              },
              yAxis: [
                {
                  type: 'value',
                  name: '水位(m)',
                },
                {
                  type: 'value',
                  name: '流量(m³/s)',
                }
              ],
              series: [
                {
                  name:'水位',
                  data: data.map(function (item) {
                    return item.Z;
                  }),
                  type: 'line',
                  smooth: true
                },
                {
                  name:'流量',
                  yAxisIndex:1,
                  data: data.map(function (item) {
                    return item.Q;
                  }),
                  type: 'line',
                  smooth: true
                }
              ]
            };
            // 绘制图表
            electric_prod_chart.setOption(electric_prod_chart_option);
          }
        }
        else{//没有数据时
          let electric_prod_chart = $('#electric_prod_char_river');
          if(electric_prod_chart[0]){
            let electric_prod_chart =  echarts.init(document.getElementById('electric_prod_char_river'));
            // 设置option
            let electric_prod_chart_option = {
              title: {
                text: this.optionData.STNM+'水位过程线',
                left: 'center'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: "cross",
                  lineStyle: {
                    color: "#48b",
                    width: 2,
                    type: "solid"
                  },
                  crossStyle: {
                    color: "#1e90ff",
                    width: 1,
                    type: "dashed"
                  },
                  shadowStyle: {
                    color: "rgba(150,150,150,0.3)",
                    width: "auto",
                    type: "default"
                  }
                },
              },
              legend: {
                data:['水位','流量'],
                bottom:0
              },
              xAxis: {
                type: 'category',
                data:[],
                boundaryGap: false,
                lineWidth: 2.5,
                splitLine: false,
                onZero: true,   //x轴的位置
                nameLocation: 'end',
                labelFormatter: null,
                position: 'bottom',
                show: true,
                gridIndex: 0
              },

              yAxis: [
                {
                  type: 'value',
                  name: '水量',
                },
                {
                  type: 'value',
                  name: '流量',
                }
              ],
              series: [
                {
                  name:'水位',
                  data:[],
                  type: 'line',
                  smooth: true
                },
                {
                  name:'流量',
                  yAxisIndex:1,
                  data:[],
                  type: 'line',
                  smooth: true
                }
              ]
            };
            // 绘制图表
            electric_prod_chart.setOption(electric_prod_chart_option);
          }
        }

      },
      //初始化历史同期对比
      initHistory(echartData){
        let data=echartData;
        if(data){//有数据时
          let electric_prod_chart1 = $('#electric_prod_char_river1');
          if(electric_prod_chart1[0]){
            let electric_prod_chart1 =  echarts.init(document.getElementById('electric_prod_char_river1'));
            let series=[],legendData=[];
            $.each(this.historyHeader,(v,item)=>{
              let obj={};
              if(item.data==="TM"){
                return
              }else{
                obj.name=item.label;
                obj.type='line';
                obj.data=data.map(function (items) {
                  return items[item.data];
                });
                obj.smooth=true;
                series.push(obj);
                legendData.push(item.label);
              }
            });
            // 设置option
            let electric_prod_chart_option = {
              title: {
                text: this.optionData.STNM+'历史同期对比'+this.radio,
                left: 'center'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: "cross",
                  lineStyle: {
                    color: "#48b",
                    width: 2,
                    type: "solid"
                  },
                  crossStyle: {
                    color: "#1e90ff",
                    width: 1,
                    type: "dashed"
                  },
                  shadowStyle: {
                    color: "rgba(150,150,150,0.3)",
                    width: "auto",
                    type: "default"
                  }
                },
              },
              legend: {
                data:legendData,
                bottom:0
              },
              xAxis: {
                type: 'category',
                data:data.map(function (item) {
                  return item.TM;
                }),
                boundaryGap: false,
                lineWidth: 2.5,
                splitLine: false,
                onZero: true,   //x轴的位置
                nameLocation: 'end',
                labelFormatter: null,
                position: 'bottom',
                show: true,
                gridIndex: 0
              },
              yAxis: [
                {
                  type: 'value',
                  name: this.radio==="水位" ?'水位(m)':'流量(m)',
                },
              ],
              series: series
            };
            // 绘制图表
            electric_prod_chart1.setOption(electric_prod_chart_option);
        }}
        else{//没有数据时
          let electric_prod_chart = $('#electric_prod_char_river1');
          if(electric_prod_chart[0]){
            let electric_prod_chart =  echarts.init(document.getElementById('electric_prod_char_river1'));
            let series=[],legendData=[];
            $.each(this.historyHeader,(v,item)=>{
              let obj={};
              if(item.data==="TM"){
                return
              }else{
                obj.name=item.label;
                obj.type='line';
                obj.data=[];
                obj.smooth=true;
                series.push(obj);
                legendData.push(item.label);
              }
            });
            // 设置option
            let electric_prod_chart_option = {
              title: {
                text: this.optionData.STNM+'历史同期对比'+this.radio,
                left: 'center'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: "cross",
                  lineStyle: {
                    color: "#48b",
                    width: 2,
                    type: "solid"
                  },
                  crossStyle: {
                    color: "#1e90ff",
                    width: 1,
                    type: "dashed"
                  },
                  shadowStyle: {
                    color: "rgba(150,150,150,0.3)",
                    width: "auto",
                    type: "default"
                  }
                },
              },
              legend: {
                data:legendData,
                bottom:0
              },
              xAxis: {
                type: 'category',
                data:[],
                boundaryGap: false,
                lineWidth: 2.5,
                splitLine: false,
                onZero: true,   //x轴的位置
                nameLocation: 'end',
                labelFormatter: null,
                position: 'bottom',
                show: true,
                gridIndex: 0
              },

              yAxis: [
                {
                  type: 'value',
                  name: this.radio==="水位" ?'水位(m)':'流量(m)',
                },
              ],
              series: series
            };
            // 绘制图表
            electric_prod_chart.setOption(electric_prod_chart_option);
          }
        }
      },
      toggleTable(){
       this.isCollapsed=!this.isCollapsed
      },

      /**
       * 销毁图表实例下次进入重新渲染
       */
      dispose(){
        let electric_prod_chart = $('#electric_prod_char_river');
        let electric_prod_chart1 = $('#electric_prod_char_river1');
        if(electric_prod_chart[0]){
          let electric_prod_chart =  echarts.init(document.getElementById('electric_prod_char_river'));
          electric_prod_chart.dispose()
        }
        if(electric_prod_chart1[0]){
          let electric_prod_chart1 =  echarts.init(document.getElementById('electric_prod_char_river1'));
          electric_prod_chart1.dispose()
        }
      },

      primary(){
        this.dispose();
        this.getRealtime();
      },
      historyPrimary(){
        this.historyHeader=[];
        this.tableData1=[];
        this.dispose();
        this.getHistory();
      },
      childClose(){
        this.tableData=[];
        this.historyHeader=[];
        this.isCollapsed=true;
        this.firstTime=[new Date("2018-12-22 08:00:00"), new Date("2018-12-22 20:00:00")];
        this.secondTime=[new Date("2018-12-22 08:00:00"), new Date("2018-12-22 20:00:00")];
        this.dispose();
        this.$emit('update:riverVisible',false);
      }
    },
    watch:{
      /**
       * 是否显示弹窗
       */
      riverVisible(){
        this.visible=this.riverVisible;
        if(this.visible){
          this.activeName="first";
          this.getBasic();
        }
      }
    },
    mounted(){
      this.$nextTick(()=>{
        let currYear = new Date().getFullYear();
        for (let i = 0; i < 30; i++) {
          this.yearOption.push({label: currYear - i, value: '' + (currYear - i)});
        }
      });
    },
  }
</script>

<style  scoped>


</style>
<style>
  #riverDliog .search{
    padding:10px 20px;
  }
  #riverDliog .collseBtn{
    width: 20px;
    height: 55px;
    background-color: #3DAAEF;
    position: absolute;
    color: white;
    line-height: 26px;
    top: 40%;
    /* transform: translate(0,-50%); */
    right:100%;
    cursor: pointer;
    text-align: center;
    font-size: 12px;
  }
  #riverDliog .echartTable{
    height: 400px;
    z-index: 22;
    width: 0;
    position: absolute;
    top: 0;
    right: 0;
    transition: all .5s ease-in-out;
  }
  #riverDliog .collosed{
    width: calc(100% - 20px);
    transform:translate(0,0);
  }
  #riverDliog .el-radio__label{
    padding-left: 0;
  }
  #riverDliog .el-radio+.el-radio{
    margin-left: 0;
  }

</style>
