
let mapFunc = {
    /**
     * 将类似Java的Map的Object对象转换为Array,并提供排序.
     *
     * eg1. object = {a:1,b:3} => [1,3]
     * eg2. object = {a:[1,2],b:[3,4]} => [1,2,3,4]
     *
     *
     * @param object
     * @param sortKey   用来排序的key
     * @param isAsc     true升序,false降序
     * @return {Array}
     */
    convertObjectToArray(object, sortKey, isAsc) {
        var result = [];
        if (!object) {
            return result;
        }
        for (var pro in object) {
            if (object.hasOwnProperty(pro)) {
                if ($.isArray(object[pro])) {
                    result = result.concat(object[pro]);
                } else {
                    result.push(object[pro]);
                }
            }
        }
        //排序
        if (result.length > 0 && sortKey !== undefined) {
            if (isAsc === undefined) {
                isAsc = true;
            }
            var _sort = 0;
            if (isAsc) {
                result.sort(function (a, b) {
                    if (!a[sortKey] && !b[sortKey]) {
                        _sort = 0;
                    } else if (!a[sortKey]) {
                        _sort = 1;
                    } else if (!b[sortKey]) {
                        _sort = -1;
                    } else {
                        _sort = a[sortKey] > b[sortKey] ? -1 : 1;
                    }
                    return _sort;
                });
            } else {
                result.sort(function (a, b) {
                    if (!a[sortKey] && !b[sortKey]) {
                        _sort = 0;
                    } else if (!a[sortKey]) {
                        _sort = -1;
                    } else if (!b[sortKey]) {
                        _sort = 1;
                    } else {
                        _sort = a[sortKey] < b[sortKey] ? -1 : 1;
                    }
                    return _sort;
                });
            }
        }
        return result;
    },
    /**
     * 将Array类型的数据转换为类似Java的Map的Object
     * @param arr
     * @param key
     * @returns {{}}
     */
    convertArrayToObject(arr, key) {
        var result = {};
        var keyValue;
        for (var i = 0, len = arr.length; i < len; i++) {
            keyValue = arr[i][key];
            if (keyValue !== undefined) {
                result[keyValue] = arr[i];
            }
        }
        return result;
    },
    //渲染等值面
    renderContour(option) {
        let _this = this
        var geojson = {
            "type": "FeatureCollection",
            "totalFeatures": option.features.length,
            "features": []
        };

        for (var i = 0; i < option.features.length; i++) {
            var cfeature = option.features[i];
            var feature = {
                "type": "Feature",
                "geometry_name": "geom",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": cfeature.geometry.coordinates
                },
                "properties": {
                    "color": cfeature.properties.minvalue.toString(),
                    //"symbol": contour.symbol
                }
            };
            geojson.features.push(feature);
        }

        console.log(geojson);
        var vectorSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(geojson)
        });


        // 十六进制颜色值的正则表达式
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        String.prototype.colorRgb = function () {
            var sColor = this.toLowerCase();
            if (sColor && reg.test(sColor)) {
                if (sColor.length === 4) {
                    var sColorNew = "#";
                    for (let i = 1; i < 4; i += 1) {
                        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                    }
                    sColor = sColorNew;
                }
                //处理六位的颜色值
                let sColorChange = [];
                for (let i = 1; i < 7; i += 2) {
                    sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                }
                //return "RGB(" + sColorChange.join(",") + ")";
                return sColorChange.join(",");
            } else {
                return sColor;
            }
        };

        var styleFunc = function (feature) {
            console.log(feature)
            var color = feature.get('color');
            // var colors = {//最开始的数据
            //  "0": "255,255,255,0",
            //  "10": "168,240,140,255",
            //  "25": "56, 168, 0, 255",
            //  "50": "94, 183, 254, 255",
            //  "100": "0, 0, 252, 255",
            //  "200": "255, 0, 255, 255",
            //  "400": "118, 0, 0, 255"
            //  };

            var colorsSelect2 = _this.convertObjectToArray(option.color);
            console.log(colorsSelect2,option.color);
            var colors = {};
            if (colorsSelect2.length) {
                colors["0"] = colorsSelect2[0].colorRgb();
                colors["30"] = colorsSelect2[1].colorRgb();
                colors["50"] = colorsSelect2[2].colorRgb();
                colors["100"] = colorsSelect2[3].colorRgb();
                colors["200"] = colorsSelect2[4].colorRgb();
                colors["999999"] = colorsSelect2[5].colorRgb();
            } else {
                colors = {
                    "0": "61,239,130,255",
                    "30": "94,183,254,255",
                    "50": "0,0,252, 255",
                    "100": "255,0,255, 255",
                    "200": "118,0,0, 255",
                    "999999": "157,131,44, 255"
                };
            }
            color = "rgb(" + colors[color] + ")";
            return new ol.style.Style({
                fill: new ol.style.Fill({
                    color: color
                })
            })
        };


        option.layer.setSource(vectorSource);
        option.layer.setStyle(styleFunc);
        option.layer.setOpacity(0.5);
        console.log(option.layer.getStyle())
    },

}

export const mapFuncs = mapFunc;

