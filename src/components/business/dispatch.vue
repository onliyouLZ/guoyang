<template>
  <div id="dispatch"
       v-loading="loading"
       element-loading-text="加载中">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <label>年 份:</label>
        <el-date-picker
          style="width: 150px"
          v-model="summaryYear"
          type="year"
          placeholder="选择年">
        </el-date-picker>
        <label>总结类型:</label>
        <el-select v-model="summaryType" placeholder="请选择" style="width: 150px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <label>总结名称:</label>
        <el-input style="width: 150px" v-model="summarizeName" placeholder="请输入总结名称"></el-input>
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
            v-if="item.data==='ATTACHMENT'"
            :label="item.title"
            width="250"
            align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.ATTACHMENT" v-for="item in scope.row.ATTACHMENT">
                <a href="javascript:void(0)" class="attachment" @click="preview(item)">{{item.name}}</a>
              </template>
            </template>
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
            <el-form-item label="汛后总结标题:" prop="title">
              <el-input v-model="ruleForm.title"  placeholder="请输入汛后总结标题"></el-input>
            </el-form-item>
            <el-form-item label="填写人员:" prop="reportUserid">
              <el-input v-model="ruleForm.reportUserid"  placeholder="请输入填写人员" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总结类型:" prop="summaryType">
              <el-select v-model="ruleForm.summaryType" placeholder="请选择总结类型" style="width: 100%">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="填写时间:" prop="summaryYear">
              <el-date-picker
                style="width: 100%"
                v-model="ruleForm.summaryYear"
                type="year"
                placeholder="选择年">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容:">
              <wangEditor  :catchData="catchData"></wangEditor>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-upload
                class="upload-demo"
                ref="upload"
                multiple
                :data="fileData"
                action="http://gyfxkhapi.matian.ml:8008/api-fxkh/api/attachment/v0.1/attachment/upload"
                :on-change="handleChange"
                :on-remove="handleRemove"
                :on-success="handleAvatarSuccess"
                :file-list="fileList"
                :before-upload="beforeAvatarUpload"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="text-align: right">
            <el-form-item style="margin-bottom: 0!important;">
              <el-button type="primary" @click="submitForm" :loading="loading">提交</el-button>
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
    <el-dialog
      :title="previewTitle"
      :visible.sync="previewVisible"
      :modal-append-to-body="bodyFalse"
      width="30%">
      <div>
        <input v-model.number="page" type="number" style="width: 5em"> /{{numPages}}
        <div v-if="loadedRatio > 0 && loadedRatio < 1" style="background-color: green; color: white; text-align: center" :style="{ width: loadedRatio * 100 + '%' }">{{ Math.floor(loadedRatio * 100) }}%</div>
        <pdf
          :src="previewSrc"
          :page="page"
          @num-pages="numPages = $event"
          @progress="loadedRatio = $event"
        ></pdf>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import wangEditor from '../wangEditor'
  import pdf from 'vue-pdf'
  import preview from '../preview'
  export default {
    name: "dispatch",
    components:{wangEditor,preview,pdf},
    data(){
      return{
        pageSize: 20, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        tableData: [],
        loadedRatio:0,
        page: 1,
        numPages: 0,
        summaryYear:new Date(),
        options: [
          {
            value: '1',
            label: '年中总结'
          },
          {
            value: '2',
            label: '年终总结'
          }],
        summaryType: "",
        summarizeName:"",
        currentPage4: 1,
        fileList: [],
        upFileUrl:this.$url.uploadUrl,
        tableHeader:[
          {data:'',title:'',type:"selection"},
          {data:'TITLE',title:'总结名称',type:"normal"},
          {data:'SUMMARY_YEAR',title:'总结年份',type:"normal"},
          {data:'NAME',title:'总结类型',type:"normal"},
          {data:'REALNAME',title:'填写人员',type:"normal"},
          {data:'GNAME',title:'填写单位',type:"normal"},
          {data:'CREATE_TIME',title:'填写时间',type:"normal"},
          {data:'ATTACHMENT',title:'附件',},
          {data:'caozuo',title:'操作'},
        ],
        multipleSelection:[],
        loading: true,
        dialogVisible: false,
        previewVisible: false,
        ruleForm:{
          title:"",
          reportUserid:"刘波",
          summaryType:"",
          summaryYear:new Date(),
          content:""
        },
        rules:{
          title: [
            { required: true, message: '请输入汛后总结标题', trigger: 'blur' },
          ],
          reportUserid: [
            { required: true, message: '请输入填写人员', trigger: 'blur' },
          ],
          summaryType:[
            { required: true, message: '请选择总结类型', trigger: 'change' }
          ],
          summaryYear:[
            { required: true, message: '请选择时间', trigger: 'blur' }
          ],
        },
        bodyFalse:false,
        title:"",
        previewTitle:"",
        previewSrc:"",
        screenWidth:document.body.clientWidth,
        fileData:{
          bizId:"",
          attType:"8"
        }
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
          "summaryYear":new Date(that.summaryYear).getFullYear(),
          "title":that.summarizeName,
          "summaryType":that.summaryType,
        };
        that.$http.post(that.$url.baseUrl+'api/guoYang/v0.1/latter-summary/gy/list',parms)
          .then((res)=>{
            if(res.status===200){
              setTimeout(()=>{
                that.loading=false;
                let data=res.data.result;
                $.each(data,(v,item)=>{
                  item.CREATE_TIME=new Date(item.CREATE_TIME).formatDate('yyyy-MM-dd');
                  if (item.ATTACHMENT) {
                    item.ATTACHMENT = JSON.parse(item.ATTACHMENT)
                  }
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
            this.multipleSelection.push(item.PLAN_ID);
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
      // Formatter(scope){
      //   console.log(scope);
      // },
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
          export_json_to_excel(tHeader, data, ' 防汛抗旱预案管理统计表');
        })
      },
      formatJson(filterVal, jsonData){
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //行内编辑
      handleEdit(index, row) {
        this.title="预案管理修改";
        this.dialogVisible=true;
        this.ruleForm.thresholdName=row.THRESHOLD_NAME;
        this.ruleForm.thresholdValue=row.THRESHOLD_VALUE;
        this.ruleForm.thresholdValueType=row.THRESHOLD_VALUE_TYPE;
        this.ruleForm.alarmLevel=row.ALARM_LEVEL;
        this.ruleForm.alarmLevelColor=row.ALARM_LEVEL_COLOR;
        this.ruleForm.countermeasures=row.COUNTERMEASURES;
        this.ruleForm.planId=row.PLAN_ID;
      },
      //行内删除
      handleDelete(index, row) {
        this.multipleSelection=[];
        this.multipleSelection.push(row.PLAN_ID);
        this.del();
      },
      preview(item){
        this.previewTitle=item.name;
        this.previewVisible=true;
        this.previewSrc=item.pdfurl;
        // attachmentPreview(item.name,item.url,item.type)
      },
      //重置
      resetForm() {
        this.$refs['ruleForm'].resetFields();
        this.fileList=[];
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
        this.fileList=[];
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
        this.$http.delete(this.$url.baseUrl+'api/guoYang/auxiliary-decision/v0.1/gy-fxkh-plan-manage/delete',{data:this.multipleSelection}).then((res)=>{
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
        this.title='新增汛后总结';
      },
      /**
       *汛后总结新增及修改
       */
      submitForm() {
        const _this=this;
        _this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let url,msg,msg1;
            if(_this.title==="新增汛后总结"){
              url=_this.$url.baseUrl+'api/guoYang/v0.1/latter-summary/gy';
              msg="新增成功";
              msg1="新增失败";
              _this.ruleForm.reportUserid='3804';
              _this.ruleForm.summaryYear=new Date(this.ruleForm.summaryYear).getFullYear();
            }else{
              url=_this.$url.baseUrl+'api/guoYang/v0.1/latter-summary/update';
              msg="修改成功";
              msg1="修改失败";
              _this.ruleForm.reportUserid='3804';
              _this.ruleForm.summaryYear=new Date(this.ruleForm.summaryYear).getFullYear();
            }
            _this.$http.put(url,_this.ruleForm).then((res)=>{
              if(res.status===200){
                if(_this.fileList.length>0){
                  _this.loading=true;
                  _this.fileData.bizId=res.data.result.message;
                  _this.$refs.upload.submit();
                }else{
                  _this.$message({
                    type:"success",
                    message:msg
                  });
                  _this.dialogVisible=false;
                  _this.loading=true;
                  _this.multipleSelection=[];
                  _this.fileList=[];
                  _this.search();
                  _this.$refs['ruleForm'].resetFields();
                  this.ruleForm={
                    title:"",
                    reportUserid:"3804",
                    summaryType:"",
                    summaryYear:new Date(),
                    content:""
                  };
                }
              }else{
                _this.$message({
                  type:"error",
                  message:msg1
                });
                _this.$refs['ruleForm'].resetFields();
                _this.fileList=[];
                this.ruleForm={
                  title:"",
                  reportUserid:"3804",
                  summaryType:"",
                  summaryYear:new Date(),
                  content:""
                };
              }
            })
          } else {
            return false;
          }
        });
      },
      /**
       * 移除文件回调
       * @param file
       * @param fileList
       */
      handleRemove(file, fileList) {

      },
      /**
       * 选择文件后回调
       * @param file
       */
      handleChange(file, fileList) {
        this.fileList=fileList;
      },
      /**
       * 上传文件之前回调限制大小
       * @param file
       * @returns {boolean}
       */
      beforeAvatarUpload(file) {
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
          this.$message.error('文件大小不能超过10MB！');
        }
        return  isLt10M;
      },
      handleAvatarSuccess(res, file){
        if(res){
          this.dialogVisible=false;
          this.loading=true;
          this.$message({
            type:"success",
            message:"添加文件成功"
          });
          this.search();
        }else{
          this.dialogVisible=false;
          this.loading=true;
          this.$message({
            type:"error",
            message:"添加文件失败"
          });
          this.search();
        }
      },
      catchData(value){
        this.ruleForm.content=value
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
  #dispatch .box-card{
    height: calc(100vh - 89px);
  }
  #dispatch .footer{
    position: absolute;
    bottom: 10px;

  }
  #dispatch .el-pagination{
    float: left;
  }
  #dispatch .choice{
    float: left;
    padding: 2px 5px;

  }
  #dispatch .choice span{
    line-height: 28px;
    font-size: 13px;
    color: #606266;
  }
  #dispatch .el-scrollbar__bar{
    /*display: none;*/
  }
  #dispatch .table-button{
    padding-left: 5px;
    border-top: 1px solid #dddddd;
    border-left: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    background: linear-gradient(to top, #dbdada 0%,#E5E5E5 10%, #efeeee 100%,#ffffff)
  }
  #dispatch .table-button .add{
    color: #333;
    font-size: 14px;
    margin-left: 0;
  }
  #dispatch .table-button .add:hover{
    color: #0a95ef;
  }
  #dispatch .attachment{
    text-decoration: underline;
    cursor: pointer;
    color: #0a95ef
  }
</style>
<style>
  #dispatch .table-button .add span{
    margin-left: 5px!important;
  }
  #dispatch .el-dialog{
    width: 50%!important;
  }
  #dispatch .el-dialog .el-dialog__body{
    padding: 20px!important;
    height: 550px;
    overflow-y: auto;
  }
</style>
