<template>
  <div id="preview">
    <div class="preview-header">
      <ul>
        <li>
          <el-button  icon="iconfont icon-quanping"></el-button>
        </li>
        <li>
          <el-button  icon="iconfont icon-suoxiao"></el-button>
          <span>60%</span>
          <el-button  icon="iconfont icon-fangdajing"></el-button>
        </li>
        <li>
          <el-button  icon="el-icon-arrow-left" disabled></el-button>
          <span>{{page}}/{{numPages}}</span>
          <el-button><i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </li>
      </ul>
    </div>
    <div class="preview-content">
      <pdf
        :src="pdfUrl"
        :page="page"
        @num-pages="numPages = $event"
        @progress="loadedRatio = $event"
      ></pdf>
    </div>
  </div>
</template>

<script>
  import pdf from 'vue-pdf'
  export default {
    name: "preview",
    components:{pdf},
    data(){
      return{
        page: 1,
        numPages: 0,
      }
    },
    props:{
      pdfUrl:{
        type:String,
        default:""
      }
    }
  }
</script>

<style lang="less">
  #preview{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;
    .preview-header{
      width: 100%;
      text-align: center;
      position: fixed;
      z-index: 999;
      ul{
        display: flex;
        width: 100%;
        background-color: #efefef;
        list-style: none;
        li{
          flex:1;
          button{
            border: none!important;
            background-color: #efefef;
          }
        }
      }
    }
    .preview-content{
      margin-top: 32px;
    }
  }
</style>
<style>
  .preview-content canvas{
    /*width: 714px!important;*/
    /*height: 1000px!important;*/
    margin: 0 auto;
  }
</style>
