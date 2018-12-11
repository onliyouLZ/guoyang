<template>
  <el-collapse v-model="activeName">
    <el-collapse-item name="1">
      <template slot="title">
        <i class="fa fa-user-o" style="margin: 0 10px"></i>湖泊信息
      </template>
        <div>
      <div class="cardHeader">
        <label>超保证水位:<span>3</span>个</label>
      </div>
      <el-scrollbar
        style="height: 100%"
        tag="table">
        <div style="max-height: 200px">
          <el-table
            :data="tableData"
            stripe
            size="mini"
            height="140"
            style="width: 100%;font-size: 12px"
            header-cell-class-name="table-dliog-header"
            cell-class-name="table-dliog-body">
            <el-table-column
              label=" "
              type="index"
              width="20">
            </el-table-column>
            <el-table-column
              prop="stnm"
              label="湖泊名称"
              align="center"
              width="80">
            </el-table-column>
            <el-table-column
              prop="rz"
              label="水位"
              align="center"
              width="80">
            </el-table-column>
            <el-table-column
              prop="date"
              label="时间"
              align="center"
              min-width="160">
            </el-table-column>
            <el-table-column
              prop="bz"
              label="保证水位"
              align="center"
              width="80">
            </el-table-column>
            <el-table-column
              prop="cbz"
              label="超保证水位"
              align="center"
              width="100">
            </el-table-column>
          </el-table>
        </div>
      </el-scrollbar>
      </div>
        <div>
          <div class="cardHeader">
            <label>超保证水位:<span>3</span>个</label>
          </div>
          <el-scrollbar
            style="height: 100%"
            tag="table">
            <div style="max-height: 200px">
              <el-table
                :data="tableData"
                stripe
                size="mini"
                height="140"
                style="width: 100%;font-size: 12px"
                header-cell-class-name="table-dliog-header"
                cell-class-name="table-dliog-body">
                <el-table-column
                  label=" "
                  type="index"
                  width="20">
                </el-table-column>
                <el-table-column
                  prop="stnm"
                  label="湖泊名称"
                  align="center"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="rz"
                  label="水位"
                  align="center"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="时间"
                  align="center"
                  min-width="160">
                </el-table-column>
                <el-table-column
                  prop="bz"
                  label="保证水位"
                  align="center"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="cbz"
                  label="超保证水位"
                  align="center"
                  width="100">
                </el-table-column>
              </el-table>
            </div>
          </el-scrollbar>
        </div>
        <div>
          <div class="cardHeader">
            <label>超保证水位:<span>3</span>个</label>
          </div>
          <el-scrollbar
            style="height: 100%"
            tag="table">
            <div style="max-height: 200px">
              <el-table
                :data="tableData"
                stripe
                size="mini"
                height="140"
                style="width: 100%;font-size: 12px"
                header-cell-class-name="table-dliog-header"
                cell-class-name="table-dliog-body">
                <el-table-column
                  label=" "
                  type="index"
                  width="20">
                </el-table-column>
                <el-table-column
                  prop="stnm"
                  label="湖泊名称"
                  align="center"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="rz"
                  label="水位"
                  align="center"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="时间"
                  align="center"
                  min-width="160">
                </el-table-column>
                <el-table-column
                  prop="bz"
                  label="保证水位"
                  align="center"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="cbz"
                  label="超保证水位"
                  align="center"
                  width="100">
                </el-table-column>
              </el-table>
            </div>
          </el-scrollbar>
        </div>



    </el-collapse-item>
    <el-collapse-item  name="2">
      <template slot="title">
        <i class="fa fa-user-o" style="margin: 0 10px"></i>水库信息
      </template>
      <div>
        <div class="cardHeader">
          <label>超保证水位:<span>3</span>个</label>
        </div>
        <el-scrollbar
          style="height: 100%"
          tag="table">
          <div style="max-height: 200px">
            <el-table
              :data="tableData"
              stripe
              size="mini"
              height="140"
              style="width: 100%;font-size: 12px"
              header-cell-class-name="table-dliog-header">
              <el-table-column
                label=" "
                type="index"
                width="20">
              </el-table-column>
              <el-table-column
                prop="stnm"
                label="湖泊名称"
                align="center"
                width="80">
              </el-table-column>
              <el-table-column
                prop="rz"
                label="水位"
                align="center"
                width="80">
              </el-table-column>
              <el-table-column
                prop="date"
                label="时间"
                align="center"
                min-width="160">
              </el-table-column>
              <el-table-column
                prop="bz"
                label="保证水位"
                align="center"
                width="80">
              </el-table-column>
              <el-table-column
                prop="cbz"
                label="超保证水位"
                align="center"
                width="100">
              </el-table-column>
            </el-table>
          </div>
        </el-scrollbar>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
    export default {
        name: "warning",
        data(){
          return{
            activeName: '1',
            tableData: [
              {
                stnm: '道士湖',
                rz: '18.97',
                date: '2018-11-11 15:00:00',
                bz:"18.65",
                cbz:"0.32"
              },
              {
                stnm: '道士湖',
                rz: '18.97',
                date: '2018-11-11 15:00:00',
                bz:"18.65",
                cbz:"0.32"
              },
              {
                stnm: '道士湖',
                rz: '18.97',
                date: '2018-11-11 15:00:00',
                bz:"18.65",
                cbz:"0.32"
              },
              {
                stnm: '道士湖',
                rz: '18.97',
                date: '2018-11-11 15:00:00',
                bz:"18.65",
                cbz:"0.32"
              },
            ]
          }
        },
        methods:{
        }
    }
</script>

<style lang="less">

  .is-scrolling-none::-webkit-scrollbar{
    width: 0;
  }

  /**
  折叠面板
   */
  .el-collapse-item__header{
    height: 25px;
    background-color: #A4D0EF;
  }
  .is-active{
    color:#1E88E5 ;
  }
  .el-collapse-item__header:hover{
    color: #1E88E5;
  }
  .el-collapse-item__content{
    padding-bottom: 10px!important;
    .cardHeader{
      padding-left: 10px;
      line-height: 32px;
      span{
        color: red;
      }
    }
  }
  /**
 表格
  */
  .table-dliog-body{
      color: red;
      padding: 0!important;
      font-size: 14px;

  }
  .table-dliog-header{
    background-color: #A4D0EF !important;
    border-bottom: 1px solid #bbb!important;
    padding: 0!important;
    line-height: 25px;
    color: #333333;
    font-weight: normal;
    font-size: 14px;
  }
  .el-table--striped .el-table__body tr.el-table__row--striped td{
    background-color: #e0eef8!important;
  }
</style>

