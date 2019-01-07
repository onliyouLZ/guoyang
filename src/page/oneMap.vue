<template>
  <div class="oneMap">
    <Breadcrumb :menu="menuArray"></Breadcrumb>
    <div id="map">
      <!--<div class="css_animation"></div>-->
      <div class="stationInfo">

      </div>
    </div>


    <div class="mapBtn" style="float: left; position: absolute; top: 70px;left:175px; z-index: 2000;">
      <ul style="list-style: none">
        <li v-for="(item,index) in tabName"  @click="switchMap(index,item)" :class="{'active':active === index}">{{item.name}}</li>
      </ul>
    </div>
    <div class="leftCheckbox">
        <div class="checkboxCard">
          <ul>
            <li  v-for="(item ,index) in checkboxCard">
              <i class="fa fa-user-o"></i>
              <input type="checkbox" :checked="item.checked"   @click="checkFun(index,item)">{{item.name}}
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
            <component
              :is="showComponent"
              @show="showFormChild"
              @move="moves"
              :childData="childData"></component>
          <!--</keep-alive>-->
        </div>
      </div>

    </div>
    <div class="right-btn-display" @click="rightHide(flag)" >
      {{flagName1}}
    </div>
    <div id="mouse-position" style="float: left; position: absolute; bottom: 5px; width: 350px; height: 20px; z-index: 2000;"></div>
    <div id="openDialog">
      <el-dialog :title="dialogData.STNM"  :visible="dialogVisible"  @close="childClose">
          <component :is="dialogShow" :dialogDatas="dialogData"></component>
      </el-dialog>
    </div>
    <!--<lakes :lakesData.sync="lakesData"  :lakesShow.sync="lakesShow" ref="child"></lakes>-->
  </div>
</template>

