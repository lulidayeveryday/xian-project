import request from '@/utils/request'

let url = 'http://10.93.57.134:18082';
export function fetchhawkeyeDailyList(param) {
  return request({
    url: url+'/smzApi/result/getReportRnsStatic',
    method: 'post',
    params: param
  })
}

export function fetchfraudDetailsList(param) {
  return request({
    url: url+'/smzApi/result/getReportRnsStatic',
    baseURL:'http://130.84.1.9:8088',
    method: 'post',
    params: param
  })
}

export function fetchdowntimeWhiteList(param) {
  return request({
    url: url+'/smzApi/result/getReportRnsStatic',
    method: 'post',
    params: param
  })
}

export function fetchdowntimeWhiteAdd(param) {
  return request({
    url: url+'/smzApi/result/getReportRnsStatic',
    method: 'post',
    params: param
  })
}
