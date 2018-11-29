<template>
  <el-row>
    <el-col :span="24">
      <Breadcrumb :menu="menuArray"></Breadcrumb>
    </el-col>
    <div class="container">
      <el-row class="panel_tip mgb10">
        <el-col :span="2" style="text-align: center">
         <i class="fa fa-user-o"></i>&nbsp;&nbsp;<span style="font-weight: 700">今日值班:</span>
        </el-col>
        <el-col :span="22">
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
          <el-card shadow="hover" class="" :body-style="{padding:'5px'}">
            <el-col :span="8" style="padding: 5px">
              <div class="center-main-title">
                <div class="title-stick bg-blue">
                </div>
                <div class="title-name mgl10">
                  湖泊站超警统计
                </div>
              </div>
              <div>
                <div id="electric_prod_chart" style="width: 100%;height:250px;"></div>
              </div>
            </el-col>
            <el-col :span="16" style="padding: 5px">
              <div class="center-main-title">
                <div class="title-stick bg-blue">
                </div>
                <div class="title-name mgl10">
                  重要站点水情形势
                </div>
              </div>
              <div>
                <swiper :options="swiperOption">
                  <swiper-slide v-for="(slide, index) in swiperSlides" :key="index"><div :id="'current_prod_chart'+index" style="width: 100%;height:250px;"></div></swiper-slide>
                  <div class="swiper-button-prev" slot="button-prev"></div>
                  <div class="swiper-button-next" slot="button-next"></div>
                </swiper>

              </div>
            </el-col>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-row>

</template>

<script>
    import Breadcrumb from '../components/Breadcrumb'
    import echarts from 'echarts'

    // import {baseUrl} from  '../config'
    export default {
        name: "SystemHome",
        components:{
          Breadcrumb:Breadcrumb,
        },
        data(){
            return{
              menuArray:[
                {name:"首页",path:""},
                {name:"首页",path:"/SystemHome"},
              ],
              dutyData:[],
              swiperOption: {
                // effect:"fade",
                slidesPerView: 5,
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
              },
              swiperSlides: [1, 2, 3, 4, 5,6,7]
            }
        },
        created(){
          /**
           * 处理人员信息
           */
          this.$http.get('http://localhost:8080/api/duty').then((res)=>{
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
            // 基于准备好的dom，初始化echarts实例
            let electric_prod_chart = echarts.init(document.getElementById('electric_prod_chart'));
            // 设置option
            let electric_prod_chart_option = {
              tooltip: {
                trigger: 'item',
                formatter: "{b}"
              },
              legend: {
                orient: 'vertical',
                x: 'left',
                data:['超保证水位3个','超警戒水位2个','超设防水位9个','未超警16个']
              },
              series: [
                {
                  type: 'pie',
                  radius: ['50%', '75%'],
                  avoidLabelOverlap: false,
                  // center: ['50%', '50%'],
                  itemStyle: {
                    normal: {
                      //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                      color: function (params) {
                        //我这边就两个柱子，大体就两个柱子颜色渐变，所以数组只有两个值，多个颜色就多个值
                        var colorList = [
                          ['#FE7B18', '#FF561E', '#FF431E'],

                          ['#FF9B01', '#FF8A01', '#FF8000'],

                          ['#FFF87C', '#FFED51', '#FFDD12'],

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
                    {value:3, name:'超保证水位3个'},
                    {value:2, name:'超警戒水位2个'},
                    {value:9, name:'超设防水位9个'},
                    {value:16, name:'未超警16个'},
                  ]
                }
              ]
            };
            // 绘制图表
            electric_prod_chart.setOption(electric_prod_chart_option);


            // 基于准备好的dom，初始化echarts实例
            $.each(this.swiperSlides,(index,item)=>{
              let current_prod_chart = echarts.init(document.getElementById('current_prod_chart'+index));
              // 设置option
              let electric_current_chart_option = {
                title: {
                  text:"金水闸",
                  left: 'center',
                  textStyle: {
                    fontWeight: 'normal',
                    fontSize: '16',
                    padding: '20px',
                    color: '#666',
                  }
                },
                series: [{
                  type: 'liquidFill',
                  radius: '40%',
                  color:["red"],
                  // center: ['50%', '60%', '50%', '50%'], //上左下右 分别显示

                  backgroundStyle: {
                    color: '#ffffff',
                    borderColor: "red"
                  },
                  data: [{
                    name:"金水闸",
                    value:"0.5"
                  }],
                  itemStyle: {
                    shadowBlur: 0
                  },
                  direction: 'left',
                  outline: {
                    show: false
                  },
                  label: {
                    normal: {
                      formatter: function (param) {
                        return param.name
                      },
                      textStyle: {
                        fontSize: '12',
                        fontWeight: "normal",
                        color: '#ffffff'
                      },
                      padding: [20, 0, 0, 0]
                    }
                  }
                  // waveAnimation: false,
                }]
              };
              // 绘制图表
              current_prod_chart.setOption(electric_current_chart_option);
            })
          },

        },
        mounted(){
          this.init_charts();
          // setInterval(() => {
          //   if (this.swiperSlides.length < 10) {
          //     this.swiperSlides.push(this.swiperSlides.length + 1)
          //   }
          // }, 100)
        }

    }
</script>

<style lang="less" scoped>
  .container{
    width: 1380px;
    margin:25px auto 0 auto;
    border: none;
    border-radius:0;
    /*background: red;*/
    padding: 10px!important;
  }
  .panel_tip{
    min-height: 50px;
    line-height: 50px;
    background-color: #f5f4ba;
    /*padding-left: 10px;*/
  }
  .center-main-title {
    height: 30px;
    .title-name {
      font-weight: bold;
      display: inline-block;
      line-height: 30px;
    }
    div {
      float: left;
    }
  }
</style>
