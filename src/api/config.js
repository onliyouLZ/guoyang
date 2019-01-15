/*存放全局变量*/

// const baseUrl = 'http://gyfxkhapi.matian.ml:8008/api-fxkh/'; //服务地址
const baseUrl = 'http://192.168.0.192:8866/'; //服务地址
const fileServer = 'http://gyfxkhapi.matian.ml:8008/files/'; //文件地址
const uploadUrl = baseUrl+'api/attachment/v0.1/attachment/upload'; //文件上传地址
const downLoadUrl = 'http://118.26.140.163:8963/fss/api/file/download/'; //文件预览地址


 export default {
   baseUrl,
   fileServer,
   uploadUrl,
   downLoadUrl
 }



