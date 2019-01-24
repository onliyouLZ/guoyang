<template>
    <div id="rescue"
         v-loading="loading"
         element-loading-text="加载中">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <label>单位:</label>
          <el-select v-model="company" clearable  placeholder="请选择" style="width: 150px">
            <el-option
              v-for="item in cOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <label>姓名:</label>
          <el-select v-model="person" clearable  placeholder="请选择" style="width: 150px">
            <el-option
              v-for="item in pOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
              v-if="item.data==='RT_NAME'"
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
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="队伍名称:" prop="rtName">
                <el-input v-model="ruleForm.rtName"  placeholder="请输入队伍名称"></el-input>
              </el-form-item>
              <el-form-item label="领导" prop="userId">
                <ul  id="treeDemo" class="ztree"></ul>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="选择类型" prop="rtType">
                <el-radio v-model="ruleForm.rtType" label="常驻抢险队伍">常驻抢险队伍</el-radio>
                <el-radio v-model="ruleForm.rtType" label="临时抢险队伍">临时抢险队伍</el-radio>
              </el-form-item>
              <el-form-item label="队伍人数:" prop="teamMemberInfo">
                <el-input v-model="ruleForm.teamMemberInfo"  placeholder="请输入队伍人数"></el-input>
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
  import {toTree} from '../../utils/utils'
  export default {
    name: "rescue",
    data(){
      return{
        pageSize: 20, // 每页大小默认值
        pageIndex: 1, // 默认第一页
        tableData: [],
        currentPage4: 1,
        tableHeader:[
          {data:'',title:'',type:"selection"},
          {data:'GNAME',title:'单位',type:"normal"},
          {data:'RT_NAME',title:'队伍名称',type:"RT_NAME"},
          {data:'RT_TYPE',title:'队伍性质',type:"normal"},
          {data:'REALNAME',title:'队长姓名',type:"normal"},
          {data:'DEPART',title:'队长职务',type:"normal"},
          {data:'TEL',title:'队长固定电话',type:"normal"},
          {data:'MOBILE_PHONE',title:'队长手机号',type:"normal"},
          {data:'TEAM_MEMBER_INFO',title:'队伍人数',type:"normal"},
          {data:'caozuo',title:'操作'},
        ],
        multipleSelection:[],
        exportMulti:[],
        loading: true,
        dialogVisible: false,
        cOptions:[],
        pOptions:[],
        company:[],
        person:[],
        ruleForm:{
          rtName:"",
          rtType:'常驻抢险队伍',
          teamMemberInfo:"",
          userId:"",
        },
        rules:{
          rtName: [
            { required: true, message: '请输入队伍名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          teamMemberInfo: [
            { required: true, message: '请输入队员名称', trigger: 'blur' },
          ],
          rtType:[
            { required: true, message: '请选择队伍类型', trigger: 'change' }
          ],
          userId:[
            { required: true, message: '请选择领导', trigger: 'change' }
          ],
        },
        bodyFalse:false,
        title:"新增抢险队伍",
        screenWidth:document.body.clientWidth,
        setting:{
          view: {
            selectedMulti: false
          },
          data:{
            simpleData:{
              enable: true,
            }
          },
          check:{
            enable: true,
            chkStyle: "radio",
            radioType: "all"
          },
          callback:{
            onCheck: this.zTreeOnCheck
          },
        },
        zNodes:[],
        upNodes:[]
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
          "gidList":this.company ==""? []:[this.company],
          "userIdList":this.person ==""? []:[this.person]
        };
        that.$http.post(that.$url.baseUrl+'api/guoYang/rescue-team/v0.1/team/list',parms)
          .then((res)=>{
            if(res.status===200){
              setTimeout(()=>{
                that.loading=false;
                let data=res.data.result;
                that.tableData=data;
              },500);

            }else{
              this.$message({
                type:"error",
                message:"获取队伍信息失败"
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
            this.multipleSelection.push(item.RT_ID);
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
          export_json_to_excel(tHeader, data, '抢险队伍统计表');
        })
      },
      formatJson(filterVal, jsonData){
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //行内编辑
      handleEdit(index, row) {
        this.title="抢险队伍修改";
        this.dialogVisible=true;
        this.ruleForm.rtName=row.RT_NAME;
        this.ruleForm.rtType=row.RT_TYPE;
        this.ruleForm.teamMemberInfo=row.TEAM_MEMBER_INFO;
        this.ruleForm.userId=row.USER_ID;
        this.ruleForm.rtId=row.RT_ID;
        $.each(this.upNodes,(v,item)=>{
           if(item.id===row.USER_ID){
             item.checked="true";
           }
        });
        this.zNodes=toTree(this.upNodes);
        this.$nextTick(()=>{
          $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes)
        });
      },
      //行内删除
      handleDelete(index, row) {
        this.multipleSelection=[];
        this.multipleSelection.push(row.RT_ID);
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
          rtName:"",
          rtType:'常驻抢险队伍',
          teamMemberInfo:"",
          userId:"",
        };
        $.each(this.upNodes,(v,item)=>{
          item.checked="false";
        });
      },
      /**
       * 抢险队伍删除
       */
      del(){
        if(this.multipleSelection.length>0){
          this.$http.delete(this.$url.baseUrl+'api/guoYang/rescue-team/v0.1/team',{data:this.multipleSelection}).then((res)=>{
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
        this.title='新增抢险队伍';
        this.$nextTick(()=>{
          $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes)
        });
      },
      /**
       *抢险队伍新增及修改
       */
      submitForm() {
        const _this=this;
        _this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let url,msg,msg1;
            let parms;
            if(_this.title==="新增抢险队伍"){
              url=_this.$url.baseUrl+'api/guoYang/rescue-team/v0.1/team';
              msg="新增成功";
              msg1="新增失败";
              parms=[];
              parms.push(_this.ruleForm);
            }else{
              url=_this.$url.baseUrl+'api/guoYang/rescue-team/v0.1/team/update';
              msg="修改成功";
              msg1="修改失败";
              parms=_this.ruleForm;
            }
            _this.dialogVisible=false;
            _this.$http.put(url,parms).then((res)=>{
              if(res.status===200){
                _this.$message({
                  type:"success",
                  message:msg
                });
                _this.loading=true;
                _this.multipleSelection=[];
                _this.search();
                _this.$refs['ruleForm'].resetFields();
                _this.dialogVisible=false;
              }else{
                _this.$message({
                  type:"error",
                  message:msg1
                });
                _this.$refs['ruleForm'].resetFields();
                _this.dialogVisible=false;
              }
            })
          } else {
            return false;
          }
        });
      },
      zTreeOnCheck(event, treeId, treeNode) {
        if(treeNode.checked){
          this.ruleForm.userId=treeNode.GROUP_ID;
          this.$refs['ruleForm'].clearValidate('userId')
        }else{
          this.ruleForm.userId="";
        }
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
        //获取单位
        function getCompany() {
          return that.$http.post(that.$url.baseUrl+'api/user/v0.1/ht/pda-group/list');
        };
        //获取用户组
        function getPdaGroup() {
          return that.$http.post(that.$url.baseUrl+'api/user/v0.1/ht/pda-group/list',{groupId:"",groupName:""});
        };
        //获取人员
        function getPerson() {
          return that.$http.post(that.$url.baseUrl+'api/user/v0.1/ht/pda-user/list',{groupIdList:[]});
        };
        that.$http.all([getCompany(),getPerson(),getPdaGroup()]).then(that.$http.spread((company,person,group)=>{
          setTimeout(()=>{
            that.loading=false;
            if(company.status===200){
              let data=company.data.result;
              let arr=[];
              $.each(data,(v,item)=>{
                let obj={
                  label:item.GROUP_NAME,
                  value:item.GROUP_ID
                };
                arr.push(obj);
              });
              this.cOptions=arr;
            }else{
              this.$message({
                type:"error",
                message:"获取单位失败"
              })
            };
            if(person.status===200){
              let data=person.data.result;
              let arr=[];
              $.each(data,(v,item)=>{
                item.pid=item.GROUP_ID;
                item.id=item.USER_ID;
                item.name=item.GROUP_NAME;
                let obj={
                  label:item.ACTUAL_NAME,
                  value:item.USER_ID
                };
                arr.push(obj);
              });
              this.pOptions=arr;
            }else{
              this.$message({
                type:"error",
                message:"获取人员信息失败"
              })
            };
            if(group.status===200){
              let data=group.data.result;
              let userData=person.data.result;
              $.each(data,function (i,Gitem) {
                Gitem.type='duty';
                $.each(userData,function (j,Uitem) {
                  let obj={};
                  if(Gitem.GROUP_ID===Uitem.GROUP_ID){
                    obj.GROUP_NAME=Uitem.ACTUAL_NAME;
                    obj.GROUP_PID=Uitem.GROUP_ID;
                    obj.GROUP_ID=Uitem.USER_ID;
                    data.push(obj)
                  }
                });
              });
              this.upNodes=data;
              data=toTree(data);
              this.zNodes=data;
            }
          },500)
        }));
      })
    }
  }
