<template>
  <div id="store"
       v-loading="loading"
       element-loading-text="加载中">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <label>仓库名称:</label>
        <el-input v-model="input" placeholder="请输入内容" style="width: 150px"></el-input>
        <el-button type="primary" @click="primary">查询</el-button>
        <el-button type="success" @click="exportExcel(tableData,multipleSelection)">导出</el-button>
      </div>
      <!--<el-scrollbar-->
      <!--style="height: 100%;"-->
      <!--tag="table"-->
      <!--:viewStyle="{width:'100%'}">-->
      <!--<div style="max-height: 700px">-->
      <div class="table-button">
        <el-button type="text" icon="fa  fa-plus" class="add" @click="dialogVisible=true;title='仓库新增'">新增</el-button>
        <el-button type="text" icon="fa fa-trash-o" class="add">删除</el-button>
      </div>
      <el-table
        :data="tables"
        border
        style="width: 100%"
        max-height="650"
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
              <el-input v-model="ruleForm.lgtd"></el-input>
            </el-form-item>
            <el-form-item label="仓库面积(m²):" prop="whArea">
              <el-input v-model="ruleForm.whArea" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="orgcd">
              <el-select v-model="ruleForm.orgcd" placeholder="请选择单位">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="纬度(°):" prop="lttd">
              <el-input v-model="ruleForm.lttd"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">地图选点</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="comments">
              <el-input type="textarea" v-model="ruleForm.comments"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
  </div>
</template>

<script>
  export default {
    name: "store",
    data(){
      return{
        pageSize: 20, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        tableData: [],
        currentPage4: 1,
        tableHeader:[
          {data:'',title:'',type:"selection"},
          {data:'WH_NAME',title:'仓库名称',type:"normal"},
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
        options:[
          {
            value: '1',
            label: '涡阳县'
          }
        ],
        ruleForm:{
          whName:"",
          orgcd:'',
          lgtd:"",
          lttd:"",
          whArea:"",
          comments:""
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
            { required: true, message: '经度不能为空', trigger: 'blur' }
          ],
          lttd:[
            { required: true, message: '纬度不能为空', trigger: 'blur' }
          ],
          whArea:[
            { required: true, message: '面积不能为空', trigger: 'blur' }
          ],
        },
        bodyFalse:false,
        title:"新增仓库"
      }
    },
    created(){
      setTimeout(()=>{
        this.loading=false;
        this.tableData=[
          {"WH_NAME":"涡阳防汛抗旱物资仓库","ORGNM":"涡阳县","LGTD":"116.19","LTTD":"33.55","WH_AREA":"450","MANAGE_DUTY_PERSON":"柯启勇","COMMENTS":"涡阳县第一仓库"},
          {"WH_NAME":"涡阳防汛抗旱物资仓库","ORGNM":"涡阳县","LGTD":"116.19","LTTD":"33.55","WH_AREA":"450","MANAGE_DUTY_PERSON":"柯启勇","COMMENTS":"涡阳县第一仓库"},
          {"WH_NAME":"涡阳防汛抗旱物资仓库","ORGNM":"涡阳县","LGTD":"116.19","LTTD":"33.55","WH_AREA":"450","MANAGE_DUTY_PERSON":"柯启勇","COMMENTS":"涡阳县第一仓库"},
          {"WH_NAME":"涡阳防汛抗旱物资仓库","ORGNM":"涡阳县","LGTD":"116.19","LTTD":"33.55","WH_AREA":"450","MANAGE_DUTY_PERSON":"柯启勇","COMMENTS":"涡阳县第一仓库"},
          {"WH_NAME":"涡阳防汛抗旱物资仓库","ORGNM":"涡阳县","LGTD":"116.19","LTTD":"33.55","WH_AREA":"450","MANAGE_DUTY_PERSON":"柯启勇","COMMENTS":"涡阳县第一仓库"},
          {"WH_NAME":"涡阳防汛抗旱物资仓库","ORGNM":"涡阳县","LGTD":"116.19","LTTD":"33.55","WH_AREA":"450","MANAGE_DUTY_PERSON":"柯启勇","COMMENTS":"涡阳县第一仓库"},
        ];
      },1000);

    },
    methods:{
      handleSizeChange(val) {
        this.pageSize = val
      },
      handleCurrentChange(val) {
        this.loading=true;
        this.pageIndex = val;
        setTimeout(()=>{
          this.loading=false;
        },1000)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      rowClick(row, event, column){
        this.$refs.multipleTable.toggleRowSelection(row);
      },
      primary(){
        this.loading=true;
        setTimeout(()=>{
          this.loading=false;
        },1000)
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
      handleEdit(index, row) {
        this.title="仓库修改";
        this.dialogVisible=true;
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      submitForm(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.dialogVisible=false;
            alert('submit!');
            this.$refs[ruleForm].resetFields();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(ruleForm) {
        this.$refs[ruleForm].resetFields();
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
