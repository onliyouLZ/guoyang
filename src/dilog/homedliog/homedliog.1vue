<template>
  <el-dialog
    :title="swiperData.name"
    :show="show"
    :visible.sync="visible"
    width="50%"
    @close="childClose">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="first" lazy>
        <span slot="label"><i class="fa fa-calendar-o"></i>&nbsp;水位过程线</span>
          <div>
            <el-date-picker
              v-model="firstTime"
              type="datetimerange"
              align="left"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :default-time="['08:00:00', '08:00:00']"
              style="float: left;">
            </el-date-picker>
            <el-button type="primary" style="margin-left: 10px;">查询</el-button>
            <el-radio-group
              v-model="radio3"
              style="float: right;margin:10px 20px"
              :change="change(radio3)">
              <el-radio-button label="图"></el-radio-button>
              <el-radio-button label="表"></el-radio-button>
            </el-radio-group>
        </div>
          <div v-if="echartShow" id="electric_prod_char" style="width:100%;height:350px;" ></div>
          <div v-if="tableShow">
            <el-table
              :data="tableData"
              border
              size="mini"
              height="350"
              cell-class-name="table-body"
              header-cell-class-name="table-header">
              <el-table-column
                prop="date"
                label="时间">
              </el-table-column>
              <el-table-column
                prop="value"
                label="水位">
              </el-table-column>
              <el-table-column
                prop="address"
                label="总过闸流量(m³/s)">
              </el-table-column>
            </el-table>
          </div>
      </el-tab-pane>
      <el-tab-pane name="second" lazy>
        <span slot="label"><i class="fa fa-calendar-o"></i>&nbsp;基本信息</span>
        <table class="dilogTable" cellspacing="0">
          <tr>
            <td class="u-list-title">测站编码</td>
            <td ><span>61716010</span></td>
            <td class="u-list-title">测站方位</td>
            <td ><span>0</span></td>
            <td class="u-list-title">测站站址</td>
            <td ><span>武汉市江夏区金口街金水闸</span></td>
          </tr>
          <tr>
            <td class="u-list-title">测站名称</td>
            <td><span>{{swiperData.name}}</span></td>
            <td class="u-list-title">测站类型</td>
            <td><span>堰闸水文站</span></td>
            <td class="u-list-title">报汛等级</td>
            <td><span>省级一般报汛站</span></td>
          </tr>
          <tr>
            <td class="u-list-title">测站岸别</td>
            <td><span></span></td>
            <td class="u-list-title">始报年月</td>
            <td><span>192601</span></td>
            <td class="u-list-title">建站年月</td>
            <td><span>192601</span></td>
          </tr>
          <tr>
            <td class="u-list-title">闸上设防水位(m)</td>
            <td><span>{{swiperData.value}}</span></td>
            <td class="u-list-title">闸上保证水位(m)</td>
            <td><span>{{swiperData.value}}</span></td>
            <td class="u-list-title">闸上警戒水位(m)</td>
            <td><span>{{swiperData.value}}</span></td>
          </tr>
          <tr>
            <td class="u-list-title">闸下设防水位(m)</td>
            <td><span>{{swiperData.value}}</span></td>
            <td class="u-list-title">闸下保证水位(m)</td>
            <td><span>{{swiperData.value}}</span></td>
            <td class="u-list-title">闸下警戒水位(m)</td>
            <td><span>{{swiperData.value}}</span></td>
          </tr>
          <tr>
            <td class="u-list-title">基面名称</td>
            <td><span>冻结基面</span></td>
            <td class="u-list-title">基面高程(m)</td>
            <td><span>-1.933</span></td>
            <td class="u-list-title">基面修正值</td>
            <td><span></span></td>
          </tr>
          <tr>
            <td class="u-list-title">流域名称</td>
            <td><span>长江</span></td>
            <td class="u-list-title">水系名称</td>
            <td><span>长江中游下段南岸</span></td>
            <td class="u-list-title">备注</td>
            <td><span>中小河流</span></td>
          </tr>
          <tr>
            <td class="u-list-title">河流名称</td>
            <td><span>金水</span></td>
            <td class="u-list-title">集水面积(㎡)</td>
            <td><span>2673</span></td>
            <td class="u-list-title">至河口距离(m)</td>
            <td><span></span></td>
          </tr>
          <tr>
            <td class="u-list-title">行政区划码</td>
            <td><span>420115</span></td>
            <td class="u-list-title">拼音码</td>
            <td><span></span></td>
            <td class="u-list-title">启用标志</td>
            <td><span>启用</span></td>
          </tr>
          <tr>
            <td class="u-list-title">信息管理单位</td>
            <td><span>武汉水文</span></td>
            <td class="u-list-title">隶属行业单位</td>
            <td><span></span></td>
            <td class="u-list-title">交换管理单位</td>
            <td><span>湖北水文</span></td>
          </tr>
          <tr>
            <td class="u-list-title">经度</td>
            <td><span>114.133333</span></td>
            <td class="u-list-title">纬度</td>
            <td><span >30.3</span></td>
            <td class="u-list-title">备注</td>
            <td><span></span></td>
          </tr>
        </table>
      </el-tab-pane>
      <el-tab-pane  name="third" lazy>
        <span slot="label"><i class="fa fa-calendar-o"></i>&nbsp;历史同时期对比</span>
        <div>
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
            style="margin-left: 20px;"
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
            style="float: right;margin:10px 20px"
            :change="change(radio3)">
            <el-radio-button label="图"></el-radio-button>
            <el-radio-button label="表"></el-radio-button>
          </el-radio-group>
        </div>
        <div v-if="echartShow" id="electric_prod_char1" style="width:100%;height:350px;" ></div>
        <div v-if="tableShow">
          <el-table
            :data="tableData"
            border
            size="mini"
            height="350"
            cell-class-name="table-body"
            header-cell-class-name="table-header">
            <el-table-column
              prop="date"
              label="时间">
            </el-table-column>
            <el-table-column
              prop="value"
              label="水位">
            </el-table-column>
            <el-table-column
              prop="address"
              label="总过闸流量(m³/s)">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button @click="childClose">取 消</el-button>
      <el-button type="primary" @click="childClose">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "homedligo",
        data(){
          return{
            visible:this.show,
            activeName: 'first',
            tableData: [
              {
              date: '2016-05-02',
              value: '18',
              address: '22'
            }, {
              date: '2016-05-04',
                value: '19',
              address: '22'
            }, {
              date: '2016-05-01',
              value: '25',
              address: '22'
            }, {
              date: '2016-05-03',
                value: '21',
              address: '22'
            }, {
              date: '2016-05-03',
                value: '23',
              address: '22'
            }, {
              date: '2016-05-03',
                value: '22',
              address: '22'
            }, {
                date: '2016-05-03',
                value: '28',
                address: '22'
              }, {
                date: '2016-05-03',
                value: '14',
                address: '22'
              }, {
                date: '2016-05-03',
                value: '14',
                address: '22'
              }, {
                date: '2016-05-03',
                value: '14',
                address: '22'
              }, {
                date: '2016-05-03',
                value: '14',
                address: '22'
              }
            ],
            tableShow:false,
            echartShow:true,
            radio3:"图",
            echartWidth:"",
            echartHeigth:"",
            firstTime:"",
            secondTime:"",
            value11:"",
            options: [{
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
            }]
          }
        },
        props:{
          show:{
            type:Boolean,
            default:false
          },
          swiperData:{
            type:Object,
            default:{}
          }
        },
        created(){

        },
        methods:{
          /**
           * 关闭弹窗事件
           */
          childClose(){
            this.visible=false;
            this.tableShow=false;
            this.activeName="first";
            this.radio3="图";
            this.$emit('update:show',false);
          },
          /**
           * tab切换事件
           */
          handleClick(tab, event){
              if(tab.index==="0"){
                this.radio3="图";
                this.dispose()
              }else if(tab.index==="2"){
                this.radio3="图";
                this.dispose()
              }
          },
          /**
           * 初始化图表需要异步执行
           */
          init(){
            let electric_prod_chart = $('#electric_prod_char');
            let electric_prod_chart1 = $('#electric_prod_char1');
            if(electric_prod_chart[0]){
              let electric_prod_chart =  echarts.init(document.getElementById('electric_prod_char'));
              // 设置option
              let electric_prod_chart_option = {
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
              electric_prod_chart.setOption(electric_prod_chart_option);
              this.echartWidth=electric_prod_chart.getWidth();
              this.echartHeigth=electric_prod_chart.getHeight();
            }
            if(electric_prod_chart1[0]){
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
              setTimeout(()=>{
                this.init();
              },0);
            }else if(value==='表'){
              this.echartShow=false;
              this.tableShow=true
            }
          }
        },
        mounted(){


        },
        watch:{
          /**
           * 是否显示弹窗
           */
          show(){
            this.visible=this.show;
            if(this.show===false){
                this.dispose()
            }
          }
        }
    }
