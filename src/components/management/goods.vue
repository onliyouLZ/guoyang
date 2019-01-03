<template>
  <div id="goods"
       v-loading="loading"
       element-loading-text="加载中">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <label>单位:</label>
        <el-select
          v-model="company"
          placeholder="请选择"
          style="width: 150px"
          @change="cChange"
          clearable>
          <el-option
            v-for="item in cOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <label>存放仓库:</label>
        <el-select
          v-model="warehouse"
          placeholder="请选择"
          style="width: 150px"
          clearable >
          <el-option
            v-for="item in wOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <label>物资名称:</label>
        <el-input v-model="mdName" clearable placeholder="请输入物资名称" style="width: 150px"></el-input>
        <label>物资种类:</label>
        <el-select
          v-model="materialType"
          placeholder="请选择"
          style="width: 150px"
          multiple
          collapse-tags>
          <el-option
            v-for="item in mOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" @click="primary">查询</el-button>
        <el-button type="success" @click="exportExcel(tableData,multipleSelection)">导出</el-button>
      </div>
      <div class="table-button">
        <el-button type="text" icon="fa  fa-plus" class="add" @click="addVisible=true">新增</el-button>
        <el-button type="text" icon="fa  fa-edit" class="add" @click="editGoods">修改</el-button>
        <el-button type="text" icon="fa fa-trash-o" class="add" @click="del">删除</el-button>
      </div>
      <el-table
        :data="tables"
        border
        style="width: 100%"
        height="700"
        class="tables"
        @row-click="rowClick"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        header-cell-class-name="table-header-public">
        <template v-for="item in tableHeader">
          <el-table-column
            v-if="item.type==='selection'"
            type="selection"
            width="40"
            fixed>
          </el-table-column>
          <el-table-column
            v-if="item.type==='normal'"
            :prop="item.data"
            :label="item.title"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            v-if="item.data==='MSR_NUMBER_SUM'"
            :label="item.title"
            width="180"
            align="center">
            <template slot-scope="scope">
              <a @click="table1(scope.$index, scope.row)" class="goods">{{ scope.row.MSR_NUMBER_SUM }}</a>
            </template>
          </el-table-column>
          <el-table-column
            v-if="item.data==='MIR_NUMBER_SUM'"
            :label="item.title"
            width="180"
            align="center">
            <template slot-scope="scope">
              <a @click="table2(scope.$index, scope.row)" class="goods">{{ scope.row.MIR_NUMBER_SUM }}</a>
            </template>
          </el-table-column>
          <el-table-column
            v-if="item.data==='MRR_NUMBER_SUM'"
            :label="item.title"
            width="180"
            align="center">
            <template slot-scope="scope">
              <a @click="table3(scope.$index, scope.row)" class="goods">{{ scope.row.MRR_NUMBER_SUM }}</a>
            </template>
          </el-table-column>
          <el-table-column
            v-if="item.data==='MDR_NUMBER_SUM'"
            :label="item.title"
            width="180"
            align="center">
            <template slot-scope="scope">
              <a @click="table4(scope.$index, scope.row)" class="goods">{{ scope.row.MDR_NUMBER_SUM }}</a>
            </template>
          </el-table-column>
          <el-table-column
            v-if="item.data==='caozuo'"
            :label="item.title"
            min-width="300"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="housing(scope.$index, scope.row)">入库</el-button>
              <el-button
                size="mini"
                @click="outing(scope.$index, scope.row)">出库</el-button>
              <el-button
                size="mini"
                @click="returning(scope.$index, scope.row)">返还</el-button>
              <el-button
                size="mini"
                @click="destroy(scope.$index, scope.row)">销毁</el-button>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </el-card>
    <div class="footer" v-if="tableData.length>0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[20,40,60]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <div class="choice" v-if="multipleSelection.length>0"><span>当前页选中:{{multipleSelection.length > 0 ? multipleSelection.length+"条" : " "}}</span></div>
    </div>
    <!--新增物资-->
    <el-dialog
      title="新增物资"
      :visible.sync="addVisible"
      :modal-append-to-body="bodyFalse"
      width="30%">
      <!--<el-form  ref="form" :model="form" label-width="80px" :rules="rules">-->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="货品及品名:" prop="mdName">
              <el-input v-model="ruleForm.mdName"  placeholder="请填写货品及品名"></el-input>
            </el-form-item>
            <el-form-item label="货品数量:" prop="msrNumber">
              <el-input  v-model.number="ruleForm.msrNumber" placeholder="请填写货品数量"></el-input>
            </el-form-item>
            <el-form-item label="物资类型:" prop="wzlx">
              <el-select
                v-model="ruleForm.wzlx"
                placeholder="请选择"
                style="width: 100%"
                @change="wzChange">
                <el-option
                  v-for="item in wOptions1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单价(元):" prop="mdPrice">
              <el-input  v-model.number="ruleForm.mdPrice" placeholder="请填写单价"></el-input>
            </el-form-item>
            <el-form-item label="入库时间" prop="msrStorageTime">
              <el-date-picker
                style="width: 100%"
                v-model="ruleForm.msrStorageTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="保质期(年):" prop="msrProductLife">
              <el-input  v-model.number="ruleForm.msrProductLife" placeholder="请填写保质期"></el-input>
            </el-form-item>
            <el-form-item label="入库人签字:" prop="msrUname">
              <el-input  v-model="ruleForm.msrUname" placeholder="请填写入库人签字"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="规格" prop="mdSpecification">
              <el-input v-model="ruleForm.mdSpecification"  placeholder="请填写规格"></el-input>
            </el-form-item>
            <el-form-item label="存放地:" prop="eceiptSelected">
              <el-select
                v-model="ruleForm.eceiptSelected"
                placeholder="请选择"
                style="width: 100%">
                <el-option
                  v-for="item in eOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item >
            <el-form-item label="单位" prop="mdMunit">
              <el-input v-model="ruleForm.mdMunit" placeholder="请填写单位"></el-input>
            </el-form-item>
            <el-form-item label="采购时间" prop="msrPurchaseTime">
              <el-date-picker
                style="width: 100%"
                v-model="ruleForm.msrPurchaseTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="生产日期" prop="msrProduceTime">
              <el-date-picker
                style="width: 100%"
                v-model="ruleForm.msrProduceTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="货品类型" prop="hplx">
              <el-select
                v-model="ruleForm.hplx"
                placeholder="请选择"
                style="width: 100%">
                <el-option
                  v-for="item in hOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系电话" prop="msrUphone">
              <el-input v-model="ruleForm.msrUphone" placeholder="请填写联系电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="comments">
              <el-input type="textarea" v-model="ruleForm.comments" placeholder="备注"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="text-align: right">
            <el-form-item style="margin-bottom: 0!important;">
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!--修改物资-->
    <el-dialog
      title="修改物资"
      :visible.sync="editVisible"
      :modal-append-to-body="bodyFalse"
      width="30%">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="120px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="货品及品名:" prop="mdName">
              <el-input v-model="editForm.mdName"  placeholder="请填写货品及品名" disabled></el-input>
            </el-form-item>
            <el-form-item label="单位:" prop="mdMunit">
              <el-input  v-model="editForm.mdMunit" placeholder="请填写货品单位"></el-input>
            </el-form-item>
            <el-form-item label="入库数量:" prop="quantity">
              <el-input  v-model="editForm.quantity"  disabled></el-input>
            </el-form-item>
            <el-form-item label="返还数量:" prop="ReturnNum">
              <el-input  v-model="editForm.ReturnNum"  disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="存放地" prop="mdPlace">
              <el-input v-model="editForm.mdPlace" disabled></el-input>
            </el-form-item>
            <el-form-item label="单价(元)" prop="mdPrice">
              <el-input v-model.number="editForm.mdPrice"></el-input>
            </el-form-item>
            <el-form-item label="出库数量" prop="delivery">
              <el-input v-model="editForm.delivery" disabled></el-input>
            </el-form-item>
            <el-form-item label="库存数量" prop="inventory">
              <el-input v-model="editForm.inventory" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="comments">
              <el-input type="textarea" v-model="editForm.comments" placeholder="备注"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="text-align: right">
            <el-form-item style="margin-bottom: 0!important;">
              <el-button type="primary" @click="submitEdit">提交</el-button>
              <el-button @click="resetEdit">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!--物资入库-->
    <el-dialog
      title="物资入库"
      :visible.sync="housingVisible"
      :modal-append-to-body="bodyFalse"
      @close="housingClose"
      width="30%">
      <el-form :model="housingForm" :rules="rules" ref="housingForm" label-width="120px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="货品及品名:" prop="mdName">
              <el-input v-model="housingForm.mdName"  disabled></el-input>
            </el-form-item>
            <el-form-item label="存放地:" prop="eceiptSelected">
              <el-input  v-model="housingForm.eceiptSelected" disabled></el-input>
            </el-form-item>
            <el-form-item label="单位:" prop="mdMunit">
              <el-input  v-model="housingForm.mdMunit" disabled></el-input>
            </el-form-item>
            <el-form-item label="采购时间" prop="msrPurchaseTime">
              <el-date-picker
                style="width: 100%"
                v-model="housingForm.msrPurchaseTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="生产日期" prop="msrProduceTime">
              <el-date-picker
                style="width: 100%"
                v-model="housingForm.msrProduceTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="货品类型" prop="hplx">
              <el-input  v-model="housingForm.hplx" disabled></el-input>
            </el-form-item>
            <el-form-item label="入库人签字:" prop="msrUname">
              <el-input  v-model="housingForm.msrUname" placeholder="请填写入库人签字"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="货品数量" prop="msrNumber">
              <el-input v-model.number="housingForm.msrNumber"></el-input>
            </el-form-item>
            <el-form-item label="物资类型:" prop="wzlx">
              <el-input  v-model="housingForm.wzlx" disabled></el-input>
            </el-form-item>
            <el-form-item label="单价(元)" prop="mdPrice">
              <el-input v-model.number="housingForm.mdPrice" disabled></el-input>
            </el-form-item>
            <el-form-item label="入库时间" prop="msrStorageTime">
              <el-date-picker
                style="width: 100%"
                v-model="housingForm.msrStorageTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="保质期(年):" prop="msrProductLife">
              <el-input  v-model.number="housingForm.msrProductLife" placeholder="请填写保质期"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="comments">
              <el-input v-model="housingForm.comments" placeholder="备注"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="msrUphone">
              <el-input v-model="housingForm.msrUphone" placeholder="请填写联系电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="text-align: right">
            <el-form-item style="margin-bottom: 0!important;">
              <el-button type="primary" @click="submitHousing">入库登记</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!--物资出库-->
    <el-dialog
      title="物资出库"
      :visible.sync="outingVisible"
      :modal-append-to-body="bodyFalse"
      @close="outingClose"
      width="30%">
      <el-form :model="outingForm" :rules="rules" ref="outingForm" label-width="120px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="货品及品名:" prop="mdName">
              <el-input v-model="outingForm.mdName"  disabled></el-input>
            </el-form-item>
            <el-form-item label="出库数量:" prop="mirNumber">
              <el-input  v-model.number="outingForm.mirNumber" placeholder="请填写出库数量"></el-input>
            </el-form-item>
            <el-form-item label="出库人签字:" prop="mirUname">
              <el-input  v-model="outingForm.mirUname" placeholder="请填写出库人签字"></el-input>
            </el-form-item>
            <el-form-item label="出库人单位:" prop="mirUdept">
              <el-input  v-model="outingForm.mirUdept" placeholder="请填写出库人单位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="存放地:" prop="eceiptSelected">
              <el-input  v-model="outingForm.eceiptSelected" disabled></el-input>
            </el-form-item>
            <el-form-item label="出库时间" prop="mirOutboundTime">
              <el-date-picker
                style="width: 100%"
                v-model="outingForm.mirOutboundTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="联系电话" prop="mirUphone">
              <el-input v-model="outingForm.mirUphone" placeholder="请填写联系电话"></el-input>
            </el-form-item>
            <el-form-item label="用途:" prop="mirPurpose">
              <el-input  v-model="outingForm.mirPurpose" placeholder="请填写用途"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="comments">
              <el-input type="textarea" v-model="outingForm.comments" placeholder="备注"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="text-align: right">
            <el-form-item style="margin-bottom: 0!important;">
              <el-button type="primary" @click="submitOuting">出库登记</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!--物资返还-->
    <el-dialog
      title="物资返还"
      :visible.sync="returningVisible"
      :modal-append-to-body="bodyFalse"
      @close="returningClose"
      width="30%">
      <el-form :model="returningForm" :rules="rules" ref="returningForm" label-width="120px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="货品及品名:" prop="mdName">
              <el-input v-model="returningForm.mdName"  disabled></el-input>
            </el-form-item>
            <el-form-item label="返还数量:" prop="mrrNumber">
              <el-input  v-model.number="returningForm.mrrNumber" placeholder="请填写返还数量"></el-input>
            </el-form-item>
            <el-form-item label="返还人签字:" prop="mrrUname">
              <el-input  v-model="returningForm.mrrUname" placeholder="请填写返还人签字"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="存放地:" prop="eceiptSelected">
              <el-input  v-model="returningForm.eceiptSelected" disabled></el-input>
            </el-form-item>
            <el-form-item label="返还时间" prop="mrrReturnTime">
              <el-date-picker
                style="width: 100%"
                v-model="returningForm.mrrReturnTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="联系电话" prop="mrrUphone">
              <el-input v-model="returningForm.mrrUphone" placeholder="请填写联系电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="comments">
              <el-input type="textarea" v-model="returningForm.comments" placeholder="备注"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="text-align: right">
            <el-form-item style="margin-bottom: 0!important;">
              <el-button type="primary" @click="submitReturning">返还登记</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!--物资销毁-->
    <el-dialog
      title="物资销毁"
      :visible.sync="destroyVisible"
      :modal-append-to-body="bodyFalse"
      @close="destroyClose"
      width="30%">
      <el-form :model="destroyForm" :rules="rules" ref="destroyForm" label-width="120px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="货品及品名:" prop="mdName">
              <el-input v-model="destroyForm.mdName"  disabled></el-input>
            </el-form-item>
            <el-form-item label="销毁数量:" prop="mdrNumber">
              <el-input  v-model.number="destroyForm.mdrNumber" placeholder="请填写销毁数量"></el-input>
            </el-form-item>
            <el-form-item label="销毁人签字:" prop="mdrUname">
              <el-input  v-model="destroyForm.mdrUname" placeholder="请填写销毁人签字"></el-input>
            </el-form-item>
            <el-form-item label="销毁原因:" prop="mdrDestroyReason">
              <el-input  v-model="destroyForm.mdrDestroyReason" placeholder="请填写销毁原因"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="存放地:" prop="eceiptSelected">
              <el-input  v-model="destroyForm.eceiptSelected" disabled></el-input>
            </el-form-item>
            <el-form-item label="销毁时间" prop="mdrDestroyTime">
              <el-date-picker
                style="width: 100%"
                v-model="destroyForm.mdrDestroyTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="联系电话" prop="mdrUphone">
              <el-input v-model="destroyForm.mdrUphone" placeholder="请填写联系电话"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="comments">
              <el-input  v-model="destroyForm.comments" placeholder="备注"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="text-align: right">
            <el-form-item style="margin-bottom: 0!important;">
              <el-button type="primary" @click="submitDestroy">销毁登记</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!--入库表格-->
    <el-dialog
      title="防汛抗旱物资入库登记明细表"
      :visible.sync="table1Visible"
      :modal-append-to-body="bodyFalse"
      width="80%!important"
      @close="closeTable">
      <el-table
        :data="tableData1"
        border
        v-loading="loadingTable"
        element-loading-text="加载中"
        style="width: 100%"
        header-cell-class-name="table-header-public"
        height="400">
        <template v-for="item in tableHeader1">
          <el-table-column
            :prop="item.data"
            :label="item.title"
            min-width="150"
            align="center">
          </el-table-column>
        </template>
      </el-table>
    </el-dialog>
    <!--出库表格-->
    <el-dialog
      title="防汛抗旱物资出库登记明细表"
      :visible.sync="table2Visible"
      :modal-append-to-body="bodyFalse"
      width="80%!important"
      @close="closeTable">
      <el-table
        :data="tableData2"
        border
        v-loading="loadingTable"
        element-loading-text="加载中"
        style="width: 100%"
        header-cell-class-name="table-header-public"
        height="400">
        <template v-for="item in tableHeader2">
          <el-table-column
            :prop="item.data"
            :label="item.title"
            min-width="150"
            align="center">
          </el-table-column>
        </template>
      </el-table>
    </el-dialog>
    <!--返还表格-->
    <el-dialog
      title="防汛抗旱物资返还登记明细表"
      :visible.sync="table3Visible"
      :modal-append-to-body="bodyFalse"
      width="80%!important"
      @close="closeTable">
      <el-table
        :data="tableData3"
        border
        v-loading="loadingTable"
        element-loading-text="加载中"
        style="width: 100%"
        header-cell-class-name="table-header-public"
        height="400">
        <template v-for="item in tableHeader3">
          <el-table-column
            :prop="item.data"
            :label="item.title"
            min-width="150"
            align="center">
          </el-table-column>
        </template>
      </el-table>
    </el-dialog>
    <!--销毁表格-->
    <el-dialog
      title="防汛抗旱物资销毁登记明细表"
      :visible.sync="table4Visible"
      :modal-append-to-body="bodyFalse"
      width="80%!important"
      @close="closeTable">
      <el-table
        :data="tableData4"
        border
        v-loading="loadingTable"
        element-loading-text="加载中"
        style="width: 100%"
        header-cell-class-name="table-header-public"
        height="400">
        <template v-for="item in tableHeader4">
          <el-table-column
            :prop="item.data"
            :label="item.title"
            min-width="150"
            align="center">
          </el-table-column>
        </template>
      </el-table>
    </el-dialog>
  </div>

