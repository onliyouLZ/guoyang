<template>
  <el-dialog
    title="年降雨分布"
    :swiperShow="swiperShow"
    :visible.sync="visible"
    width="50%"
    @close="childClose">
    <div class="player">
      <!--首页-->
      <div  class="fl">
        <span @click="firstPage">
          <i class="fa fa-fast-backward"></i>
        </span>
      </div>
      <!--前一页-->
      <div  class="fl">
        <span @click="slideNext">
          <i class="fa fa-backward"></i>
        </span>
      </div>
      <!--自动播放-->
      <div  class="fl" @click="autoplay">
        <span>
          <i class="fa fa-play"></i>
        </span>
      </div>
      <!--下一页-->
      <div  class="fl">
        <span>
          <i class="fa fa-forward"></i>
        </span>
      </div>
      <!--最后一页-->
      <div  class="fl">
        <span>
          <i class="fa fa-fast-forward"></i>
        </span>
      </div>
    </div>
    <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide>I'm Slide 1</swiper-slide>
        <swiper-slide>I'm Slide 2</swiper-slide>
        <swiper-slide>I'm Slide 3</swiper-slide>
        <swiper-slide>I'm Slide 4</swiper-slide>
        <swiper-slide>I'm Slide 5</swiper-slide>
        <swiper-slide>I'm Slide 6</swiper-slide>
        <swiper-slide>I'm Slide 7</swiper-slide>
        <!-- Optional controls -->
      </swiper>
    <!--<span slot="footer" class="dialog-footer">-->
      <!--<el-button @click="childClose">取 消</el-button>-->
      <!--<el-button type="primary" @click="childClose">确 定</el-button>-->
    <!--</span>-->
  </el-dialog>
</template>

<script>
  import echarts from 'echarts'
  // import Swiper from 'swiper'
  export default {
    name: "swiperDliog",
    data() {
      return {
        visible: this.swiperShow,
        swiperOption:{
          autoplay:true
        }
      }
    },
    props:{
      swiperShow:{
        type:Boolean,
        default:false
      },
    },
    created(){

    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods:{
      /**
       * 关闭弹窗事件
       */
      childClose(){
        this.visible=false;
        this.$emit('update:swiperShow',false);
      },
      firstPage(){
        this.swiper.slideTo(0,0,false)
      },
      slideNext(){
        this.swiper.slideNext(0,false)
      },
      autoplay(){
        this.swiper.autoplay.stop()
        console.log(this.swiperOption.autoplay);
      }

    },
    mounted(){


    },
    watch:{
      /**
       * 是否显示弹窗
       */
      swiperShow(){
        this.visible=this.swiperShow;
      }
    }
  }
</script>

<style lang="less">
  .el-dialog__wrapper{
    .el-dialog{
      width: 60%!important;
      position: absolute;
      margin-top: 0!important;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      border-radius: 5px;
      .el-dialog__header{
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        background-color: #00A0E9;
        padding: 5px 10px;
        .el-dialog__headerbtn{
          top: 10px;
          .el-dialog__close{
            color: #404040;
          }
          .el-dialog__close:hover{
            color: #ccc;
            background: transparent;
          }
        }
      };
      .el-dialog__body{
        /*padding-top: 10px;*/
        padding: 0!important;
        .el-tabs__nav-scroll{
          background-color: #C8E7FC;
        }
      }
    }
  }
  .player{
    width: 100%;
    height: 44px;
    line-height: 45px;
    border-bottom: 1px solid #ddd;
    .fl{
      margin-left: 25px;
      span{
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
  .swiper-container{
    width: 100%;
    height: 550px;
  }

</style>
