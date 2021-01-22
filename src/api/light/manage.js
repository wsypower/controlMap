import request from '@/plugins/axios/axios'

export const lightLogin = data => {
  console.log('api:lightLogin', data)
  return request({
    url: URL_CONFIG.baseURL + '/iot/v1/auth/login',
    method: 'post',
    data: data
  })
}

export const lightParameters = data => {
  console.log('api:lightParameters', data)
  return request({
    url: URL_CONFIG.baseURL + '/iot/v1/DeviceParameters',
    method: 'post',
    data: data
  })
}

export const lightNewParameters = data => {
  console.log('api:lightNewParameters', data)
  return request({
    url: URL_CONFIG.baseURL + '/iot/v1/DeviceNewParameters',
    method: 'post',
    data: data
  })
}

export const lightNewHistory = data => {
  console.log('api:lightNewHistory', data)
  return request({
    url: URL_CONFIG.baseURL + '/iot/v1/deviceNewHistory',
    method: 'post',
    data: data
  })
}
