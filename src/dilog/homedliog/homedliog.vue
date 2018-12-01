<template>
  <el-dialog
    :title="swiperData.name"
    :show="show"
    :visible.sync="visible"
    width="50%"
    @close="childClose">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="水位过程线" name="first">
        <div style="float: left">
          <div id="electric_prod_char" style="width:700px;height:250px;"></div>
        </div>
        <div style="float:right">
          <el-button
            plain
            @click="open12=tableShow = !tableShow">
            使用 HTML 片段
          </el-button>
          <transition name="fade">
            <div v-if="tableShow">
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="日期"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址">
                </el-table-column>
              </el-table>
            </div>
          </transition>

        </div>

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
            activeName: 'first',
            tableData: [
              {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }],
            tableShow:false
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
            this.$emit('update:show',false);
          },
          /**
           * tab切换事件
           */
          handleClick(tab, event){

          },
          /**
           * 初始化图表需要异步执行
           */
          init(){
            let electric_prod_chart = $('#electric_prod_char');
            if(electric_prod_chart[0]){
              let electric_prod_chart =  echarts.init(document.getElementById('electric_prod_char'));
              // electric_prod_chart.resize({
              //   width:electric_prod_chart.getWidth()+'px',
              //   height:electric_prod_chart.getHeight()+'px',
              //   silent:false
              // });
              // 基于准备好的dom，初始化echarts实例
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
            }
          },
          /**
           * 销毁图表实例下次进入重新渲染
           */
          dispose(){
            let electric_prod_chart =  echarts.init(document.getElementById('electric_prod_char'));
            electric_prod_chart.dispose()
          },
        },
        mounted(){


        },
        watch:{
          show(){
            this.visible=this.show;
            if(this.show==true){
              setTimeout(()=>{
                this.init();
              },0);
            }else{
              this.dispose()
            }

          }
        }
    }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
