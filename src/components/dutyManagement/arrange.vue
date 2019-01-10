<template>
  <div id="arrange"
       v-loading="loading"
       element-loading-text="加载中">
    <el-card class="box-card">
        <el-row>
          <el-col :span="1">
            <ul class="leftMonth">
              <li v-for="(item,index) in leftMonth" :key="index" @click.stop="selectMonth(index)" :class="timeIndex === index ? 'active' : ''">
                <a :href="'#'+item.id">{{item.name}}</a>
              </li>
            </ul>
          </el-col>
          <el-col :span="19">
            <div class="table-button">
              <el-button type="text" icon="fa  fa-check" class="add" @click="selectDay">选择天</el-button>
              <el-button type="text" icon="fa fa-check" class="add" @click="selectWeak">选择周</el-button>
              <el-button type="text" icon="fa fa-trash-o" class="add" @click="clearDate">清空选择</el-button>
            </div>
            <!--@cell-click="cellClick"-->
            <!--@current-change="currentChange"-->
            <!--@row-click="rowClick"-->
            <el-table
              :data="tableData"
              ref="multipleTable"
              border
              height="800"
              style="width: 100%"
              :highlight-current-row="highlight"
              header-cell-class-name="table-header-public"
              cell-class-name="cell-duty-class"
              @cell-click="cellClick"
              @current-change="currentChange">
              <template v-for="item in tableHeader">
                <el-table-column
                  v-if="item.type==='normal'"
                  :prop="item.data"
                  header-align="center"
                  :label="item.title">
                  <template slot-scope="scope">
                    <div class="date" v-if="Formatter(scope,item.data,'date')" :id="Formatter(scope,item.data,'month')">
                      <span>{{Formatter(scope,item.data,'date')}}</span>
                      <span class="solar">{{Formatter(scope,item.data,'solar')}}</span>
                    </div>
                    <div class="person" v-if="Formatter(scope,item.data,'date')">
                      <span style="font-weight: 700">白班:</span>
                      <span>{{Formatter(scope,item.data,'dayPerson')}}</span>
                    </div>
                    <div class="person" v-if="Formatter(scope,item.data,'date')">
                      <span style="font-weight: 700;">夜班:</span>
                      <span>{{Formatter(scope,item.data,'nightPerson')}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="item.type==='Saturday'"
                  :prop="item.data"
                  header-align="center"
                  :label="item.title">
                  <template slot-scope="scope">
                    <div class="date" :id="Formatter(scope,item.data,'month')" v-if="Formatter(scope,item.data,'date')">
                      <!--<span style="font-weight: 700;" >时间:</span>-->
                      <span>{{Formatter(scope,item.data,'date')}}</span>
                      <span class="solar">{{Formatter(scope,item.data,'solar')}}</span>
                    </div>
                    <div class="personAll" v-if="Formatter(scope,item.data,'date')">
                      <span style="font-weight: 700;">全天:</span>
                      <span>{{Formatter(scope,item.data,'allPerson')}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="item.type==='Sunday'"
                  :prop="item.data"
                  header-align="center"
                  :label="item.title">
                  <template slot-scope="scope">
                    <div class="date" v-if="Formatter(scope,item.data,'date')" :id="Formatter(scope,item.data,'month')">
                      <!--<span style="font-weight: 700;" :id="Formatter(scope,item.data,'month')">时间:</span>-->
                      <span>{{Formatter(scope,item.data,'date')}}</span>
                      <span class="solar">{{Formatter(scope,item.data,'solar')}}</span>
                    </div>
                    <div class="personAll" v-if="Formatter(scope,item.data,'date')">
                      <span style="font-weight: 700;">全天:</span>
                      <span>{{Formatter(scope,item.data,'allPerson')}}</span>
                    </div>
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </el-col>
          <el-col :span="4" class="leftCard">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>已选择日期:</span>
                <p style="font-size: 12px;"><span>{{cardDate}}</span></p>
              </div>
              <template v-for="item in dateArry">
                <div style="margin: 20px 5px">
                  <label>
                    <i :class="item.class"></i>
                    <span>{{item.dutyTypeName}}:{{item.date}}</span>
                  </label>
                  <template v-for="dutyTypeItem in item.dutyPersonType">
                    <div>
                      <span class="peon">{{dutyTypeItem.name}}</span><span class='red' v-if="dutyTypeItem.code==='1'">*</span>:
                      <el-select v-model="dutyTypeItem.selected" multiple  clearable  placeholder="请选择">
                        <el-option
                          v-for="item in dutyTypeItem.persons"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </template>
                </div>
                <div style="width:100%;height:0px;border-top:1px black dashed;" ></div>
              </template>
              <div style="text-align: center;margin-top: 10px">
                <el-button type="primary" @click="sub">确认修改</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
    </el-card>
  </div>
</template>

<script>
  import {parserDate,groupByWeek} from '../../utils/utils'
  export default {
    name: "arrange",
    data(){
      return {
        loading:true,
        tableData: [],
        leftMonth:[
          {name:"四月",id:"4"},
          {name:"五月",id:"5"},
          {name:"六月",id:"6"},
          {name:"七月",id:"7"},
          {name:"八月",id:"8"},
          {name:"九月",id:"9"},
          {name:"十月",id:"10"},
        ],
        tableHeader:[
          {data: "Monday", title: "周一",type:"normal"},
          {data: "Tuesday", title: "周二",type:"normal"},
          {data: "Wednesday", title: "周三",type:"normal"},
          {data: "Thursday", title: "周四",type:"normal"},
          {data: "Friday", title: "周五",type:"normal"},
          {data: "Saturday", title: "周六",type:"Saturday"},
          {data: "Sunday", title: "周日",type:"Sunday"}
        ],
        timeIndex:0,
        flag:true,
        currentRow: null,
        highlight:false,
        selectDuty:[],
        cardDate:"",
        dateArry:[],
      }
    },
    methods:{
      search(){
        const _this=this;
        let _current = new Date();

        /**
         * 获取值班安排日期
         * @return {AxiosPromise<any>}
         */
        function getDuty() {
          let queryParams = {
            bgtm: (_current.getFullYear() + 0) + '-01-01 00:00:00',
            endtm: (_current.getFullYear() + 0) + '-12-31 23:59:59',
            userId:"58"
          };
          return _this.$http.post(_this.$url.baseUrl+'api/duty/v0.1/gy-duty/manage',queryParams)
        }

        /**
         * 获取值班类型
         * @return {AxiosPromise<any>}
         */
        function getDutyTypes() {
          return _this.$http.get(_this.$url.baseUrl+'api/duty/v0.1/gy-duty/duty-type')
        };

        /**
         * 获取人员类型
         * @return {AxiosPromise<any>}
         */
        function getPersontype() {
          return _this.$http.get(_this.$url.baseUrl+'api/duty/v0.1/gy-duty/duty-person-type')
        };

        /**
         * 获取值班人员
         * @return {AxiosPromise<any>}
         */
        function getPerson() {
          return _this.$http.get(_this.$url.baseUrl+'api/duty/v0.1/gy-duty/duty-person?userId=58')
        };

        _this.$http.all([getDuty(),getDutyTypes(),getPersontype(),getPerson()]).then(_this.$http.spread((duty,dutyType,personType,person)=>{
            if(duty.status===200){
              let data=duty.data.result;
              $.each(data,function (v,item) {
                let Hdate=lunar(parserDate(item.date));
                item.Hdates=Hdate.festivals
              });
              data=groupByWeek(data);
              _this.tableData=data;
            };
            let dutyTypes=dutyType.data.result;
            let personTypes=personType.data.result;
            let persons=person.data.result;
            let arr=[];
            $.each(dutyTypes,(v,dutyItem)=>{
              let obj={};
              obj.dutyTypeName=dutyItem.name;
              obj.date=dutyItem.remark;
              obj.dutyType=dutyItem.code;
              if(dutyItem.code==="1"){
                obj.class="fa  fa-sun-o";
              }else if(dutyItem.code==="2"){
                obj.class="fa  fa-moon-o";
              }else if(dutyItem.code==="3"){
                obj.class="fa  fa-id-card"
              }
              obj.dutyPersonType=[];
              $.each(personTypes,(j,PersonTypeItem)=>{
                let personTypeObj={};
                personTypeObj.name=PersonTypeItem.name;
                personTypeObj.code=PersonTypeItem.code;
                personTypeObj.dutyType=dutyItem.code;
                personTypeObj.persons=[];
                personTypeObj.selected=[];
                obj.dutyPersonType.push(personTypeObj);
                $.each(persons,function (k,personItem) {
                  let personObj={};
                  personObj.label=personItem.realName;
                  personObj.value=personItem.id;
                  if(personItem.dutyPersonType==personTypeObj.code){
                    personTypeObj.persons.push(personObj)
                  }
                })
              });
              arr.push(obj);
            });
            setTimeout(()=>{
              _this.loading=false;
              _this.dateArry=arr;
            },500);

        }));

      },
      selectMonth(index){
        this.timeIndex = index;
      },
      cellClick(row, column, cell, event){
        if(this.flag){
          $(cell).css('backgroundColor',"#d9f0ff");
          this.selectDuty.push(row[column.property]);
          this.selectDuty=this.selectDuty.unique1();
        }
      },
      currentChange(currentRow, oldCurrentRow){
        if(this.flag===false){
          this.highlight=true;
          this.selectDuty=[currentRow];
        }
      },
      //构建数据名字
      buildName (personArr) {
        let name = "";
        $.each(personArr,function (a,b) {
          if(b.realName==="" || b.realName===undefined){
            name=""
          }else{
            name+=b.realName+"、"
          }
        });
        return name;
      },
      /**
       * 重构表格数据
       * @param scope
       * @param prop
       * @param type
       * @return {*}
       * @constructor
       */
      Formatter(scope,prop,type){
        let leaders,persons,leadersName,personsName;
        switch (type){
          case 'month':
            let month;
            if(scope.row[prop]){
              month=new Date(scope.row[prop].date).getMonth()+1;
              if(month){
                return month
              }
            };
            break;
          case 'date':
            let date;
            if(scope.row[prop]){
              date=scope.row[prop].date;
              if(date){
                return date
              }
            };
            break;
          case 'solar':
            let solar;
            if(scope.row[prop]){
              $.each(scope.row[prop].Hdates,(v,item)=>{
                solar=item.desc
              });
              return solar
            }

            break;
          case 'dayPerson':
            if(scope.row[prop]){
              $.each(scope.row[prop].tm,(v,item)=>{
                if(item.dutyType==="1"){
                  leaders = item.leaders;
                  persons = item.persons;
                  leadersName = !leaders ? "" : this.buildName(leaders);
                  personsName = !persons ? "" : this.buildName(persons);
                }
              });
              if(personsName.length===0){
                leadersName = leadersName.substr(0, leadersName.length - 1);
              };
              if(!leadersName){
                leadersName= ""
              }else{
                leadersName='*'+leadersName;
              };
              personsName = personsName.substr(0, personsName.length - 1);
              return leadersName+personsName;
            }
            break;
          case 'nightPerson':
            if(scope.row[prop]){
              $.each(scope.row[prop].tm,(v,item)=>{
                if(item.dutyType==="2"){
                  leaders = item.leaders;
                  persons = item.persons;
                  leadersName = !leaders ? "" : this.buildName(leaders);
                  personsName = !persons ? "" : this.buildName(persons);

                }
              });
              if(personsName.length===0){
                leadersName = leadersName.substr(0, leadersName.length - 1);
              };
              if(!leadersName){
                leadersName= ""
              }else{
                leadersName='*'+leadersName;
              };
              personsName = personsName.substr(0, personsName.length - 1);
              return leadersName+personsName;
            }
            break;
          case 'allPerson':
            if(scope.row[prop]){
              $.each(scope.row[prop].tm,(v,item)=>{
                if(item.dutyType==="3"){
                  leaders = item.leaders;
                  persons = item.persons;
                  leadersName = !leaders ? "" : this.buildName(leaders);
                  personsName = !persons ? "" : this.buildName(persons);

                }
              });
              if(personsName.length===0){
                leadersName = leadersName.substr(0, leadersName.length - 1);
              };
              if(!leadersName){
                leadersName= ""
              }else{
                leadersName='*'+leadersName;
              };
              personsName = personsName.substr(0, personsName.length - 1);
              return leadersName+personsName;
            }
            break;
          default:
            return "";
          break
        }

      },
      selectDay(){
        this.flag=true;
        this.selectDuty=[];
        this.highlight=false;
      },
      selectWeak(){
        this.flag=false;
        this.$refs.multipleTable.setCurrentRow();
        this.selectDuty=[];
        $('.cell-duty-class').css('background','none');
      },
      clearDate(){
        this.flag=true;
        $('.cell-duty-class').css('background','none');
        this.highlight=false;
        this.selectDuty=[];
      },
      sub(){
        if(this.selectDuty.length>0){
          let resultArr = [],obj;
          let dutyTypePersonMap = {};
          $.each(this.dateArry,function (i,iItem) {
            let dutyType = iItem['dutyType'];
            dutyTypePersonMap[dutyType] = [];
            $.each(iItem.dutyPersonType,function (j, jItem) {
              dutyTypePersonMap[dutyType] = dutyTypePersonMap[dutyType].concat(jItem.selected.map(function (v) {
                return {id:v,dutyPersonType:jItem.code};
              }));
            });
          });
          if(this.selectDuty[0].year){
            for(let key in this.selectDuty[0]){
              $.each(this.selectDuty[0][key].tm,function (j,jItem) {
                obj={
                  personList:dutyTypePersonMap[jItem.dutyType],
                  date:jItem.date+" "+"00:00:00",
                  dutyType:jItem.dutyType
                };
                resultArr.push(obj);
              });
            }
          }else{
            $.each(this.selectDuty,function (i,iItem) {
              $.each(iItem.tm,function (j,jItem) {
                obj={
                  personList:dutyTypePersonMap[jItem.dutyType],
                  date:jItem.date+" "+"00:00:00",
                  dutyType:jItem.dutyType,
                  userId:"58"
                };
                resultArr.push(obj);
              })
            });
          }
          this.$http.put(this.$url.baseUrl+'api/duty/v0.1/gy-duty/manage',resultArr).then((res)=>{
            if(res.status===200){
              this.$message({
                type:'success',
                message:"修改值班人员成功！"
              });
              this.flag=true;
              $('.cell-duty-class').css('background','none');
              this.highlight=false;
              this.selectDuty=[];
              this.loading=true;
              this.search();
            }
          });
        }else{
          this.$message({
            message: '日期为空，请选择日期！',
            type: 'error',
            duration:2000
          });
          return
        }
      }
    },
    mounted(){
      this.$nextTick(()=>{
        setTimeout(()=>{
          this.search()
        },500)
      })
    },
    watch:{
      /**
       * 处理需优化
       */
      selectDuty(){
        let dayData,dutyDayObj={},arr=[];
        if(this.selectDuty.length>0){
          if(this.selectDuty[0].year){
            for(let key in this.selectDuty[0]){
              if(this.selectDuty[0].hasOwnProperty(key) && 'Monday,Tuesday,Wednesday,Thursday,Friday,Sunday,Saturday'.indexOf(key) >= 0){
                dayData = this.selectDuty[0][key];
                if(!dayData){
                  dutyDayObj= [];
                }else{
                  dutyDayObj[dayData.date] = dayData;
                }
              }
            }
            for(let key in dutyDayObj){
              arr.push(key.substr(5,9)+'、');
            }
            arr[arr.length - 1]=arr[arr.length - 1].substr(0,5);
            arr=arr.toString();
            arr=arr.replace(/,/g, " ");
            this.cardDate=arr;
          }else{
            $.each(this.selectDuty,(v,item)=>{
              arr.push(item.date.substr(5,9)+'、');
            });
            arr[arr.length - 1]=arr[arr.length - 1].substr(0,5);
            arr=arr.toString();
            arr=arr.replace(/,/g, " ");
            this.cardDate=arr;
          }
        }else{
          this.cardDate=''
        }

      }
    }
  }
</script>

<style lang="less" scoped>
  #arrange .box-card{
    height: calc(100vh - 89px);
  }
  #arrange .leftMonth{
    margin-top: 34px;
    list-style: none;
    li{
      width: 100%;
      line-height: 68px;
      text-align: center;
      background-color: #ececec;
      border: 1px solid #D1D1D1;
      cursor: pointer;
      transition:all 0.2s ease-in;
      opacity:1;
      a{
        display: inline-block;
        width: 100%;
        height: 100%;
        text-decoration: none;
        color: black;
      }
    }
    .active{
      background-color: rgb(188, 221, 244);
    }
  }
  #arrange .table-button{
    padding-left: 5px;
    border-top: 1px solid #dddddd;
    border-left: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    background: linear-gradient(to top, #dbdada 0%,#E5E5E5 10%, #efeeee 100%,#ffffff)
  }
  #arrange .table-button .add{
    color: #333;
    font-size: 14px;
    margin-left: 0;
  }
  #arrange .table-button .add:hover{
    color: #0a95ef;
  }

</style>
<style lang="less">
  /*#arrange .el-table tr:hover{*/
    /*background: none!important;*/
  /*}*/
  /*#arrange .el-table--enable-row-hover .el-table__body tr:hover>td{*/
    /*background: none!important;*/
  /*}*/
  #arrange p,#arrange div,#arrange span{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
  #arrange .current-row td{
    background: #d9f0ff!important;

  }
  #arrange .el-table__row td{
    padding: 0!important;
    .cell{
      padding: 0!important;
      .date{
        height: 30px;
        line-height: 30px;
        background-color: #f5f5f5;
        .solar{
          float: right;
          margin-right: 10px;
          color: #efbb0d;
        }
      }
      .person{
        height: 40px;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
      }
      .personAll{
        height: 80px;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
      }
    }
  }
  #arrange .cell-duty-class{
    box-sizing: border-box;
  }
  #arrange .el-card__header{
    padding: 10px!important;
  }
  #arrange .leftCard .el-card{
    /*max-height: 700px;*/
    overflow-y: auto;
  }

</style>