</script>

<style lang="less">
  .el-dialog__wrapper{
    .el-dialog{
      width: 60%!important;
      position: absolute;
      margin-top: 0!important;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      border-radius: 5px;
      .el-dialog__header{
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        background-color: #00A0E9;
        padding: 5px 10px;
        .el-dialog__headerbtn{
          top: 10px;
          .el-dialog__close{
            color: #404040;
          }
          .el-dialog__close:hover{
            color: #ccc;
            background: transparent;
          }
        }
      };
      .el-dialog__body{
          padding-top: 10px;
        .el-tabs__nav-scroll{
          /*padding:0 20px;*/
          background-color: #C8E7FC;
        }
      }
    }

    .el-tabs__content{
      min-height: 400px;
    }
    .el-table--border{
      border: 2px solid #3fadf2;
    }
    /*.el-table__body-wrapper::-webkit-scrollbar {*/
      /*display: none;*/
    /*}*/
    .table-header{
      font-size: 15px;
      color: #5e9dce;
      text-align: center!important;
      border-color: #ddd!important;
      background: linear-gradient(to top, #dbdada 0%,#E5E5E5 10%, #efeeee 100%,#ffffff)
    }
    .table-body{
      text-align: center!important;
      border-color: #ddd!important;
    }
    .el-table__row--striped{
      background-color: #3fadf2!important;
    }
    .el-table--border::after{
      width: 0!important;
    }
    .el-table_1_column_3 {
      border-right: none;
    }
    .el-table_2_column_6 {
      border-right: none;
    }
    td{
      background: none;
    }
    .el-table tr:hover{
      background: #E3F2FB;
    }
    .el-input__inner{
      width: 65%;

    }
    .el-input__suffix{
      right: 80px;
    }
  }


</style>
