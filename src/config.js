// Date.prototype.formatDate = function (formatStr) {
//   if (!formatStr || typeof formatStr !== 'string') formatStr = "yyyy-MM-dd HH:mm";
//   var dict = {
//     "yyyy": this.getFullYear(),
//     "M": this.getMonth() + 1,
//     "d": this.getDate(),
//     "H": this.getHours(),
//     "m": this.getMinutes(),
//     "s": this.getSeconds(),
//     "f": this.getMilliseconds(),
//     "MM": ("" + (this.getMonth() + 101)).substr(1),
//     "dd": ("" + (this.getDate() + 100)).substr(1),
//     "HH": ("" + (this.getHours() + 100)).substr(1),
//     "mm": ("" + (this.getMinutes() + 100)).substr(1),
//     "ss": ("" + (this.getSeconds() + 100)).substr(1),
//     "fff": ("" + (this.getMilliseconds() + 1000)).substr(1)
//   };
//   return formatStr.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?|fff?)/g, function () {
//     return dict[arguments[0]];
//   });
// };
/*
 *   des:        时间操作
 *   @proStr:    格式化参数
 *   @return:    date类型时间
 *   ex:         new Date().datePro('{%y+1}-{%M+2}-{%d+1}-{%H+1}-{%m+1}-{%s+1}') //年月日时分秒全部加1
 */
// Date.prototype.datePro = function (proStr) {
//   var dealWith = function (str, date) {
//     var t = str.substr(0, 1);
//     var num = '0';
//     if (str.indexOf('+') > -1) {
//       num = str.substr(str.indexOf('+'));
//     } else if (str.indexOf('-') > -1) {
//       num = str.substr(str.indexOf('-'));
//     }
//     switch (t) {
//       case 'y':
//         date.setFullYear(date.getFullYear() + parseInt(num));
//         break;
//       case 'M':
//         date.setMonth(date.getMonth() + parseInt(num));
//         break;
//       case 'd':
//         date.setDate(date.getDate() + parseInt(num));
//         break;
//       case 'H':
//         date.setHours(date.getHours() + parseInt(num));
//         break;
//       case 'm':
//         date.setMinutes(date.getMinutes() + parseInt(num));
//         break;
//       case 's':
//         date.setSeconds(date.getSeconds() + parseInt(num));
//         break;
//     }
//     return date;
//   };
//
//   var arr = proStr.split('{%');
//   var date;
//   for (var i = 1; i < arr.length; i++) {
//     arr[i] = arr[i].replace('}-', '');
//     arr[i] = arr[i].replace('}', '');
//     date = dealWith(arr[i], this);
//   }
//   return date;
// };

// let baseUrl='http://jxapi.matian.ml:8008/api-server/'

// export const baseUrl = 'http://jxapi.matian.ml:8008/api-server/'; //服务地址
// export const uploadUrl = 'http://jxapi.matian.ml:8008/files/'; //文件上传地址
// export const downLoadUrl = 'http://jxapi.matian.ml:8008/files/'; //文件预览地址

