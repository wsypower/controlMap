import {builder, getBody, getQueryParameters} from '../util'
import Mock from 'mockjs'

const getAllCameraTreeData = options => {
  console.log('getAllCameraTreeData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getAllCameraTreeData query', queryParameters)
  let data = [
    {
      id: 'testStandardId',
      isLeaf: false,
      name: '高空瞭望',
      children: [
        {
          id: '33092104001320015992',
          name: '三江下马滩街环城南路路口_18',
          online: true,
          isLeaf: true,
          videoUrl: 'rtmp://60.191.244.44:1935/service/PuId-ChannelNo=123724000100000009-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
          x: '119.666288',
          y: '29.075812'
        }
        ]},
    {
      id: 'testStandardId2',
      isLeaf: false,
      name: '老区监控',
      children: [
        {
          id: '33092104001320016924',
          name: '三江兰溪街寺前皇菜市场_18',
          isLeaf: true,
          online: true,
          videoUrl: 'rtmp://60.191.244.44:1935/service/PuId-ChannelNo=123724000100000005-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
          x: '119.64715',
          y: '29.07609'
        },
        {
          id: '33092104001320013662',
          name: '三江寺前皇丹南路91号_18',
          isLeaf: true,
          online: true,
          videoUrl: 'rtmp://60.191.244.44:1935/service/PuId-ChannelNo=123724000100000006-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
          x: '119.645927',
          y: '29.076337'
        },
        {
          id: '33092104001320018885',
          name: '三江南市小区8栋东_18',
          isLeaf: true,
          online: false,
          videoUrl: 'rtmp://60.191.244.44:1935/service/PuId-ChannelNo=123724000100000007-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
          x: '119.661701',
          y: '29.069307'
        }
        ]
    },
    {
      id: 'testStandardId3',
      isLeaf: false,
      name: '单兵',
      children: [
        {
          id: '33092104001320010524',
          name: '三江南市小区15幢东_18',
          isLeaf: true,
          online: true,
          videoUrl: 'rtmp://60.191.244.44:1935/service/PuId-ChannelNo=123724000100000011-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
          x: '119.661552',
          y: '29.070488'
        }
        ]
    }
  ]

  return builder(
    {
      code: 0,
      data: data,
      msg: '操作成功'
    },
    '请求成功',
    0,
    { 'Custom-Header': Mock.mock('@id') }
  )
}
Mock.mock(/\/@test\/getAllCameraTreeData/, 'get', getAllCameraTreeData)