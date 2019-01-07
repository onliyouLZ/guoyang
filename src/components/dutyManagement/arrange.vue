<template>
  <div id="arrange"
       v-loading="loading"
       element-loading-text="加载中">
    <el-card class="box-card">
        <el-row>
          <el-col :span="1">
            <ul class="leftMonth">
              <li v-for="(item,index) in leftMonth" :key="index" @click.stop="selectMonth(index)" :class="timeIndex === index ? 'active' : ''">
                <a :href="'#'+index">{{item.name}}</a>
              </li>
            </ul>
          </el-col>
          <el-col :span="19">
            <div class="table-button">
              <el-button type="text" icon="fa  fa-plus" class="add" @click="selectDay">选择天</el-button>
              <el-button type="text" icon="fa fa-trash-o" class="add" @click="selectWeak">选择周</el-button>
            </div>
            <!--@cell-click="cellClick"-->
            <el-table
              ref="singleTable"
              :data="tableData"
              highlight-current-row
              border
              height="800"
              style="width: 100%"
              header-cell-class-name="table-header-public"
              @cell-click="cellClick"
              @current-change="currentChange">
              <el-table-column
                prop="date"
                header-align="center"
                label="周一">
                <template slot-scope="scope">
                  <p><span style="font-weight: 700;" id="1">时间:</span>{{scope.row.date}}</p>
                  <p><span style="font-weight: 700;">白班:</span><span>张三、王五、张三、王五、张三、王五</span></p>
                  <p><span style="font-weight: 700;">晚班:</span><span>张三、王五</span></p>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                header-align="center"
                label="周二">
                <template slot-scope="scope">
                  <p><span style="font-weight: 700; " id="2">时间:</span>{{scope.row.date}}</p>
                  <p><span style="font-weight: 700;">白班:</span><span>张三、王五、张三、王五、张三、王五</span></p>
                  <p><span style="font-weight: 700;">晚班:</span><span>张三、王五</span></p>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                align="center"
                label="周三">
                <template slot-scope="scope">
                  <p><span style="font-weight: 700;" id="3">时间:</span>{{scope.row.date}}</p>
                  <p><span style="font-weight: 700;">白班:</span><span>张三、王五、张三、王五、张三、王五</span></p>
                  <p><span style="font-weight: 700;">晚班:</span><span>张三、王五</span></p>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                align="center"
                label="周四">
                <template slot-scope="scope">
                  <p><span style="font-weight: 700;">时间:</span>{{scope.row.date}}</p>
                  <p><span style="font-weight: 700;">白班:</span><span>张三、王五、张三、王五、张三、王五</span></p>
                  <p><span style="font-weight: 700;">晚班:</span><span>张三、王五</span></p>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                align="center"
                label="周五">
                <template slot-scope="scope">
                  <p><span style="font-weight: 700;">时间:</span>{{scope.row.date}}</p>
                  <p><span style="font-weight: 700;">白班:</span><span>张三、王五、张三、王五、张三、王五</span></p>
                  <p><span style="font-weight: 700;">晚班:</span><span>张三、王五</span></p>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                align="center"
                label="周六">
                <template slot-scope="scope">
                  <p><span style="font-weight: 700;">时间:</span>{{scope.row.date}}</p>
                  <p><span style="font-weight: 700;">全天:</span><span>张三、王五、张三、王五、张三、王五</span></p>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                align="center"
                label="周日">
                <template slot-scope="scope">
                  <p><span style="font-weight: 700;">时间:</span>{{scope.row.date}}</p>
                  <p><span style="font-weight: 700;">全天:</span><span>张三、王五、张三、王五、张三、王五</span></p>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="4">3</el-col>
        </el-row>
    </el-card>
  </div>
</template>

<script>
  import {parserDate,groupByWeek} from '../../utils/utils'
  export default {
    name: "arrange",
    data(){
      return {
        loading:true,
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
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        leftMonth:[
          {name:"四月"},
          {name:"五月"},
          {name:"六月"},
          {name:"七月"},
          {name:"八月"},
          {name:"九月"},
          {name:"十月"},
        ],
        timeIndex:"",
        flag:true,
        flag1:false,
        currentRow: null
      }
    },
    methods:{

      search(){
        let _current = new Date();
        let queryParams = {
          bgtm: (_current.getFullYear()-1 + 0) + '-01-01 00:00:00',
          endtm: (_current.getFullYear()-1 + 0) + '-12-31 23:59:59'
        };
        // console.log(lunar); 计算日历节气信息
        // this.$http.post(this.$url.baseUrl+'api/duty/v0.1/duty/manage',queryParams)
        //   .then((res)=>{
        //
        //   })
      },
      selectMonth(index){
        this.timeIndex = index;
      },
      cellClick(row, column, cell, event){
        if(this.flag){
          $(cell).css('backgroundColor',"red");
        }else{
          return
        }
      },
      rowClick(row, event, column){
        console.log(1);
      },
      currentChange(val){
        if(this.flag1){
          this.currentRow = val;
        }else{
          return
        }
      },
      selectDay(){
        // this.$refs.singleTable._events.rowClick=this.rowClick
        //
        // console.log(this.$refs.singleTable._events);
      },
      selectWeak(){

      }
    },
    mounted(){
      this.$nextTick(()=>{
        setTimeout(()=>{
          this.loading=false;
          this.search()
        },500)
      })
    }
  }
</script>

<style lang="less" scoped>
  #arrange .box-card{
    height: calc(100vh - 89px);
  }
  #arrange .leftMonth{
    margin-top: 34px;
    list-style: none;
    li{
      width: 100%;
      line-height: 68px;
      text-align: center;
      background-color: #ececec;
      border: 1px solid #D1D1D1;
      cursor: pointer;
      transition:all 0.2s ease-in;
      opacity:1;
      a{
        display: inline-block;
        width: 100%;
        height: 100%;
        text-decoration: none;
        color: black;
      }
    }
    .active{
      background-color: rgb(188, 221, 244);
    }
  }
  #arrange .table-button{
    padding-left: 5px;
    border-top: 1px solid #dddddd;
    border-left: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    background: linear-gradient(to top, #dbdada 0%,#E5E5E5 10%, #efeeee 100%,#ffffff)
  }
  #arrange .table-button .add{
    color: #333;
    font-size: 14px;
    margin-left: 0;
  }
  #arrange .table-button .add:hover{
    color: #0a95ef;
  }
</style>
<style>
  /*#arrange .el-table tr:hover{*/
    /*background: none!important;*/
  /*}*/
  /*#arrange .el-table--enable-row-hover .el-table__body tr:hover>td{*/
    /*background: none!important;*/
  /*}*/
  #arrange p,#arrange div,#arrange span{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
  #arrange .current-row td{
    background-color: red!important;
  }
</style>
