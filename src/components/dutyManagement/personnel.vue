<template>
  <div id="personnel"
       v-loading="loading"
       element-loading-text="加载中">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <label>名称:</label>
        <el-input style="width: 150px" v-model="typeName" placeholder="值班人员类型名称"></el-input>
        <el-button type="primary" @click="primary">查询</el-button>
        <el-button type="success" @click="exportExcel(tableData,exportMulti)">导出</el-button>
      </div>
      <!--<el-scrollbar-->
      <!--style="height: 100%;"-->
      <!--tag="table"-->
      <!--:viewStyle="{width:'100%'}">-->
      <!--<div style="max-height: 700px">-->
      <div class="table-button">
        <el-button type="text" icon="fa  fa-plus" class="add" @click="add">新增</el-button>
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
      <!--</div>-->
      <!--</el-scrollbar>-->
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
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="值班人员类型名称:" prop="name">
              <el-input v-model="ruleForm.name"  placeholder="请输入值班人员类型名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="值班人员类型ID:" prop="code">
              <el-input v-model="ruleForm.code"  placeholder="请输入值班人员类型ID" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="text-align: right">
            <el-form-item style="margin-bottom: 0!important;">
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!--<span slot="footer" class="dialog-footer">-->
      <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
      <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
      <!--</span>-->
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "personnel",
    data(){
      return{
        pageSize: 20, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        tableData: [],
        currentPage4: 1,
        typeName:"",
        tableHeader:[
          {data:'',title:'',type:"selection"},
          {data:'code',title:'值班人员类型ID',type:"normal"},
          {data:'name',title:'值班人员类型名称',type:"normal"},
          {data:'caozuo',title:'操作'},
        ],
        disabled:false,
        multipleSelection:[],
        exportMulti:[],
        loading: true,
        dialogVisible: false,
        ruleForm:{
          code:"",
          name:'',
          type:"dutyPersonType",
        },
        rules:{
          code: [
            { required: true, message: '请输入值班人员类型ID', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入值班人员类型名称', trigger: 'blur' },
          ],
        },
        bodyFalse:false,
        title:"新增人员类型",
        oldData:[],
        screenWidth:document.body.clientWidth,
      }
    },
    created(){
      this.search()
    },
    methods:{
      //初始化搜索
      search(){
        const that=this;
        that.$http.get(that.$url.baseUrl+'api/duty/v0.1/gy-duty/duty-person-type')
          .then((res)=>{
            if(res.status===200){
              setTimeout(()=>{
                that.loading=false;
                let data=res.data.result;
                that.tableData=data;
                that.oldData=data;
              },500);

            }else{
              this.$message({
                type:"error",
                message:"获取数据失败"
              });
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
            this.multipleSelection.push(
              {
                type:"dutyPersonType",
                code:item.code
              }
            );
            this.exportMulti.push(item)
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
        setTimeout(()=>{
          if(this.typeName){
            this.tableData=this.oldData.filter((tableData)=>{
              return tableData.name.match(this.typeName)
            });
          }else{
            this.search();
          }
          this.loading=false;
        },1000);
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
          export_json_to_excel(tHeader, data, ' 人员类型统计表');
        })
      },
      formatJson(filterVal, jsonData){
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //行内编辑
      handleEdit(index, row) {
        this.title="人员类型修改";
        this.dialogVisible=true;
        this.disabled="disabled";
        this.ruleForm.code=row.code;
        this.ruleForm.name=row.name;
      },
      //行内删除
      handleDelete(index, row) {
        this.multipleSelection=[];
        this.multipleSelection.push({
          type:"dutyPersonType",
          code:row.code
        });
        this.del();
      },
      //重置
      resetForm() {
        this.$refs['ruleForm'].resetFields();
        this.dialogVisible=false;
      },
      dialogClose(ruleForm){
        this.dialogVisible=false;
        this.$refs[ruleForm].resetFields();
        this.$refs.multipleTable.clearSelection();
        this.exportMulti=[];
        this.ruleForm={
          code:"",
          name:'',
          type:"dutyPersonType",
        };
      },
      del(){
        if(this.multipleSelection.length>0){
          this.$http.delete(this.$url.baseUrl+'api/common-api/ht-enum/v0.1/enum',{data:this.multipleSelection}).then((res)=>{
            if(res.status===200){
              this.$message({
                type:"success",
                message:"删除成功！"
              });
              this.loading=true;
              this.$refs.multipleTable.clearSelection();
              this.search();
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
      add(){
        this.dialogVisible=true;
        this.title='新增人员类型';
      },
      submitForm() {
        const _this=this;
        _this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let url,msg,msg1;
            if(_this.title==="新增人员类型"){
              url=_this.$url.baseUrl+'api/common-api/ht-enum/v0.1/enum';
              msg="新增成功";
              msg1="新增失败";
            }else{
              url=_this.$url.baseUrl+'api/common-api/ht-enum/v0.1/enum/update';
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
                _this.multipleSelection=[];
                _this.search();
                _this.$refs['ruleForm'].resetFields();
                this.ruleForm={
                  code:"",
                  name:'',
                  type:"dutyPersonType",
                };
              }else{
                _this.$message({
                  type:"error",
                  message:msg1
                });
                _this.$refs['ruleForm'].resetFields();
                this.ruleForm={
                  code:"",
                  name:'',
                  type:"dutyPersonType",
                };
              }
            })
          } else {
            return false;
          }
        });
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
    mounted(){
      const that=this;
      that.$nextTick(()=>{
        if(that.screenWidth>=1920){
          $('.tables').css('height',"700px")
        }else if(that.screenWidth<=1366){
          $('.tables').css('height',"350")
        }else if(that.screenWidth>1366 || this.screenWidth<1920){
          $('.tables').css('height',"500px")
        };
      })
    }
  }
</script>
<style scoped>
  #personnel .box-card{
    height: calc(100vh - 89px);
  }
  #personnel .footer{
    position: absolute;
    bottom: 10px;

  }
  #personnel .el-pagination{
    float: left;
  }
  #personnel .choice{
    float: left;
    padding: 2px 5px;

  }
  #personnel .choice span{
    line-height: 28px;
    font-size: 13px;
    color: #606266;
  }
  #personnel .el-scrollbar__bar{
    /*display: none;*/
  }
  #personnel .table-button{
    padding-left: 5px;
    border-top: 1px solid #dddddd;
    border-left: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    background: linear-gradient(to top, #dbdada 0%,#E5E5E5 10%, #efeeee 100%,#ffffff)
  }
  #personnel .table-button .add{
    color: #333;
    font-size: 14px;
    margin-left: 0;
  }
  #personnel .table-button .add:hover{
    color: #0a95ef;
  }
</style>
<style>
  #personnel .table-button .add span{
    margin-left: 5px!important;
  }
  #personnel .el-dialog{
    width: 50%!important;
  }
  #personnel .el-dialog .el-dialog__body{
    padding: 20px!important;
  }
</style>
