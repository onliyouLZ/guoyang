<template>
  <div class="oneMap">
    <Breadcrumb :menu="menuArray"></Breadcrumb>
    <div id="map"></div>
  </div>
</template>

<script>
    import Breadcrumb from '../components/Breadcrumb'

    export default {
        name: "one-map",
        components:{
          Breadcrumb:Breadcrumb,
        },
      data(){
        return{
          menuArray:[
            {name:"一张图",path:""},
            {name:"一张图",path:"/oneMap"},
          ],
          map:{}
        }
      },
      methods:{
          initMap(){
            let l2 = new ol.layer.Tile({
              visible: true,
              source: new ol.source.XYZ({
                url: "http://t2.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}"// 注记
              })
            });
            let normalLayer=new ol.layer.Tile({
              visible: true,
              source: new ol.source.XYZ({
                url: "http://t2.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"// 注记
              })
            });
            this.map=new ol.Map({
              target: 'map',
              layers: [normalLayer,l2],
              view: new ol.View({
                projection: 'EPSG:4326',
                center: [114.32, 30.30],
                //最大显示级数
                maxZoom: 28,
                //最小显示级数
                minZoom: 1,
                //当前显示级数
                zoom: 11,
                // zoomFactor:2.9,
              })
            });
          }
      },
      created(){
          this.$http.get('http://localhost:8080/api/bjx').then((res)=>{
            const data=res.data.data;
            const shape=data.result.shape;
            const jsons=data.result.json;
            //创建一个点
            var feature  = new ol.Feature({
              geometry: new ol.geom.Point([114.32, 30.30])
            });

            //设置点1的样式信息
            feature.setStyle(new ol.style.Style({
              //填充色
              fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
              }),
              //边线颜色
              stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
              }),
              //形状
              image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                  color: 'red'
                })
              })
            }));
            //实例化一个矢量图层Vector作为绘制层
            var source = new ol.source.Vector({
              features: [feature]
            });
            //创建一个图层
            var vector = new ol.layer.Vector({
              source: source
            });
            //将绘制层添加到地图容器中
            this.map.addLayer(vector);

          })
      },
      mounted(){
          this.initMap()
      }
    }
</script>

<style scoped>
  #map{
    padding: 0;
    margin: 0;
    position: relative;
    background-color: rgb(238, 238, 238);
    overflow: hidden;
    /*min-width: 1px;*/
    /*min-height: 1px;*/
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    width: auto;
    height: calc(100vh - 87px);
  }
</style>
