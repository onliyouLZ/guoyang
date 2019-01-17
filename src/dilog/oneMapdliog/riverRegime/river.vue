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
          <div id="electric_prod_char" :style="{width:width,height:height}" ></div>
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
            <el-radio v-model="radio" label="1">水位</el-radio>
            <el-radio v-model="radio" label="2">流量</el-radio>
            <el-button type="primary" style="margin-left: 10px;">查询</el-button>
          </div>
          <!--<div v-if="echartShow" id="electric_prod_char1" style="width:100%;height:350px;" ></div>-->
          <!--<div v-if="tableShow">-->
            <!--<el-scrollbar-->
              <!--style="height: 100%"-->
              <!--tag="table"-->
              <!--viewStyle="width:100%">-->
              <!--<div style="max-height:350px;width: 100%">-->
                <!--<el-table-->
                  <!--:data="tableData"-->
                  <!--border-->
                  <!--size="mini"-->
                  <!--style="width:100%"-->
                  <!--height="350"-->
                  <!--cell-class-name="table-body"-->
                  <!--header-cell-class-name="table-header">-->
                  <!--<el-table-column-->
                    <!--type="index"-->
                    <!--width="50"-->
                    <!--label="序号">-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                    <!--prop="date"-->
                    <!--align="center"-->
                    <!--label="时间">-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                    <!--prop="value"-->
                    <!--align="center"-->
                    <!--label="水位">-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                    <!--prop="address"-->
                    <!--align="center"-->
                    <!--label="总过闸流量(m³/s)">-->
                  <!--</el-table-column>-->
                <!--</el-table>-->
              <!--</div>-->
            <!--</el-scrollbar>-->
          <!--</div>-->
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
        visible:this.dialogVisible,
        activeName: 'first',
        collseTitle:"显示",
        isCollapsed:true,
        tableData: [],
        radio:"1",
        width:"100%",
        height:"350px",
        // firstTime: [new Date().datePro('{%d-1}'), new Date()],
        firstTime: [new Date("2018-12-22 08:00:00"), new Date("2018-12-22 20:00:00")],
        secondTime:[new Date("2018-12-22 08:00:00"), new Date("2018-12-22 20:00:00")],
        oldYear:["2018"],
        yearOption: [
          {
            value: '2018',
            label: '2018'
          },
          {
            value: '2017',
            label: '2017'
          },
          {
            value: '2016',
            label: '2016'
          },
          {
            value: '2015',
            label: '2015'
          },
          {
            value: '2014',
            label: '2014'
          },
          {
            value: '2013',
            label: '2013'
          },
          {
            value: '2012',
            label: '2012'
          },
          {
            value: '2011',
            label: '2011'
          },],
        optionData:"",
        echartData:[]
      }
    },
    props:{
      dialogVisible:{
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
        }else if(this.activeName==="second"){
          this.$nextTick(()=>{
            this.getRealtime()
          });
        }else if(this.activeName==="third"){
          this.$nextTick(()=>{

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
              _this.echartData=data;
              _this.initWater(data);
            }
          })
      },
      //获取历史同时期对比
      getHistory(){
        let parms={
          "stcdList":[this.dialogData.STCD],
          "tmList":
            [
              {"bgtm":new Date(this.secondTime[0]).formatDate('yyyy-MM-dd HH:00'),"endtm":new Date(this.secondTime[1]).formatDate('yyyy-MM-dd HH:00')},
              // {"bgtm":new Date(),"endtm":"2018-12-31 15:00"},
              // {"bgtm":"2017-12-30 08:00","endtm":"2017-12-31 15:00"}
            ]
        };
        $.each(this.oldYear,(v,item)=>{
          let obj={
            bgtm:new Date(item).formatDate('yyyy-MM-dd HH:00'),endtm:new Date(item).formatDate('yyyy-MM-dd HH:00')
          }
          parms.tmList.push(obj);
        });
        console.log(parms);
        // this.$http.post(this.$url.baseUrl+"api/commonApi/sl323/v0.1/realtime/river/list-by-tms",parms)
        //   .then((res)=>{
        //     console.log(res);
        //   });
      },

      //初始化水位流量过程线图
      initWater(echartData){
        let data=echartData;
        if(data){//有数据时
          let electric_prod_chart = $('#electric_prod_char');
          if(electric_prod_chart[0]){
            let electric_prod_chart =  echarts.init(document.getElementById('electric_prod_char'));
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
        }else{//没有数据时
          let electric_prod_chart = $('#electric_prod_char');
          if(electric_prod_chart[0]){
            let electric_prod_chart =  echarts.init(document.getElementById('electric_prod_char'));
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
      initHistory(){
        let electric_prod_chart1 =  echarts.init(document.getElementById('electric_prod_char1'));
        // 设置option
        let electric_prod_chart_option1 = {
          xAxis: {
            type: 'category',
            data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [25, 40, 80, 20, 40, 66, 55],
            type: 'line',
            smooth: true
          }]
        };
        // 绘制图表
        electric_prod_chart1.setOption(electric_prod_chart_option1);
      },
      toggleTable(){
       this.isCollapsed=!this.isCollapsed
      },

      /**
       * 销毁图表实例下次进入重新渲染
       */
      dispose(){
        let electric_prod_chart = $('#electric_prod_char');
        let electric_prod_chart1 = $('#electric_prod_char1');
        if(electric_prod_chart[0]){
          let electric_prod_chart =  echarts.init(document.getElementById('electric_prod_char'));
          electric_prod_chart.dispose()
        }
        if(electric_prod_chart1[0]){
          let electric_prod_chart1 =  echarts.init(document.getElementById('electric_prod_char1'));
          electric_prod_chart1.dispose()
        }
      },

      primary(){
        // this.dispose();
        this.getRealtime();
      },
      childClose(){
        this.tableData=[];
        this.echartData=[];
        this.isCollapsed=true;
        this.firstTime=[new Date("2018-12-22 08:00:00"), new Date("2018-12-22 20:00:00")];
        this.dispose();
        this.$emit('update:dialogVisible',false);
      }
    },
    watch:{
      /**
       * 是否显示弹窗
       */
      dialogVisible(){
        this.visible=this.dialogVisible;
        if(this.visible){
          this.activeName="first";
          this.getBasic();
        }
      }
    },
    mounted(){
      this.$nextTick(()=>{
      });
    },
  }
</script>

<style  scoped>
  .search{
    padding:10px 20px;
  }

</style>
<style>
  /*#riverDliog .lake-table .el-scrollbar .is-horizontal{*/
    /*display: none!important;*/
  /*}*/
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
