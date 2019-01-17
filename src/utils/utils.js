let time = {
    //获取当前时间 格式为 yyyy-mm-dd h:min
    getNowTime() {
        let date = new Date();

        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
        let h = date.getHours() + ':';
        let m = (date.getMinutes()+1 < 10 ? '0'+(date.getMinutes()+1) : date.getMinutes());
        // let s = ':' + date.getSeconds();

        return Y+M+D+h+m
    },
    //获取当前日期 转换时间戳格式为 yyyy-mm-dd
    getNowDay(tm) {
        let date = new Date(tm);

        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';

        return Y+M+D
    },
    //转换时间戳格式为yyyy -mm-dd hh-mm
    getNowMin(tm) {
        let date = new Date(tm);

        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
        let h = date.getHours() + ':';
        let m = (date.getMinutes()+1 < 10 ? '0'+(date.getMinutes()+1) : date.getMinutes());
        // let s = ':' + date.getSeconds();

        return Y+M+D+h+m
    },
    //格式为 yyyy-mm-dd hh-mm-ss
    getNowSecond(tm) {
        let date = new Date(tm);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = (date.getMinutes()+1 < 10 ? '0'+(date.getMinutes()+1) : date.getMinutes());
        let s =":"+("" + (date.getSeconds() + 100)).substr(1);
        return Y+M+D+h+m+s
    },
    getOwnMin(tm){
        let date = new Date(tm);

        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = (date.getMinutes()+1 < 10 ? '0'+(date.getMinutes()+1) : date.getMinutes());
        let s = ':' + date.getSeconds();

        return M+D+h+m
    },
    getDate(AddDayCount) {
        let dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount);
        let y = dd.getFullYear();
        let m = ((dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1));
        let d = (dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate());
        return y + "-" + m + "-" + d;
    },
    getMonth(AddCount) {
        let dd = new Date();
        dd.setMonth(dd.getMonth() + AddCount);
        dd.setDate(1);
        let y = dd.getFullYear();
        let m = ((dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1));
        let d = (dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate());
        return y + "-" + m + "-" + d;
    },
    //本周第一天
    getWeekFirstDay() {
        let dd = new Date();
        let day = dd.getDay();
        let week = [6, 0, 1, 2, 3, 4, 5];
        let first = 0 - week[dd.getDay()];
        dd.setDate(dd.getDate() + first);
        let y = dd.getFullYear();
        let m = ((dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1));
        let d = (dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate());
        return y + "-" + m + "-" + d;
    },
    //本月第一天
    getMonthFirstDay() {
        let dd = new Date();
        let y = dd.getFullYear();
        let m = ((dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1));
        return y + "-" + m + "-01";
    },
    //本年第一天
    getYearFirstDay() {
        let dd = new Date();
        let y = dd.getFullYear();
        return y + "-01-01";
    },
    //本年
    getYears() {
        let dd = new Date();
        let y = dd.getFullYear();
        return y;
    },
    /**
     * 获得时间差,时间格式为 年-月-日 小时:分钟:秒 或者 年/月/日 小时：分钟：秒
     * 其中，年月日为全格式，例如 ： 2010-10-12 01:00:00
     * 返回精度为：秒，分，，小时天
     * @param startTime
     * @param endTime
     * @param diffType
     * @returns {number}
     */
    getDateDiff: function (startTime, endTime, diffType) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");

    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    let sTime = new Date(startTime);      //开始时间
    let eTime = new Date(endTime);  //结束时间
    //作为除数的数字
    let divNum = 1;
    switch (diffType) {
      case "second":
        divNum = 1000;
        break;
      case "minute":
        divNum = 1000 * 60;
        break;
      case "hour":
        divNum = 1000 * 3600;
        break;
      case "day":
        divNum = 1000 * 3600 * 24;
        break;
      default:
        break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum).toString());
  }
};
let FormatterData = {
    transformToTree(sNodes, setting) {
        let set = {
            children: "children",
            idKey: "id",
            pIdKey: "pId",
            label: 'name'
        };
        if (setting) {
            set = setting;
        }
        let i, l,
            key = set.idKey,
            parentKey = set.pIdKey,
            childKey = set.children;
        if (!key || key == "" || !sNodes) return [];

        if (Array.isArray(sNodes)) {
            let r = [];
            let tmpMap = [];
            for (i = 0, l = sNodes.length; i < l; i++) {
                tmpMap[sNodes[i][key]] = sNodes[i];
            }
            for (i = 0, l = sNodes.length; i < l; i++) {
                if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {
                    if (!tmpMap[sNodes[i][parentKey]][childKey])
                        tmpMap[sNodes[i][parentKey]][childKey] = [];
                    tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
                } else {
                    r.push(sNodes[i]);
                }
            }
            return r;
        } else {
            return [sNodes];
        }
    },
    getFirst(node, children) {
        let first = node;
        if (node[children] != undefined) {
            return this.getFirst(node[children][0])
        } else {
            node['first'] = 1;
            return first;
        }
    },
    formatData(parm){
        let time = new Date(parm);
        let y = time.getFullYear();
        let m = time.getMonth()+1<10?'0'+time.getMonth()+1:time.getMonth()+1;
        let d = time.getDate()<10?'0'+time.getDate():time.getDate();
        return y+'-'+m+'-'+d
    },
    formatYear(parm){
        debugger
        let time = new Date(parm);
        let y = time.getFullYear();
        return y
    }
};
/*
 *   des:        格式化时间
 *   @return:    {yyyy-MM-dd HH:mm:ss}
 *   ex:         2018-01-01 08:00:00
 */
