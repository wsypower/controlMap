import { builder, getBody, getQueryParameters } from '../util'
import Mock from 'mockjs'

const getAllCameraTreeDataForBridge = options => {
  console.log('getAllCameraTreeDataForBridge options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getAllCameraTreeDataForBridge query', queryParameters)
  let data = {
    treeData: [
      {
        id: 'testStandardId',
        name: '高空瞭望',
        isLeaf: false,
        children: [
          {
            id: '33092104001320015992',
            name: '三江购物-球',
            videoUrl: 'http://117.71.25.18:81/pag/117.71.25.18/7302/116458/0/SUB/TCP/live.m3u8',
            isLeaf: true,
            x: '122.202261',
            y: '30.247886'
          },
          {
            id: '33092104001320010677',
            name: '三江购物-全景',
            videoUrl: '',
            isLeaf: true,
            x: '122.202261',
            y: '30.247886'
          },
          {
            id: '33092104001320015002',
            name: '新区广电大楼楼顶-球',
            videoUrl: '',
            isLeaf: true,
            x: '122.218019',
            y: '30.265587'
          }
        ]
      },
      {
        id: 'testStandardId2',
        name: '公园广场',
        isLeaf: false,
        children: [
          {
            id: '33092104001320013870',
            name: '蓬莱公园铁塔-球',
            videoUrl: '',
            isLeaf: true,
            x: '122.208213',
            y: '30.245140'
          },
          {
            id: '33092104001320017369',
            name: '蓬莱公园铁塔-全景',
            videoUrl: '',
            isLeaf: true,
            x: '122.208213',
            y: '30.245140'
          }
        ]
      }
    ],
    total: 5
  }

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
Mock.mock(/\/@test\/getAllCameraTreeDataForBridge/, 'get', getAllCameraTreeDataForBridge)

const getCameraUrl = options => {
  console.log('getCameraUrl options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getCameraUrl query', queryParameters)
  let data =
    'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000005-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12'

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
Mock.mock(/\/@test\/getCameraUrl/, 'get', getCameraUrl)

