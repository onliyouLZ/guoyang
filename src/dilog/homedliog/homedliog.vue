<template>
  <el-dialog
    :title="swiperData.name"
    :show="show"
    :visible.sync="visible"
    width="50%"
    @close="childClose">
    <el-table
      :data="tableData"
      border
      height="500"
      size="mini"
      cell-class-name="table-body"
      header-cell-class-name="table-header">
      <el-table-column
        prop="STNM"
        min-width="120"
        align="center"
        fixed
        label="站点名称">
      </el-table-column>
      <el-table-column
        prop="TM"
        min-width="120"
        align="center"
        label="检测时间">
      </el-table-column>
      <el-table-column
        prop="Z"
        min-width="120"
        align="center"
        label="实时水位(m)">
      </el-table-column>
      <el-table-column
        prop="WRZ"
        min-width="120"
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
        min-width="120"
        align="center"
        label="超警戒水位(万m³)">
      </el-table-column>
      <el-table-column
        prop="OGRZ"
        min-width="120"
        align="center"
        label="超保证水位(万m³)">
      </el-table-column>
      <el-table-column
        prop="STLC"
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
        tableData:[],
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
        this.tableData=this.swiperData.data;

      }
    }
  }
</script>

<style lang="less">


</style>
