<template>
  <div id="table1">
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
    <!--<el-scrollbar-->
      <!--style="height: 100%;"-->
      <!--tag="table"-->
      <!--:viewStyle="{width:'100%'}">-->
      <el-button type="success">导出Excel</el-button>
      <div class="table-title">
        <p style="font-size: 20px;color: red"><span>金水闸(雨量)逐日降雨量</span></p>
        <p><span>年份：2018 单位：mm</span></p>
      </div>
      <el-table
        :data="tables"
        border
        height="calc(100vh - 300px)"
        style="width: 100%;"
        header-cell-class-name="table-header-public"
        :span-method="objectSpanMethod">
        <el-table-column
          prop="statistics"
          align="center"
          label="统计">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          align="center">
        </el-table-column>
        <el-table-column
          prop="one"
          label="一月"
          align="center">
        </el-table-column>
        <el-table-column
          prop="two"
          align="center"
          label="二月">
        </el-table-column>
        <el-table-column
          prop="three"
          align="center"
          label="三月">
        </el-table-column>
        <el-table-column
          prop="four"
          align="center"
          label="四月">
        </el-table-column>
        <el-table-column
          prop="five"
          align="center"
          label="五月">
        </el-table-column>
        <el-table-column
          prop="six"
          align="center"
          label="六月">
        </el-table-column>
        <el-table-column
          prop="seven"
          align="center"
          label="七月">
        </el-table-column>
        <el-table-column
          prop="eight"
          align="center"
          label="八月">
        </el-table-column>
        <el-table-column
          prop="nine"
          align="center"
          label="九月">
        </el-table-column>
        <el-table-column
          prop="ten"
          align="center"
          label="十月">
        </el-table-column>
        <el-table-column
          prop="eleven"
          align="center"
          label="十一月">
        </el-table-column>
        <el-table-column
          prop="twelve"
          align="center"
          label="十二月">
        </el-table-column>
      </el-table>
    <!--</el-scrollbar>-->
    <div class="footer" v-if="tableData.length>0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[40,60]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    import zTree from '../zTree'
    export default {
        name: "table1",
        components: {zTree},
        data(){
          return{
            pageSize: 40, // 每页大小默认值
            pageIndex: 1, // 默认第一页
            tableData: [

            ],
            typeNum:[],
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
            options: [
              {
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
          objectSpanMethod({ row, column, rowIndex, columnIndex }){
            const _row=this.typeNum[rowIndex];
            if(columnIndex===0){
              if(rowIndex ===34){
                return{
                  colspan:2,
                  rowspan:_row
                }
              }else{
                return {
                  colspan:1,
                  rowspan:_row
                };
              }
            }
            else if(columnIndex===1){
              if(rowIndex ===34 || rowIndex ===35 || rowIndex ===36 || rowIndex ===37){
                return{
                  colspan:2,
                  rowspan:1
                }
              }else if(rowIndex ===38){
                return{
                  colspan:13,
                  rowspan:1
                }
              }
            }
            else if(columnIndex===2){
              if(rowIndex ===34){
                return{
                  colspan:4,
                  rowspan:1
                }
              }else if(rowIndex ===35 || rowIndex ===36 || rowIndex ===37){
                return{
                  colspan:2,
                  rowspan:1
                }
              }
            }
            else if(columnIndex===3){
              if(rowIndex ===34){
                return{
                  colspan:2,
                  rowspan:1
                }
              }else if(rowIndex ===35 || rowIndex ===36 || rowIndex ===37){
                return{
                  colspan:2,
                  rowspan:1
                }
              }
            }
            else if(columnIndex===4){
              if(rowIndex ===34){
                return{
                  colspan:4,
                  rowspan:1
                }
              }
              if(rowIndex ===35 || rowIndex ===36 || rowIndex ===37){
                return{
                  colspan:2,
                  rowspan:1
                }
              }
            }
            else if(columnIndex===5){
              if(rowIndex ===35 || rowIndex ===36 || rowIndex ===37){
                return{
                  colspan:2,
                  rowspan:1
                }
              }
            }
            else if(columnIndex===6){
              if(rowIndex ===35 || rowIndex ===36 || rowIndex ===37){
                return{
                  colspan:2,
                  rowspan:1
                }
              }
            }
          },
          getOrderNumber(){
            //排序
            let index=0;
            for(let i=0;i<this.tableData.length;i++){
              if(i===0){
                this.typeNum.push(1);
                index=i;
              }else{
                if(this.tableData[i].statistics===this.tableData[i-1].statistics){
                  this.typeNum[index]+=1;
                  this.typeNum.push(0);
                }else{
                  this.typeNum.push(1);
                  index=i;
                }
              }
            }
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
          },
        },
        created(){
          this.$http.get('/api/rain').then((res)=>{
              this.loading=false;
              let data=res.data.data.result;
              let arr=[
                {"statistics":"月统计","date":"总量","one":"","two":"","three":"","four":"","five":"","six":"","seven":"","eight":"","nine":"","ten":"","eleven":"","twelve":""},
                {"statistics":"月统计","date":"最大日雨量","one":"","two":"","three":"","four":"","five":"","six":"","seven":"","eight":"","nine":"","ten":"","eleven":"","twelve":""},
                {"statistics":"月统计","date":"降雨天数","one":"","two":"","three":"","four":"","five":"","six":"","seven":"","eight":"","nine":"","ten":"","eleven":"","twelve":""},
                {"statistics":"年统计","date":"降雨量","one":"","two":"降雨天数","three":""},
                {"statistics":"年统计","date":"时段(天)","one":"1","two":"3","three":"7","four":"15","five":"30"},
                {"statistics":"年统计","date":"最大降雨量","one":"","two":"","three":"","four":"","five":"","six":"","seven":"","eight":"","nine":"","ten":"","eleven":"","twelve":""},
                {"statistics":"年统计","date":"开始时间","one":"","two":"","three":"","four":"","five":"","six":"","seven":"","eight":"","nine":"","ten":"","eleven":"","twelve":""},
                {"statistics":"附注","date":"",},
              ];
            data.forEach((key,item)=>{
                console.log(key);
              })
            // $.each(data,(v,item)=>{
            //     if(item.one){
            //       arr[0].one +=item.one;
            //     }
            //   });
              this.tableData=data;
              this.tableData=this.tableData.concat(arr);
              this.getOrderNumber();
          });

        },
        watch:{
        }
    }
</script>

<style scoped>
  #table1 .prims{
    height: calc(100vh - 126px);
    position: absolute;
    left:-279px;
    top: 0;
    z-index: 99;
  }
  #table1 .table-title{
    text-align: center;
    padding: 5px;
  }
  #table1 .prims .prims_footer_button{
    text-align: center;
  }
  #table1 .prims_button{
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
  #table1 .prims .el-card{
    height:100%;
    background-color: #E5E5E5;
  }
  #table1 .prims hr{
    border: 1px dashed #c9c9c9;
    margin: 5px 0;
  }
  #table1 .prims .prims_card{
    padding:5px 0;
  }
  #table1 .prims .prims_card .prims_p_title_child{
    line-height: 40px;
  }
  #table1 .prims .prims_p_title{
    font-weight: 700;
    line-height: 24px;
    font-size: 14px;
  }
  #table1 .footer{
    position: absolute;
    bottom: 10px;
  }
</style>
<style>
  #table1 .el-tabs--border-card .el-tabs__content{
    height:calc(100vh - 157px);
  }
</style>
