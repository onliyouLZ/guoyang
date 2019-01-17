<template>
  <div id="Drought">
    <Breadcrumb :menu="menuArray"></Breadcrumb>
    <div id="map">
      <!--<div class="css_animation"></div>-->
      <div class="stationInfo">
        <div class="arrow" ></div>
        <p class="p_rsvr_bg">道士湖</p>
        <div class="div_bg">
          <div class="div_top">
            <div class="div_t_l">
              <span style="font-size: 12px;">实时水位:</span>
              <span>45.57</span><sub>m</sub>
            </div>
            <div class="div_t_r">
              <p>设防水位:18.00m</p>
              <p>警戒水位:37.86m</p>
              <p>保证水位:37.86m</p>
            </div>
          </div>
          <div class="div_lend"></div>
          <div class="div_bottom">
            <p>类型: 小一</p>
            <p>溢洪: <span>0.8</span>(<span>10<sup style="font-size: 10px;">6</sup></span>m<sup>3</sup>)</p>
            <p>水系: 长江流域</p>
            <p class="psvr">地址: 武汉市 江夏区 xxxxx街道...</p>
          </div>
        </div>
      </div>
    </div>
    <div class="rightCard">
      <div class="rightCheckbox">
        <div class="tabTitle">
          <swiper :options="swiperOption">
            <swiper-slide
              style="box-sizing: border-box"
              v-for="(item,index) in rightTitles"
              :key="index">
              <div
                class="titleBar "
                @click="titleBar(index,item)"
                :class="{'titleActive':titleActive === index}">
                {{item.name}}
              </div>
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
        <div class="tabContent">
          <!--<keep-alive>-->
          <!--接收子组件传递过来的方法及数据@show=v-on:show-->
          <!--<component-->
            <!--:is="showComponent"-->
            <!--@show="showFormChild"-->
            <!--@move="moves"-->
            <!--:childData="childData"></component>-->
          <!--</keep-alive>-->
        </div>
      </div>

    </div>
    <div class="right-btn-display" @click="rightHide(flag)" >
      {{flagName1}}
    </div>
    <div id="mouse-position" style="float: left; position: absolute; bottom: 5px; width: 350px; height: 20px; z-index: 2000;"></div>
    <!--<lakes :lakesData.sync="lakesData"  :lakesShow.sync="lakesShow" ref="child"></lakes>-->
  </div>
</template>