Date.prototype.formatDate = function (formatStr) {
  if (!formatStr || typeof formatStr !== 'string') formatStr = "yyyy-MM-dd HH:mm";
  let dict = {
    "yyyy": this.getFullYear(),
    "M": this.getMonth() + 1,
    "d": this.getDate(),
    "H": this.getHours(),
    "m": this.getMinutes(),
    "s": this.getSeconds(),
    "f": this.getMilliseconds(),
    "MM": ("" + (this.getMonth() + 101)).substr(1),
    "dd": ("" + (this.getDate() + 100)).substr(1),
    "HH": ("" + (this.getHours() + 100)).substr(1),
    "mm": ("" + (this.getMinutes() + 100)).substr(1),
    "ss": ("" + (this.getSeconds() + 100)).substr(1),
    "fff": ("" + (this.getMilliseconds() + 1000)).substr(1)
  };
  return formatStr.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?|fff?)/g, function () {
    return dict[arguments[0]];
  });
};
/*
 *   des:        时间操作
 *   @proStr:    格式化参数
 *   @return:    date类型时间
 *   ex:         new Date().datePro('{%y+1}-{%M+2}-{%d+1}-{%H+1}-{%m+1}-{%s+1}') //年月日时分秒全部加1
 */
Date.prototype.datePro = function (proStr) {
  let dealWith = function (str, date) {
    let t = str.substr(0, 1);
    let num = '0';
    if (str.indexOf('+') > -1) {
      num = str.substr(str.indexOf('+'));
    } else if (str.indexOf('-') > -1) {
      num = str.substr(str.indexOf('-'));
    }
    switch (t) {
      case 'y':
        date.setFullYear(date.getFullYear() + parseInt(num));
        break;
      case 'M':
        date.setMonth(date.getMonth() + parseInt(num));
        break;
      case 'd':
        date.setDate(date.getDate() + parseInt(num));
        break;
      case 'H':
        date.setHours(date.getHours() + parseInt(num));
        break;
      case 'm':
        date.setMinutes(date.getMinutes() + parseInt(num));
        break;
      case 's':
        date.setSeconds(date.getSeconds() + parseInt(num));
        break;
    }
    return date;
  };

  let arr = proStr.split('{%');
  let date;
  for (let i = 1; i < arr.length; i++) {
    arr[i] = arr[i].replace('}-', '');
    arr[i] = arr[i].replace('}', '');
    date = dealWith(arr[i], this);
  }
  return date;
};

/**
 * 数组去重
 * @return {Array}
 */

Array.prototype.unique1 = function() {
  let n = []; //一个新的临时数组
  for(let i = 0; i < this.length; i++) //遍历当前数组
  {
    //如果当前数组的第i已经保存进了临时数组，那么跳过，
    //否则把当前项push到临时数组里面
    if(n.indexOf(this[i]) === -1) n.push(this[i]);
  }
  return n;
};

/*
 *   des:        字符串转时间
 *   @return:    date类型时间
 *   ex:         '1991-01-01 08:00'.toDate()
 */
