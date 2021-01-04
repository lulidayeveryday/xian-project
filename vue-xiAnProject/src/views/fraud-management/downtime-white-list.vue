<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;padding-right: 20px;">
        <span style="padding: 0 8px 0 0;">号码</span>
        <el-input style="display: inline-block;width: 196px;" v-model="numbers" placeholder="请输入号码"></el-input>
      </div>
      <div style="display:inline-block;padding-right: 20px;">
        <span style="padding: 0 8px 0 0;">状态</span>
        <el-select v-model="types" placeholder="请选择" clearable>
          <el-option key="sx1" value="1" label="启用"></el-option>
          <el-option key="sx2" value="2" label="已移除"></el-option>
        </el-select>
      </div>

      <el-button class="filter-item" style="margin: 0 7px 0;" type="primary" icon="el-icon-search" @click="onSubmit">
        查询
      </el-button>
      <el-button class="filter-item" style="margin: 0 7px 0;" type="warning" icon="el-icon-plus" @click="addWhiteList = true">
        添加白名单
      </el-button>
      <el-button :loading="downloadLoading" style="margin:0 15px 0 7px;" type="success" icon="el-icon-document" @click="handleDownload">
        导出表格
      </el-button>
    </div>



    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >

      <el-table-column label="号码" prop="FEE_DATE">
      </el-table-column>
      <el-table-column label="添加人" prop="TOTALCOUNT">
      </el-table-column>
      <el-table-column label="添加时间" prop="BSS_COUNT">
      </el-table-column>
      <el-table-column label="状态" prop="CB_LH">
      </el-table-column>
      <el-table-column label="添加原因" prop="CB_STATUS">
      </el-table-column>
      <el-table-column label="修改人" prop="CB_SUCCES">
      </el-table-column>
      <el-table-column label="修改时间" prop="CB_LH">
      </el-table-column>
      <el-table-column label="设置" align="center">
        <template slot-scope="{row}">
          <el-button type="danger" size="mini" plain @click="deleteRow(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 15px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageCurrent"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>
    </div>

    <el-dialog :title="'添加白名单'" :visible.sync="addWhiteList" >
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="100px" size="mini" style=" margin-right:50px;margin-left:50px;">

        <el-form-item label="号码列表">
          <el-input
            type="textarea"
            placeholder="多个号码间用英文逗号隔开"
            :model="temp.numbers"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            maxlength="128"
            show-word-limit
            :model="temp.text"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addWhiteList = false">
          关闭
        </el-button>
        <el-button type="primary" @click="addWhite">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchdowntimeWhiteList,fetchdowntimeWhiteAdd } from '@/api/fraud-management';
    export default {
        name: "downtime-white-list",
      data() {
        return {
          numbers: '',
          types:'',
          list:[],
          temp:{
            numbers:'',
            text:'',
            numberList:[]
          },
          downloadLoading: false,
          multipleSelection:[],
          addWhiteList:false,
          pageSize:10,//每页显示条数
          pageCurrent:1,//当前页
          pageTotal:100,
        }
      },
      methods: {
        deleteRow(row) {

        },
        onSubmit() {
          this.list=[
            {
              "THREEDAY_REPEAT_COUNT":26,
              "CITY_CODE":"840",
              "CB_FAIL":0,
              "THREEDAY_COUNT":93,
              "CB_SUCCES":5,
              "THREEDAY_WHITE_COUNT":0,
              "BSS_COUNT":0,
              "THREEDAY_STOP_COUNT":64,
              "CB_LH":0,
              "CB_STATUS":6,
              "CITY_NAME":"宝鸡",
              "CB_WHITE":0,
              "FEE_DATE":"20201202",
              "TOTALCOUNT":11
            },
            {
              "THREEDAY_REPEAT_COUNT":233,
              "CITY_CODE":"841",
              "CB_FAIL":1,
              "THREEDAY_COUNT":1293,
              "CB_SUCCES":26,
              "THREEDAY_WHITE_COUNT":0,
              "BSS_COUNT":0,
              "THREEDAY_STOP_COUNT":1041,
              "CB_LH":0,
              "CB_STATUS":240,
              "CITY_NAME":"西安",
              "CB_WHITE":0,
              "FEE_DATE":"20201202",
              "TOTALCOUNT":269
            },
            {
              "THREEDAY_REPEAT_COUNT":4,
              "CITY_CODE":"842",
              "CB_FAIL":0,
              "THREEDAY_COUNT":12,
              "CB_SUCCES":1,
              "THREEDAY_WHITE_COUNT":0,
              "BSS_COUNT":0,
              "THREEDAY_STOP_COUNT":8,
              "CB_LH":0,
              "CB_STATUS":3,
              "CITY_NAME":"延安",
              "CB_WHITE":0,
              "FEE_DATE":"20201202",
              "TOTALCOUNT":4
            },
            {
              "THREEDAY_REPEAT_COUNT":20,
              "CITY_CODE":"843",
              "CB_FAIL":0,
              "THREEDAY_COUNT":63,
              "CB_SUCCES":0,
              "THREEDAY_WHITE_COUNT":1,
              "BSS_COUNT":0,
              "THREEDAY_STOP_COUNT":42,
              "CB_LH":0,
              "CB_STATUS":6,
              "CITY_NAME":"渭南",
              "CB_WHITE":1,
              "FEE_DATE":"20201202",
              "TOTALCOUNT":7
            },
            {
              "THREEDAY_REPEAT_COUNT":23,
              "CITY_CODE":"844",
              "CB_FAIL":0,
              "THREEDAY_COUNT":95,
              "CB_SUCCES":2,
              "THREEDAY_WHITE_COUNT":1,
              "BSS_COUNT":0,
              "THREEDAY_STOP_COUNT":69,
              "CB_LH":0,
              "CB_STATUS":24,
              "CITY_NAME":"咸阳",
              "CB_WHITE":0,
              "FEE_DATE":"20201202",
              "TOTALCOUNT":26
            },
            {
              "THREEDAY_REPEAT_COUNT":4,
              "CITY_CODE":"845",
              "CB_FAIL":0,
              "THREEDAY_COUNT":12,
              "CB_SUCCES":0,
              "THREEDAY_WHITE_COUNT":0,
              "BSS_COUNT":0,
              "THREEDAY_STOP_COUNT":8,
              "CB_LH":0,
              "CB_STATUS":2,
              "CITY_NAME":"榆林",
              "CB_WHITE":0,
              "FEE_DATE":"20201202",
              "TOTALCOUNT":2
            },
            {
              "THREEDAY_REPEAT_COUNT":2,
              "CITY_CODE":"846",
              "CB_FAIL":0,
              "THREEDAY_COUNT":4,
              "CB_SUCCES":0,
              "THREEDAY_WHITE_COUNT":0,
              "BSS_COUNT":0,
              "THREEDAY_STOP_COUNT":2,
              "CB_LH":0,
              "CB_STATUS":0,
              "CITY_NAME":"铜川",
              "CB_WHITE":0,
              "FEE_DATE":"20201202",
              "TOTALCOUNT":0
            },
            {
              "THREEDAY_REPEAT_COUNT":6,
              "CITY_CODE":"847",
              "CB_FAIL":0,
              "THREEDAY_COUNT":20,
              "CB_SUCCES":0,
              "THREEDAY_WHITE_COUNT":6,
              "BSS_COUNT":0,
              "THREEDAY_STOP_COUNT":14,
              "CB_LH":0,
              "CB_STATUS":5,
              "CITY_NAME":"商洛",
              "CB_WHITE":2,
              "FEE_DATE":"20201202",
              "TOTALCOUNT":7
            },
            {
              "THREEDAY_REPEAT_COUNT":17,
              "CITY_CODE":"848",
              "CB_FAIL":0,
              "THREEDAY_COUNT":71,
              "CB_SUCCES":1,
              "THREEDAY_WHITE_COUNT":0,
              "BSS_COUNT":0,
              "THREEDAY_STOP_COUNT":53,
              "CB_LH":0,
              "CB_STATUS":10,
              "CITY_NAME":"安康",
              "CB_WHITE":0,
              "FEE_DATE":"20201202",
              "TOTALCOUNT":13
            },
            {
              "THREEDAY_REPEAT_COUNT":16,
              "CITY_CODE":"849",
              "CB_FAIL":0,
              "THREEDAY_COUNT":45,
              "CB_SUCCES":3,
              "THREEDAY_WHITE_COUNT":0,
              "BSS_COUNT":0,
              "THREEDAY_STOP_COUNT":29,
              "CB_LH":0,
              "CB_STATUS":3,
              "CITY_NAME":"汉中",
              "CB_WHITE":0,
              "FEE_DATE":"20201202",
              "TOTALCOUNT":7
            }
          ]

        },
        fetchList(){
          let param = {};
          param.numbers=this.numbers;
          param.types=this.types;
          fetchdowntimeWhiteList(param).then(response => {
            const key = response.data
          }).catch(err => {
            console.log(err)
          })
        },
        addWhite(){
          let param = this.temp;
          fetchdowntimeWhiteAdd(param).then(response => {
            const key = response.data
            this.addWhiteList = false;
          }).catch(err => {
            console.log(err)
          })
        },
        handleDownload() {
          this.downloadLoading = true
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['号码', '添加人', '添加时间', '状态', '添加原因','修改人','修改时间','设置']
            const filterVal = ['CITY_NAME', 'CITY_NAME', 'CITY_NAME', 'CITY_NAME', 'CITY_NAME']
            const data = this.formatJson(filterVal)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: 'table-list'
            })
            this.downloadLoading = false
          })
        },
        formatJson(filterVal) {
          return this.list.map(v => filterVal.map(j => {
            if (j === 'timestamp') {
              return parseTime(v[j])
            } else {
              return v[j]
            }
          }))
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        handleSizeChange(val) {
          this.pageSize=val;
        },
        handleCurrentChange(val) {
          this.pageCurrent=val;
        },
      }
    }
</script>

<style scoped>
</style>
