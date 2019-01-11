<template>
  <div id="logbook"
       v-loading="loading"
       element-loading-text="加载中">
    <el-card class="box-card" >
      <el-radio-group v-model="dutyType" @change="dutyChange"  size="mini">
        <el-radio-button label="1">白班</el-radio-button>
        <el-radio-button label="2">夜班</el-radio-button>
      </el-radio-group>
      <el-row>
        <el-col :span="18">
          <div>
            <div class="title">
             <p>防汛抗旱值班日志</p>
            </div>
            <div class="dateHeader">
              值班领导 :<el-input style="width: 180px" size="small" placeholder="未记录" v-model="leader"></el-input>
              值班人员 :<el-input style="width: 180px" size="small"  placeholder="未记录" v-model="person"></el-input>
              值班技术人员 :<el-input style="width: 180px" size="small" placeholder="未记录" v-model="director"></el-input>
              <span  style="font-size: 14px;float: right">
                  <span>{{dates}}</span>&nbsp;&nbsp;
                  <span>{{dutyType==="1" ? '白班' : '夜班'}}</span>&nbsp;&nbsp;
                  <span class="btn btn-cloud" @click="exportLog" style="cursor: pointer">
                    <i class="fa fa-cloud-download"></i>&nbsp;导出
                  </span>
              </span>
              <div style="width:100%;height:0px;border-top:2px red solid;" ></div>
            </div>
            <el-form label-position="top" :model="ruleForm"  ref="ruleForm" label-width="120px" class="demo-ruleForm">
              <p class="weather">{{weather}}</p>
              <el-form-item label="一、雨情:" >
                <el-input class="duty-textarea" type="textarea" v-model="ruleForm.rain"></el-input>
              </el-form-item>
              <el-form-item label="二、水情" >
                <el-input class="duty-textarea" type="textarea" v-model="ruleForm.water"></el-input>
              </el-form-item>
              <el-form-item label="三、工情:" >
                <el-input class="duty-textarea"  type="textarea" v-model="ruleForm.work"></el-input>
              </el-form-item>
              <el-form-item label="四、灾情:">
                <el-input class="duty-textarea" type="textarea" v-model="ruleForm.disaster"></el-input>
              </el-form-item>
              <el-form-item label="五、调度情况:">
                <el-input class="duty-textarea" type="textarea" v-model="ruleForm.transfer"></el-input>
              </el-form-item>
              <el-form-item label="六、值班工作情况:">
                <el-input class="duty-textarea" type="textarea" v-model="ruleForm.action"></el-input>
              </el-form-item>
              <el-form-item label="七、交接班处理或关注事项:">
                <el-input class="duty-textarea" type="textarea" v-model="ruleForm.tip"></el-input>
              </el-form-item>
              <div style="width:100%;height:0;border-top:2px red solid;" ></div>
              <el-form-item style="margin-bottom: 0!important;text-align: center;margin-top: 10px">
                <el-button type="primary" @click="submitForm">保存</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </div>

        </el-col>
        <el-col :span="6">
          <div class="datePicker">
            <p class="days">{{days}}</p>
            <p class="years">{{dates}}</p>
            <Datepicker
              class="picker"
              :inline="true"
              :value="state.date"
              :language="state.language"
              :disabledDates="state.disabledDates"
              @selected="selectDate">
            </Datepicker>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import {zh} from 'vuejs-datepicker/dist/locale'//引入语言包
    import {download} from '../../utils/utils'
    export default {
      name: "logbook",
      components: {
        Datepicker
      },
      data(){
          return{
            loading:true,
            dutyType:"1",
            leader:"",
            person:"",
            director:"",
            ruleForm:{
              rain:"",
              water:'',
              work:"",
              disaster:"",
              transfer:"",
              action:"",
              tip:"",
            },
            dates:new Date().formatDate('yyyy'+'年'+'MM'+'月'+'dd'+'日'),
            days:new Date().getDate(),
            state:{
              date: new Date(),
              language:zh,
              disabledDates:{
                customPredictor: function(date) {
                  //大于今天不允许选中
                  if(date>new Date()){
                    return true
                  }
                }
              }
            },
            weather:"",
            selectDates:new Date(),
            dutyPerson:"",
            dutyPtys:[],
            url:'api/duty/v0.1/duty-log',
          }
      },
      methods:{
        /**
         * 初始化需要的数据
         */
        search(){
          const _this=this;

          /**
           * 获取值班人员信息
           * @return {AxiosPromise<any>}
           */
          function getduty() {
            let parms={
              bgtm:new Date('2019-04-15 00:00:00').formatDate('yyyy-MM-dd HH:mm:ss'),
              endtm:new Date('2019-04-15 23:59:59').formatDate('yyyy-MM-dd HH:mm:ss')
            };
            return _this.$http.post(_this.$url.baseUrl+'api/duty/v0.1/gy-duty/duty-record-list/by-day',parms)
          };

          /**
           * 获取值班类型
           * @return {AxiosPromise<any>}
           */
          function  getPersontype() {
            return _this.$http.get(_this.$url.baseUrl+'api/duty/v0.1/gy-duty/duty-person-type')
          };

          /**
           * 获取天气
           * @return {AxiosPromise<any>}
           */
          function getWeather() {
             return _this.$http.get(_this.$url.baseUrl+'api/weather/v0.1/weather/get-lastest-weather')
           };

          _this.$http.all([getduty(),getPersontype(),getWeather()]).then(_this.$http.spread((duty,personType,weather)=>{
            if(duty.status===200){
              let dutyPersonTypeArr = personType.data.result.sort(function (a,b) { return a.sortid - b.sortid });
              let leaderType = dutyPersonTypeArr[0].code;
              let dutyRecordMap = duty.data.result;
              for(let date in dutyRecordMap){
                if(dutyRecordMap.hasOwnProperty(date) && $.isArray(dutyRecordMap[date])){
                  // dutyRecordMap[date] 某天所有单位的排班信息
                  $.each(dutyRecordMap[date],function (i,departDayDutyItem) {
                    // 某天某单位排班信息
                    $.each(departDayDutyItem.tm,function (j, dutyDataItem) {
                      //dutyDataItem 某天某单位白班(或夜班/全天等)的排班信息
                      //1.初始化
                      $.each(dutyPersonTypeArr,function (k,dpTypeItem) {
                        dutyDataItem['dutyPersonType'+dpTypeItem.code] = [];
                      });
                      //2. 领导转换
                      dutyDataItem['dutyPersonType'+leaderType] = dutyDataItem.leaders;
                      delete dutyDataItem.leaders;
                      //3. 人员转换
                      if (dutyDataItem.persons.length > 0) {
                        $.each(dutyDataItem.persons,function (m, personItem) {
                          dutyDataItem['dutyPersonType'+personItem.dutyPersonType].push(personItem);
                        })
                      }
                      delete dutyDataItem.persons;
                    })
                  })

                }
              }
              _this.dutyPerson = dutyRecordMap;
            };
            if(personType.status===200){
               let dutyPty=personType.data.result;
               for(let i=0;i<dutyPty.length;i++){
                 let obj={};
                 obj.data=dutyPty[i].type+dutyPty[i].sortid;
                 obj.title=dutyPty[i].name;
                 _this.dutyPtys.push(obj)
               }
             };
            if(weather.status===200){
               this.weather=weather.data.result.weather.LIVE_INFO
            };
          }))
        },
        /**
         * 初始化日志
         */
        searchLog(){
          const _this=this;
          /**
           * 获取日志
           * @return {AxiosPromise<any>}
           */
          function  getLog() {
            let prams = {
              groupId:"1",
              dutyDate: new Date(_this.selectDates).formatDate('yyyy-MM-dd'),
              dutyType:_this.dutyType
            };
            return _this.$http.get(_this.$url.baseUrl+'api/duty/v0.1/gy-duty-log/'+prams.groupId+'/'+prams.dutyDate+'/'+prams.dutyType)
          };
          /**
           * 获取雨量
           * @return {AxiosPromise<any>}
           */
          function getRain() {
            let parms={
              'bgtm':new Date(_this.selectDates).datePro('{%d-1}').formatDate('yyyy-MM-dd'),
              'endtm':new Date(_this.selectDates).formatDate('yyyy-MM-dd'),
            };
            return _this.$http.post(_this.$url.baseUrl+'api/guoYang/v0.1/flood-short-description/rain',parms)
          }
          _this.$http.all([getLog(),getRain()]).then(_this.$http.spread((log,rain)=>{
            if(log.status===200){
              setTimeout(()=>{
                _this.loading=false;
                let data=log.data.result;
                if(data){
                  let contents=JSON.parse(data.contents);
                  _this.ruleForm.action=contents.action;
                  _this.director=contents.director;
                  _this.ruleForm.disaster=contents.disaster;
                  _this.leader=contents.leader;
                  _this.person=contents.person;
                  _this.ruleForm.rain=contents.rain;
                  _this.ruleForm.tip=contents.tip;
                  _this.ruleForm.water=contents.water;
                  _this.ruleForm.work=contents.work;
                  _this.ruleForm.transfer=contents.transfer;
                  _this.url='api/duty/v0.1/gy-duty-log/update'
                }else{
                  if(rain.status===200){
                    _this.ruleForm.rain=rain.data.result.rain;
                    _this.ruleForm.water=rain.data.result.lake+rain.data.result.reservoirRegime+rain.data.result.riverRegime;
                    _this.ruleForm.action="";
                    _this.director="";
                    _this.ruleForm.disaster="";
                    _this.leader="";
                    _this.person="";
                    _this.ruleForm.tip="";
                    _this.ruleForm.work="";
                    _this.ruleForm.transfer="1.涵闸的开闸情况：金水闸：____孔全开    法泗闸：____孔全开 ； \n" +
                      "2.泵站的启排情况：汤逊湖泵站：启动机组____台，流量____m³/s\n" +
                      "                             金口泵站：启动机组____台，流量____m³/s\n" +
                      "                             海口泵站：启动机组____台，流量____m³/s\n";
                    _this.url='api/duty/v0.1/gy-duty-log'
                  }
                }
              },500);
            };
          }))
        },
        /**
         * 白夜班切换
         */
        dutyChange(){
          this.loading=true;
          this.searchLog();
        },
        /**
         * 日志导出
         */
        exportLog(){
          let queryParams = {
            bgtm:new Date(this.selectDates).formatDate('yyyy-MM-dd 00:00:00'),
            endtm: new Date(this.selectDates).formatDate('yyyy-MM-dd 23:59:59'),
            dutyTypeStr: "1",
            groupIdStr: this.dutyType
          };
          download(this.$url.baseUrl+'api/duty/v0.1/gy-duty-log/export','get',queryParams)
        },
        /**
         * 保存日志
         */
        submitForm(){
          const _this=this;
          _this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
              let flag=true;
              let person="58"; //当前登录人员ID 暂时写死
              let dates = new Date().getTime() - _this.selectDates.getTime();
              let total = dates / 1000;
              let day = parseInt(total / (24 * 60 * 60));//计算整数天数
              if(day>2){
                _this.$message({
                  type:"error",
                  message:"距离当前日期超过两天，不能修改/填写日志！"
                });
                return
              }else{
                let data=_this.dutyPerson,items,arrs=[];
                for(let d in  data){
                  if(d===_this.selectDates.formatDate("yyyy-MM-dd")){
                    items=data[d];
                  }
                }
               if(items){
                 $.each(items[0].tm,function (i, typename) {
                   $.each(_this.dutyPtys,function(j,item){
                     if(_this.dutyType===typename.dutyType){
                       $.each(typename[item.data],function (v,personItem) {
                         arrs.push(personItem)
                       })
                     }
                   });
                 });
                 $.each(arrs,function (v,item) {
                   if(item.id===person){
                     flag=true;
                     return false
                   }else{
                     flag=false
                   }
                 })
               }else{
                  _this.$message({
                    type:"error",
                    message:_this.selectDates.formatDate("yyyy-MM-dd")+"日没有人员值班，请排班后再来填写！"
                  });
                  flag=false;
                  return
               };
               if(flag){
                 let obj={
                   dutyDate:_this.selectDates.formatDate('yyyy-MM-dd'),
                   dutyType:_this.dutyType,
                   contents:{
                     'action':_this.ruleForm.action,
                     'director': _this.director,
                     'disaster':_this.ruleForm.disaster,
                     'leader' :_this.leader,
                     'rain':_this.ruleForm.rain,
                     'tip':_this.ruleForm.tip,
                     'transfer':_this.ruleForm.transfer,
                     'water': _this.ruleForm.water,
                     'work' :_this.ruleForm.work,
                     'person' :_this.person,
                   },
                   userId:"58", //待获取到用户id时可以删除
                   groupId:"1" //待获取到用户组id时可以删除
                 };
                 obj.contents=JSON.stringify(obj.contents);
                 if(_this.url==='api/duty/v0.1/duty-log/update'){
                   obj.groupId="1" //用户组ID需从后台获取 暂时写死
                 }
                 _this.$http.put(_this.$url.baseUrl+_this.url,obj).then((res)=>{
                    if(res.status===200){
                      _this.$message({
                        type:"success",
                        message:"保存成功"
                      });
                      this.loading=true;
                      this.searchLog();
                    }
                 })
               }else{
                 _this.$message({
                   type:"error",
                   message:"当前登录人不是对应班次的值班人员，请排班后再来填写！"
                 });
               }
              }
            } else {
              return false;
            }
          });
        },
        /**
         * 重置
         */
        resetForm(){
          this.loading=true;
          this.selectDates=new Date();
          this.dutyType="1";
          this.state.date=new Date();
          this.days=new Date().getDate();
          this.dates=new Date().formatDate('yyyy'+'年'+'MM'+'月'+'dd'+'日');
          this.searchLog();
        },
        /**
         * 切换时间
         * @param val
         */
        selectDate(val){
          this.loading=true;
          this.dates=val.formatDate('yyyy'+'年'+'MM'+'月'+'dd'+'日');
          this.days=val.getDate();
          this.selectDates=val;
          this.searchLog();
        }
      },
      mounted(){
        this.$nextTick(()=>{
          // this.loading=false;
          this.search();
          this.searchLog();
        })
      }
    }