String.prototype.toDate = function () {
  let date = this.toString();
  //IE
  if (!!window.ActiveXObject || "ActiveXObject" in window) {
    let result = new Date();
    if (date.length <= 10) {
      let str = date.split('-');
      result.setUTCFullYear(str[0], str[1] ? str[1] - 1 : 0, str[2] ? str[2] : 1);
      result.setUTCHours(0, 0, 0, 0);
    } else {
      let strs = date.trim().split(" ");
      let one = strs[0].split('-'),
        two = strs[1].split(':');
      result.setUTCFullYear(one[0], one[1] ? one[1] - 1 : 0, one[2] ? one[2] : 1);
      result.setUTCHours(two[0] - 8, two[1] ? two[1] : 0, two[2] ? two[2] : 0, 0);
    }
    return result;
  } else {
    //火狐
    if (navigator.userAgent.indexOf('Firefox') > -1) {
      date = new Date(date.replace(/ /g, 'T').replace(/\//g, "-"));
    } else {
      date = new Date(date.replace(/T/g, ' ').replace(/-/g, "/"));
    }
  }
  return date;
};

let  weekEnum = [
  {zh: "周日", en: "Sunday"},
  {zh: "周一", en: "Monday"},
  {zh: "周二", en: "Tuesday"},
  {zh: "周三", en: "Wednesday"},
  {zh: "周四", en: "Thursday"},
  {zh: "周五", en: "Friday"},
  {zh: "周六", en: "Saturday"}
];



/**
 * 格式化雨量,地下水埋深保留两位小数
 * 强制保留两位小数
 * @param z
 * @param data
 * @returns {*}
 */
export const convertP=function (z, data) {
  z = parseFloat(z);
  if (isNaN(z)) {
    return "";
  }
  return z.toFixed(2);
};


export const deepcopy = function(source) {
    if (!source) {
        return source;
    }
    let sourceCopy = source instanceof Array ? [] : {};
    for (let item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
    }
    return sourceCopy;
};

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
};

export function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
};

export function formatTime(time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        )
    }
};

// 格式化时间
export function getQueryObject(url) {
    url = url == null ? window.location.href : url
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1)
        let val = decodeURIComponent($2)
        val = String(val)
        obj[name] = val
        return rs
    })
    return obj
};

export const pickerOptions = [
    {
        text: '今天',
        onClick(picker) {
            const end = new Date()
            const start = new Date(new Date().toDateString())
            end.setTime(start.getTime())
            picker.$emit('pick', [start, end])
        }
    },
    {
        text: '最近一周',
        onClick(picker) {
            const end = new Date(new Date().toDateString())
            const start = new Date()
            start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
        }
    },
    {
        text: '最近一个月',
        onClick(picker) {
            const end = new Date(new Date().toDateString())
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
        }
    },
    {
        text: '最近三个月',
        onClick(picker) {
            const end = new Date(new Date().toDateString())
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
        }
    }
];

export const Time = time;
export const Formatter = FormatterData;


export const parserDate = function (date) {
  let t = Date.parse(date);
  if (!isNaN(t)) {
    return new Date(Date.parse(date.replace(/-/g, "/")));
  } else {
    return new Date();
  }
};



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
export function convertObjectToArray(object, sortKey, isAsc){
  let result = [];
  if (!object) {
    return result;
  }
  for (let pro in object) {
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
    let _sort = 0;
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
};


/**
 * 人员数据组合成树类型
 * @param data
 * @returns {Array}
 */
export function toTree (data) {
  // 删除 所有 children,以防止多次调用
  data.forEach(function(item) {
    delete item.children;
  });

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  let map = {};
  data.forEach(function(item) {
    map[item.GROUP_ID] = item;
  });
  let val = [];
  data.forEach(function(item) {
    if(item.type==="duty"){
      item.open='true';
      item.nocheck='true';
      item.iconSkin="pIcon01"
    }
    item.name=item.GROUP_NAME;
    item.id=item.GROUP_ID;
    item.pid=item.GROUP_PID;
    // 以当前遍历项，的pid,去map对象中找到索引的id
    let parent = map[item.GROUP_PID];
    // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if(parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
      val.push(item);
    }
  });
  return val;
};

/**
 * 将值班信息转换成周数据集
 * @param dutyInfoArr
 * @return {Array}
 */
export function groupByWeek (dutyInfoArr) {
  let resultArr = [];
  if ($.isArray(dutyInfoArr) && dutyInfoArr.length > 0) {
    let weekOfYear = dutyInfoArr[0].weekOfYear;  //本年第几周
    let year = dutyInfoArr[0].date.substr(0, 4);
    let defaultObj = {
      year: null,           //年份
      weekOfYear: null,     //年内第几周,从0开始
      Monday: null,         //
      Tuesday: null,        //
      Wednesday: null,      //
      Thursday: null,       //
      Friday: null,         //
      Saturday: null,       //
      Sunday: null,         //
    };


    let obj = $.extend(true, {}, defaultObj, {year: year, weekOfYear: weekOfYear});
    $.each(dutyInfoArr, function (i, item) {

      if (year !== item.date.substr(0, 4) || item.weekOfYear !== weekOfYear) {
        //认为是新的一周,计算上周有数据的第一天和最后一天那么将上周数据放入结果中.
        resultArr.push(obj);
        //重新计算 year 和 weekOfYear
        year = item.date.substr(0, 4);
        weekOfYear = item.weekOfYear;
        obj = $.extend(true, {}, defaultObj, {year: year, weekOfYear: weekOfYear});
      }
      obj[weekEnum[item.date.toDate().getDay()].en] = item;

    });



    resultArr.push(obj);
  }


  // $.each(resultArr, function (i, item) {
  //     item.firstItem = item.Monday || item.Tuesday || item.Wednesday || item.Thursday || item.Friday || item.Saturday || item.Sunday;
  //     item.lastItem = item.Sunday || item.Saturday || item.Friday || item.Thursday || item.Wednesday || item.Tuesday || item.Monday;
  //
  // });
  return resultArr;
}



