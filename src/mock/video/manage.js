import { builder, getBody, getQueryParameters } from '../util'
import Mock from 'mockjs'

const getAllAlarmTypeDataList = options => {
  console.log('getAllAlarmTypeDataList options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getAllAlarmTypeDataList query', queryParameters)
  let data = [
    {
      id: 'aaaa111111',
      name: '机动车违停'
    },
    {
      id: 'bbbb111111',
      name: '沿街晾晒'
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
Mock.mock(/\/@test\/getAllAlarmTypeDataList/, 'get', getAllAlarmTypeDataList)

const getAllAlarmDataList = options => {
  console.log('getAllAlarmDataList options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getAllAlarmDataList query', queryParameters)
  let data = {
    list: [
      {
        id: 'aaaa111111',
        typeName: '沿街晾晒',
        dayTime: 1574729844000,
        position: '马山街3号',
        cameraName: '马山街3号监控',
        videoSrc:
          'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000015-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
        photoUrl: 'http://61.153.37.213:8087/camera/2019/11/18/20191118080357327335.jpg'
      },
      {
        id: 'bbbbb111111',
        typeName: '机动车违停',
        dayTime: 1574729844000,
        position: '杭州ssss市杭州市杭州杭州市杭州市杭州市ssssssssss市杭州市杭州市杭州',
        cameraName: '马山街3号监控',
        videoSrc:
          'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000883-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
        photoUrl: 'http://61.153.37.213:8087/camera/2019/11/18/20191118080357327335.jpg'
      },
      {
        id: 'cccccc11111111',
        typeName: '沿街晾晒',
        dayTime: 1574729844000,
        position:
          '马山街3号马山街3号监控马山街3号监控马山街3号监控马山街3号监控马山街3号监控马山街3号监控马山街3号监控马山街3号监控',
        cameraName: '马山街3号监控马山街3号监控',
        videoSrc:
          'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000005-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
        photoUrl: 'http://61.153.37.213:8087/camera/2019/11/18/20191118080357327335.jpg'
      },
      {
        id: 'dddd111111111',
        typeName: '沿街晾晒',
        dayTime: 1574729844000,
        position: '马山街3号',
        cameraName: '马山街3号监控',
        videoSrc:
          'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000134-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
        photoUrl: 'http://61.153.37.213:8087/camera/2019/11/18/20191118080357327335.jpg'
      },
      {
        id: 'eeee1111111',
        typeName: '沿街晾晒',
        dayTime: 1574729844000,
        position: '马山街3号',
        cameraName: '马山街3号监控',
        videoSrc:
          'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000219-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
        photoUrl: 'http://61.153.37.213:8087/camera/2019/11/18/20191118080357327335.jpg'
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
Mock.mock(/\/@test\/getAllAlarmDataList/, 'get', getAllAlarmDataList)

const alarmNormalHandle = options => {
  console.log('alarmNormalHandle options', options)
  const body = getBody(options)
  console.log('alarmNormalHandle body', body)
  let data = {
    msg: '操作成功'
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
Mock.mock(/\/@test\/alarmNormalHandle/, 'post', alarmNormalHandle)

const alarmReportHandle = options => {
  console.log('alarmReportHandle options', options)
  const body = getBody(options)
  console.log('alarmReportHandle body', body)
  let data = {
    msg: '操作成功'
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
Mock.mock(/\/@test\/alarmReportHandle/, 'post', alarmReportHandle)

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
      x: '120.56305825710297',
      y: '30.014031529426575',
      mpid: '33092104001320015992',
      mpname: '三江购物-球',
      puid: '33092104001320015992',
      rmtpUrl:
        'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000015-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
      isLeaf: true
    },
    {
      ip: '192.168.100.46',
        x: '120.56305825710297',
        y: '30.014031529426575',
      mpid: '33092104001320010677',
      mpname: '三江购物-全景',
      puid: '33092104001320010677',
      rmtpUrl:
        'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000883-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
      isLeaf: true
    },
    {
      ip: '192.168.100.55',
        x: '120.56305825710297',
        y: '30.014031529426575',
      mpid: '33092104001320015002',
      mpname: '新区广电大楼楼顶-球',
      puid: '33092104001320015002',
      rmtpUrl:
        'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000005-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
      isLeaf: true
    },
    {
      ip: '192.168.100.55',
        x: '120.56305825710297',
        y: '30.014031529426575',
      mpid: '33092104001320011649',
      mpname: '新区广电大楼楼顶-全景',
      puid: '33092104001320011649',
      rmtpUrl:
        'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000028-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
      isLeaf: true
    },
    {
      ip: '192.168.100.70',
        x: '120.56305825710297',
        y: '30.014031529426575',
      mpid: '33092104001320013870',
      mpname: '蓬莱公园铁塔-球',
      puid: '33092104001320013870',
      rmtpUrl:
        'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000048-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
      isLeaf: true
    },
    {
      ip: '192.168.100.70',
        x: '120.56305825710297',
        y: '30.014031529426575',
      mpid: '33092104001320017369',
      mpname: '蓬莱公园铁塔-全景',
      puid: '33092104001320017369',
      rmtpUrl:
        'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000065-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
      isLeaf: true
    },
    {
      ip: '192.168.100.77',
        x: '120.56305825710297',
        y: '30.014031529426575',
      mpid: '33092104001320010611',
      mpname: '交通大楼全景-球',
      puid: '33092104001320010611',
      rmtpUrl:
        'rtmp://115.231.81.231:1935/service/PuId-ChannelNo=123724000100000134-01&PlayMethod=0&StreamingType=0&NetType=1&FCode=12',
      isLeaf: true
    },
    {
      ip: '192.168.100.77',
        x: '120.56305825710297',
        y: '30.014031529426575',
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
