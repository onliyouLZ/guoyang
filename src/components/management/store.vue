<template>
  <div id="store"
       v-loading="loading"
       element-loading-text="加载中">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <label>仓库名称:</label>
        <el-input v-model="input" placeholder="请输入仓库名称" style="width: 150px"></el-input>
        <el-button type="primary" @click="primary">查询</el-button>
        <el-button type="success" @click="exportExcel(tableData,multipleSelection)">导出</el-button>
      </div>
      <!--<el-scrollbar-->
      <!--style="height: 100%;"-->
      <!--tag="table"-->
      <!--:viewStyle="{width:'100%'}">-->
      <!--<div style="max-height: 700px">-->
      <div class="table-button">
        <el-button type="text" icon="fa  fa-plus" class="add" @click="dialogVisible=true,title='仓库新增'">新增</el-button>
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
            v-if="item.data==='WH_NAME'"
            :prop="item.data"
            :label="item.title"
            min-width="150"
            align="center">
          </el-table-column>
          <el-table-column
            v-if="item.data==='COMMENTS'"
            :prop="item.data"
            :label="item.title"
            min-width="200"
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
      width="30%">
      <!--<el-form  ref="form" :model="form" label-width="80px" :rules="rules">-->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="仓库名称:" prop="whName">
              <el-input v-model="ruleForm.whName"  placeholder="请输入仓库名称"></el-input>
            </el-form-item>
            <el-form-item label="经度(°):" prop="lgtd">
              <el-input  v-model.number="ruleForm.lgtd" placeholder="请输入经度"></el-input>
            </el-form-item>
            <el-form-item label="仓库面积(m²):" prop="whArea">
              <el-input v-model.number="ruleForm.whArea" placeholder="请输入仓库面积"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="orgcd">
              <el-select
                v-model="ruleForm.orgcd"
                placeholder="请选择单位"
                style="width: 100%">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <!--<el-button type="primary" @click="mapDligShow=true">地图选点</el-button>-->
            </el-form-item>
            <el-form-item label="纬度(°):" prop="lttd">
              <el-input  v-model.number="ruleForm.lttd" placeholder="请输入纬度">
                <el-button type="primary" slot="append" @click="mapDligShow=true">地图选点</el-button>
              </el-input>
            </el-form-item >
            <el-form-item label="责任人" prop="manageDutyPerson">
              <el-input v-model="ruleForm.manageDutyPerson" placeholder="请输入责任人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="comments">
              <el-input type="textarea" v-model="ruleForm.comments" placeholder="备注"></el-input>
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
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
      <!--</span>-->
    </el-dialog>
    <el-dialog
      title="选点"
      :visible.sync="mapDligShow"
      :modal-append-to-body="bodyFalse"
      style="height: 100%;overflow-y: hidden"
      width="30%">
      <map-dliog @closeMap="closeMap"></map-dliog>
    </el-dialog>
  </div>
</template>

