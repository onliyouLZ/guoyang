<template>
  <div id="videoDliog">
    <el-dialog
      :visible.sync="visible"
      :title="dialogData.STNM"
      @close="childClose">
      <el-card class="box-card">
        <table class="dilogTable" cellspacing="0">
          <tr>
            <td class="u-list-title">站名</td>
            <td class="u-list-title">摄像头IP</td>
            <td class="u-list-title">摄像头端口</td>
            <td class="u-list-title">摄像头登录名</td>
            <td class="u-list-title">摄像头密码</td>
          </tr>
          <tr>
            <td width="20%"><span >{{optionData.STNM}}</span></td>
            <td width="20%"><span >{{optionData.CIP}}</span></td>
            <td width="20%"><span >{{optionData.CPORT}}</span></td>
            <td width="20%"><span >{{optionData.CNAME}}</span></td>
            <td width="20%"><span >{{optionData.CPWD}}</span></td>
          </tr>
        </table>
        <div style="text-align: center">
          <iframe v-if="visible" class="embed-responsive-item" src="../../../../static/videos/video.html" frameborder="0"  width="800" v-bind="{'playIP':optionData.CIP}" height="600"></iframe>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name: "videoDliog",
    data(){
      return{
        visible:this.videoVisible,
        optionData:"",
      }
    },
    props:{
      videoVisible:{
        type:Boolean,
        default:false
      },
      dialogData:{
        type:Object,
        default:{}
      }
    },
    methods:{

      // //获取基本信息
      // getBasic(){
      //   const _this=this;
      //   let parms={
      //     keyword: _this.dialogData.STCD,
      //   };
      //   _this.$http.post(_this.$url.baseUrl+"api/commonApi/sl323/v0.1/basic/st/stStbprpB/selectAll",parms).then((res)=>{
      //     if(res.status===200){
      //       let data=res.data.result[0];
      //       _this.optionData=data;
      //     }
      //   })
      // },


      childClose(){
        this.$emit('update:videoVisible',false);
      }
    },
    watch:{
      /**
       * 是否显示弹窗
       */
      videoVisible(){
        this.visible=this.videoVisible;
        if(this.visible){
            this.optionData=this.dialogData
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
  #videoDliog .search{
    padding:10px 20px;
  }


</style>