let formatString=function () {
  for (let i = 1; i < arguments.length; i++) {
    let exp = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
    arguments[0] = arguments[0].replace(exp, arguments[i]);
  }
  return arguments[0];
};

/**
 * 验证url
 */
function checkUrl(url) {
  let RegUrl = new RegExp();
  RegUrl.compile("((http|ftp|https)://)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(/[a-zA-Z0-9\&%_\./-~-]*)?");
  return RegUrl.test(url);
}

/**
 * 文件下载
 * @param url       服务地址(完整地址)
 * @param method    请求方法类型:post/get
 * @param data      附加在请求中的参数
 */
export function download  (url, method, data) {
  //创建iframe
  let downloadHelper = $('<iframe style="display:none;" id="_downloadHelper_"></iframe>').appendTo('body')[0];
  let doc = downloadHelper.contentWindow.document;
  if (doc) {
    doc.open();
    //微软为doc.clear();
    doc.write('');
    doc.writeln(formatString("<html><body><form id='downloadForm' name='downloadForm' method='{0}' action='{1}'>", method, url));
    if(data){
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key] instanceof Function) {
            doc.writeln(formatString("<input type='hidden' name='{0}' value='{1}'>", key, data[key]()));
          } else {
            doc.writeln(formatString("<input type='hidden' name='{0}' value='{1}'>", key, data[key]));
          }
        }
      }
    }
    doc.writeln('<\/form><\/body><\/html>');
    doc.close();
    let form = doc.forms[0];
    if (form) {
      form.submit();
    }
  }
};


/**
 * 文件下载2
 * @param url 地址
 * @param queryParams 参数
 */
export function  downloadFile (url, queryParams) {

  // if (url && !checkUrl(url)) {
  //   //fileUrl为文件服务器地址
  //   _url = config.api.fileUrl + url;
  // } else {
  //   _url = url;
  // }
  let _url=url;
  let queryP = '';
  for (let p in queryParams) {
    if (queryParams[p] !== null && queryParams[p] !== '') {
      if (typeof queryParams[p] === 'string' || typeof queryParams[p] === 'number') {
        queryP += 'ids[]' + '=' + queryParams[p] + '&';
      } else if (typeof queryParams[p] === 'object' && queryParams[p].length > 0) {
        queryParams[p].forEach(function (item) {
          queryP += 'ids[]' + item + '&'+queryParams;
        })
      }
    }
  }
  // queryP = queryP.substring(0, queryP.length - 1);
  // location.href = _url + '?' + queryP;
  let $a = $("<a></a>").attr("href", _url + '?' + queryP);
  $a[0].click();
};

/**
 *
 * @param ext
 * @return {boolean}
 * 检查文件后缀(.jpg|.gif|.png|.jpeg|.zip|.rar|.doc|.xls|.xlsx|.pdf|.ppt|.pptx)
 */
export function checkFileExt (ext) {
  if (!ext.match(/.jpg|.gif|.png|.jpeg|.zip|.rar|.doc|.xls|.xlsx|.pdf|.ppt|.pptx/i)) {
    return false;
  }
  return true;
}


/**
 * 按字段升序排序
 * @param arr
 * @param item
 */
export function sort(arr,item) {
  for (let j = 0; j < arr.length - 1; j++) {
    //两两比较，如果前一个比后一个大，则交换位置。
    for (let i = 0; i < arr.length - 1 - j; i++) {
      if (arr[i][item] < arr[i + 1][item]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }
}



//export const baseUrl = 'http://172.16.100.33:8080/nxhzz_2017/api/'; //服务地址
//export const uploadUrl = 'http://121.42.25.6:8080/fss/api/file/uploadFile.do'; //文件上传地址
//export const downLoadUrl = 'http://121.42.25.6:8080/fss/api/file/download/'; //文件预览地址
