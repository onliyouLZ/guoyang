<template>
    <div id="mapDliog">
      <div id="map"></div>
    </div>
</template>

<script>
    export default {
        name: "mapDliog",
        data(){
          return{
            map:{},
            longitude:""
          }
        },
        methods:{
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
                center: [116.27, 33.57],
                //最大显示级数
                maxZoom: 18,
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
        },
        mounted(){
          const that=this;
          this.$nextTick(()=>{
            this.initMap();
            this.map.on('click', function (evt) {
              let _this=this;
              that.longitude=_this.getCoordinateFromPixel(evt.pixel);
              that.$emit('closeMap',that.longitude);
            })
          });
        }
    }
</script>

<style scoped>
  #mapDliog{
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
    height: calc(100vh - 90px);
  }
  #map{
    height: 100%;
  }
</style>