</script>

<style scoped lang="less">
  #logbook .box-card{
    height: calc(100vh - 89px);
    overflow-y: auto;
  }

  #logbook .title{
    font-size: 24px;
    text-align: center;
    color: red;
    line-height: 70px;
    font-weight: bold;
  }
  #logbook .dateHeader{
    font-size: 14px;
    line-height: 60px;
  }
  #logbook .weather{
    line-height: 40px;
    font-weight: bold;
  }
  #logbook .datePicker{
    text-align: center;
    margin-top:350px;
    .days{
      font-size: 150px;
      font-weight: 400;
      color: #35AEAE;
      line-height: 120px;
      margin-bottom: 10px;
    }
    .years{
      font-size: 20px;
      font-weight: 100;
      color: #d1d1d1;
      margin: 10px 0;
    }
  }
</style>
<style>
  #logbook .duty-textarea .el-textarea__inner{
    border: 1px solid #a8dbdb;
    margin: 0 auto;
    float: left;
    width: 100%;
    height: 100px;
    font-size: 13px;
    resize: none;
    padding: 5px;
  }
  #logbook .dateHeader .el-input__inner{
    height: 25px;
    line-height: 25px!important;
  }
  #logbook .datePicker .picker .vdp-datepicker__calendar{
    margin: 0 auto;
    border: 1px solid #DAEEF5;
    width: 350px;
  }
  #logbook .datePicker .picker .vdp-datepicker__calendar .prev,
  #logbook .datePicker .picker .vdp-datepicker__calendar .day__month_btn ,
  #logbook .datePicker .picker .vdp-datepicker__calendar .next{
    background: #DAEEF5;
  }

  #logbook .datePicker .picker .vdp-datepicker__calendar .day-header{
       background: #D1D1D1;
  }
</style>
