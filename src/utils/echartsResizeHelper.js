/**
 * echarts 图表自适应窗口大小变化的指令
 * useage:  ①main函数中引入：import '@/directive/echartResizeHelper.js'
 *          ②echarts容器上使用指令 <div id="chart-container" v-on-echart-resize></div>
 */
import echarts from 'echarts'
import Vue from 'vue';

export var version = '0.0.1';
var compatible = (/^2\./).test(Vue.version);
if (!compatible) {
    Vue.util.warn('vue echarts resize directive ' + version + ' only supports Vue 2.x, and does not support Vue ' + Vue.version);
}
let HANDLER = "_vue_echarts_resize_handler"

function bind(el, binding){
    unbind(el);
    el[HANDLER]=function(){
        let chart=echarts.getInstanceByDom(el);
        if(!chart){
            return;
        }
        chart.resize();
    }
    window.addEventListener("resize",el[HANDLER])
}
function unbind(el){
    window.removeEventListener("resize",el[HANDLER]);
    delete el[HANDLER];
}
var directive = {
    bind: bind,
    unbind: unbind
};
const onEchartResize=Vue.directive("onEchartResize",directive)
export {onEchartResize};