<script>
  import mapDliog from '../../components/mapDliog'

  export default {
    name: "store",
    components:{mapDliog},
    data(){
      /**
       * 自定义验证规则
       * @param rule 规则
       * @param value 值
       * @param callback 返回
       */
      let lgtdCheck=function(rule,value,callback){
        if(value === ""){
          callback(new Error('不能为空'));
        }else{
          let eG=/^\d{1,3}(\.\d{1,4})?$/;
          if(typeof value==="number"){
            if(!eG.test(value)){
              callback(new Error('整数只能保留三位(小数只能保留四位)'));
            }
            callback()
          }else{
            callback(new Error('只能为数组,小数'));
          }
        }
      };
      let lttdCheck=function(rule,value,callback){
        if(value === ""){
          callback(new Error('不能为空'));
        }else{
          let eG=/^\d{1,3}(\.\d{1,4})?$/;
          if(typeof value==="number"){
            if(!eG.test(value)){
              callback(new Error('整数只能保留三位(小数只能保留四位)'));
            }
            else {
              callback()
            }
          }else{
            callback(new Error('只能为数组,小数'));
          }
        }
      };
      return{
        pageSize: 20, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        tableData: [],
        currentPage4: 1,
        tableHeader:[
          {data:'',title:'',type:"selection"},
          {data:'WH_NAME',title:'仓库名称',type:"whName"},
          {data:'ORGNM',title:'仓库所属单位',type:"normal"},
          {data:'LGTD',title:'经度(°)',type:"normal"},
          {data:'LTTD',title:'纬度(°)',type:"normal"},
          {data:'WH_AREA',title:'仓库面积(㎡)',type:"normal"},
          {data:'MANAGE_DUTY_PERSON',title:'责任人',type:"normal"},
          {data:'COMMENTS',title:'备注',type:"comments"},
          {data:'caozuo',title:'操作'},
        ],
        input:"",
        multipleSelection:[],
        loading: true,
        dialogVisible: false,
        mapDligShow: false,
        options:[],
        ruleForm:{
          whName:"",
          orgcd:'',
          lgtd:"",
          lttd:"",
          whArea:"",
          comments:"",
          manageDutyPerson:""
        },
        rules:{
          whName: [
            { required: true, message: '请输入仓库名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          orgcd:[
            { required: true, message: '请选择单位', trigger: 'change' }
          ],
          lgtd:[
            {validator:lgtdCheck, trigger: 'blur'},
          ],
          lttd:[
            {validator:lttdCheck, trigger: 'blur'},
          ],
          manageDutyPerson:[
            { required: true, message: '责任人不能为空', trigger: 'blur' }
          ],
          whArea:[
            { required: true, message: '面积不能为空', trigger: 'blur' },
            {type:'number',message:"面积必须为数字值"}
          ],
        },
        bodyFalse:false,
        title:"新增仓库",
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
        function getCompany() {
          return that.$http.post(that.$url.baseUrl+'api/guoYang/v0.1/material-manage/sysorg/list');
        };
        function getWarehouse() {
          let prams={
            orgcd:"",
            whName:that.input
          };
          return that.$http.post(that.$url.baseUrl+'api/guoYang/v0.1/material-manage/warehouse/list',prams);
        };
        that.$http.all([getCompany(),getWarehouse()]).then(that.$http.spread((company, warehouse)=>{
          setTimeout(()=>{
            that.loading=false;
            if(company.status===200){
              let data=company.data.result;
              let arr=[];
              $.each(data,(v,item)=>{
                let obj={
                  label:item.ORGNM,
                  value:item.ORGCD
                };
                arr.push(obj)
              });
              this.options=arr;
            }else{
              this.$message({
                type:"error",
                message:"获取单位失败"
              })
            };
            if(warehouse.status===200){
              let data=warehouse.data.result;
              this.tableData=data;
            }else{
              this.$message({
                type:"error",
                message:"获取仓库列表失败"
              })
            }
          },500)

        }))
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
            this.multipleSelection.push(item.WH_CD);
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
          export_json_to_excel(tHeader, data, ' 仓库管理统计表');
        })
      },
      formatJson(filterVal, jsonData){
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //行内编辑
      handleEdit(index, row) {
        this.title="仓库修改";
        this.dialogVisible=true;
        this.ruleForm.whName=row.WH_NAME;
        this.ruleForm.orgcd=row.ORGCD;
        this.ruleForm.lttd=parseFloat(row.LTTD);
        this.ruleForm.lgtd=parseFloat(row.LGTD);
        this.ruleForm.whArea=row.WH_AREA;
        this.ruleForm.manageDutyPerson=row.MANAGE_DUTY_PERSON;
        this.ruleForm.comments=row.COMMENTS;
        this.ruleForm.whCd=row.WH_CD
      },
      //行内删除
      handleDelete(index, row) {
        this.multipleSelection=[];
        this.multipleSelection.push(row.WH_CD);
        this.del();
      },
      //重置
      resetForm(ruleForm) {
        this.dialogVisible=false;
        this.$refs[ruleForm].resetFields();
      },
      closeMap(data){
        if(data){
          this.mapDligShow=false;
          this.ruleForm.lgtd=parseFloat(data[0].toFixed(2));
          this.ruleForm.lttd=parseFloat(data[1].toFixed(2));
          this.$refs['ruleForm'].clearValidate(['lgtd','lttd']);
          this.$message({
            message: '获取坐标成功！',
            type: 'success'
          });
        }
      },
      /**
       * 仓库删除
       */
      del(){
        this.$http.delete(this.$url.baseUrl+'api/guoYang/v0.1/material-manage/warehouse',{data:this.multipleSelection}).then((res)=>{
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
      /**
       * 仓库新增及修改
       */
      submitForm() {
        const _this=this;
        _this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let url,msg,msg1;
            if(_this.title==="仓库新增"){
              url=_this.$url.baseUrl+'api/guoYang/v0.1/material-manage/warehouse';
              msg="新增成功";
              msg1="新增失败"
            }else{
              url=_this.$url.baseUrl+'api/guoYang/v0.1/material-manage/warehouse/update';
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
            }).catch((error)=>{
              _this.$message({
                type:"success",
                message:msg1
              });
              _this.$refs['ruleForm'].resetFields();
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
          $('.tables').css('height',"400px")
        }else if(this.screenWidth>1366 || this.screenWidth<1920){
          $('.tables').css('height',"500px")
        }
      })
    }
  }
</script>

<style scoped>
 #store .box-card{
    height: calc(100vh - 89px);
  }
 #store .footer{
    position: absolute;
    bottom: 10px;

  }
 #store .el-pagination{
    float: left;
  }
 #store .choice{
    float: left;
    padding: 2px 5px;

  }
 #store .choice span{
    line-height: 28px;
    font-size: 13px;
    color: #606266;
  }
 #store .el-scrollbar__bar{
    /*display: none;*/
  }
 #store .table-button{
   padding-left: 5px;
   border-top: 1px solid #dddddd;
   border-left: 1px solid #dddddd;
   border-right: 1px solid #dddddd;
   background: linear-gradient(to top, #dbdada 0%,#E5E5E5 10%, #efeeee 100%,#ffffff)
 }
 #store .table-button .add{
   color: #333;
   font-size: 14px;
   margin-left: 0;
 }
 #store .table-button .add:hover{
   color: #0a95ef;
 }
</style>
<style>
  #store .table-button .add span{
    margin-left: 5px!important;
  }
  #store .el-dialog{
    width: 50%!important;
  }
  #store .el-dialog .el-dialog__body{
    padding: 20px!important;
  }
</style>
