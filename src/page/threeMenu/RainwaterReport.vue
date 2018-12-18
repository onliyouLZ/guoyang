<template>
    <div id="RainwaterReport">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="单站降雨量" name="first">
          <div class="prims">
            <el-button class="prims_button" type="primary" @click="show">111</el-button>
            <el-card class="box-card" v-if="showCard">
              <div slot="header" class="clearfix">
                <span>卡片名称</span>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>
          </div>
          <el-table
            :data="tables"
            border
            style="width: 100%">
            <el-table-column
              label=" "
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="date"
              label="日期"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              align="center"
              label="地址">
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10,20]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="政区面雨量统计" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="降雨量对比统计表"  name="third">角色管理</el-tab-pane>
        <el-tab-pane label="雨情统计表" name="fourth">定时任务补偿</el-tab-pane>
        <el-tab-pane label="水情统计表" name="six">水情统计表</el-tab-pane>
      </el-tabs>

    </div>
</template>

<script>
    export default {
        name: "RainwaterReport",
        data(){
          return{
            pageSize: 10, // 每页大小默认值
            pageIndex: 1, // 默认第一页
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
              },{
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
              },{
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
            currentPage4: 1,
            activeName:"first",
            showCard:true
          }
        },
        methods:{
          handleSizeChange(val) {
            this.pageSize = val
          },
          handleCurrentChange(val) {
            this.pageIndex = val
          },
          handleClick(tab, event) {
            console.log(tab, event);
          },
          show(){
            this.showCard= !this.showCard
          }
        },
        computed:{
          tables(){
            //实现前端分页
            return this.tableData.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
          },
          total(){
            return this.tableData.length
          }
        }
    }
</script>

<style scoped>
  #RainwaterReport{
    background-color: white;
    height: calc(100vh - 87px);
  }
  #RainwaterReport .el-tabs--border-card{
    height: 100%;
    border: none;
  }
  #RainwaterReport .prims{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;
  }
  #RainwaterReport .prims .prims_button{
    position: absolute;
    left: 104px;
    top: 50%;
    z-index: 99;
  }
  #RainwaterReport .el-pagination{
    position: absolute;
    bottom: 0;
  }
</style>
<style>
  #RainwaterReport .el-tabs--border-card .el-tabs__content{
    height:calc(100vh - 157px);
  }
</style>
