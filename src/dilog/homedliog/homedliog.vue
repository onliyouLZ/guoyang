<template>
  <el-dialog
    :title="swiperData.name"
    :show="show"
    :visible.sync="visible"
    width="50%"
    @close="childClose">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="水位过程线" name="first">
        <div id="electric_prod_char" style="width: 100%;height:250px;"></div>
      </el-tab-pane>
      <el-tab-pane label="基本信息" name="second">水位:{{swiperData.value}}m</el-tab-pane>
      <el-tab-pane label="历史同时期对比" name="third">水位:{{swiperData.value}}m</el-tab-pane>
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
            activeName: 'first'
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
          childClose(){
            this.visible=false;
            this.$emit('update:show',false);
          },
          handleClick(tab, event){

          },
          openeds(){
            console.log(1);
          }

        },
        mounted(){

        },
        watch:{
          show(){
            this.visible=this.show;
            let electric_prod_chart = echarts.init(document.getElementById('electric_prod_char'));
            electric_prod_chart.resize({
              width:electric_prod_chart.getWidth()+'px',
              height:electric_prod_chart.getHeight()+'px',
              silent:false
            });
            // 基于准备好的dom，初始化echarts实例
            // let electric_prod_chart = echarts.init(document.getElementById('electric_prod_chart'));
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
                data:['超保证水位3个','超警戒水位2个','超设防水位9个','未超警16个']
              },
              series: [
                {
                  type: 'pie',
                  radius: ['50%', '75%'],
                  avoidLabelOverlap: false,
                  center: ['40%', '50%'],
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
          }
        }
    }
</script>

<style scoped>

</style>