<script>
    import Breadcrumb from '../components/Breadcrumb'
    import {mapFuncs} from '../utils/mapUtils'
    import {convertObjectToArray} from '../utils/utils'
    /**
     * 右侧模板组件
     */
    import riverRegime from '../components/oneMap/riverRegime' //河道
    import rainfall from '../components/oneMap/Rainfall' //雨情
    import soilMoisture from '../components/oneMap/SoilMoisture' //墒情
    import Precipitation from '../components/oneMap/Precipitation' //仓库
    import videoSurveillance from '../components/oneMap/videoSurveillance' //视频

    /**
     * 弹窗
     */
    import river from '../dilog/oneMapdliog/riverRegime/river' //河道弹窗


    //标注站点
    const BZ =['river','rain','sq','sp','ck',];
    export default {
        name: "one-map",
        components:{
          Breadcrumb:Breadcrumb,
          riverRegime:riverRegime,
          rainfall:rainfall,
          soilMoisture:soilMoisture,
          Precipitation:Precipitation,
          videoSurveillance:videoSurveillance,
          river:river
        },
        data(){
          return{
            menuArray:[
              {name:"一张图",path:""},
              {name:"一张图",path:"/oneMap"},
            ],
            map:{},
            point_overlay:{},
            tabName:[
              {name:"矢量"},
              {name:"影像"},
            ],
            checkboxCard:[
              {name:"河道水情",checked:true,component: 'riverRegime'},
              {name:"水雨情测站",checked:true,component: 'rainfall'},
              {name:"土壤墒情",checked:true,component: 'soilMoisture'},
              {name:"视频监视",checked:false,component: 'videoSurveillance'},
              {name:"涉水工程",checked:false,component: 'Precipitation'},
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
            showComponent:"riverRegime",
            dialogShow:"",
            dialogData:"",
            childData:[],
            moveData:{},
            dialogVisible:false,
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
                $('.checkboxCard').animate({left: -132}, "fast");
                $('.btn-display').animate({left: 0}, "fast");
                this.flag=1;
                this.flagName="显示"
              }else{
                $('.checkboxCard').animate({left: 0}, "fast");
                $('.btn-display').animate({left: 132}, "fast");
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
              /**
               * 控制右侧面板title
               */
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
              /**
               * 控制图层隐藏显示
               */
              if(index===0){
               if(event.target.checked){
                 mapFuncs.getLayerName(this.map,'river').setVisible(true)
               }else{
                 mapFuncs.getLayerName(this.map,'river').setVisible(false)
               }
              }else if(index===1){
                if(event.target.checked){
                  mapFuncs.getLayerName(this.map,'rain').setVisible(true)
                }else{
                  mapFuncs.getLayerName(this.map,'rain').setVisible(false)
                }
              }else if(index===2){
                if(event.target.checked){
                  mapFuncs.getLayerName(this.map,'sq').setVisible(true)
                }else{
                  mapFuncs.getLayerName(this.map,'sq').setVisible(false)
                }
              }else if(index===3){
                if(event.target.checked){
                  this.getVideo()
                }else{
                  mapFuncs.getLayerName(this.map,'sp').setVisible(false)
                }
              }else if(index===4){
                if(event.target.checked){
                  this.getStock()
                }else{
                  mapFuncs.getLayerName(this.map,'ck').setVisible(false)
                }
              }
            },
            //右tab切换
            titleBar(index,item){
              if(item){
                this.titleActive=index;
                this.showComponent=item.component;
              }else{
                this.showComponent=""
              }
            },
            //子组件控制弹窗
            showFormChild(data){
              this.dialogVisible=data.show;
              this.dialogShow=data.data.type;
              this.dialogData=data.data;
            },
            //子组件控制鼠标浮动
            moves(data){
                if(data){
                    //重新设置地图中心点
                    this.map.getView().setCenter([data.LGTD, data.LTTD]);
                    this.map.getView().setZoom(15);
                    //异步操作避免地图在移动过程中去寻找定位点
                    setTimeout(()=>{
                      let point_overlay;
                      let point_div = document.createElement('div');
                      point_div.className="css_animation";
                      point_overlay = new ol.Overlay({
                        element: point_div,
                        positioning: 'center-center'
                      });
                      this.map.addOverlay(point_overlay);
                      point_overlay.setPosition([data.LGTD, data.LTTD]);
                      let pixel = this.map.getPixelFromCoordinate([data.LGTD, data.LTTD]);
                      let left = pixel[0]+12 + 'px';
                      let top = pixel[1]+16 + 'px';
                      let content=this.addFeatrueInfo(data);
                      $(".stationInfo").html(content);
                      $(".stationInfo").css({top: top, left: left,visibility: "visible"});
                    },0)
                }else{
                    //同理异步操作
                    setTimeout(()=>{
                      $(".stationInfo").css({visibility: "hidden"});
                      $(".ol-overlaycontainer-stopevent").empty();
                    },0)
                }
            },
            //地图上鼠标浮动显示窗口内容创建
            addFeatrueInfo(info){
                if(info){
                  let content ="";
                  let type=info.type;
                  if(type){
                    switch (type) {
                      case 'river':
                        content += '<div class="arrow" ></div>';
                        content += '<p class="p_rsvr_bg">'+info.STNM+'</p>';
                        content += '<div class="div_bg"><div class="div_top"><div class="div_t_l">';
                        content += '<span style="font-size:12px;display: inline-block">实时水位:</span>';
                        if(info.Z){
                          info.Z=info.Z;
                        }else{
                          info.Z=" ";
                        }
                        content += '<span>'+info.Z+'</span><sub>m</sub></div><div class="div_t_r">';
                        if(info.GRQ){
                          info.GRQ=info.GRQ;
                        }else{
                          info.GRQ=" ";
                        }
                        content += '<p>保证水位:'+info.GRQ+'m</p>';
                        if(info.WRQ){
                          info.WRQ=info.WRQ;
                        }else{
                          info.WRQ=" ";
                        }
                        content += '<p>警戒水位:'+info.WRQ+'m</p>';
                        content += '</div></div><div class="div_lend"></div><div class="div_bottom">';
                        content += '<p>水系:涡阳水系</p>';
                        if(info.ADNM){
                          info.ADNM=info.ADNM;
                        }else{
                          info.ADNM=" ";
                        }
                        content += '<p class="psvr">地址:'+info.ADNM+'</p>';
                        content += '</div></div></div>';
                        return content;
                        break;
                      default:
                        content += '<div class="arrow" ></div>';
                        content += '<p class="p_rsvr_bg">'+info.STNM+'</p>';
                        return content;
                        break;
                    }
                  }else{
                    content += '<div class="arrow" ></div>';
                    content += '<p class="p_rsvr_bg">'+info.STNM+'</p>';
                    return content;
                  }


                }
            },
            getRiver(){
              //获取河道
              let parms={
                "bgtm": "2018-12-22 08:00",
                "endtm": "2018-12-22 18:40",
                "ad": "341621000000000",
                "hnnm": "",
                "warntp": "",
                "keyword": ""
              };
              this.$http.post(this.$url.baseUrl+'api/sys/river/jx-real',parms).then((res)=>{
                let data=res.data.result;
                if(data.length>0){
                  // this.childData=data;
                  let arr=[];
                  //创建一个点
                  $.each(data,(v,item)=>{
                    let LGTD=item.LGTD;
                    let LTTD=item.LTTD;
                    item.type='river';
                    let point=new ol.Feature({
                      data:item,
                      geometry: new ol.geom.Point([LGTD, LTTD])
                    });
                    //设置点的样式信息
                    point.setStyle(new ol.style.Style({
                      //形状
                      image: new ol.style.Icon({
                        // anchor:[1,1],
                        // anchorOrigin: 'top-right',
                        // anchorXUnits: 'fraction',
                        // anchorYUnits: 'pixels',
                        // offsetOrigin: 'top-right',
                        // offset:[1,0],
                        //图标缩放比例
                        // scale:1,
                        //透明度
                        size:[15,15],
                        //图标的url
                        src:"./static/legend/河道站.png"
                      }),
                      text: new ol.style.Text({
                        //位置
                        textAlign: 'center',
                        //基准线
                        textBaseline: 'middle',
                        //文字样式
                        font: 'normal 14px 微软雅黑',
                        offsetY:15,
                        //文本内容
                        text:"",
                        //文本填充样式（即文字颜色）
                        fill: new ol.style.Fill({ color: '#aa3300' }),
                        stroke: new ol.style.Stroke({ color: '#ffcc33', width: 2 })
                      })
                    }));

                    arr.push(point)
                  });

                  //实例化一个矢量图层Vector作为绘制层
                  let source = new ol.source.Vector({
                    features: arr
                  });


                  //创建一个图层
                  let vector = new ol.layer.Vector({
                    name:"river",
                    TileName : "河道",
                    source: source
                  });
                  //将绘制层添加到地图容器中
                  this.map.addLayer(vector);

                }else{
                  console.error('暂无河道数据');
                }
              });
            },
            getVideo(){
              //视频站
              this.$http.post(this.$url.baseUrl+'api/system-video/v0.1/list?type',{stnm:""}).then((res)=>{
                if(res.status===200){
                  let data=res.data.result;
                  if(data.length>0){
                    let arr=[];
                    //创建一个点
                    $.each(data,(v,item)=>{
                      let LGTD=item.LGTD;
                      let LTTD=item.LTTD;
                      let point=new ol.Feature({
                        data:item,
                        geometry: new ol.geom.Point([LGTD, LTTD])
                      });
                      //设置点的样式信息
                      point.setStyle(new ol.style.Style({
                        //形状
                        image: new ol.style.Icon({
                          // anchor:[1,1],
                          // anchorOrigin: 'top-right',
                          // anchorXUnits: 'fraction',
                          // anchorYUnits: 'pixels',
                          // offsetOrigin: 'top-right',
                          // offset:[1,0],
                          //图标缩放比例
                          // scale:1,
                          //透明度
                          size:[25,25],
                          //图标的url
                          src:"./static/legend/视频.png"
                        }),
                        text: new ol.style.Text({
                          //位置
                          textAlign: 'center',
                          //基准线
                          textBaseline: 'middle',
                          //文字样式
                          font: 'normal 14px 微软雅黑',
                          offsetY:15,
                          //文本内容
                          text:"",
                          //文本填充样式（即文字颜色）
                          fill: new ol.style.Fill({ color: '#aa3300' }),
                          stroke: new ol.style.Stroke({ color: '#ffcc33', width: 2 })
                        })
                      }));
                      arr.push(point)
                    });

                    //实例化一个矢量图层Vector作为绘制层
                    let source = new ol.source.Vector({
                      features: arr
                    });


                    //创建一个图层
                    let vector = new ol.layer.Vector({
                      name:"sp",
                      TileName : "视频",
                      source: source,
                      visible: true,
                    });
                    //将绘制层添加到地图容器中
                    this.map.addLayer(vector);

                  }else{
                    console.error('暂无视频数据');
                  }
                }
              });
            },
            getStock(){
              let prams={
                orgcd:"",
                whName:""
              };
              //仓库
              this.$http.post(this.$url.baseUrl+'api/guoYang/v0.1/material-manage/warehouse/list',prams).then((res)=>{
                if(res.status===200){
                  let data=res.data.result;
                  if(data.length>0){
                    let arr=[];
                    //创建一个点
                    $.each(data,(v,item)=>{
                      let LGTD=item.LGTD;
                      let LTTD=item.LTTD;
                      item.STNM=item.WH_NAME;
                      let point=new ol.Feature({
                        data:item,
                        geometry: new ol.geom.Point([LGTD, LTTD])
                      });
                      //设置点的样式信息
                      point.setStyle(new ol.style.Style({
                        //形状
                        image: new ol.style.Icon({
                          // anchor:[1,1],
                          // anchorOrigin: 'top-right',
                          // anchorXUnits: 'fraction',
                          // anchorYUnits: 'pixels',
                          // offsetOrigin: 'top-right',
                          // offset:[1,0],
                          //图标缩放比例
                          // scale:1,
                          //透明度
                          size:[25,25],
                          //图标的url
                          src:"./static/legend/物资仓库.png"
                        }),
                        text: new ol.style.Text({
                          //位置
                          textAlign: 'center',
                          //基准线
                          textBaseline: 'middle',
                          //文字样式
                          font: 'normal 14px 微软雅黑',
                          offsetY:15,
                          //文本内容
                          text:"",
                          //文本填充样式（即文字颜色）
                          fill: new ol.style.Fill({ color: '#aa3300' }),
                          stroke: new ol.style.Stroke({ color: '#ffcc33', width: 2 })
                        })
                      }));
                      arr.push(point)
                    });

                    //实例化一个矢量图层Vector作为绘制层
                    let source = new ol.source.Vector({
                      features: arr
                    });


                    //创建一个图层
                    let vector = new ol.layer.Vector({
                      name:"ck",
                      TileName : "仓库",
                      source: source,
                      visible: true,
                    });
                    //将绘制层添加到地图容器中
                    this.map.addLayer(vector);

                  }else{
                    console.error('暂无仓库数据');
                  }
                }
              });
            },
            getRain(){
              this.$http.get(this.$url.baseUrl+'api/sl323/realtime/rain/ad/sum_x/341621/2018-12-22 08:00/2018-12-22 16:33?bgtm=2018-12-22 08:00&endtm=2018-12-22 16:33&ad=341621')
                .then((res)=>{
                  if(res.status===200){
                    let data=res.data.result.totalMap.rainOne.list;
                    if(data.length>0){
                      let arr=[];
                      //创建一个点
                      $.each(data,(v,item)=>{
                        let LGTD=item.lgtd;
                        item.LGTD=item.lgtd;
                        let LTTD=item.lttd;
                        item.LTTD=item.lttd;
                        item.STNM=item.stnm;
                        let point=new ol.Feature({
                          data:item,
                          geometry: new ol.geom.Point([LGTD, LTTD])
                        });
                        //设置点的样式信息
                        point.setStyle(new ol.style.Style({
                          //形状
                          image: new ol.style.Icon({
                            // anchor:[1,1],
                            // anchorOrigin: 'top-right',
                            // anchorXUnits: 'fraction',
                            // anchorYUnits: 'pixels',
                            // offsetOrigin: 'top-right',
                            // offset:[1,0],
                            //图标缩放比例
                            // scale:1,
                            //透明度
                            size:[25,25],
                            //图标的url
                            src:"./static/legend/雨量站.png"
                          }),
                          text: new ol.style.Text({
                            //位置
                            textAlign: 'center',
                            //基准线
                            textBaseline: 'middle',
                            //文字样式
                            font: 'normal 14px 微软雅黑',
                            offsetY:15,
                            //文本内容
                            text:"",
                            //文本填充样式（即文字颜色）
                            fill: new ol.style.Fill({ color: '#aa3300' }),
                            stroke: new ol.style.Stroke({ color: '#ffcc33', width: 2 })
                          })
                        }));
                        arr.push(point)
                      });

                      //实例化一个矢量图层Vector作为绘制层
                      let source = new ol.source.Vector({
                        features: arr
                      });


                      //创建一个图层
                      let vector = new ol.layer.Vector({
                        name:"rain",
                        TileName : "雨量",
                        source: source,
                        visible: true,
                      });
                      //将绘制层添加到地图容器中
                      this.map.addLayer(vector);

                    }else{
                      console.error('暂无雨量站数据');
                    }
                  }
                })
            },
            getSoil(){
              this.$http.get(this.$url.baseUrl+'api/sys/drought/soil/latest?bgtm=2018-12-21 08:00&keyword=&ad=&type[]=1&type[]=2&type[]=3')
                .then((res)=>{
                  if(res.status===200){
                    let data=convertObjectToArray(res.data.result);
                    if(data.length>0){
                      let arr=[];
                      //创建一个点
                      $.each(data,(v,item)=>{
                        let LGTD=item.LGTD;
                        let LTTD=item.LTTD;
                        let point=new ol.Feature({
                          data:item,
                          geometry: new ol.geom.Point([LGTD, LTTD])
                        });
                        //设置点的样式信息
                        point.setStyle(new ol.style.Style({
                          //形状
                          image: new ol.style.Icon({
                            // anchor:[1,1],
                            // anchorOrigin: 'top-right',
                            // anchorXUnits: 'fraction',
                            // anchorYUnits: 'pixels',
                            // offsetOrigin: 'top-right',
                            // offset:[1,0],
                            //图标缩放比例
                            // scale:1,
                            //透明度
                            size:[25,25],
                            //图标的url
                            src:"./static/legend/墒情站.png"
                          }),
                          text: new ol.style.Text({
                            //位置
                            textAlign: 'center',
                            //基准线
                            textBaseline: 'middle',
                            //文字样式
                            font: 'normal 14px 微软雅黑',
                            offsetY:15,
                            //文本内容
                            text:"",
                            //文本填充样式（即文字颜色）
                            fill: new ol.style.Fill({ color: '#aa3300' }),
                            stroke: new ol.style.Stroke({ color: '#ffcc33', width: 2 })
                          })
                        }));
                        arr.push(point)
                      });

                      //实例化一个矢量图层Vector作为绘制层
                      let source = new ol.source.Vector({
                        features: arr
                      });


                      //创建一个图层
                      let vector = new ol.layer.Vector({
                        name:"sq",
                        TileName : "墒情",
                        source: source,
                        visible: true,
                      });
                      //将绘制层添加到地图容器中
                      this.map.addLayer(vector);

                    }else{
                      console.error('暂无墒情站数据');
                    }
                  }
                });
            },
            childClose(){
                this.dialogVisible=false;
            }
        },
        created(){
          // const that=this;
          // that.$nextTick(()=>{
          //   //边界线处理
          //   let bjx= require('../../static/sdk/XZQFW');
          //   let shape=bjx.result.shape;
          //   let mapJson=bjx.result.json;
          //   //处理数据的方式
          //   let format = new ol.format.WKT();
          //   //处理数据
          //   let newFeature = format.readFeature(shape, {
          //     dataProjection: 'EPSG:4326',
          //     featureProjection: 'EPSG:4326'
          //   });
          //   let newFeature1 = format.readFeature(mapJson, {
          //     dataProjection: 'EPSG:4326',
          //     featureProjection: 'EPSG:4326'
          //   });
          //   let newFeature2 = format.readFeature(shape, {
          //     dataProjection: 'EPSG:4326',
          //     featureProjection: 'EPSG:4326'
          //   });
          //   //边界线1
          //   newFeature.setStyle(new ol.style.Style({
          //     stroke: new ol.style.Stroke({
          //       color: "#03956b",
          //       width: 3
          //     })
          //   }));
          //   //遮罩
          //   newFeature1.setStyle(new ol.style.Style({
          //     fill: new ol.style.Fill({
          //       color: 'rgba(255,255,255,1)'
          //     })
          //   }));
          //   //边界线2
          //   newFeature2.setStyle(new ol.style.Style({
          //     stroke: new ol.style.Stroke({
          //       color: "#94ffe0",
          //       width: 2
          //     })
          //   }));
          //
          //   //实例化一个矢量图层Vector作为绘制层
          //   let source = new ol.source.Vector({
          //     features: [newFeature1,newFeature,newFeature2]
          //   });
          //   //创建一个图层
          //   let vector = new ol.layer.Vector({
          //     source: source
          //   });
          //   //添加图层
          //   that.map.addLayer(vector);
          // });
          this.$http.get('/api/bjx').then((res)=>{
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
            this.map.addLayer(vector)
          });

        },
        mounted(){
          const that=this;
          that.initMap();
          that.getRiver();
          that.getRain();
          that.rightTitle();
          that.getSoil();
          /**
           * 地图缩放控制
           */
          that.map.getView().on('change:resolution',()=>{
            let level =  that.map.getView().getZoom();
            $.each(BZ,(v,item)=>{
              let labelLayer =mapFuncs.getLayerName(that.map,item);
              if (!labelLayer) return;
              labelLayer.getSource().getFeatures().forEach(function (items, i) {
                if(level>=12 && level <=18){
                  items.getStyle().getText().setText(items.get("data").STNM);
                }else if(level <=11){
                  items.getStyle().getText().setText("");
                }
              })
            })
          });
          /**
           * 地图移动事件控制
           */
          that.map.on('pointermove', function (evt) {
            let _this=this;
            let pixel = _this.getEventPixel(evt.originalEvent);
            let hit = evt.map.hasFeatureAtPixel(pixel);
            if(hit){
              // let point_overlay;
              // let point_div = document.createElement('div');
              // point_div.className="css_animation";
              // point_overlay = new ol.Overlay({
              //   element: point_div,
              //   positioning: 'center-center'
              // });
              // that.map.addOverlay(point_overlay);
              evt.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
              //获取图层
              let feature = _this.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {return feature;});
              let data=feature.get('data');
              if(data){
                //坐标
                let pixel = _this.getPixelFromCoordinate([data.LGTD, data.LTTD]);
                // point_overlay.setPosition([data.LGTD, data.LTTD]);
                let left = pixel[0]+12 + 'px';
                let top = pixel[1]+16 + 'px';
                let content=that.addFeatrueInfo(data);
                $(".stationInfo").html(content);
                $(".stationInfo").css({top: top, left: left,visibility: "visible"});
              }else{
                // $(".ol-overlaycontainer-stopevent").empty();
                $(".stationInfo").css('visibility', 'hidden');
              }
              // that.moveData=feature
            }else{
              // $(".ol-overlaycontainer-stopevent").empty();
              $(".stationInfo").css('visibility', 'hidden');
            }

          });

          /**
           * 地图点击事件控制
           */
          that.map.on('click', function (evt) {
            let _this=this;
            let feature = _this.forEachFeatureAtPixel(evt.pixel, function (feature, layer) { return feature; });
            if(feature){
              //获取数据
              let data=feature.get('data');
              if(data){
                that.dialogVisible=true;
                that.dialogShow=data.type;
                that.dialogData=data;
              }
            }
          });
        },
        computed:{

        },
        watch:{
          moveData(feature){
            if(feature) {

            }
            //   if(feature){
            //     //获取数据
            //     let data=feature.get('data');
            //     if(data){
            //       //坐标
            //       that.moveData=data;
            //       // let pixels = _this.getPixelFromCoordinate([data.LGTD, data.LTTD]);
            //       // let left = pixels[0]+5 + 'px';
            //       // let top = pixels[1]+70 + 'px';
            //       // $(".stationInfo").css({top: top, left: left,visibility: "visible"});
            //       // let content=that.addFeatrueInfo(data);
            //       // $(".stationInfo").html(content);
            //     }else{
            //       // $(".stationInfo").css('visibility', 'hidden');
            //     }
            //   }else{
            //     $(".stationInfo").css('visibility', 'hidden');
            //   }
            //   //坐标
            //   let pixels = this.map.getPixelFromCoordinate([data.LGTD, data.LTTD]);
            //   let left = pixels[0]+5 + 'px';
            //   let top = pixels[1]+70 + 'px';
            //   $(".stationInfo").css({top: top, left: left,visibility: "visible"});
            //   let content=this.addFeatrueInfo(data);
            //   $(".stationInfo").html(content);
            // }else{
            //   $(".stationInfo").css('visibility', 'hidden');
            // }
          }
        }
    }

</script>

<style lang="less" scoped>
  .oneMap{
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
    top: 70px;
    left:0;
    height: 170px;
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
        width: 120px;
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
      right: -152px;
      cursor: pointer;
      text-align: center;
      font-size: 12px;;
    }
  }
  /*右面板*/
  .rightCard{
    z-index: 999;
    position: absolute;
    top: 70px;
    right:0;
    height:calc(100vh - 140px);
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
    right: 345px;
    cursor: pointer;
    text-align: center;
    font-size: 12px;;
  }


</style>
<style lang="less">
  /**
 表格
  */
  .table-dliog-body{
    color: red;
    padding: 0!important;
    font-size: 14px;
  }
  .el-table__row{
    cursor: pointer;
  }
  .table-dliog-header{
    background-color: #A4D0EF !important;
    border-bottom: 1px solid #bbb!important;
    padding: 0!important;
    line-height: 25px;
    color: #333333;
    font-weight: normal;
    font-size: 14px;
  }
  .el-table--striped .el-table__body tr.el-table__row--striped td{
    background-color: #e0eef8!important;
  }
</style>