</template>

<script>
    import {convertObjectToArray} from '../../utils/utils'
    export default {
        name: "goods",
        data(){
          let _this=this;
          //出库规则自定义
          let outCheck=function(rule,value,callback){
            if(parseInt(_this.stockNumber) <value){
              callback(new Error('出库数量不能大于库存数量'+'('+_this.stockNumber+')'));
            }else{
              callback();
            }
          };
          //返还规则自定义
          let returnCheck=function (rule,value,callback) {
            if(parseInt(_this.OutStockNumber) <value){
              callback(new Error('返还数量不能大于出库数量'+'('+_this.OutStockNumber+')'));
            }else{
              callback();
            }
          };
          //销毁规则自定义
          let destroyCheck=function (rule,value,callback) {
            if(parseInt(_this.stockNumber) <value){
              callback(new Error('销毁数量不能大于库存数量'+'('+_this.stockNumber+')'));
            }else{
              callback();
            }
          };
          return {
            loading:true,
            loadingTable:true,
            mdName:"",
            tableHeader:[
              {data:'',title:'',type:"selection"},
              {data:'ML_TYPE',title:'物资类型',type:"normal"},
              {data:'ML_NAME',title:'货品类型',type:"normal"},
              {data:'MD_SPECIFICATION',title:'货品及品名',type:"normal"},
              {data:'MD_MUNIT',title:'计量单位',type:"normal"},
              {data:'MD_PRICE',title:'单价(元)',type:"normal"},
              {data:'MSR_NUMBER_SUM',title:'入库数量',type:"MSR_NUMBER_SUM"},
              {data:'WH_NAME',title:'存放地',type:"normal"},
              {data:'MIR_NUMBER_SUM',title:'出库数量',type:"MIR_NUMBER_SUM"},
              {data:'MRR_NUMBER_SUM',title:'最近返还',type:"MRR_NUMBER_SUM"},
              {data:'MDR_NUMBER_SUM',title:'销毁数量',type:"MDR_NUMBER_SUM"},
              {data:'INVENTORY_NUM',title:'库存数量',type:"normal"},
              {data:'caozuo',title:'操作'},
            ],
            tableHeader1:[
              {data:"MD_NAME",title:"货品及货名"},
              {data:"WH_NAME",title:"存放地"},
              {data:"MSR_NUMBER",title:"货品数量"},
              {data:"MD_MUNIT",title:"单位"},
              {data:"MSR_PURCHASE_TIME",title:"采购时间"},
              {data:"MSR_STORAGE_TIME",title:"入库时间"},
              {data:"MSR_UNAME",title:"入库人"},
              {data:"MSR_UPHONE",title:"联系电话"},
              {data:"COMMENTS",title:"备注"},
            ],
            tableHeader2:[
              {data:"MD_NAME",title:"货品及货名"},
              {data:"WH_NAME",title:"存放地"},
              {data:"MIR_NUMBER",title:"出库数量"},
              {data:"MIR_OUTBOUND_TIME",title:"出库时间"},
              {data:"MIR_UNAME",title:"出库人"},
              {data:"MIR_UPHONE",title:"联系电话"},
              {data:"MIR_UDEPT",title:"所在单位"},
              {data:"MIR_PURPOSE",title:"用途"},
              {data:"COMMENTS",title:"备注"},
            ],
            tableHeader3:[
              {data:"MD_NAME",title:"货品及货名"},
              {data:"WH_NAME",title:"存放地"},
              {data:"MRR_NUMBER",title:"返还数量"},
              {data:"MRR_RETURN_TIME",title:"返还时间"},
              {data:"MRR_UNAME",title:"返还人"},
              {data:"MRR_UPHONE",title:"联系电话"},
              {data:"COMMENTS",title:"备注"},
            ],
            tableHeader4:[
              {data:"MD_NAME",title:"货品及货名"},
              {data:"WH_NAME",title:"存放地"},
              {data:"MDR_NUMBER",title:"销毁数量"},
              {data:"MDR_DESTROY_TIME",title:"销毁时间"},
              {data:"MDR_UNAME",title:"销毁人"},
              {data:"MDR_DESTROY_REASON",title:"销毁原因"},
              {data:"MDR_UPHONE",title:"联系电话"},
              {data:"COMMENTS",title:"备注"},
            ],
            tableData1:[],
            tableData2:[],
            tableData3:[],
            tableData4:[],
            tableData:[
            ],
            multipleSelection:[],
            pageSize: 20, // 每页大小默认值
            pageIndex: 1, // 默认第一页
            currentPage4: 1,
            addVisible:false,
            editVisible:false,
            housingVisible:false,
            outingVisible:false,
            returningVisible:false,
            destroyVisible:false,
            table1Visible:false,
            table2Visible:false,
            table3Visible:false,
            table4Visible:false,
            bodyFalse:false,
            ruleForm:{
              mdName:"",
              msrNumber:'',
              msrStorageTime:"",
              msrProductLife:"",
              mdSpecification:"",
              eceiptSelected:"",
              manageDutyPerson:"",
              mdMunit:"",
              msrUname:"",
              msrPurchaseTime:"",
              msrProduceTime:"",
              hplx:"",
              msrUphone:"",
              comments:"",
              wzlx:"",
              mdPrice:""
            },
            editForm:{
              mdName:"",
              mdMunit:"",
              mdPrice:"",
              quantity:"",
              delivery:"",
              ReturnNum:"",
              inventory:"",
              mdrNumber:"",
              mdPlace:"",
              comments:"",
              mdCd:""
            },
            housingForm:{
              mdName:"",
              eceiptSelected:"",
              mdMunit:"",
              msrPurchaseTime:"",
              msrProduceTime:"",
              hplx:"",
              msrUname:"",
              msrNumber:"",
              wzlx:"",
              mdPrice:"",
              msrStorageTime:"",
              msrProductLife:"",
              comments:"",
              msrUphone:"",
              mdCd:"",
              msrWhCd:""
            },
            outingForm:{
              mdName:"",
              mirNumber:"",
              mirUname:"",
              mirUdept:"",
              eceiptSelected:"",
              mirOutboundTime:"",
              mirUphone:"",
              mirPurpose:"",
              comments:"",
              mdCd:"",
              mirWhCd:"",
              maVersion:""
            },
            returningForm:{
              mdName:"",
              mrrNumber:"",
              mrrUname:"",
              eceiptSelected:"",
              mrrReturnTime:"",
              mrrUphone:"",
              comments:"",
              mdCd:"",
              mrrWhCd:"",
              maVersion:""
            },
            destroyForm:{
              mdName:"",
              mdrNumber:"",
              mdrUname:"",
              mdrDestroyReason:"",
              eceiptSelected:"",
              mdrDestroyTime:"",
              mdrUphone:"",
              comments:"",
              mdCd:"",
              mdrWhCd:"",
              maVersion:""
            },
            stockNumber:"",
            OutStockNumber:"",
            rules:{
              mdName:[
                { required: true, message: '请填写货品及品名', trigger: 'blur' },
              ],
              msrNumber:[
                { required: true, message: '请填写货品数量', trigger: 'blur' },
                { type:"number", message: '只能为正整数', trigger: 'blur' },
              ],
              msrStorageTime:[
                { required: true, message: '请选择入库时间', trigger: 'change' },
              ],
              mdSpecification:[
                { required: true, message: '请填写货品及品名', trigger: 'blur' },
              ],
              mdPrice:[
                { type:"number", message: '只能为正整数', trigger: 'blur' },
              ],
              eceiptSelected:[
                { required: true, message: '请选择存放地', trigger: 'change' },
              ],
              manageDutyPerson:[
                { required: true, message: '请填写货品及品名', trigger: 'blur' },
              ],
              mdMunit:[
                { required: true, message: '请填写单位', trigger: 'blur' },
              ],
              msrUname:[
                { required: true, message: '请填写入库人签字', trigger: 'blur' },
              ],
              hplx:[
                { required: true, message: '请选择货品类型', trigger: 'change' },
              ],
              wzlx:[
                { required: true, message: '请选择物资类型', trigger: 'blur' },
              ],
              mirUname:[
                { required: true, message: '请填写出库人签字', trigger: 'blur' },
              ],
              mirNumber:[
                { required: true, message: '请填写出库数量', trigger: 'blur' },
                { type:"number", message: '只能为正整数', trigger: 'blur' },
                { validator:outCheck, trigger: 'blur' },
              ],
              mirOutboundTime:[
                { required: true, message: '请填选择库时间', trigger: 'blur' },
              ],
              mirPurpose:[
                { required: true, message: '请填写出库用途', trigger: 'blur' },
              ],
              mrrNumber:[
                { required: true, message: '请填写返还数量', trigger: 'blur' },
                { type:"number", message: '只能为正整数', trigger: 'blur' },
                { validator:returnCheck, trigger: 'blur' },
              ],
              mrrUname:[
                { required: true, message: '请填写返还人签字', trigger: 'blur' },
              ],
              mrrReturnTime:[
                { required: true, message: '请选择返还时间', trigger: 'blur' },
              ],
              mdrNumber:[
                { required: true, message: '请填写销毁数量', trigger: 'blur' },
                { type:"number", message: '只能为正整数', trigger: 'blur' },
                { validator: destroyCheck, trigger: 'blur' },
              ],
              mdrUname:[
                { required: true, message: '请填写销毁人签字', trigger: 'blur' },
              ],
              mdrDestroyReason:[
                { required: true, message: '请填写销毁原因', trigger: 'blur' },
              ],
              mdrDestroyTime:[
                { required: true, message: '请选择销毁时间', trigger: 'blur' },
              ]
            },
            value:"",
            options:[],
            cOptions:[],
            company:"",
            warehouse:"",
            wOptions:[],
            materialType:[],
            mOptions:[
              {label:"防汛物资",value:'1'},
              {label:"抗旱物资",value:'2'},
              {label:"抢险机械设备",value:'3'}
            ],
            eOptions:[],
            wOptions1:[
              {label:"防汛物资",value:'1'},
              {label:"抗旱物资",value:'2'},
              {label:"抢险机械设备",value:'3'}
            ],
            hOptions:[],
            screenWidth:document.body.clientWidth
          }
        },
        methods:{
          search(){
            const _this=this;
            let parms={
              mdName:_this.mdName,
              mlTypeList:_this.materialType,
              whCd:_this.warehouse
            };
            _this.$http.post(_this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/list',parms).then((res)=>{
              if(res.status===200){
                let data=res.data.result;
                $.each(data,(v,item)=>{
                  if(item.ML_TYPE==='1'){
                    item.ML_TYPE="防汛物资";
                  }else if(item.ML_TYPE==='2'){
                    item.ML_TYPE="抗旱物资";
                  }else if(item.ML_TYPE==='3'){
                    item.ML_TYPE="抢险机械设备";
                  };
                  item.MD_SPECIFICATION=item.MD_NAME+','+item.MD_SPECIFICATION;
                });
                setTimeout(()=>{
                  _this.loading=false;
                  _this.tableData=data;
                },500)
              }
            })
          },
          primary(){
            this.loading=true;
            this.search();
          },
          exportExcel(tableData,multipleSelection){
            let tableDatas=[];
            if(multipleSelection.length>0){
              tableDatas=multipleSelection
            }else{
              tableDatas=tableData
            }
            require.ensure([], () => {
              const { export_json_to_excel } = require('../../vendor/Export2Excel');
              /**
               * 表头和数据需处理 此处写的死数据
               * @type {string[]}
               */
              const tHeader=[];
              const filterVal=[];
              $.each(this.tableHeader,(v,item)=>{
                if(item.title && item.type){
                  tHeader.push(item.title);
                  filterVal.push(item.data);
                }
              });
              const list = tableDatas;
              const data = this.formatJson(filterVal, list);
              export_json_to_excel(tHeader, data, ' 物资管理统计表');
            })
          },
          formatJson(filterVal, jsonData){
            return jsonData.map(v => filterVal.map(j => v[j]))
          },
          rowClick(row, event, column){
            if(row){
              this.$refs.multipleTable.toggleRowSelection(row);
            }
          },
          handleSelectionChange(val){
            if(val.length>0){
              this.multipleSelection=[];
              $.each(val,(v,item)=>{
                this.multipleSelection.push(item);
              });
            }else{
              this.multipleSelection=[];
            }
          },
          handleSizeChange(val){
            this.pageSize = val
          },
          handleCurrentChange(val){
            this.loading=true;
            this.pageIndex = val;
            setTimeout(()=>{
              this.loading=false;
            },1000)
          },
          //货品类型
          wzChange(){
            let directoriesAgr = {
              mlName: "",
              mlTypeList: [this.ruleForm.wzlx]
            };
            this.$http.post(this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/lists/list',directoriesAgr)
              .then((res)=>{
                if(res.status===200){
                  let data=res.data.result;
                  let arr=[];
                  $.each(data,(v,item)=>{
                    let obj={
                      label:item.ML_NAME,
                      value:item.ML_CD
                    };
                    arr.push(obj)
                  });
                  this.hOptions=arr;
                }else{
                  this.$message({
                    type:'error',
                    message:"获取货品类型失败"
                  })
                }
              })
          },
          //获取仓库
          cChange(){
            let _this=this;
            let warehouse={
              orgcd: _this.company,
              whName: ""
            };
            _this.$http.post(_this.$url.baseUrl+'api/guoYang/v0.1/material-manage/warehouse/list',warehouse)
              .then((res)=>{
                if(res.status===200){
                  let data=res.data.result;
                  let arr=[];
                  $.each(data,(v,item)=>{
                    let obj={
                      label:item.WH_NAME,
                      value:item.WH_CD,
                    };
                    arr.push(obj);
                  });
                  _this.wOptions=arr;
                }
              })
          },
          //新增物资提交表单
          submitForm(){
            const _this=this;
            _this.$refs['ruleForm'].validate((valid) => {
              if (valid) {
                  let  searching = {
                    mdName: _this.ruleForm.mdName,
                    mdSpecification: _this.ruleForm.mdSpecification
                  };
                  _this.$http.post(_this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/product/get-mdCd',searching)
                    .then((res)=>{
                        if(res.status===200){
                          let mdCd=res.data.result;
                          if(mdCd){
                            let obj={
                              mdCd: mdCd,
                              msrWhCd: _this.ruleForm.eceiptSelected,
                              msrNumber: _this.ruleForm.msrNumber,
                              msrPurchaseTime: _this.ruleForm.msrPurchaseTime,
                              msrStorageTime: _this.ruleForm.msrStorageTime,
                              msrProduceTime: _this.ruleForm.msrProduceTime,
                              msrProductLife: _this.ruleForm.msrProductLife,
                              msrUname: _this.ruleForm.msrUname,
                              msrUphone: _this.ruleForm.msrUphone,
                              comments: _this.ruleForm.comments
                            };
                            _this.$http.put(_this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/storage/',obj)
                              .then((res)=>{
                                if(res.status===200){
                                  _this.$refs['ruleForm'].resetFields();
                                  _this.$message({
                                    type:"success",
                                    message:"物资入库成功！"
                                  });
                                  _this.addVisible=false;
                                  _this.primary();
                                }
                              })
                          }else{
                            let addPrgams = {
                              mdName: _this.ruleForm.mdName,
                              mdMunit: _this.ruleForm.mdMunit,
                              mdPrice: _this.ruleForm.mdPrice,
                              mlCd: _this.ruleForm.hplx,
                              mdSpecification: _this.ruleForm.mdSpecification,
                              comments: _this.ruleForm.comments
                            };
                            //新增物资
                            _this.$http.put(_this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/product',addPrgams)
                              .then((res)=>{
                                if(res.status===200){
                                  let mdCd=res.data.result;
                                  let obj={
                                      mdCd: mdCd,
                                      msrWhCd: _this.ruleForm.eceiptSelected,
                                      msrNumber: _this.ruleForm.msrNumber,
                                      msrPurchaseTime: _this.ruleForm.msrPurchaseTime,
                                      msrStorageTime: _this.ruleForm.msrStorageTime,
                                      msrProduceTime: _this.ruleForm.msrProduceTime,
                                      msrProductLife: _this.ruleForm.msrProductLife,
                                      msrUname: _this.ruleForm.msrUname,
                                      msrUphone: _this.ruleForm.msrUphone,
                                      comments: _this.ruleForm.comments
                                  };
                                  //入库
                                  _this.$http.put(_this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/storage/',obj)
                                    .then((res)=>{
                                      if(res.status===200){
                                        _this.$refs['ruleForm'].resetFields();
                                        _this.$message({
                                          type:"success",
                                          message:"物资新增成功！"
                                        });
                                        _this.addVisible=false;
                                        _this.primary();
                                      }
                                    })
                                }
                              })
                          }
                        }
                    })
              } else {
                return false;
              }
            });
          },
          //新增物资重置表单
          resetForm(){
            this.addVisible=false;
            this.$refs['ruleForm'].resetFields();
          },
          //打开修改弹窗
          editGoods(){
            if(this.multipleSelection.length>1){
              this.$refs.multipleTable.clearSelection();
              this.$message({
                type:'warning',
                message:"一次只能修改一条数据！"
              });
              return false
            }else if(this.multipleSelection.length===0){
              this.$message({
                type:'warning',
                message:"请选择需要修改的数据！"
              });
              return false
            }else{
              this.editVisible=true;
              let data=this.multipleSelection;
              $.each(data,(v,item)=>{
                this.editForm.comments=item.comments;
                this.editForm.mdName=item.MD_NAME;
                this.editForm.mdMunit=item.MD_MUNIT;
                this.editForm.quantity=item.MSR_NUMBER_SUM;
                this.editForm.ReturnNum=item.MRR_NUMBER_SUM;
                this.editForm.mdPlace=item.WH_NAME;
                this.editForm.mdPrice=item.MD_PRICE;
                this.editForm.delivery=item.MIR_NUMBER_SUM;
                this.editForm.inventory=item.INVENTORY_NUM;
                this.editForm.mdCd=item.MD_CD;
              });
            }
          },
          //修改物资表单提交
          submitEdit(){
            let _this=this;
            _this.$refs['editForm'].validate((valid)=>{
              if(valid){
                let updatePrgams = {
                  mdName: this.editForm.mdName,
                  mdCd: this.editForm.mdCd,
                  mdMunit: this.editForm.mdMunit,
                  mdPrice: this.editForm.mdPrice,
                  comments: this.editForm.comments,
                };
                this.$http.put(this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/product/update',updatePrgams)
                  .then((res)=>{
                    if(res.status===200) {
                      _this.editVisible = false;
                      _this.$message({
                        type: "success",
                        message: "修改成功"
                      });
                      _this.primary();
                      _this.$refs['editForm'].resetFields();
                    }else{
                      _this.editVisible = false;
                      _this.$message({
                        type: "error",
                        message: "修改失败"
                      });
                      _this.primary();
                      _this.$refs['editForm'].resetFields();
                    }
                  })
              }else{
                return false
              }
            })
          },
          //修改物资表单重置
          resetEdit(){
            this.editVisible=false;
            this.$refs['editForm'].resetFields();
          },
          //物资删除
          del(){
            if(this.multipleSelection.length===0){
              this.$message({
                type:"warning",
                message:"请选择需要删除的数据"
              });
              return false
            }else{
              let arr=[];
              $.each(this.multipleSelection,(v,item)=>{
                let obj = {
                  mdCd: item.MD_CD,
                  whCd: item.WH_CD
                };
                arr.push(obj);
              });
              this.$http.delete(this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material',{data:arr})
                .then((res)=>{
                  if(res.status===200){
                    this.$message({
                      type:"success",
                      message:"删除成功"
                    });
                    this.primary();
                  }else{
                    this.$message({
                      type:"error",
                      message:"删除失败"
                    });
                  }
                })
            }
          },
          //打开入库弹窗
          housing(index,row){
            let _this=this;
            _this.housingVisible=true;
            _this.housingForm.mdName=row.MD_NAME;
            _this.housingForm.eceiptSelected=row.WH_NAME;
            _this.housingForm.hplx=row.ML_NAME;
            _this.housingForm.mdMunit=row.MD_MUNIT;
            _this.housingForm.wzlx=row.ML_TYPE;
            _this.housingForm.mdCd=row.MD_CD;
            _this.housingForm.mdPrice=row.MD_PRICE;
            _this.housingForm.msrWhCd=row.WH_CD
          },
          //入库提交
          submitHousing(){
            let _this=this;
            _this.$refs['housingForm'].validate((valid)=>{
              if(valid){
                let obj={
                  mdCd: _this.housingForm.mdCd,
                  msrWhCd: _this.housingForm.msrWhCd,
                  msrNumber: _this.housingForm.msrNumber,
                  msrPurchaseTime: _this.housingForm.msrPurchaseTime,
                  msrStorageTime: _this.housingForm.msrStorageTime,
                  msrProduceTime: _this.housingForm.msrProduceTime,
                  msrProductLife: _this.housingForm.msrProductLife,
                  msrUname: _this.housingForm.msrUname,
                  msrUphone: _this.housingForm.msrUphone,
                  comments: _this.housingForm.comments
                };
                _this.$http.put(_this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/storage/',obj)
                  .then((res)=>{
                    if(res.status===200){
                      _this.$message({
                        type:"success",
                        message:"入库成功"
                      });
                      _this.housingVisible=false;
                      _this.primary();
                      _this.$refs['housingForm'].resetFields();
                    }else{
                      _this.$message({
                        type:"error",
                        message:"入库失败"
                      });
                      _this.housingVisible=false;
                      _this.$refs['housingForm'].resetFields();
                    }
                  })
              }else{
                return false
              }
            })
          },
          //入库弹窗关闭回调
          housingClose(){
            this.housingVisible=false;
            this.$refs['housingForm'].resetFields();
          },
          //打开出库弹窗
          outing(index,row){
            let _this=this;
            let outPargms = {
              mdCd: row.MD_CD,
              whCd: row.WH_CD
            };
            _this.$http.post(_this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/inventory',outPargms)
              .then((res)=>{
                if(res.status===200){
                  _this.$message({
                    type:"success",
                    message:"获取库存数量版本号成功"
                  });
                  _this.outingVisible=true;
                  _this.stockNumber=res.data.result[0].MATERIAL_AMOUNT;
                  _this.outingForm.mdName=row.MD_NAME;
                  _this.outingForm.eceiptSelected=row.WH_NAME;
                  _this.outingForm.mdCd=row.MD_CD;
                  _this.outingForm.mirWhCd=row.WH_CD;
                  _this.outingForm.maVersion=res.data.result[0].MA_VERSION;
                }else{
                  _this.$message({
                    type:"error",
                    message:"获取库存数量版本号失败"
                  });
                  return false
                }
              });
          },
          //出库提交
          submitOuting(){
            let _this=this;
            _this.$refs['outingForm'].validate((valid)=>{
              if(valid){
                let obj = {
                  mdCd: _this.outingForm.mdCd,
                  mirWhCd: _this.outingForm.mirWhCd,
                  mirNumber: _this.outingForm.mirNumber,
                  mirOutboundTime: _this.outingForm.mirOutboundTime,
                  mirUname: _this.outingForm.mirUname,
                  mirUphone: _this.outingForm.mirUphone,
                  mirUdept: _this.outingForm.mirUdept,
                  mirPurpose: _this.outingForm.mirPurpose,
                  maVersion: _this.outingForm.maVersion,
                  comments: _this.outingForm.comments
                };
                _this.$http.put(_this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/outbound/',obj)
                  .then((res)=>{
                    if(res.status===200){
                      _this.$message({
                        type:"success",
                        message:"出库成功"
                      });
                      _this.outingVisible=false;
                      _this.primary();
                      _this.$refs['outingForm'].resetFields();
                    }else{
                      _this.$message({
                        type:"error",
                        message:"出库失败"
                      });
                      _this.outingVisible=false;
                      _this.$refs['outingForm'].resetFields();
                    }
                  })
              }else{
                return false
              }
            })
          },
          //出库弹窗关闭回调
          outingClose(){
            this.outingVisible=false;
            this.$refs['outingForm'].resetFields();
          },
          //打开返回弹窗
          returning(index,row){
            let _this=this;
            _this.$http.get(_this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/restore/outbound-num/'+row.MD_CD+'?whCd='+row.WH_CD)
              .then((res)=>{
                if(res.status===200){
                  _this.$message({
                    type:"success",
                    message:"获取出库数量版本号成功"
                  });
                  _this.returningVisible=true;
                  _this.OutStockNumber=res.data.result[0].MIR_NUMBER_SUM;
                  _this.returningForm.eceiptSelected=row.WH_NAME;
                  _this.returningForm.mdName=row.MD_NAME;
                  _this.returningForm.mdCd=row.MD_CD;
                  _this.returningForm.mrrWhCd=row.WH_CD;
                  _this.returningForm.maVersion=res.data.result[0].MA_VERSION;
                }else{
                  _this.$message({
                    type:"error",
                    message:"获取出库数量版本号失败"
                  });
                  return false
                }
              });
          },
          //返还提交
          submitReturning(){
            let _this=this;
            _this.$refs['returningForm'].validate((valid)=>{
                if(valid){
                  let obj = {
                    mdCd: _this.returningForm.mdCd,
                    mrrWhCd: _this.returningForm.mrrWhCd,
                    mrrNumber: _this.returningForm.mrrNumber,
                    mrrReturnTime: _this.returningForm.mrrReturnTime,
                    mrrUname: _this.returningForm.mrrUname,
                    mrrUphone: _this.returningForm.mrrUphone,
                    comments: _this.returningForm.comments,
                    maVersion: _this.returningForm.maVersion
                  };
                  _this.$http.put(_this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/restore/',obj)
                    .then((res)=>{
                      if(res.status===200) {
                        _this.$message({
                          type: "success",
                          message: "返还成功"
                        });
                        _this.returningVisible=false;
                        _this.primary();
                        _this.$refs['returningForm'].resetFields();
                      }else{
                        _this.$message({
                          type: "error",
                          message: "返还失败"
                        });
                        _this.returningVisible=false;
                        _this.$refs['returningForm'].resetFields();
                      }
                    })
                }else{
                  return false
                }
            })
          },
          //返还弹窗关闭回调
          returningClose(){
            this.returningVisible=false;
            this.$refs['returningForm'].resetFields();
          },
          //打开销毁弹窗
          destroy(index,row){
            let _this=this;
            let desPargms = {
              mdCd: row.MD_CD,
              whCd: row.WH_CD
            };
            _this.$http.post(_this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/inventory',desPargms)
              .then((res)=>{
                if(res.status===200){
                  _this.$message({
                    type:"success",
                    message:"获取库存数量版本号成功"
                  });
                  _this.destroyVisible=true;
                  _this.stockNumber=res.data.result[0].MATERIAL_AMOUNT;
                  _this.destroyForm.mdName=row.MD_NAME;
                  _this.destroyForm.eceiptSelected=row.WH_NAME;
                  _this.destroyForm.mdCd=row.MD_CD;
                  _this.destroyForm.mdrWhCd=row.WH_CD;
                  _this.destroyForm.maVersion=res.data.result[0].MA_VERSION;
                }else{
                  _this.$message({
                    type:"error",
                    message:"获取库存数量版本号失败"
                  });
                  return false
                }
              });
          },
          //销毁提交
          submitDestroy(){
            let _this=this;
            _this.$refs['destroyForm'].validate((valid)=>{
              if(valid){
                let obj = {
                  mdCd:  _this.destroyForm.mdCd,
                  mdrWhCd:  _this.destroyForm.mdrWhCd,
                  mdrNumber:  _this.destroyForm.mdrNumber,
                  mdrDestroyTime:  _this.destroyForm.mdrDestroyTime,
                  mdrUname:  _this.destroyForm.mdrUname,
                  mdrUphone:  _this.destroyForm.mdrUphone,
                  mdrDestroyReason:  _this.destroyForm.mdrDestroyReason,
                  maVersion:  _this.destroyForm.maVersion,
                  comments:  _this.destroyForm.comments
                };
                _this.$http.put(_this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/destroy/',obj)
                  .then((res)=>{
                    if(res.status===200) {
                      _this.$message({
                        type: "success",
                        message: "销毁成功"
                      });
                      _this.destroyVisible=false;
                      _this.primary();
                      _this.$refs['destroyForm'].resetFields();
                    }else{
                      _this.$message({
                        type: "error",
                        message: "销毁失败"
                      });
                      _this.destroyVisible=false;
                      _this.$refs['destroyForm'].resetFields();
                    }
                  })
              }else{
                return false
              }
            })
          },
          //销毁弹窗关闭回调
          destroyClose(){
            this.destroyVisible=false;
            this.$refs['destroyForm'].resetFields();
          },
          table1(index,row){
            this.table1Visible=true;
            this.$http.get(this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/storage/record/'+row.MD_CD+'?whCd='+row.WH_CD)
              .then((res)=>{
                let data=convertObjectToArray(res.data.result,'MSR_STORAGE_TIME');
                setTimeout(()=>{
                  this.loadingTable=false;
                  this.tableData1=data;
                },500)
              })
          },
          table2(index,row){
            this.table2Visible=true;
            this.$http.get(this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/outbound/record/'+row.MD_CD+'?whCd='+row.WH_CD)
              .then((res)=>{
                let data=convertObjectToArray(res.data.result,'MIR_OUTBOUND_TIME');
                setTimeout(()=>{
                  this.loadingTable=false;
                  this.tableData2=data;
                },500)
              })
          },
          table3(index,row){
            this.table3Visible=true;
            this.$http.get(this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/restore/record/'+row.MD_CD+'?whCd='+row.WH_CD)
              .then((res)=>{
                let data=convertObjectToArray(res.data.result,'MIR_OUTBOUND_TIME');
                setTimeout(()=>{
                  this.loadingTable=false;
                  this.tableData3=data;
                },500)
              })
          },
          table4(index,row){
            this.table4Visible=true;
            this.$http.get(this.$url.baseUrl+'api/guoYang/v0.1/material-manage/material/destroy/record/'+row.MD_CD+'?whCd='+row.WH_CD)
              .then((res)=>{
                let data=convertObjectToArray(res.data.result,'MIR_OUTBOUND_TIME');
                setTimeout(()=>{
                  this.loadingTable=false;
                  this.tableData4=data;
                },500)
              })
          },
          closeTable(){
            this.loadingTable=true;
          }
        },
        created(){
          const _this=this;
          _this.search();
          let warehouse={
            orgcd:"",
            whName: ""
          };
          function getCompany(){
            return _this.$http.post(_this.$url.baseUrl+'api/guoYang/v0.1/material-manage/sysorg/list')
          };
          function getWarehouse(){
            return _this.$http.post(_this.$url.baseUrl+'api/guoYang/v0.1/material-manage/warehouse/list',warehouse)
          };
          //初始化单位
          _this.$http.all([getCompany(),getWarehouse()]).then(_this.$http.spread((company,warehouse)=>{
            _this.$nextTick(()=>{
              if(company.status===200){
                let arr=[];
                let data=company.data.result;
                $.each(data,(v,item)=>{
                  let obj={
                    label:item.ORGNM,
                    value:item.ORGCD
                  };
                  arr.push(obj)
                });
                _this.cOptions=arr;
              };
              if(warehouse.status===200){
                let arr=[];
                let data=warehouse.data.result;
                $.each(data,(v,item)=>{
                  let obj={
                    label:item.WH_NAME,
                    value:item.WH_CD,
                  };
                  arr.push(obj)
                });
                _this.eOptions=arr;
              }
            })
          }))
        },
        computed:{
          tables(){
            //实现前端分页
            return this.tableData.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
          },
          total(){
            return this.tableData.length
          }
        },
        mounted() {
          this.$nextTick(()=>{
            if(this.screenWidth>=1920){
              $('.tables').css('height',"700px")
            }else if(this.screenWidth<=1366){
              $('.tables').css('height',"350")
            }else if(this.screenWidth>1366 || this.screenWidth<1920){
              $('.tables').css('height',"500px")
            }
          })
        }
    }
</script>

<style scoped>
  #goods .box-card{
    height: calc(100vh - 89px);
  }
  #goods .footer{
    position: absolute;
    bottom: 10px;

  }
  #goods .el-pagination{
    float: left;
  }
  #goods .choice{
    float: left;
    padding: 2px 5px;

  }
  #goods .choice span{
    line-height: 28px;
    font-size: 13px;
    color: #606266;
  }
  #goods .el-scrollbar__bar{
    /*display: none;*/
  }
  #goods .table-button{
    padding-left: 5px;
    border-top: 1px solid #dddddd;
    border-left: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    background: linear-gradient(to top, #dbdada 0%,#E5E5E5 10%, #efeeee 100%,#ffffff)
  }
  #goods .table-button .add{
    color: #333;
    font-size: 14px;
    margin-left: 5px;
  }
  #goods .table-button .add:hover{
    color: #0a95ef;
  }
  #goods .goods{
    text-decoration: underline;
    cursor: pointer;
    color: #0a95ef
  }
</style>
<style>
  #goods .table-button .add span{
    margin-left: 5px!important;
  }
  #goods .el-dialog{
    width: 50%!important;
  }
  #goods .el-dialog .el-dialog__body{
    padding: 20px!important;
  }
</style>
