import request from '@/plugins/axios/axios'

export function AccountLogin(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
