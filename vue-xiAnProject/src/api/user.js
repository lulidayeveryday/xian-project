import request from '@/utils/request'
let url = 'http://10.93.57.134:18082'

export function login(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url:'/user/login',
    method: 'post',
    params:data
  })
}

export function getInfo(token) {
  return request({
    // url: '/vue-element-admin/user/info',
    url:'/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
