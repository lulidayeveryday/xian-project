<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display: inline-block;padding-right: 20px;">
        <span style="padding: 0 8px 0 0">省份</span>
        <el-select v-model="province" placeholder="请选择">
          <el-option key="sx" label="陕西" value="sx"></el-option>
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
        <span style="padding: 0 8px 0 0;">数据类型</span>
        <el-select v-model="dataType" placeholder="请选择">
          <el-option key="sx1" value="-1" label="全部"></el-option>
          <el-option key="sx2" value="1" label="欺诈类型"></el-option>
          <el-option key="sx3" value="2" label="骚扰数据"></el-option>
        </el-select>
      </div>
      <div style="display:inline-block;padding-right: 20px;">
        <span style="padding: 0 8px 0 0;">统计时间</span>
        <el-date-picker
          v-model="time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>

      <el-button class="filter-item" style="margin: 0 7px 0;" type="primary" icon="el-icon-search" @click="onSubmit">
        查询
      </el-button>
      <el-button :loading="downloadLoading" style="margin:0 15px 0 7px;" type="success" icon="el-icon-document" @click="handleDownload">
        导出表格
      </el-button>
      <span style="display: inline-block;color: #535353;font-size: 12px;line-height: 16px;margin-top: 14px;" @click="dialogFormVisible = true">
        <el-button type="info" icon="el-icon-warning-outline" circle style="padding: 2px;font-size: 16px;"></el-button>&nbsp;统计口径说明
      </span>
    </div>



    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      show-summary
      :summary-method="getSummaries"
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="地市" prop="CITY_NAME" width="70" align="center">
      </el-table-column>
      <el-table-column label="统计日期" prop="FEE_DATE">
      </el-table-column>
      <el-table-column label="鹰眼下发量" prop="TOTALCOUNT">
      </el-table-column>
      <el-table-column label="bss用户量" prop="BSS_COUNT">
      </el-table-column>
      <el-table-column label="白名单过滤量" prop="CB_LH">
      </el-table-column>
      <el-table-column label="状态过滤量" prop="CB_STATUS">
      </el-table-column>
      <el-table-column label="停机成功量" prop="CB_SUCCES">
      </el-table-column>
      <el-table-column label="靓号过滤量" prop="CB_LH">
      </el-table-column>
      <el-table-column label="停机失败量" prop="CB_LH">
      </el-table-column>
      <el-table-column label="停机率" prop="CB_LH">
      </el-table-column>
      <el-table-column label="7天下发量" prop="THREEDAY_COUNT">
      </el-table-column>
      <el-table-column label="7天复开量" prop="THREEDAY_REPEAT_COUNT">
      </el-table-column>
      <el-table-column label="7天白名单过滤量" prop="CB_LH">
      </el-table-column>
      <el-table-column label="7天复开率" prop="CB_LH">
      </el-table-column>
      <el-table-column label="7天停机量" prop="THREEDAY_STOP_COUNT">
      </el-table-column>
      <el-table-column label="7天停机率" prop="CB_LH">
      </el-table-column>
    </el-table>


    <el-dialog :title="'统计口径说明'" :visible.sync="dialogFormVisible">
      <div>
        <ul style="line-height: 25px;">
          <li>每晚凌晨1点汇总前日鹰眼下发数据总量</li>
          <li>下发总量为鹰眼下发数据剔除重复后的量(所有指标都是剔除重复后的)</li>
          <li>白名单、靓号、停机成功、失败、非正常状态不停机 这四列数据中相互存在重复的可能性（四项加起来可能不等于下发总数）</li>
          <li>停机率=系统停机成功号码数/鹰眼下发数量</li>
          <li>7天内复开数量 指从截止汇总时间点号码状态是正常开通的7天内鹰眼下发的号码数量</li>
          <li>7天内复开率=7天内复开号码/(7天下发的号码-白名单数量) （剔除重复后的量进行比较）</li>
          <li>7天内停机数量 指截止汇总时间点离网+预销户停机+局方停机的号码数量</li>
          <li>7天停机率=7天内停机数量/(7天下发的号码-白名单数量) （剔除重复后的量进行比较）</li>
          <li>报表中统计日期为数据汇总时间，汇总的是前一天下发数据的整体情况</li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchhawkeyeDailyList } from '@/api/fraud-management'
  import moment from 'moment'

    export default {
        name: "hawkeye-daily",
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
          }],//地市下拉框展示数据
          province: '',//省份
          city:'',//地市
          dataType:'',//数据类型
          time:'',
          list:[],//表格数据
          dialogFormVisible:false,//统计口径说明
          downloadLoading: false
        }
      },
      created(){
      },
      methods: {
        fetchList(){
          let param={};
          param.province=this.province;
          param.city=this.city;
          param.dataType=this.dataType;
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
          fetchhawkeyeDailyList(param).then(response => {
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
          this.fetchList();

        },
        getSummaries(param) {
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = '合计';
              return;
            }else if(index === 1){
              sums[index] = '--';
              return
            }
            const values = data.map(item => Number(item[column.property]));
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += '';
          });

          return sums;
        },
        handleDownload() {
          this.downloadLoading = true
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = [
              '地市',
              '统计日期',
              '鹰眼下发量',
              'bss用户量',
              '白名单过滤量',
              '状态过滤量',
              '停机成功量',
              '靓号过滤量',
              '停机失败量',
              '停机率',
              '7天下发量',
              '7天复开量',
              '7天白名单过滤量',
              '7天复开率',
              '7天停机量',
              '7天停机率']
            const filterVal = ['CITY_NAME']
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
      },
    }
</script>

<style scoped>
</style>
