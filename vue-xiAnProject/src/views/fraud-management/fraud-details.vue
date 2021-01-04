<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display: inline-block;padding-right: 20px;">
        <span style="padding: 0 8px 0 0">省份</span>
        <el-select v-model="province" placeholder="请选择">
          <el-option key="sx" label="陕西"></el-option>
        </el-select>
      </div>
      <div style="display:inline-block;padding-right: 20px;">
        <span style="padding: 0 8px 0 0;">地市</span>
        <el-select v-model="city" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style="display:inline-block;padding-right: 20px;">
        <span style="padding: 0 8px 0 0;">业务号码</span>
        <el-input style="display: inline-block;width: 196px;" v-model="businessNumber" placeholder="请输入业务号码"></el-input>
      </div>
      <div style="display:inline-block;padding-right: 20px;">
        <span style="padding: 0 8px 0 0;">停开机状态</span>
        <el-select v-model="shutdownStatus" placeholder="请选择">
          <el-option key="sx1" label="未处理"></el-option>
          <el-option key="sx2" label="已停机"></el-option>
          <el-option key="sx3" label="停机失败"></el-option>
        </el-select>
      </div>

      <el-button class="filter-item" style="margin: 0 7px 0;" type="primary" icon="el-icon-search" @click="onSubmit">
        查询
      </el-button>
      <el-button :loading="downloadLoading" style="margin:0 15px 0 7px;" type="success" icon="el-icon-document" @click="handleDownload">
        导出表格
      </el-button>
      <span style="display: inline-block;color: #535353;font-size: 12px;line-height: 16px;margin-top: 14px;" @click="dialogFormVisible = !dialogFormVisible">
        <el-button type="info" icon="el-icon-circle-plus" circle style="padding: 1px;font-size: 16px;"></el-button>&nbsp;精确查找
      </span>
      <div style="margin: 15px 0;" v-if="dialogFormVisible">
        <div style="display:inline-block;padding-right: 20px;">
          <span style="padding: 0 8px 0 0;">导入时间</span>
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div style="display:inline-block;padding-right: 20px;">
          <span style="padding: 0 8px 0 0;">欺诈等级</span>
          <el-select placeholder="请选择" v-model="fraudLevel">
            <el-option key="sx1" value="1" label="诈骗"></el-option>
            <el-option key="sx2" value="2" label="骚扰"></el-option>
            <el-option key="sx3" value="3" label="固话骚扰"></el-option>
          </el-select>
        </div>
        <div style="display:inline-block;padding-right: 20px;">
          <span style="padding: 0 8px 0 0;">数据来源</span>
          <el-select placeholder="请选择" v-model="dataSources">
            <el-option key="sx1" value="1" label="不区分"></el-option>
            <el-option key="sx2" value="2" label="鹰眼下发"></el-option>
            <el-option key="sx3" value="3" label="西分自检"></el-option>
            <el-option key="sx1" value="4" label="国信下发"></el-option>
            <el-option key="sx2" value="5" label="公安关停"></el-option>
            <el-option key="sx3" value="6" label="鹰眼下发（互联网）"></el-option>
          </el-select>
        </div>
      </div>
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

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="诈骗号码" prop="CITY_NAME" width="70" align="center">
      </el-table-column>
      <el-table-column label="诈骗号码emsi号" prop="FEE_DATE">
      </el-table-column>
      <el-table-column label="省份" prop="TOTALCOUNT">
      </el-table-column>
      <el-table-column label="城市" prop="BSS_COUNT">
      </el-table-column>
      <el-table-column label="诈骗类型" prop="CB_LH">
      </el-table-column>
      <el-table-column label="检出时间" prop="CB_STATUS">
      </el-table-column>
      <el-table-column label="拨出地" prop="CB_SUCCES">
      </el-table-column>
      <el-table-column label="随机的接听号码" prop="CB_LH">
      </el-table-column>
      <el-table-column label="批量导入流水号" prop="CB_LH">
      </el-table-column>
      <el-table-column label="运营商" prop="CB_LH">
      </el-table-column>
      <el-table-column label="渠道" prop="THREEDAY_COUNT">
      </el-table-column>
      <el-table-column label="发展人" prop="THREEDAY_REPEAT_COUNT">
      </el-table-column>
      <el-table-column label="产品" prop="CB_LH">
      </el-table-column>
      <el-table-column label="入网时间" prop="CB_LH">
      </el-table-column>
      <el-table-column label="服务状态" prop="THREEDAY_STOP_COUNT">
      </el-table-column>
      <el-table-column label="停开机状态" prop="CB_LH">
      </el-table-column>
      <el-table-column label="停开备注" prop="THREEDAY_REPEAT_COUNT">
      </el-table-column>
      <el-table-column label="操作时间" prop="CB_LH">
      </el-table-column>
      <el-table-column label="操作人" prop="CB_LH">
      </el-table-column>
      <el-table-column label="数据更新时间" prop="THREEDAY_STOP_COUNT">
      </el-table-column>
      <el-table-column label="数据来源" prop="CB_LH">
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
  </div>
</template>

<script>
  import { fetchfraudDetailsList } from '@/api/fraud-management'
  import moment from 'moment'
    export default {
        name: "fraud-details",
      data() {
        return {
          options: [
            {
            value: '选项1',
            label: '咸阳'
          }, {
            value: '选项2',
            label: '延安'
          }, {
            value: '选项3',
            label: '榆林'
          }, {
            value: '选项4',
            label: '渭南'
          }, {
            value: '选项5',
            label: '商洛'
          }, {
            value: '选项11',
            label: '西安'
          }, {
            value: '选项12',
            label: '安康'
          }, {
            value: '选项13',
            label: '汉中'
          }, {
            value: '选项14',
            label: '宝鸡'
          }, {
            value: '选项15',
            label: '铜川'
          }],
          province: '',//省份
          city:'',//地市
          businessNumber:'',//业务编码
          shutdownStatus:'',//停开机状态
          time:'',
          fraudLevel:'',//欺诈等级
          dataSources:'',//数据来源
          list:[],
          downloadLoading: false,
          dialogFormVisible:false,
          multipleSelection:[],
          pageSize:10,//每页显示条数
          pageCurrent:1,//当前页
          pageTotal:100,
        }
      },
      methods: {
        fetchList(){
          let param = {};
          param.province = this.province;
          param.city = this.city;
          param.businessNumber = this.businessNumber;
          param.shutdownStatus = this.shutdownStatus;
          if(this.dialogFormVisible){
            let time = this.time;
            if(time!=''){
              let startTime = moment(time[0]).format('YYYY-MM-DD');
              let endTime = moment(time[1]).format('YYYY-MM-DD');
              param.startTime=startTime;
              param.endTime=endTime;
            }else {
              param.startTime='';
              param.endTime='';
            }
            param.fraudLevel = this.fraudLevel;
            param.dataSources = this.dataSources;
          }else {
            param.startTime='';
            param.endTime='';
            param.fraudLevel = '';
            param.dataSources = '';
          }
          fetchfraudDetailsList(param).then(response => {
            const key = response.data
          }).catch(err => {
            console.log(err)
          })
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
        handleDownload() {
          this.downloadLoading = true
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = [
              '诈骗号码',
              '诈骗号码emsi号',
              '省份',
              '城市',
              '诈骗类型',
              '检出时间',
              '拨出地',
              '随机的接听号码',
              '批量导入流水号',
              '运营商',
              '渠道',
              '发展人',
              '产品',
              '入网时间',
              '服务状态',
              '停开机状态',
              '停开备注',
              '操作时间',
              '操作人',
              '数据更新时间',
              '数据来源'
            ]
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
