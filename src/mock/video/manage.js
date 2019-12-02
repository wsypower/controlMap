import { builder, getBody, getQueryParameters } from '../util'
import Mock from 'mockjs'

const getAllCameraTreeData = options => {
  console.log('getAllCameraTreeData options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getAllCameraTreeData query', queryParameters)
  let data = [
    // {
    //   mpname: '摄像头列表',
    //   mpid: 'list',
    //   isLeaf: false,
    //   children: [
    {
      ip: '192.168.100.46',
      latitude: '30.247886',
      longitude: '122.202261',
      mpid: '33092104001320015992',
      mpname: '三江购物-球',
      puid: '33092104001320015992',
      rmtpUrl:
        'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000015-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
      isLeaf: true
    },
    {
      ip: '192.168.100.46',
      latitude: '30.247886',
      longitude: '122.202261',
      mpid: '33092104001320010677',
      mpname: '三江购物-全景',
      puid: '33092104001320010677',
      rmtpUrl:
        'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000883-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
      isLeaf: true
    },
    {
      ip: '192.168.100.55',
      latitude: '30.265587',
      longitude: '122.218019',
      mpid: '33092104001320015002',
      mpname: '新区广电大楼楼顶-球',
      puid: '33092104001320015002',
      rmtpUrl:
        'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000005-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
      isLeaf: true
    },
    {
      ip: '192.168.100.55',
      latitude: '30.265587',
      longitude: '122.218019',
      mpid: '33092104001320011649',
      mpname: '新区广电大楼楼顶-全景',
      puid: '33092104001320011649',
      rmtpUrl:
        'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000028-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
      isLeaf: true
    },
    {
      ip: '192.168.100.70',
      latitude: '30.245140',
      longitude: '122.208213',
      mpid: '33092104001320013870',
      mpname: '蓬莱公园铁塔-球',
      puid: '33092104001320013870',
      rmtpUrl:
        'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000048-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
      isLeaf: true
    },
    {
      ip: '192.168.100.70',
      latitude: '30.245140',
      longitude: '122.208213',
      mpid: '33092104001320017369',
      mpname: '蓬莱公园铁塔-全景',
      puid: '33092104001320017369',
      rmtpUrl:
        'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000065-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
      isLeaf: true
    },
    {
      ip: '192.168.100.77',
      latitude: '30.252779',
      longitude: '122.220688',
      mpid: '33092104001320010611',
      mpname: '交通大楼全景-球',
      puid: '33092104001320010611',
      rmtpUrl:
        'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000134-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
      isLeaf: true
    },
    {
      ip: '192.168.100.77',
      latitude: '30.252779',
      longitude: '122.220688',
      mpid: '33092104001320012341',
      mpname: '交通大楼全景',
      puid: '33092104001320012341',
      rmtpUrl:
        'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000219-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
      isLeaf: true
    }
    //   ]
    // }
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