<script>
    import Breadcrumb from '../../components/Breadcrumb'
    import {mapFuncs} from '../../utils/mapUtils'

    /**
     * 右侧模板组件
     */
    import warning from '../../components/oneMap/riverRegime'
    import Hydrologic from '../../components/oneMap/Hydrologic'
    import Precipitation from '../../components/oneMap/Precipitation'
    import videoSurveillance from '../../components/oneMap/videoSurveillance'
    export default {
      name: "Drought",
      components:{
        Breadcrumb:Breadcrumb,
      },
      data(){
        return{
          menuArray:[
            {name:"旱情监视",path:""},
            {name:"旱情统计",path:"/oneMap"},
          ],
          map:{},
          rightTitles:[
            {name:"土壤相对湿度"},
            {name:"连续无雨日"},
            {name:"降雨距平分析"},
          ],
          flag1:0,
          flagName1:"隐藏",
          swiperOption: {
            allowTouchMove:false,//禁止拖动
            // spaceBetween:20,//slider 之间的间隔
            centerInsufficientSlides:false, //当slides的总数小于slidesPerView时，slides居中。
            noSwiping : true,
            noSwipingClass : 'stop-swiping',
            slidesPerView: 3,//设置容器中slider的个数
            navigation: {
              nextEl: '.swiper-button-next',//下一页
              prevEl: '.swiper-button-prev',//上一页
            }
          },
          showComponent:"warning",
          lakesShow:false,
          lakesData:{},
          childData:[],
          moveData:{},
          titleActive:0,
          screenWidth:document.body.clientWidth
        }
      },
      methods:{
        //初始化地图(添加底图和标注)
        initMap(){
          //底图
          let normalLayer=new ol.layer.Tile({
            visible: true,
            source: new ol.source.XYZ({
              url: "http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=acdde43f9bf091f2383b721ed1aa581f"// 底图
            })
          });
          //注记图
          let l2 = new ol.layer.Tile({
            visible: true,
            name:"TDTzj",
            TileName : "天地图注记",
            source: new ol.source.XYZ({
              url: "http://t2.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=acdde43f9bf091f2383b721ed1aa581f"// 注记
            })
          });
          //初始化地图
          this.map=new ol.Map({
            target: 'map',
            layers: [normalLayer,l2],
            view: new ol.View({
              projection: 'EPSG:4326',
              // center: [114.32, 30.22],
              center: [116.27, 33.55],
              //最大显示级数
              maxZoom: 18,
              //最小显示级数
              minZoom: 1,
              //当前显示级数
              zoom: 11.5,
            }),
            controls:[
              new ol.control.MousePosition({
                //显示鼠标位置信息的目标容器
                target: document.getElementById('mouse-position'),
                //坐标格式
                coordinateFormat: ol.coordinate.createStringXY(2),
                //地图投影坐标系
                projection: 'EPSG:4326',
                //未定义坐标的标记
                undefinedHTML: '&nbsp;'
              })
            ]
          });
        },
        //右隐藏
        rightHide(){
          if(this.flag1===0){
            $('.rightCard').animate({right: -370}, "fast");
            $('.right-btn-display').animate({right: 0}, "fast");
            this.flag1=1;
            this.flagName1="显示"
          }else{
            $('.rightCard').animate({right:0}, "fast");
            $('.right-btn-display').animate({right: 367}, "fast");
            this.flag1=0;
            this.flagName1="隐藏"
          }
        },
        //右tab切换
        titleBar(index,item){
          this.titleActive=index;
        },
      },
      created(){
        //边界线处理
        const that=this;
        that.$nextTick(()=>{
          //边界线处理
          let bjx= require('../../../static/sdk/XZQFW');
          let shape=bjx.result.shape;
          let mapJson=bjx.result.json;
          //处理数据的方式
          let format = new ol.format.WKT();
          //处理数据
          let newFeature = format.readFeature(shape, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:4326'
          });
          let newFeature1 = format.readFeature(mapJson, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:4326'
          });
          let newFeature2 = format.readFeature(shape, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:4326'
          });
          //边界线1
          newFeature.setStyle(new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: "#03956b",
              width: 3
            })
          }));
          //遮罩
          newFeature1.setStyle(new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(255,255,255,1)'
            })
          }));
          //边界线2
          newFeature2.setStyle(new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: "#94ffe0",
              width: 2
            })
          }));

          //实例化一个矢量图层Vector作为绘制层
          let source = new ol.source.Vector({
            features: [newFeature1,newFeature,newFeature2]
          });
          //创建一个图层
          let vector = new ol.layer.Vector({
            source: source
          });
          //添加图层
          that.map.addLayer(vector);
        });

      },
      mounted(){
        this.$nextTick(()=>{
          if(this.screenWidth>=1920){
            this.map.getView().setCenter([116.27, 33.55]);
            this.map.getView().setZoom(11.5);
          }else if(this.screenWidth<1920){
            this.map.getView().setCenter([116.33,33.53]);
            this.map.getView().setZoom(11);
          }
        });
        this.initMap();
      }
    }
</script>

<style lang="less" scoped>
  #Drought{
    padding: 0;
    margin: 0;
    position: relative;
    background-color: #eeeeee;
    overflow: hidden;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: auto;
    height: calc(100vh - 60px);
  }
  /*右面板*/
  .rightCard{
    z-index: 999;
    position: absolute;
    top: 70px;
    right:0;
    height:calc(100vh - 140px);
    width: 360px;
    border: 5px solid #3DAAEF;
    background-color: white;
    .rightCheckbox{
      height: 100%;
      .tabTitle{
        height: 30px;
        padding: 5px;
        .titleBar{
          border: 1px solid #ddd;
          line-height: 30px;
          text-align: center;
          cursor: pointer;
          background-color: rgb(118, 126, 132);
          color: white;
          font-size: 14px;
        }
        .titleActive{
          background-color:rgb(61, 170, 239);
        }
      }
      .tabContent{
        overflow: auto;
        height:calc(100vh - 180px);
      }
    }
  }
  /*右按键*/
  .right-btn-display{
    width: 20px;
    height: 55px;
    background-color: #3DAAEF;
    position: absolute;
    color: white;
    line-height: 26px;
    top:70px;
    /*transform: translate(0,-50%);*/
    right: 367px;
    cursor: pointer;
    text-align: center;
    font-size: 12px;;
  }
</style>
