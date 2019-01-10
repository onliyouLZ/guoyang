<template>
  <div id="logbook"
       v-loading="loading"
       element-loading-text="加载中">
    <el-card class="box-card" >
      <el-radio-group v-model="radio6"  size="mini">
        <el-radio-button label="白班"></el-radio-button>
        <el-radio-button label="夜班"></el-radio-button>
      </el-radio-group>
      <el-row>
        <el-col :span="18">
          <div>
            <div class="title">
             <p>防汛抗旱值班日志</p>
            </div>
            <div class="dateHeader">
              值班领导 :<el-input style="width: 180px" size="small" placeholder="未记录"></el-input>
              值班人员 :<el-input style="width: 180px" size="small"  placeholder="未记录"></el-input>
              值班技术人员 :<el-input style="width: 180px" size="small" placeholder="未记录"></el-input>
              <span  style="font-size: 14px;float: right">
                  <span>2019</span>年
                  <span>01</span>月
                  <span>10</span>日
                  <span>{{radio6}}</span>
                  <span class="btn btn-cloud" @click="exportLog"><i class="fa fa-cloud-download"></i>&nbsp;导出</span>
              </span>
              <div style="width:100%;height:0px;border-top:2px red solid;" ></div>
            </div>
            <el-form label-position="top" :model="ruleForm"  ref="ruleForm" label-width="120px" class="demo-ruleForm">
              <p class="weather">今日：2019-01-10 天气实况：多云；降水：0.0mm；气温：3.1℃；风向：西北风，风速：微风；相对湿度：91.0%。空气质量：良。</p>
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
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </div>

        </el-col>
        <el-col :span="6">
          <span>{{dates}}</span>
          <Datepicker
            :inline="true"
            :value="state.date"
            :language="state.language"
            :highlighted="state.highlighted"
            @selected="selectDate">
          </Datepicker>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import {zh} from 'vuejs-datepicker/dist/locale'//引入语言包
    export default {
      name: "logbook",
      components: {
        Datepicker
      },
      data(){
          return{
            loading:false,
            radio6:"白班",
            leader:"",
            ruleForm:{
              rain:"",
              water:'常驻抢险队伍',
              work:"",
              disaster:"",
              transfer:"",
              action:"",
              tip:"",
            },
            dates:"",
            state:{
              date: new Date(),
              language:zh,
              highlighted: {
                to: new Date(2016, 0, 5), // Highlight all dates up to specific date
                from: new Date(2016, 0, 26), // Highlight all dates after specific date
                days: [6, 0], // Highlight Saturday's and Sunday's
                daysOfMonth: [15, 20, 31], // Highlight 15th, 20th and 31st of each month
                dates: [ // Highlight an array of dates
                  new Date(2016, 9, 16),
                  new Date(2016, 9, 17),
                  new Date(2016, 9, 18)
                ],
                // a custom function that returns true of the date is highlighted
                // this can be used for wiring you own logic to highlight a date if none
                // of the above conditions serve your purpose
                // this function should accept a date and return true if is highlighted
                customPredictor: function(date) {
                  // highlights the date if it is a multiple of 4
                  if(date.getDate() % 4 == 0){
                    return false
                  }
                },
                includeDisabled: false // Highlight disabled dates
              }
            }
          }
      },
      methods:{
        exportLog(){

        },
        submitForm(){

        },
        resetForm(){

        },
        selectDate(val){
          this.dates=val
        }
      }
    }
</script>

<style scoped>
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
    line-height: 60px;
  }
  #logbook .weather{
    line-height: 40px;
    font-weight: bold;
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
</style>
