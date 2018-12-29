<template>
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
        <el-radio-group
          v-model="radio3"
          style="float: right"
          :change="change(radio3)">
          <el-radio-button label="图"></el-radio-button>
          <el-radio-button label="表"></el-radio-button>
        </el-radio-group>
      </div>
      <div v-if="echartShow" id="electric_prod_char" style="width:100%;height:350px;" ></div>
      <div v-if="tableShow">
        <div class="lake-table">
          <el-scrollbar
            style="height: 100%"
            tag="table"
            viewStyle="width:100%">
            <div style="max-height:350px;width: 100%">
              <el-table
                :data="tableData"
                border
                size="mini"
                style="width:100%"
                height="350"
                cell-class-name="table-body"
                header-cell-class-name="table-header">
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
            </div>
          </el-scrollbar>
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
          v-model="value11"
          multiple
          collapse-tags
          style="margin-left: 20px;width: 150px"
          placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" style="margin-left: 10px;">查询</el-button>
        <el-radio-group
          v-model="radio3"
          style="float: right;"
          :change="change(radio3)">
          <el-radio-button label="图"></el-radio-button>
          <el-radio-button label="表"></el-radio-button>
        </el-radio-group>
      </div>
      <div v-if="echartShow" id="electric_prod_char1" style="width:100%;height:350px;" ></div>
      <div v-if="tableShow">
        <el-scrollbar
          style="height: 100%"
          tag="table"
          viewStyle="width:100%">
          <div style="max-height:350px;width: 100%">
            <el-table
              :data="tableData"
              border
              size="mini"
              style="width:100%"
              height="350"
              cell-class-name="table-body"
              header-cell-class-name="table-header">
              <el-table-column
                prop="date"
                align="center"
                label="时间">
              </el-table-column>
              <el-table-column
                prop="value"
                align="center"
                label="水位">
              </el-table-column>
              <el-table-column
                prop="address"
                align="center"
                label="总过闸流量(m³/s)">
              </el-table-column>
            </el-table>
          </div>
        </el-scrollbar>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import echarts from 'echarts'
  import {convertObjectToArray} from '../../../utils/utils'
  export default {
    name: "river",
    data(){
      return{
        activeName: 'first',
        tableData: [ ],
        tableShow:false,
        echartShow:true,
        radio3:"图",
        echartWidth:"",
        echartHeigth:"",
        firstTime: [new Date("2018-12-22 08:00:00"), new Date("2018-12-22 20:00:00")],
        secondTime:[new Date("2018-12-22 08:00:00"), new Date("2018-12-22 20:00:00")],
        value11:"",
        options: [
          {
          value: '选项1',
          label: '2018'
        }, {
          value: '选项2',
          label: '2019'
        }, {
          value: '选项3',
          label: '2020'
        }, {
          value: '选项4',
          label: '2021'
        }, {
          value: '选项5',
          label: '2022'
        }],
        optionData:""
      }
    },
    props:{
      dialogDatas:{
        type:Object,
        default:{}
      }
    },
    methods:{
      childClose(){
        // this.tableShow=false;
        // this.activeName="first";
        // this.radio3="图";
        // this.$emit('update:lakesShow',false);
      },
      /**
       * tab切换事件
       */
      handleClick(tab, event){
        if(tab.index==="0"){
          this.radio3="图";
        }else if(tab.index==="1"){
          this.radio3="图";
          this.$nextTick(()=>{
            this.initWater();
          });
        }else if(tab.index==="2"){
          this.radio3="图";
          this.$nextTick(()=>{
            this.initHistory();
          });
        }
      },
      /**
       * 初始化图表需要异步执行
       */
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
      search(){
        let parms={
          bgtm:this.firstTime[0].formatDate('yyyy-MM-dd HH:00'),
          endtm:this.firstTime[1].formatDate('yyyy-MM-dd HH:00')
        };
        this.$http.get(this.$url.baseUrl+"api/sl323/realtime/river/list/?bgtm="+parms.bgtm+'&endtm='+parms.endtm+'&STCD='+this.dialogDatas.STCD)
          .then((res)=>{
            let data=res.data.result;
            this.tableData=data;
            $.each(data,(v,item)=>{
              item.TM=new Date(item.TM).formatDate('yyyy-MM-dd HH:00');
            });
            this.initWater(data);
          });
      },
      //获取水位流量过程线
      initWater(data){
        console.log(data);
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
      /**
       * 图表切换
       * @param value
       */
      change(value){
        if(value==="图"){
          this.echartShow=true;
          this.tableShow=false;
          this.$nextTick(()=>{
            this.dispose();
            this.initWater();
          })
        }else if(value==='表'){
          this.echartShow=false;
          this.tableShow=true
        }
      },
      //获取基本信息
      getStcd(){
        this.$http.get(this.$url.baseUrl+"api/sl323/basic/st/"+this.dialogDatas.STCD)
        // this.$http.get(this.$url.baseUrl+"api/commonApi/sl323/v0.1/basic/st/rvfcch/"+this.dialogDatas.STCD)
          .then((res)=>{
            let data=convertObjectToArray(res.data.result);
            $.each(data,(v,item)=>{
              if(item.STTP==="ZQ"){
                item.zl="河道水文站"
              }else if(item.STTP==="ZZ"){
                item.zl="河道水位站"
              }
            });
            this.optionData=data[0];
          });
      },

      primary(){
        this.search()
      }
    },
    watch:{
      dialogDatas(){
        this.getStcd();
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.getStcd();
        this.search();
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
  .lake-table .el-scrollbar .is-horizontal{
    display: none!important;
  }
</style>
