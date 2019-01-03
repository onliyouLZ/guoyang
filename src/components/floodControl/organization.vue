<template>
    <div id="organization">
      <div id="electric_prod_chart" style="width: 100%;height: calc(100vh - 87px)" v-on-echart-resize></div>
    </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
      name: "organization",
      methods:{
        init_chart(){
          this.$http.post(this.$url.baseUrl+'api/guoYang/fxkhzfb-info/v0.1/fxkhzfb/gy-list',{remark:"fxkhzhb"}).then((res)=>{
           if(res.status===200){
             let data=res.data.result;
             let electric_prod_chart = echarts.init(document.getElementById('electric_prod_chart'));

             let option = {
               title: {
                 text: '防汛指挥机构图'
               },
               tooltip: {
                 show: false,
                 trigger: 'item',
                 formatter: "{b}: {c}"
               },
               toolbox: {
                 show: true,
                 feature: {
                   saveAsImage: {
                     show: true
                   }
                 }
               },
               calculable: false,
               series: [{
                 name: '树图',
                 type: 'tree',
                 orient: 'horizontal', // vertical horizontal
                 rootLocation: {
                   x: '50%',
                   y: '100%'
                 }, // 根节点位置  {x: 'center',y: 10}
                 nodePadding: 100,
                 layerPadding: 100,
                 symbol: 'rectangle',
                 borderColor: 'black',
                 initialTreeDepth:-1, //深度
                 symbolSize:[320,60],
                 itemStyle: {
                   normal: {
                     color: '#fff', //节点背景色
                     label: {
                       show: true,
                       position: 'inside',
                       textStyle: {
                         color: 'black',
                         fontSize: 12,
                         //fontWeight:  'bolder'
                       }
                     },
                     lineStyle: {//连接线
                       color: '#000',
                       width: 1,
                       type: 'broken' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                     }
                   },
                   emphasis: {
                     label: {
                       show: false
                     }
                   }
                 },
                 data:data
               }],

             };
             electric_prod_chart.setOption(option);
           }
          });

        }
      },
      mounted() {
        this.$nextTick(()=>{
          this.init_chart()
        })
      }
  }
</script>

<style scoped>

</style>
