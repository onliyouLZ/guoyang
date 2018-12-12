<template>
  <div class="oneMap">
    <Breadcrumb :menu="menuArray"></Breadcrumb>
    <div id="map"></div>
    <div class="mapBtn" style="float: left; position: absolute; top: 120px;left:175px; z-index: 2000;">
      <ul style="list-style: none">
        <li v-for="(item,index) in tabName"  @click="switchMap(index,item)" :class="{'active':active === index}">{{item.name}}</li>
      </ul>
    </div>
    <div class="leftCheckbox">
        <div class="checkboxCard">
          <ul>
            <li  v-for="(item ,index) in checkboxCard">
              <i class="fa fa-user-o"></i>
              <input type="checkbox" :checked="item.checked"   @click="checkFun(index)">{{item.name}}
            </li>
          </ul>
        </div>
        <div class="btn-display" @click="leftHide(flag)">
          {{flagName}}
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
            <component v-bind:is="showComponent" @show="showFormChild"></component>
          <!--</keep-alive>-->
        </div>
      </div>

    </div>
    <div class="right-btn-display" @click="rightHide(flag)" >
      {{flagName1}}
    </div>
    <div id="mouse-position" style="float: left; position: absolute; bottom: 5px; width: 350px; height: 20px; z-index: 2000;"></div>
    <lakes :lakesData.sync="lakesData"  :lakesShow.sync="lakesShow" ref="child"></lakes>
  </div>
</template>

