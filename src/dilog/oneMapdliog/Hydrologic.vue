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
    </el-collapse-item>
  </el-collapse>
</template>

<script>
    export default {
        name: "hydrologic",
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
        }
    }
</script>

<style scoped>

</style>
