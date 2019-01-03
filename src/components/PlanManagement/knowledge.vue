<template>
  <div id="knowledge"
       v-loading="loading"
       element-loading-text="加载中">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <label>标题:</label>
        <el-input style="width: 150px" v-model="kbTitle" placeholder="请输入标题"></el-input>
        <el-button type="primary" @click="primary">查询</el-button>
        <el-button type="success" @click="exportExcel(tableData,multipleSelection)">导出</el-button>
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
            v-if="item.data==='PARTICIPATE_MEMBERS'"
            :prop="item.data"
            :label="item.title"
            min-width="150"
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
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="标题:" prop="kbTitle">
              <el-input v-model="ruleForm.kbTitle"  placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="发布人姓名:" prop="publishPerson">
              <el-input v-model="ruleForm.publishPerson"  placeholder="请输入发布人姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型:" prop="kbType">
              <el-input v-model="ruleForm.kbType"  placeholder="请输入类型"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容:" prop="kbContent">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="ruleForm.kbContent">
              </el-input>
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
    name: "knowledge",
    data(){
      return{
        pageSize: 20, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        tableData: [],
        currentPage4: 1,
        kbTitle:"",
        tableHeader:[
          {data:'',title:'',type:"selection"},
          {data:'KB_TITLE',title:'标题',type:"normal"},
          {data:'KB_TYPE',title:'类型',type:"normal"},
          {data:'KB_CONTENT',title:'内容',type:"normal"},
          {data:'PUBLISH_PERSON',title:'发布人姓名',type:"normal"},
          {data:'PUBLISH_TIME',title:'发布时间',type:"normal"},
          {data:'caozuo',title:'操作'},
        ],
        multipleSelection:[],
        loading: true,
        dialogVisible: false,
        ruleForm:{
          kbTitle:"",
          kbType:"",
          kbContent:"",
          publishPerson:"",
          publishTime:new Date().formatDate('yyyy-MM-dd HH:mm'),
        },
        rules:{
          kbTitle: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
          kbType: [
            { required: true, message: '请输入类型', trigger: 'blur' },
          ],
          kbContent:[
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          publishPerson:[
            { required: true, message: '请输入发布人姓名', trigger: 'blur' }
          ],
        },
        bodyFalse:false,
        title:"",
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
        let parms={
          "kbTitle":this.kbTitle,
          "kbType":"",
          "kbContent":null,
          "publishPerson":"",
          "bgtm":"",
          "endtm":""
        };
        that.$http.post(that.$url.baseUrl+'api/guoYang/auxiliary-decision/v0.1/gy-knowledge-base/list',parms)
          .then((res)=>{
            if(res.status===200){
              setTimeout(()=>{
                that.loading=false;
                let data=res.data.result;
                $.each(data,(v,item)=>{
                  item.PUBLISH_TIME=new Date(item.PUBLISH_TIME).formatDate('yyyy-MM-dd HH:mm')
                });
                that.tableData=data;
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
          $.each(val,(v,item)=>{
            this.multipleSelection.push(item.KB_ID);
          });
        }else{
          this.multipleSelection=[];
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
          export_json_to_excel(tHeader, data, '防汛抗旱知识库统计表');
        })
      },
      formatJson(filterVal, jsonData){
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //行内编辑
      handleEdit(index, row) {
        this.title="知识库修改";
        this.dialogVisible=true;
        this.ruleForm.kbTitle=row.KB_TITLE;
        this.ruleForm.kbType=row.KB_TYPE;
        this.ruleForm.kbContent=row.KB_CONTENT;
        this.ruleForm.publishPerson=row.PUBLISH_PERSON;
        this.ruleForm.kbId=row.KB_ID;
      },
      //行内删除
      handleDelete(index, row) {
        this.multipleSelection=[];
        this.multipleSelection.push(row.KB_ID);
        this.del();
      },
      //重置
      resetForm() {
        this.$refs['ruleForm'].resetFields();
        this.ruleForm={
          thresholdName:"",
          thresholdValue:"",
          thresholdValueType:"",
          alarmLevel:"",
          alarmLevelColor:"red",
          countermeasures:"",
        };
        this.dialogVisible=false;
      },
      dialogClose(ruleForm){
        this.dialogVisible=false;
        this.$refs[ruleForm].resetFields();
        this.ruleForm={
          thresholdName:"",
          thresholdValue:"",
          thresholdValueType:"",
          alarmLevel:"",
          alarmLevelColor:"red",
          countermeasures:"",
        };
      },
      del(){
        this.$http.delete(this.$url.baseUrl+'api/guoYang/auxiliary-decision/v0.1/gy-knowledge-base/delete',{data:this.multipleSelection}).then((res)=>{
          if(res.status===200){
            this.$message({
              type:"success",
              message:"删除成功！"
            });
            this.loading=true;
            this.search();
          }else{
            this.$message({
              type:"error",
              message:"删除失败！"
            })
          }
        });
      },
      add(){
        this.dialogVisible=true;
        this.title='新增知识库';
      },
      submitForm() {
        const _this=this;
        _this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let url,msg,msg1;
            let parms;
            if(_this.title==="新增知识库"){
              url=_this.$url.baseUrl+'api/guoYang/auxiliary-decision/v0.1/gy-knowledge-base/add';
              msg="新增成功";
              msg1="新增失败";
            }else{
              url=_this.$url.baseUrl+'api/guoYang/auxiliary-decision/v0.1/gy-knowledge-base/update';
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
                  kbTitle:"",
                  kbType:"",
                  kbContent:"",
                  publishPerson:"",
                  publishTime:new Date().formatDate('yyyy-MM-dd HH:mm'),
                };
              }else{
                _this.$message({
                  type:"error",
                  message:msg1
                });
                _this.$refs['ruleForm'].resetFields();
                this.ruleForm={
                  kbTitle:"",
                  kbType:"",
                  kbContent:"",
                  publishPerson:"",
                  publishTime:new Date().formatDate('yyyy-MM-dd HH:mm'),
                };
              }
            })
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
  #knowledge .box-card{
    height: calc(100vh - 89px);
  }
  #knowledge .footer{
    position: absolute;
    bottom: 10px;

  }
  #knowledge .el-pagination{
    float: left;
  }
  #knowledge .choice{
    float: left;
    padding: 2px 5px;

  }
  #knowledge .choice span{
    line-height: 28px;
    font-size: 13px;
    color: #606266;
  }
  #knowledge .el-scrollbar__bar{
    /*display: none;*/
  }
  #knowledge .table-button{
    padding-left: 5px;
    border-top: 1px solid #dddddd;
    border-left: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    background: linear-gradient(to top, #dbdada 0%,#E5E5E5 10%, #efeeee 100%,#ffffff)
  }
  #knowledge .table-button .add{
    color: #333;
    font-size: 14px;
    margin-left: 0;
  }
  #knowledge .table-button .add:hover{
    color: #0a95ef;
  }
</style>
<style>
  #knowledge .table-button .add span{
    margin-left: 5px!important;
  }
  #knowledge .el-dialog{
    width: 50%!important;
  }
  #knowledge .el-dialog .el-dialog__body{
    padding: 20px!important;
  }
</style>
