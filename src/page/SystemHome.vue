<template>
  <el-row>
    <el-col :span="24">
      <Breadcrumb :menu="menuArray"></Breadcrumb>
    </el-col>
    <div class="container">
      <el-row class="panel_tip mgb10">
        <el-col :span="3" style="text-align: center">
         <i class="fa fa-user-o"></i>&nbsp;&nbsp;<span style="font-weight: 700">今日值班:</span>
        </el-col>
        <el-col :span="21">
          <span>
            <template >
              <template v-for="item in dutyData">
                  <span style="font-weight: 700">{{item.dutyType}}</span>：{{item.people}}
              </template>
            </template>
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="mgb10">
        <el-col :span="24">
          <!--<el-card shadow="hover" class="" :body-style="{padding:'5px'}">-->
            <el-col :span="8" style="padding: 5px">
              <el-card class="box-card">
                <div class="center-main-title">
                  <div class="title-stick">
                  </div>
                  <div class="title-name">
                    <i class="fa fa-bar-chart"></i>&nbsp;&nbsp;河道水位报警统计
                  </div>
                </div>
                <div id="electric_prod_chart" style="width: 100%;height:250px;" v-on-echart-resize></div>
              </el-card>
            </el-col >
            <el-col :span="16" style="padding: 5px">
              <el-card class="box-card">
                <div class="center-main-title">
                  <div class="title-stick bg-blue">
                  </div>
                  <div class="title-name mgl10">
                    河道水位实时数据
                  </div>
                </div>
                <div>
                  <el-table
                    :data="tableData"
                    border
                    max-height="250"
                    size="mini"
                    cell-class-name="table-body"
                    header-cell-class-name="table-header">
                    <el-table-column
                      prop="STNM"
                      min-width="150"
                      align="center"
                      fixed
                      label="站点名称">
                    </el-table-column>
                    <el-table-column
                      prop="TM"
                      min-width="150"
                      align="center"
                      label="检测时间">
                    </el-table-column>
                    <el-table-column
                      prop="Z"
                      min-width="150"
                      align="center"
                      label="实时水位(m)">
                    </el-table-column>
                    <el-table-column
                      prop="WRZ"
                      min-width="150"
                      align="center"
                      label="警戒水位(万m³)">
                    </el-table-column>
                    <el-table-column
                      prop="GRZ"
                      min-width="150"
                      align="center"
                      label="保证水位(万m³)">
                    </el-table-column>
                    <el-table-column
                      prop="OWRZ"
                      min-width="150"
                      align="center"
                      label="超警戒水位(万m³)">
                    </el-table-column>
                    <el-table-column
                      prop="OGRZ"
                      min-width="150"
                      align="center"
                      label="超保证水位(万m³)">
                    </el-table-column>
                  </el-table>
                </div>
              </el-card>

            </el-col>
          <!--</el-card>-->
        </el-col>
        <el-col :span="24">
          <!--<el-card shadow="hover" class="" :body-style="{padding:'5px'}">-->
          <el-col :span="8" style="padding: 5px">
            <el-card class="box-card">
              <div class="center-main-title">
                <div class="title-stick">
                </div>
                <div class="title-name">
                  <i class="fa fa-bar-chart"></i>&nbsp;&nbsp;墒情报警统计
                </div>
              </div>
              <div id="electric_prod_chart1" style="width: 100%;height:250px;" v-on-echart-resize></div>
            </el-card>
          </el-col >
          <el-col :span="16" style="padding: 5px">
            <el-card class="box-card">
              <div class="center-main-title">
                <div class="title-stick bg-blue">
                </div>
                <div class="title-name mgl10">
                  土壤墒情实时数据
                </div>
              </div>
              <div>
                <el-table
              :data="tableData1"
              border
              size="mini"
              height="250"
              cell-class-name="table-body"
              header-cell-class-name="table-header">
              <el-table-column
                prop="STNM"
                min-width="150"
                align="center"
                fixed
                label="站点名称">
              </el-table-column>
              <el-table-column
                prop="TM"
                min-width="150"
                align="center"
                label="检测时间">
              </el-table-column>
              <el-table-column
                prop="ADNM"
                min-width="150"
                align="center"
                label="行政区划(m)">
              </el-table-column>
              <el-table-column
                prop="SLM10"
                min-width="150"
                align="center"
                label="10cm">
              </el-table-column>
              <el-table-column
                prop="SLM20"
                min-width="150"
                align="center"
                label="20cm">
              </el-table-column>
              <el-table-column
                prop="SLM40"
                min-width="150"
                align="center"
                label="40cm">
              </el-table-column>
              <el-table-column
                prop="VSLM"
                min-width="150"
                align="center"
                label="垂直平均">
              </el-table-column>
              <el-table-column
                prop="RSM"
                min-width="150"
                align="center"
                label="土壤相对湿度">
              </el-table-column>
              <el-table-column
                prop="ghdj"
                min-width="150"
                align="center"
                label="干旱等级">
              </el-table-column>
            </el-table>
              </div>

            </el-card>

          </el-col>
          <!--</el-card>-->
        </el-col>


        <!--轮播图-->
        <el-col :span="24">
          <!--<el-card shadow="hover" class="" :body-style="{padding:'5px'}">-->
          <el-col :span="12" style="padding: 5px">
            <el-card class="box-card">
              <div class="center-main-title">
                <div class="title-stick">
                </div>
                <div class="title-name">
                  <i class="fa fa-bar-chart"></i>&nbsp;&nbsp;年降雨分布
                </div>
              </div>
              <div style="min-height: 250px" class="ldhb" @click="openDliog(2)"></div>
            </el-card>
          </el-col >
          <el-col :span="12" style="padding: 5px">
            <el-card class="box-card">
              <div class="center-main-title">
                <div class="title-stick bg-blue">
                </div>
                <div class="title-name mgl10">
                  无雨日
                </div>
              </div>
              <div style="min-height: 250px" class="wxyt" @click="openDliog(1)"></div>
            </el-card>
          </el-col>
          <!--</el-card>-->
        </el-col>
        <el-col :span="24">
          <!--<el-card shadow="hover" class="" :body-style="{padding:'5px'}">-->
          <el-col :span="12" style="padding: 5px">
            <el-card class="box-card">
              <div class="center-main-title">
                <div class="title-stick">
                </div>
                <div class="title-name">
                  <i class="fa fa-bar-chart"></i>&nbsp;&nbsp;雷达回波
                </div>
              </div>
              <div style="min-height: 250px" class="ldhb" @click="openDliog(2)"></div>
            </el-card>
          </el-col >
          <el-col :span="12" style="padding: 5px">
            <el-card class="box-card">
              <div class="center-main-title">
                <div class="title-stick bg-blue">
                </div>
                <div class="title-name mgl10">
                  卫星云图
                </div>
              </div>
              <div style="min-height: 250px" class="wxyt" @click="openDliog(1)"></div>
            </el-card>
          </el-col>
          <!--</el-card>-->
        </el-col>
      </el-row>
    </div>
    <home-Dliog :swiperData="swiperData" :show.sync="show" ref="child"></home-Dliog>
    <swiper-dliog :swiperImage="swiperImage" :swiperShow.sync="swiperShow" ref="child"></swiper-dliog>
  </el-row>
