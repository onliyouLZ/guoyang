<template>
  <div id="arrange"
       v-loading="loading"
       element-loading-text="加载中">
    <el-card class="box-card">
        <el-row>
          <el-col :span="1">
            <ul style="margin-top: 40px">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
            </ul>
          </el-col>
          <el-col :span="19">
            <el-table
              :data="tableData"
              border
              max-height="800"
              style="width: 100%"
              header-cell-class-name="table-header-public">
              <el-table-column
                prop="date"
                header-align="center"
                label="周一">
                <template slot-scope="scope">
                  <p><span style="font-weight: 700;">时间:</span>{{scope.row.date}}</p>
                  <p><span style="font-weight: 700;">白班:</span><span>张三、王五、张三、王五、张三、王五</span></p>
                  <p><span style="font-weight: 700;">晚班:</span><span>张三、王五</span></p>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                header-align="center"
                label="周二">
                <template slot-scope="scope">
                  <p><span style="font-weight: 700;">时间:</span>2019-01-01</p>
                  <p><span style="font-weight: 700;">白班:</span><span>张三、王五、张三、王五、张三、王五</span></p>
                  <p><span style="font-weight: 700;">晚班:</span><span>张三、王五</span></p>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                align="center"
                label="周三">
                <template slot-scope="scope">
                  <p><span style="font-weight: 700;">时间:</span>2019-01-01</p>
                  <p><span style="font-weight: 700;">白班:</span><span>张三、王五、张三、王五、张三、王五</span></p>
                  <p><span style="font-weight: 700;">晚班:</span><span>张三、王五</span></p>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                align="center"
                label="周四">
                <template slot-scope="scope">
                  <p><span style="font-weight: 700;">时间:</span>2019-01-01</p>
                  <p><span style="font-weight: 700;">白班:</span><span>张三、王五、张三、王五、张三、王五</span></p>
                  <p><span style="font-weight: 700;">晚班:</span><span>张三、王五</span></p>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                align="center"
                label="周五">
                <template slot-scope="scope">
                  <p><span style="font-weight: 700;">时间:</span>2019-01-01</p>
                  <p><span style="font-weight: 700;">白班:</span><span>张三、王五、张三、王五、张三、王五</span></p>
                  <p><span style="font-weight: 700;">晚班:</span><span>张三、王五</span></p>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                align="center"
                label="周六">
                <template slot-scope="scope">
                  <p><span style="font-weight: 700;">时间:</span>2019-01-01</p>
                  <p><span style="font-weight: 700;">全天:</span><span>张三、王五、张三、王五、张三、王五</span></p>
                </template>
              </el-table-column>
              <el-table-column
                prop="date"
                align="center"
                label="周日">
                <template slot-scope="scope">
                  <p><span style="font-weight: 700;">时间:</span>2019-01-01</p>
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
        tableData: [{
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
        }]
      }
    },
    methods:{
      search(){
        let _current = new Date();
        let queryParams = {
          bgtm: (_current.getFullYear()-1 + 0) + '-01-01 00:00:00',
          endtm: (_current.getFullYear()-1 + 0) + '-12-31 23:59:59'
        };
        this.$http.post(this.$url.baseUrl+'api/duty/v0.1/duty/manage',queryParams)
          .then((res)=>{
            console.log(res);
          })
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

<style scoped>
  #arrange .box-card{
    height: calc(100vh - 89px);
  }
</style>
