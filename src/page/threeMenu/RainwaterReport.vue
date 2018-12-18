<template>
    <div id="RainwaterReport"
         v-loading="loading"
         element-loading-text="加载中">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="单站降雨量" name="first">
          <div class="prims_button" @click="show(flag)" >
            {{flagName}}
          </div>
          <div class="prims">
            <el-card class="box-card" >
              <div class="prims_card">
                <p class="prims_p_title">报表类型</p>
                <label>选择类型:</label>
                <el-radio v-model="radio" label="1">备选项</el-radio>
                <el-radio v-model="radio" label="2">备选项</el-radio>
              </div>
              <div class="prims_card">
                <p class="prims_p_title">时间范围</p>
                <label>年份选择:</label>
                <el-date-picker
                  style="width: 193px"
                  size="mini"
                  v-model="value5"
                  type="year"
                  align="left"
                  placeholder="选择年">
                </el-date-picker>
              </div>
              <hr />
              <div class="prims_card">
                <p class="prims_p_title">站点选择</p>
                <p class="prims_p_title_child">
                  <label>水&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系:</label>
                  <el-select
                    v-model="value11"
                    multiple
                    size="mini"
                    collapse-tags
                    placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </p>
                <p class="prims_p_title_child"><label>报讯等级:</label>
                  <el-select
                    v-model="value12"
                    multiple
                    size="mini"
                    collapse-tags
                    placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select></p>
                <p class="prims_p_title_child">
                  <label>站点搜索:</label>
                  <el-input style="width: 193px" size="mini" v-model="input" placeholder="请输入内容"></el-input>
                 </p>
              </div>
              <hr />
              <div class="prims_card">
                <z-tree></z-tree>
              </div>
              <hr />
              <div class="prims_footer_button">
                <el-button @click="reset">重置</el-button>
                <el-button type="primary" @click="primary">查询</el-button>
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
    import zTree from '../../components/zTree'
    export default {
        name: "RainwaterReport",
        components: {zTree},
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
            loading:true,
            flag:0,
            flagName:"显示",
            radio:"1",
            value5:"",
            value11: [],
            value12: [],
            input:"",
            options: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],
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
           this.loading=true;
            $('.prims').animate({left:-279}, "fast");
            $('.prims_button').animate({left: 0}, "fast");
            this.flag=0;
            this.flagName="显示"
            setTimeout(()=>{
              this.loading=false;
            },1000)
          },
          show(){
            if(this.flag===0){
              $('.prims').animate({left:0}, "fast");
              $('.prims_button').animate({left:279}, "fast");
              this.flag=1;
              this.flagName="隐藏"
            }else{
              $('.prims').animate({left:-279}, "fast");
              $('.prims_button').animate({left: 0}, "fast");
              this.flag=0;
              this.flagName="显示"
            }
          },
          primary(){
            this.loading=true;
            $('.prims').animate({left:-279}, "fast");
            $('.prims_button').animate({left: 0}, "fast");
            this.flag=0;
            this.flagName="显示";
            setTimeout(()=>{
              this.loading=false;
            },1000)
          },
          reset(){
            this.loading=true;
            $('.prims').animate({left:-279}, "fast");
            $('.prims_button').animate({left: 0}, "fast");
            this.flag=0;
            this.flagName="显示";
            setTimeout(()=>{
              this.loading=false;
            },1000)
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
        },
        created(){
          setTimeout(()=>{
            this.loading=false
          },1000)
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
    height: calc(100vh - 126px);
    position: absolute;
    left:-279px;
    top: 0;
    z-index: 99;
  }
  #RainwaterReport .prims .prims_footer_button{
    text-align: center;
  }
  #RainwaterReport .prims_button{
    width: 15px;
    height: 55px;
    background-color: #3DAAEF;
    position: absolute;
    color: white;
    line-height: 26px;
    top:50%;
    transform: translate(0,-50%);
    left:0;
    cursor: pointer;
    text-align: center;
    font-size: 12px;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    z-index: 99;
  }
  #RainwaterReport .prims .el-card{
    height:100%;
    background-color: #E5E5E5;
  }
  #RainwaterReport .prims hr{
    border: 1px dashed #c9c9c9;
    margin: 5px 0;
  }
  #RainwaterReport .prims .prims_card{
    padding:5px 0;
  }
  #RainwaterReport .prims .prims_card .prims_p_title_child{
    line-height: 40px;
  }
  #RainwaterReport .prims .prims_p_title{
    font-weight: 700;
    line-height: 24px;
    font-size: 14px;
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
