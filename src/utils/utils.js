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
        let s = ':' + date.getSeconds();

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
        var day = dd.getDay();
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
        var i, l,
            key = set.idKey,
            parentKey = set.pIdKey,
            childKey = set.children;
        if (!key || key == "" || !sNodes) return [];

        if (Array.isArray(sNodes)) {
            var r = [];
            var tmpMap = [];
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
        var first = node;
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
}

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
}

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
}

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
}

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
]

export const Time = time;
export const Formatter = FormatterData;
export const baseUrl = 'http://118.26.140.163:8963/nxhzz_2017/api/'; //服务地址
export const uploadUrl = 'http://118.26.140.163:8963/fss/api/file/uploadFile.do'; //文件上传地址
export const downLoadUrl = 'http://118.26.140.163:8963/fss/api/file/download/'; //文件预览地址


//export const baseUrl = 'http://172.16.100.33:8080/nxhzz_2017/api/'; //服务地址
//export const uploadUrl = 'http://121.42.25.6:8080/fss/api/file/uploadFile.do'; //文件上传地址
//export const downLoadUrl = 'http://121.42.25.6:8080/fss/api/file/download/'; //文件预览地址