<script>
    import Breadcrumb from '../components/Breadcrumb'
    import {mapFuncs} from '../utils/mapUtils'
    /**
     * 右侧模板组件
     */
    import warning from '../components/warning'
    import Hydrologic from '../components/Hydrologic'
    import Precipitation from '../components/Precipitation'
    import videoSurveillance from '../components/videoSurveillance'

    /**
     * 弹窗
     */
    import lakes from '../dilog/oneMapdliog/warning/lakes'
    export default {
        name: "one-map",
        components:{
          Breadcrumb:Breadcrumb,
          warning:warning,
          Hydrologic:Hydrologic,
          Precipitation:Precipitation,
          videoSurveillance:videoSurveillance,
          lakes:lakes
        },
      data(){
        return{
          menuArray:[
            {name:"一张图",path:""},
            {name:"一张图",path:"/oneMap"},
          ],
          map:{},
          tabName:[
            {name:"矢量"},
            {name:"影像"},
          ],
          checkboxCard:[
            {name:"预警监视",checked:true,component: 'warning'},
            {name:"水情信息",checked:true,component: 'Hydrologic'},
            {name:"降水信息",checked:true,component: 'Precipitation'},
            {name:"视频监视",checked:false,component: 'videoSurveillance'},
          ],
          rightTitles:[],
          active:0,
          titleActive:0,
          flag:0,
          flag1:0,
          flagName:"隐藏",
          flagName1:"隐藏",
          windowHeight:$(window).height(),
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
          lakesData:{}
        }
      },
      methods:{
          //初始化地图(添加底图和标注)
          initMap(){
            //底图
            let normalLayer=new ol.layer.Tile({
              visible: true,
              source: new ol.source.XYZ({
                url: "http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"// 底图
              })
            });
            //注记图
            let l2 = new ol.layer.Tile({
              visible: true,
              name:"TDTzj",
              TileName : "天地图注记",
              source: new ol.source.XYZ({
                url: "http://t2.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}"// 注记
              })
            });
            //影像图
            let TileLayer = new ol.layer.Tile({
              visible:false,
              name:"TDTyg",
              TileName : "卫星遥感图",
              source: new ol.source.XYZ({
                url: "http://t4.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}"
              })
            });
            //初始化地图
            this.map=new ol.Map({
              target: 'map',
              layers: [normalLayer,l2,TileLayer],
              view: new ol.View({
                projection: 'EPSG:4326',
                // center: [114.32, 30.22],
                center: [116.27, 33.57],
                //最大显示级数
                maxZoom: 28,
                //最小显示级数
                minZoom: 1,
                //当前显示级数
                zoom: 11,
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
          //初始化右边title
          rightTitle(){
            let arr=[];
            $.each(this.checkboxCard,function (v,item) {
              if(item.checked){
                arr.push(item)
              }
            });
            this.rightTitles=arr
          },
          //矢量，影像切换
          switchMap(index,item){
            this.active=index;
            if(item.name==="矢量"){
              mapFuncs.getLayerName(this.map,'TDTyg').setVisible(false);
            }else{
              mapFuncs.getLayerName(this.map,'TDTyg').setVisible(true);
            }
          },
          //左隐藏
          leftHide(){
            if(this.flag===0){
              $('.checkboxCard').animate({left: -112}, "fast");
              $('.btn-display').animate({left: 0}, "fast");
              this.flag=1;
              this.flagName="显示"
            }else{
              $('.checkboxCard').animate({left: 0}, "fast");
              $('.btn-display').animate({left: 112}, "fast");
              this.flag=0;
              this.flagName="隐藏"
            }
          },
          //右隐藏
          rightHide(){
            if(this.flag1===0){
              $('.rightCard').animate({right: -350}, "fast");
              $('.right-btn-display').animate({right: 0}, "fast");
              this.flag1=1;
              this.flagName1="显示"
            }else{
              $('.rightCard').animate({right:0}, "fast");
              $('.right-btn-display').animate({right: 350}, "fast");
              this.flag1=0;
              this.flagName1="隐藏"
            }
          },
          //左check联动
          checkFun(index){
            let that=this;
            let arr=this.rightTitles;
            $.each(this.checkboxCard,function (v,item) {
                if(v===index){
                  item.checked=event.target.checked;
                  if(item.checked){
                    arr.unshift(item);
                    that.titleBar(0,item);
                  }else{
                    arr.splice(jQuery.inArray(item,arr),1);
                    that.titleBar(0,arr[0]);
                  }
                }
            });
          },
          //右tab切换
          titleBar(index,item){
            this.titleActive=index;
            this.showComponent=item.component;
          },

          //子组件控制弹窗
          showFormChild(data){
            this.lakesShow = data.show;
            this.lakesData=data.data;
          }

      },
      created(){
        //边界线处理
        this.$http.get('http://localhost:8080/api/bjx').then((res)=>{
          let shape=res.data.data.result.shape;

          let mapJson=res.data.data.result.json;

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
              color: 'rgba(255,255,255,0.5)'
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
          this.map.addLayer(vector)



        });
      },
      mounted(){
          this.initMap();
          this.rightTitle();
      },
      computed:{

      }
    }
</script>

<style lang="less" scoped>
  #map{
    padding: 0;
    margin: 0;
    position: relative;
    background-color: rgb(238, 238, 238);
    overflow: hidden;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: auto;
    height: calc(100vh - 87px);
  }
  .mapBtn{
    width: 100px;
    background-color: #FDFDFC;
    padding: 4px;
    border-radius: 6px;
    opacity: 0.9;
    box-shadow: 1px 4px 10px 2px #aaa;
    li{
      float: left;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;
      padding: 0;
      border: 1px solid #CFCFCF;
      width: 50%;
      text-align: center;
      background-color: #E6E6E6;
      line-height: 26px;
    }
    .active{
      color: #2d8cf0;
    }
  }
  /*左面板*/
  .leftCheckbox{
    z-index: 999;
    position: absolute;
    top: 120px;
    left:0;
    height: 145px;
    .checkboxCard{
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      padding: 5px;
      border: 1px solid #ddd;
      box-shadow:1px 4px 10px 2px #aaa ;
      background-color: white;
      li{
        list-style: none;
        width: 100px;
        line-height: 35px;
        font-size: 14px;
        i{
          font-size: 13px;
          margin-right: 5px;
        }
        input{
          margin-right: 5px;
          vertical-align: middle;
        }
      }
    }
    .btn-display{
      width: 20px;
      height: 55px;
      background-color: #3DAAEF;
      position: absolute;
      color: white;
      line-height: 26px;
      top: 50%;
      transform: translate(0,-50%);
      right: -133px;
      cursor: pointer;
      text-align: center;
      font-size: 12px;;
    }
  }
  /*右面板*/
  .rightCard{
    z-index: 999;
    position: absolute;
    top: 120px;
    right:0;
    height:calc(100vh - 130px);
    width: 340px;
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
        height:calc(100vh - 167px);
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
    top:120px;
    /*transform: translate(0,-50%);*/
    right: 345px;
    cursor: pointer;
    text-align: center;
    font-size: 12px;;
  }
</style>
