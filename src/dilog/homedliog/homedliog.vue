<template>
  <el-dialog
    :title="swiperData.name"
    :show="show"
    :visible.sync="visible"
    width="50%"
    @close="childClose">
    <el-table
      :data="tableData1"
      border
      height="500"
      size="mini"
      cell-class-name="table-body"
      header-cell-class-name="table-header">
      <el-table-column
        prop="STNM"
        min-width="120"
        align="center"
        label="测站名称">
      </el-table-column>
      <el-table-column
        prop="TM"
        min-width="120"
        align="center"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="Z"
        min-width="120"
        align="center"
        label="河道水位">
      </el-table-column>
      <el-table-column
        prop="number1"
        min-width="120"
        align="center"
        label="设防水位">
      </el-table-column>
      <el-table-column
        prop="number2"
        min-width="120"
        align="center"
        label="警戒水位">
      </el-table-column>
      <el-table-column
        prop="number3"
        min-width="120"
        align="center"
        label="保证水位">
      </el-table-column>
      <el-table-column
        prop="czpj"
        min-width="120"
        align="center"
        label="超防汛水位">
      </el-table-column>
      <el-table-column
        prop="trxdsd"
        min-width="120"
        align="center"
        label="站点地址">
      </el-table-column>
    </el-table>
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
    data() {
      return {
        visible: this.show,
        tableData1: [
          {STNM: "西阳镇墒情站", TM: "2018-10-11 11:11:11", Z: "11", number1: "22", number2: "22", number3: "22", czpj: "22", trxdsd: "22"},
          {STNM: "涡南镇墒情站", TM: "2018-10-11 11:11:11", Z: "12", number1: "22", number2: "22", number3: "22", czpj: "22", trxdsd: "22"},
          {STNM: "楚店镇墒情站", TM: "2018-10-11 11:11:11", Z: "13", number1: "22", number2: "22", number3: "22", czpj: "22", trxdsd: "22"},
          {STNM: "高公镇墒情站", TM: "2018-10-11 11:11:11", Z: "14", number1: "22", number2: "22", number3: "22", czpj: "22", trxdsd: "22"},
          {STNM: "高炉镇墒情站", TM: "2018-10-11 11:11:11", Z: "15", number1: "22", number2: "22", number3: "22", czpj: "22", trxdsd: "22"},
          {STNM: "曹市镇墒情站", TM: "2018-10-11 11:11:11", Z: "16", number1: "22", number2: "22", number3: "22", czpj: "22", trxdsd: "22"},
        ],
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
      }
    }
  }
</script>

<style lang="less">


</style>
