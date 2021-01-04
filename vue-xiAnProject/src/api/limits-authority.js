import request from '@/utils/request'
let url = 'http://10.93.57.134:18082';
export function fetchuserList(param) {
  return request({
    url: '/user/list',
    method: 'post',
    params: param
  })
}

export function resetPass(param) {
  return request({
    url: '/user/resetPass',
    method: 'post',
    params: param
  })
}

export function fetcheditUser(param) {
  return request({
    url: '/user/edit',
    method: 'post',
    params: param
  })
}

export function fetchRole() {
  return request({
    url: '/user/roles',
    method: 'get',
  })
}

export function fetchroleList(param) {
  return request({
    url: '/role/list',
    method: 'post',
    params: param
  })
}

export function fetchtreeAllList() {
  return request({
    url: '/role/resources',
    method: 'get'
  })
}

export function fetchtreeSelList(param) {
  return request({
    url: '/role/resourcesRoleId',
    method: 'post',
    params: param
  })
}

export function editTreeSelList(param) {
  return request({
    url: '/role/edit',
    method: 'post',
    params: param
  })
}

export function fetchaddRole(param) {
  return request({
    url: '/role/add',
    method: 'post',
    params: param
  })
}

export function fetchOrgList() {
  return request({
    url:'/org/list',
    method:'get'
  })
}

export function addOrg(param) {
  return request({
    url: '/org/add',
    method: 'post',
    params: param
  })
}

export function editOrg(param) {
  return request({
    url: '/org/edit',
    method: 'get',
    params: param
  })
}

export function delOrg(param) {
  return request({
    url: '/org/remove',
    method: 'get',
    params: param
  })
}

export function channelAndDeveList(param) {
  return request({
    url: '/channelAndDeve/list',
    method: 'post',
    params: param
  })
}

export function fetchAddchannel(param) {
  return request({
    url: '/channelAndDeve/addchannel',
    method: 'post',
    params: param
  })
}

export function fetchEditchannel(param) {
  return request({
    url: '/channelAndDeve/editchannel',
    method: 'post',
    params: param
  })
}

export function fetchDelchannel(param) {
  return request({
    url: '/channelAndDeve/removechannel',
    method: 'post',
    params: param
  })
}

export function fetchAdddevelop(param) {
  return request({
    url: '/channelAndDeve/adddevelop',
    method: 'post',
    params: param
  })
}

export function fetchEditdevelop(param) {
  return request({
    url: '/channelAndDeve/editdevelop',
    method: 'post',
    params: param
  })
}

export function fetchDeldevelop(param) {
  return request({
    url: '/channelAndDeve/removedevelop',
    method: 'post',
    params: param
  })
}

export function addUsers(param) {
  return request({
    url: '/user/insertUser',
    method: 'post',
    params: param
  })
}

export function fetchdowntimeWhiteAdd(param) {
  return request({
    url: '/smzApi/result/getReportRnsStatic',
    method: 'post',
    params: param
  })
}
