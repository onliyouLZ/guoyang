<template>
  <div id="soilDliog">
    <el-dialog
      :visible.sync="visible"
      :title="dialogData.STNM"
      @close="childClose">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first" lazy>
          <span slot="label"><i class="fa fa-calendar-o"></i>&nbsp;基本信息</span>
          <table class="dilogTable" cellspacing="0">
            <tr>
              <td class="u-list-title">测站编码</td>
              <td ><span>{{optionData.STCD}}</span></td>
              <td class="u-list-title">测站名称</td>
              <td ><span>{{optionData.STNM}}</span></td>
            </tr>
            <tr>
              <td class="u-list-title">河流名称</td>
              <td><span>{{optionData.RVNM}}</span></td>
              <td class="u-list-title">水系名称</td>
              <td><span>{{optionData.HNNM}}</span></td>
            </tr>
            <tr>
              <td class="u-list-title">流域:</td>
              <td><span>{{optionData.BSNM}}</span></td>
              <td class="u-list-title">县（市）</td>
              <td><span>{{optionData.ADNM}}</span></td>
            </tr>
            <tr>
              <td class="u-list-title">经度</td>
              <td><span>{{optionData.LGTD}}</span></td>
              <td class="u-list-title">纬度</td>
              <td><span>{{optionData.LTTD}}</span></td>
            </tr>
            <tr>
              <td class="u-list-title">站类</td>
              <td><span>{{optionData.zl}}</span></td>
              <td class="u-list-title">站址</td>
              <td><span>{{optionData.STLC}}</span></td>
            </tr>
            <tr>
              <td class="u-list-title">报讯等级</td>
              <td><span>{{optionData.FRGRD}}</span></td>
              <td class="u-list-title">测站岸别</td>
              <td><span>{{optionData.STBK}}</span></td>
            </tr>
            <tr>
              <td class="u-list-title">测站方位</td>
              <td><span>{{optionData.STAZT}}</span></td>
              <td class="u-list-title">至河口距离</td>
              <td><span>{{optionData.DSTRVM}}</span></td>
            </tr>
            <tr>
              <td class="u-list-title">集水面积</td>
              <td><span>{{optionData.DRNA}}</span></td>
              <td class="u-list-title">拼音码</td>
              <td><span>{{optionData.PHCD}}</span></td>
            </tr>
            <tr>
              <td class="u-list-title">备注</td>
              <td colspan="3"><span>{{optionData.COMMENTS}}</span></td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "soilDliog",
    data(){
      return{
        visible:this.soilVisible,
        activeName: 'first',
        isCollapsed:true,
        optionData:""
      }
    },
    props:{
      soilVisible:{
        type:Boolean,
        default:false
      },
      dialogData:{
        type:Object,
        default:{}
      }
    },
    methods:{
      /**
       * tab切换事件
       */
      handleClick(tab, event){

      },
      //获取基本信息
      getBasic(){
        const _this=this;
        let parms={
          keyword: _this.dialogData.STCD,
        };
        _this.$http.post(_this.$url.baseUrl+"api/commonApi/sl323/v0.1/basic/st/stStbprpB/selectAll",parms).then((res)=>{
          if(res.status===200){
            let data=res.data.result[0];
            _this.optionData=data;
          }
        })
      },


      childClose(){
        this.$emit('update:soilVisible',false);
      }
    },
    watch:{
      /**
       * 是否显示弹窗
       */
      soilVisible(){
        this.visible=this.soilVisible;
        if(this.visible){
          this.activeName="first";
          this.getBasic();
        }
      }
    },
    mounted(){

    },
  }
</script>

<style  scoped>


</style>
<style>
  #soilDliog .search{
    padding:10px 20px;
  }


</style>
