import request from '@/plugins/axios/axios'

export const queryParklot = () => {
  console.log('api:queryParklot')
  return request({
    url: 'http://218.206.153.37:10000/hlyy-parking-web/dtcgj/queryParklot',
    method: 'post'
  })
}

export const queryCurrentBerthCount = data => {
  console.log('api:queryCurrentBerthCount', data)
  return request({
    url: 'http://218.206.153.37:10000/hlyy-parking-web/dtcgj/queryCurrentBerthCount',
    method: 'post',
    data: data
  })
}