</template>

<script>
    import Breadcrumb from '../components/Breadcrumb'
    import homeDliog  from '../dilog/homedliog/homedliog'
    import swiperDliog  from '../dilog/homedliog/swiperDliog'
    import echarts from 'echarts'

    // import {baseUrl,fileServer} from  '../utils/utils'
    import {convertObjectToArray} from '../utils/utils'
    export default {
        name: "SystemHome",
        components:{
          Breadcrumb:Breadcrumb,
          homeDliog:homeDliog,
          swiperDliog:swiperDliog,
        },
        data(){
            return{
              menuArray:[
                {name:"首页",path:""},
                {name:"首页",path:"/SystemHome"},
              ],
              tableData: [
                  {STNM:"五道沟闸",TM:"2018-10-11 11:11:11",RZ:"5.23",gksw:"0.5",sfsw:"25",jjsw:"27.3",bzsw:"29.7",csfsw:"-19.77",cjjsw:"-22.07",cbzsw:"24.47"},
                  {STNM:"朱楼闸",TM:"2018-10-11 11:11:11",RZ:"5.23",gksw:"0.5",sfsw:"25",jjsw:"27.3",bzsw:"29.7",csfsw:"-19.77",cjjsw:"-22.07",cbzsw:"24.47"},
                  {STNM:"燕小庙闸",TM:"2018-10-11 11:11:11",RZ:"5.23",gksw:"0.5",sfsw:"25",jjsw:"27.3",bzsw:"29.7",csfsw:"-19.77",cjjsw:"-22.07",cbzsw:"24.47"},
                  {STNM:"包河闸",TM:"2018-10-11 11:11:11",RZ:"5.23",gksw:"0.5",sfsw:"25",jjsw:"27.3",bzsw:"29.7",csfsw:"-19.77",cjjsw:"-22.07",cbzsw:"24.47"},
                  {STNM:"武家河闸",TM:"2018-10-11 11:11:11",RZ:"5.23",gksw:"0.5",sfsw:"25",jjsw:"27.3",bzsw:"29.7",csfsw:"-19.77",cjjsw:"-22.07",cbzsw:"24.47"},
                  {STNM:"武家河闸",TM:"2018-10-11 11:11:11",RZ:"5.23",gksw:"0.5",sfsw:"25",jjsw:"27.3",bzsw:"29.7",csfsw:"-19.77",cjjsw:"-22.07",cbzsw:"24.47"},
                  {STNM:"武家河闸",TM:"2018-10-11 11:11:11",RZ:"5.23",gksw:"0.5",sfsw:"25",jjsw:"27.3",bzsw:"29.7",csfsw:"-19.77",cjjsw:"-22.07",cbzsw:"24.47"},
              ],
              tableData1:[
                  {STNM:"西阳镇墒情站",TM:"2018-10-11 11:11:11",xzqh:"西阳镇",number1:"55%",number2:"63%",number3:"75%",czpj:"63%",trxdsd:"65%",ghdj:"无干旱"},
                  {STNM:"涡南镇墒情站",TM:"2018-10-11 11:11:11",xzqh:"西阳镇",number1:"55%",number2:"63%",number3:"75%",czpj:"63%",trxdsd:"65%",ghdj:"无干旱"},
                  {STNM:"楚店镇墒情站",TM:"2018-10-11 11:11:11",xzqh:"西阳镇",number1:"55%",number2:"63%",number3:"75%",czpj:"63%",trxdsd:"65%",ghdj:"无干旱"},
                  {STNM:"高公镇墒情站",TM:"2018-10-11 11:11:11",xzqh:"西阳镇",number1:"55%",number2:"63%",number3:"75%",czpj:"63%",trxdsd:"65%",ghdj:"无干旱"},
                  {STNM:"高炉镇墒情站",TM:"2018-10-11 11:11:11",xzqh:"西阳镇",number1:"55%",number2:"63%",number3:"75%",czpj:"63%",trxdsd:"65%",ghdj:"无干旱"},
                  {STNM:"高炉镇墒情站",TM:"2018-10-11 11:11:11",xzqh:"西阳镇",number1:"55%",number2:"63%",number3:"75%",czpj:"63%",trxdsd:"65%",ghdj:"无干旱"},
                  {STNM:"高炉镇墒情站",TM:"2018-10-11 11:11:11",xzqh:"西阳镇",number1:"55%",number2:"63%",number3:"75%",czpj:"63%",trxdsd:"65%",ghdj:"无干旱"},
              ],
              dutyData:[],
              show:false,
              swiperShow:false,
              swiperData:{},
              swiperImage:{},
              screenWidth: document.body.clientWidth,
              bgtm:new Date().formatDate('yyyy-MM-dd 08:00'),
              endtm:new Date().formatDate('yyyy-MM-dd HH:mm')
            }
        },
        created(){

          /**
           * 处理人员信息
           */
          this.$http.get('/api/duty').then((res)=>{
              const data=res.data.data;
              var arr=[];
              $.each(data.tm,function(v,item){
                let peoples="";
                var obj={
                  dutyType:"",
                  people:""
                };
                obj.dutyType=item.dutyTypeName;
                if(item.leaders.length>0){
                  $.each(item.leaders,function(s,people){
                    peoples+=people.realName+"("+people.userMobilePhone+")"+"，";
                  })
                }
                if(item.persons.length>0){
                  $.each(item.persons,function(s,people){
                    peoples+=people.realName+"("+people.userMobilePhone+")"+"，";
                    obj.people=peoples
                  })
                }
                peoples=peoples.substr(0, peoples.length - 1);
                obj.people=peoples;
                arr.push(obj)
              });
              this.dutyData=arr
            });
        },
        computed: {
        },
        methods: {
          /**
           * 初始化图表
           */
          init_charts() {
            let parms={
              "bgtm": "2018-12-22 08:00",
              "endtm": "2018-12-22 18:40",
              "ad": "341621000000000",
              "hnnm": "",
              "warntp": "",
              "keyword": ""
            };
            this.$http.post(this.$url.baseUrl+'api/sys/river/jx-real',parms)
              .then((res)=>{
                if(res.status===200){
                  let data=res.data.result;
                  let guarantee = [];//超保证
                  let guard = [];//超警戒
                  let notguard = [];//未超警
                  $.each(data,(v,item)=>{
                    if(item.TM){
                      item.TM=new Date(item.TM).formatDate('yyyy-MM-dd HH:mm:ss');
                      if(item.OGRZ>0){
                        guarantee.push(item);
                      }else if(item.OWRZ>0){
                        guard.push(item)
                      }else{
                        notguard.push(item)
                      };
                    }
                  });
                  // 饼状图初始化
                  let electric_prod_chart = echarts.init(document.getElementById('electric_prod_chart'));
                  // 设置option
                  let electric_prod_chart_option = {
                    tooltip: {
                      trigger: 'item',
                      formatter: "{b}"
                    },
                    legend: {
                      orient: 'vertical',
                      x: 'right',
                      top:'center',
                      data:[
                        '超保证水位'+guarantee.length+'个',
                        '超警戒水位'+guard.length+'个',
                        '未超警'+notguard.length+'个']
                    },
                    series: [
                      {
                        type: 'pie',
                        // radius: ['50%', '75%'],
                        avoidLabelOverlap: false,
                        center: ['35%', '50%'],
                        itemStyle: {
                          normal: {
                            //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                            color: function (params) {
                              //我这边就两个柱子，大体就两个柱子颜色渐变，所以数组只有两个值，多个颜色就多个值
                              var colorList = [
                                ['#FE7B18', '#FF561E', '#FF431E'],

                                ['#FF9B01', '#FF8A01', '#FF8000'],

                                // ['#FFF87C', '#FFED51', '#FFDD12'],

                                ['#13A2F2', '#0796EF', '#0192EF']

                              ];
                              return new echarts.graphic.LinearGradient(0, 1, 0, 0,
                                [
                                  {offset: 0, color: colorList[params.dataIndex][0]},
                                  {offset: 0.5, color: colorList[params.dataIndex][1]},
                                  {offset: 1, color: colorList[params.dataIndex][2]}
                                ]);
                            },
                            barBorderRadius: 5  //柱状角成椭圆形
                          }
                        },
                        label: {
                          normal: {
                            show: false,
                            position: 'center'
                          },
                          emphasis: {
                            show: true,
                            textStyle: {
                              fontSize: '14',
                              fontWeight: 'bold'
                            }
                          }
                        },
                        labelLine: {
                          normal: {
                            show: false
                          }
                        },
                        data:[
                          {value:guarantee.length, name:'超保证水位'+guarantee.length+'个'},
                          {value:guard.length, name:'超警戒水位'+guard.length+'个'},
                          {value:notguard.length, name:'未超警'+notguard.length+'个'},
                        ]
                      }
                    ]
                  };
                  // 绘制图表
                  electric_prod_chart.setOption(electric_prod_chart_option);
                  electric_prod_chart.on('click',(param)=>{
                    this.show = !this.show;
                    if (param.name.indexOf('超保证水位') !== -1) {
                      this.swiperData={
                        name:"河道站超保证统计",
                        data:guarantee
                      }
                    }
                    else if (param.name.indexOf('超警戒水位') !== -1) {
                      this.swiperData={
                        name:"河道站超警戒统计",
                        data:guard
                      }
                    }
                    else if (param.name.indexOf('未超警') !== -1) {
                      this.swiperData={
                        name:"河道站未超警统计",
                        data:notguard
                      }
                    }

                  });
                  this.tableData=data;
                }
              });


            // 饼状图初始化
            let electric_prod_chart1 = echarts.init(document.getElementById('electric_prod_chart1'));
            // 设置option
            let electric_prod_chart_option1 = {
              tooltip: {
                trigger: 'item',
                formatter: "{b}"
              },
              legend: {
                orient: 'vertical',
                x: 'right',
                top:'center',
                data:['特大干旱3个','重大干旱2个','中等干旱9个','轻微干旱2个','无干旱14个']
              },
              series: [
                {
                  type: 'pie',
                  // radius: ['50%', '75%'],
                  avoidLabelOverlap: false,
                  center: ['35%', '50%'],
                  itemStyle: {
                    normal: {
                      //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                      color: function (params) {
                        //我这边就两个柱子，大体就两个柱子颜色渐变，所以数组只有两个值，多个颜色就多个值
                        var colorList = [
                          ['#FE7B18', '#FF561E', '#FF431E'],

                          ['#FF9B01', '#FF8A01', '#FF8000'],

                          ['#FFF87C', '#FFED51', '#FFDD12'],

                          ['#13A2F2', '#0796BF', '#0192BF'],

                          ['#13A2F2', '#0796EF', '#0192EF']

                        ];
                        return new echarts.graphic.LinearGradient(0, 1, 0, 0,
                          [
                            {offset: 0, color: colorList[params.dataIndex][0]},
                            {offset: 0.5, color: colorList[params.dataIndex][1]},
                            {offset: 1, color: colorList[params.dataIndex][2]}
                          ]);
                      },
                      barBorderRadius: 5  //柱状角成椭圆形
                    }
                  },
                  label: {
                    normal: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '14',
                        fontWeight: 'bold'
                      }
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data:[
                    {value:3, name:'特大干旱3个'},
                    {value:2, name:'重大干旱2个'},
                    {value:9, name:'中等干旱9个'},
                    {value:2, name:'轻微干旱2个'},
                    {value:14, name:'无干旱14个'},
                  ]
                }
              ]
            };
            // 绘制图表
            electric_prod_chart1.setOption(electric_prod_chart_option1);
            electric_prod_chart1.on('click',()=>{
              this.show = !this.show;
              this.swiperData={
                name:"墒情站干旱统计",
              }
            });
          },

          /**
           * 请求图片
           * @param type 类型
           * */
          getImages(type){
            const parms={
              type:type
            };
            this.$http.post(this.$url.baseUrl+'api/weather-images/v0.1/ht/img/list',parms)
              .then((res)=>{
                if(res.status===200){
                  let data=res.data.result.urls;
                  const arr=[];
                  $.each(data[0],(v,item)=>{
                    arr.push({"src":this.$url.fileServer+'images/weather/'+item})
                  });
                  this.swiperImage={
                    name:type===1 ? "卫星云图":"雷达回波",
                    data:arr
                  };
                  this.swiperShow = !this.swiperShow
                }else{
                  console.error("请求资源失败！")
                }
              })
              .catch((error)=>{
                console.log(1);
                this.$notify.error({
                  title: '提示',
                  message: '请求图片失败，请联系管理员！',
                  duration: 0
                });
              })
          },
          /**
           * 获取河道实时数据
           * */
          getRiver(){

          },

          /**
           * 获取墒情实时数据
           * */
          getSoil(){
            this.$http.get(this.$url.baseUrl+'api/sys/drought/soil/latest?bgtm=2018-12-21 08:00&keyword=&ad=&type[]=1&type[]=2&type[]=3')
              .then((res)=>{
                  if(res.status===200){
                    let data=convertObjectToArray(res.data.result);
                    $.each(data,(v,item)=>{
                      item.TM=new Date(item.TM).formatDate('yyyy-MM-dd HH:mm:ss')
                    });
                    this.tableData1=data;
                  }
              })
          },
          /**
           * 打开弹窗
           */
          openDliog(type){
            const _this=this;
            if(type===2){
              _this.getImages(2);
            }else if(type===1){
              _this.getImages(1);
            }
          }
        },
        mounted(){
          const that=this;
          /**
           * 设置完屏幕分辨率后加载饼状图 以免饼状图渲染不全的问题
           */
          window.onresize=()=>{
            return (() => {
              window.screenWidth = document.body.clientWidth;
              that.screenWidth = window.screenWidth;
              if(that.screenWidth>=1920){
                $('.container').css('width','calc(100vw - 500px)')
              }else if(that.screenWidth<1920){
                $('.container').css('width','calc(100vw - 200px)')
              }
            })()
          };
          if(this.screenWidth>=1920){
            $('.container').css('width','calc(100vw - 500px)')
          }else if(this.screenWidth<1920){
            $('.container').css('width','calc(100vw - 200px)')
          }
          //修改时间参数
          if (new Date().getHours() > 8) {
            //过了早八点
            that.bgtm=new Date().formatDate('yyyy-MM-dd 08:00');
            that.endtm=new Date().formatDate('yyyy-MM-dd HH:00');
          } else {
            that.bgtm=new Date().datePro('{%d-1}').formatDate('yyyy-MM-dd 08:00');
            that.endtm=new Date().formatDate('yyyy-MM-dd HH:00');
          }
          that.init_charts();
          that.getRiver();
          that.getSoil()
        },
    }
</script>

<style lang="less" scoped>
  .container{
    width: calc(100vw - 500px);
    margin:25px auto 0 auto;
    border: none;
    border-radius:0;
    padding: 10px!important;
  }
  .panel_tip{
    min-height: 50px;
    line-height: 50px;
    background-color: #f5f4ba;
  }
  .center-main-title {
    height: 30px;
    .title-name {
      color: #3b9de0;
      font-weight: bold;
      display: inline-block;
      line-height: 30px;
    }
    div {
      float: left;
    }
  }
  .ldhb{
    background: url("../assets/ldhb.jpg")  no-repeat;
    background-size:cover;
    cursor: pointer;
  }
  .wxyt{
    background: url("../assets/wxyt.jpg")  no-repeat;
    background-size:cover;
    cursor: pointer;
  }


</style>
<style>
  /*#electric_prod_chart div,*/
  /*#electric_prod_chart canvas{*/
      /*width: 100%!important;*/
  /*}*/
</style>