</script>
<style scoped>
 #rescue .box-card{
    height: calc(100vh - 89px);
  }
 #rescue .footer{
    position: absolute;
    bottom: 10px;

  }
 #rescue .el-pagination{
    float: left;
  }
 #rescue .choice{
    float: left;
    padding: 2px 5px;

  }
 #rescue .choice span{
    line-height: 28px;
    font-size: 13px;
    color: #606266;
  }
 #rescue .el-scrollbar__bar{
    /*display: none;*/
  }
 #rescue .table-button{
    padding-left: 5px;
    border-top: 1px solid #dddddd;
    border-left: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    background: linear-gradient(to top, #dbdada 0%,#E5E5E5 10%, #efeeee 100%,#ffffff)
  }
 #rescue .table-button .add{
    color: #333;
    font-size: 14px;
    margin-left: 0;
  }
 #rescue .table-button .add:hover{
    color: #0a95ef;
  }
</style>
<style>
  @import "../../ztree/zTree_v3/css/zTreeStyle/zTreeStyle.css";
  #rescue .table-button .add span{
    margin-left: 5px!important;
  }
  #rescue .el-dialog{
    width: 50%!important;
  }
  #rescue .el-dialog .el-dialog__body{
    padding: 20px!important;
  }
  #rescue .ztree li span.button.pIcon01_ico_open{
    margin-right:2px;
    background: url(../../ztree/zTree_v3/css/zTreeStyle/img/diy/1_open.png) no-repeat scroll 0 0 transparent;
    vertical-align:top;
    *vertical-align:middle}
  #rescue .ztree li span.button.pIcon01_ico_close{
    margin-right:2px;
    background: url(../../ztree/zTree_v3/css/zTreeStyle/img/diy/1_close.png) no-repeat scroll 0 0 transparent;
    vertical-align:top;
    *vertical-align:middle}
  #rescue .ztree li span.pIcon01_ico_docu{
    margin-right:2px;
    background: url(../../ztree/zTree_v3/css/zTreeStyle/img/diy/1_open.png) no-repeat scroll 0 0 transparent;
    vertical-align:top;
    *vertical-align:middle}
</style>
