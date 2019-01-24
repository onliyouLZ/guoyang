<template>
    <div id="materials"
         v-loading="loading"
         element-loading-text="加载中">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <label>物资名录:</label>
          <el-input v-model="mlName" clearable  placeholder="请输入物资名录名称" style="width: 150px"></el-input>
          <label>物资种类:</label>
          <el-select
            v-model="materialType"
            placeholder="请选择"
            style="width: 150px"
            multiple
            collapse-tags>
            <el-option
              v-for="item in mOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" @click="primary">查询</el-button>
          <el-button type="success" @click="exportExcel(tableData,exportMulti)">导出</el-button>
        </div>
        <div class="table-button">
          <el-button type="text" icon="fa  fa-plus" class="add" @click="dialogVisible=true,title='物资名录新增'">新增</el-button>
          <el-button type="text" icon="fa fa-trash-o" class="add" @click="del">删除</el-button>
        </div>
        <el-table
          :data="tables"
          border
          style="width: 100%"
          height="700"
          class="tables"
          @row-click="rowClick"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          header-cell-class-name="table-header-public">
          <template v-for="item in tableHeader">
            <el-table-column
              v-if="item.type==='selection'"
              type="selection"
              width="40"
              fixed>
            </el-table-column>
            <el-table-column
              v-if="item.type==='normal'"
              :prop="item.data"
              :label="item.title"
              align="center">
            </el-table-column>
            <el-table-column
              v-if="item.data==='caozuo'"
              :label="item.title"
              min-width="150"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </template>
        </el-table>
        <div class="footer" v-if="tableData.length>0">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[20,40,60]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
          <div class="choice" v-if="multipleSelection.length>0"><span>当前页选中:{{multipleSelection.length > 0 ? multipleSelection.length+"条" : " "}}</span></div>
        </div>
      </el-card>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :modal-append-to-body="bodyFalse"
        @close="dialogClose('ruleForm')"
        width="30%">
        <!--<el-form  ref="form" :model="form" label-width="80px" :rules="rules">-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="物资名录:" prop="mlName">
                <el-input v-model="ruleForm.mlName"  placeholder="请输入物资名录名称"></el-input>
              </el-form-item>
              <el-form-item label="单位:" prop="mlMeasureUnit">
                <el-input  v-model.number="ruleForm.mlMeasureUnit" placeholder="请输入物资单位"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="物资类型" prop="mlType">
                <el-select
                  v-model="ruleForm.mlType"
                  placeholder="请选择类型"
                  style="width: 100%">
                  <el-option
                    v-for="item in mOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注" prop="comments">
                <el-input  v-model="ruleForm.comments" placeholder="备注"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" style="text-align: right">
              <el-form-item style="margin-bottom: 0!important;">
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "materials",
    data(){
      return{
        pageSize: 20, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        materialType:[],
        mOptions:[
          {label:"防汛物资",value:'1'},
          {label:"抗旱物资",value:'2'},
          {label:"抢险机械设备",value:'3'}
        ],
        mOption:[
          {label:"防汛物资",value:'1'},
          {label:"抗旱物资",value:'2'},
          {label:"抢险机械设备",value:'3'}
        ],
        tableData: [],
        currentPage4: 1,
        tableHeader:[
          {data:'',title:'',type:"selection"},
          {data:'ML_NAME',title:'物资名录',type:"normal"},
          {data:'materialType',title:'物资类型',type:"normal"},
          {data:'ML_MEASURE_UNIT',title:'单位',type:"normal"},
          {data:'caozuo',title:'操作'},
        ],
        mlName:"",
        multipleSelection:[],
        exportMulti:[],
        loading: true,
        dialogVisible: false,
        mapDligShow: false,
        options:[],
        ruleForm:{
          mlName:"",
          mlType:'',
          mlMeasureUnit:"",
          comments:"",
          mlCd:""
        },
        rules:{
          mlName: [
            { required: true, message: '请输入物资名录名称', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          mlType:[
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          mlMeasureUnit:[
            { required: true, message: '请输入单位', trigger: 'blur' }
          ],
        },
        bodyFalse:false,
        title:"",
        screenWidth:document.body.clientWidth
      }
    },
    created(){
      this.search()
    },
    methods:{
      //初始化搜索
      search(){
        const that=this;
        let prams={
          mlName:that.mlName,
          mlTypeList:that.materialType
        };
        that.$http.post(that.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/lists/list',prams)
          .then((res)=>{
            if(res.status===200){
              let data=res.data.result;
              $.each(data,(v,item)=>{
                if(item.ML_TYPE==='1'){
                  item.materialType="防汛物资";
                }else if(item.ML_TYPE==='2'){
                  item.materialType="抗旱物资";
                }else if(item.ML_TYPE==='3'){
                  item.materialType="抢险机械设备";
                };
              });
              setTimeout(()=>{
                that.loading=false;
                that.tableData=data;
              },500);
            }
          })
      },
      //切换每页显示多少条
      handleSizeChange(val) {
        this.pageSize = val
      },
      //翻页
      handleCurrentChange(val) {
        this.loading=true;
        this.pageIndex = val;
        setTimeout(()=>{
          this.loading=false;
        },1000)
      },
      //全选，反选
      handleSelectionChange(val) {
        if(val.length>0){
          this.multipleSelection=[];
          this.exportMulti=[];
          $.each(val,(v,item)=>{
            this.multipleSelection.push(item.ML_CD);
            this.exportMulti.push(item);
          });
        }else{
          this.multipleSelection=[];
          this.exportMulti=[];
        }
      },
      //点击行选中
      rowClick(row, event, column){
        if(row){
          this.$refs.multipleTable.toggleRowSelection(row);
        }
      },
      //查询
      primary(){
        this.loading=true;
        this.search();
      },
      /**
       * 导出
       * @param tableData 全部导出数据
       * @param multipleSelection 单选导出数据
       */
      exportExcel(tableData,multipleSelection){
        let tableDatas=[];
        if(multipleSelection.length>0){
          tableDatas=multipleSelection
        }else{
          tableDatas=tableData
        }
        require.ensure([], () => {
          const { export_json_to_excel } = require('../../vendor/Export2Excel');
          /**
           * 表头和数据需处理 此处写的死数据
           * @type {string[]}
           */
          const tHeader=[];
          const filterVal=[];
          $.each(this.tableHeader,(v,item)=>{
            if(item.title && item.type){
              tHeader.push(item.title);
              filterVal.push(item.data);
            }
          });
          const list = tableDatas;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '物资名录管理统计表');
        })
      },
      formatJson(filterVal, jsonData){
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //行内编辑
      handleEdit(index, row) {
        this.title="物资名录修改";
        this.dialogVisible=true;
        this.ruleForm.mlName=row.ML_NAME;
        this.ruleForm.mlType=row.ML_TYPE;
        this.ruleForm.mlMeasureUnit=row.ML_MEASURE_UNIT;
        this.ruleForm.comments=row.COMMENTS;
        this.ruleForm.mlCd=row.ML_CD;
      },
      //行内删除
      handleDelete(index, row) {
        this.multipleSelection=[];
        this.multipleSelection.push(row.ML_CD);
        this.del();
      },
      //重置
      resetForm(ruleForm) {
        this.dialogVisible=false;
        this.$refs[ruleForm].resetFields();

      },
      dialogClose(ruleForm){
        this.dialogVisible=false;
        this.$refs[ruleForm].resetFields();
        this.$refs.multipleTable.clearSelection();
        this.exportMulti=[];
        this.ruleForm={
          mlName:"",
          mlType:'',
          mlMeasureUnit:"",
          comments:"",
          mlCd:""
        }
      },
      /**
       * 物资名录删除
       */
      del(){
        if(this.multipleSelection.length>0){
          this.$http.delete(this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/lists',{data:this.multipleSelection}).then((res)=>{
            if(res.status===200){
              this.$message({
                type:"success",
                message:"删除成功！"
              });
              this.$refs.multipleTable.clearSelection();
              this.primary();
            }else{
              this.$message({
                type:"error",
                message:"删除失败！"
              })
            }
          });
        }else{
          this.$message({
            type:"error",
            message:"请选择需要删除的数据！"
          })
        }

      },
      /**
       * 物资名录新增及修改
       */
      submitForm() {
        const _this=this;
        _this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let url,msg,msg1;
            if(_this.title==="物资名录新增"){
              url=_this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/lists';
              msg="新增成功";
              msg1="新增失败"
            }else{
              url=_this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/lists/update';
              msg="修改成功";
              msg1="修改失败";
            }
            _this.dialogVisible=false;
            _this.$http.put(url,_this.ruleForm).then((res)=>{
              if(res.status===200){
                _this.$message({
                  type:"success",
                  message:msg
                });
                _this.loading=true;
                _this.search();
              }
              _this.$refs['ruleForm'].resetFields();
              _this.dialogVisible=false;
            }).catch((error)=>{
              _this.$message({
                type:"error",
                message:msg1
              });
              _this.$refs['ruleForm'].resetFields();
              _this.dialogVisible=false;
            });
          } else {
            return false;
          }
        });
      },
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
    mounted(){
      this.$nextTick(()=>{
        if(this.screenWidth>=1920){
          $('.tables').css('height',"700px")
        }else if(this.screenWidth<=1366){
          $('.tables').css('height',"350")
        }else if(this.screenWidth>1366 || this.screenWidth<1920){
          $('.tables').css('height',"500px")
        }
      })
    }
  }
</script>

<style scoped>
  #materials .box-card{
    height: calc(100vh - 89px);
  }
  #materials .footer{
    position: absolute;
    bottom: 10px;

  }
  #materials .el-pagination{
    float: left;
  }
  #materials .choice{
    float: left;
    padding: 2px 5px;

  }
  #materials .choice span{
    line-height: 28px;
    font-size: 13px;
    color: #606266;
  }
  #materials .el-scrollbar__bar{
    /*display: none;*/
  }
  #materials .table-button{
    padding-left: 5px;
    border-top: 1px solid #dddddd;
    border-left: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    background: linear-gradient(to top, #dbdada 0%,#E5E5E5 10%, #efeeee 100%,#ffffff)
  }
  #materials .table-button .add{
    color: #333;
    font-size: 14px;
    margin-left: 0;
  }
  #materials .table-button .add:hover{
    color: #0a95ef;
  }
</style>
<style>
  #materials .table-button .add span{
    margin-left: 5px!important;
  }
  #materials .el-dialog{
    width: 50%!important;
  }
  #materials .el-dialog .el-dialog__body{
    padding: 20px!important;
  }
</style>
