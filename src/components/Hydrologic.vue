<template>
  <div id="hydrologic">
    <el-card class="box-card">
      <el-checkbox v-for="(type,index) in checkList"  @change="checkGroup(type.name)" :key="index" :label="type.name" :checked="type.checked"></el-checkbox>
      <el-date-picker
        v-model="value1"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
      <el-button size="mini"  type="primary" icon="el-icon-search"></el-button>
    </el-card>
    <el-collapse v-model="activeName" >
      <el-collapse-item name="1">
        <template slot="title">
          <i class="fa fa-user-o" style="margin: 0 10px"></i>筛选条件
        </template>
        <el-card class="box-card">
          <div>
            <label>超警类型:</label>
            <el-radio v-model="radio" label="1">所有</el-radio>
            <el-radio v-model="radio" label="2">超警</el-radio>
          </div>
          <div>
            <label>水库类型:</label>
            <el-checkbox label="小一"></el-checkbox>
            <el-checkbox label="小二"></el-checkbox>
          </div>
          <div>
            <label>水系:</label>
            <el-input size="mini" v-model="input" placeholder="请输入水系  " style="width: 155px"></el-input>

          </div>
        </el-card>
      </el-collapse-item>
      <el-collapse-item name="2" class="hp">
        <template slot="title">
          <i class="fa fa-user-o" style="margin: 0 10px"></i>湖泊信息
        </template>
        <div>
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
      <el-collapse-item name="3" class="sk">
        <template slot="title">
          <i class="fa fa-user-o" style="margin: 0 10px"></i>水库信息
        </template>
        <div>
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
      <el-collapse-item name="4" class="hd">
        <template slot="title">
          <i class="fa fa-user-o" style="margin: 0 10px"></i>河道信息
        </template>
        <div>
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
  </div>
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
            ],
            checkList:[
              {name:"水库",checked:true},
              {name:"湖泊",checked:true},
              {name:"河道",checked:true},
            ],
            radio:"1",
            input:"",
            value1:""
          }
        },
        methods:{
          checkGroup(val) {
            if (val === "湖泊") {
              if (event.target.checked) {
                $('.hp').slideDown()
              } else {
                $('.hp').slideUp()
              }
            }
            if (val === "水库") {
              if (event.target.checked) {
                $('.sk').slideDown()
              } else {
                $('.sk').slideUp()
              }
            }
            if (val === "河道") {
              if (event.target.checked) {
                $('.hd').slideDown()
              } else {
                $('.hd').slideUp()
              }
            }
          }
        }
    }
</script>

<style scoped>
  .el-checkbox+.el-checkbox,
  .el-radio+.el-radio{
    margin-left: 15px;
  }

</style>
