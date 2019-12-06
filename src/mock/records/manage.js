import { builder, getBody, getQueryParameters } from '../util'
import Mock from 'mockjs'

const getAllAddressData = options => {
  console.log('getAllAddressData options',options);
  const queryParameters = getQueryParameters(options);
  console.log('getAllAddressData query',queryParameters);
  let data = [
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        {
          value: 'hangzhou',
          label: '杭州',
          children: [
            {
              value: 'West Lake',
              label: '西湖区'
            },
            {
              value: 'xc Lake',
              label: '下城区'
            },
            {
              value: 'bj Lake',
              label: '滨江区'
            }
          ]
        }
      ]
    },
    {
      value: 'jiangsu',
      label: '江苏',
      children: [
        {
          value: 'nanjing',
          label: '南京',
          children: [
            {
              value: 'zhonghuamen',
              label: '中华门',
            }
          ]
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
Mock.mock(/\/@test\/getAllAddressData/, 'get', getAllAddressData)

const getAllRecordsDataList = options => {
  console.log('getAllRecordsDataList options', options)
  const queryParameters = getQueryParameters(options)
  console.log('getAllRecordsDataList query', queryParameters)
  let data = {
    list: [
      {
        id: 'aaaa111111',
        code: 2019111833092113083,
        typeName: '沿街晾晒',
        description: '马山街3号',
        photoUrl: 'http://61.153.37.213:8087/camera/2019/11/18/20191118080357327335.jpg',
        x: "122.201928",
        y: "30.248119"
      },
      {
        id: 'bbbbb111111',
        code: 2019111833092113083,
        typeName: '机动车违停',
        description: '杭州ssss市杭州市杭州杭州市杭州市杭州市ssssssssss市杭州市杭州市杭州',
        photoUrl: 'http://61.153.37.213:8087/camera/2019/11/18/20191118080357327335.jpg',
        x: "122.201928",
        y: "30.248119"
      },
      {
        id: 'cccccc11111111',
        code: 2019111833092113083,
        typeName: '沿街晾晒',
        description: '监控马山街3号监控马山街3号监控马山街3号监控',
        photoUrl: 'http://61.153.37.213:8087/camera/2019/11/18/20191118080357327335.jpg',
        x: "122.201928",
        y: "30.248119"
      },
      {
        id: 'd11111111',
        code: 2019111833092113083,
        typeName: '沿街晾晒',
        description:
          '马山街3号马山街3号监控马山街3号监控马山街3号监控马山街3号监控马山街3号监控马山街3号监控马山街3号监控马山街3号监控',
        photoUrl: 'http://61.153.37.213:8087/camera/2019/11/18/20191118080357327335.jpg',
        x: "122.201928",
        y: "30.248119"
      },
      {
        id: 'e11111111',
        code: 2019111833092113083,
        typeName: '沿街晾晒',
        description:
          '马山街3号马山街3号监控马山街3号监控马山街3号监控马山街3号监控马山街3号监控马山街3号监控马山街3号监控马山街3号监控',
        photoUrl: 'http://61.153.37.213:8087/camera/2019/11/18/20191118080357327335.jpg',
        x: "122.201928",
        y: "30.248119"
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
Mock.mock(/\/@test\/getAllRecordsDataList/, 'get', getAllRecordsDataList)

const getRecordDetailData = options => {
  console.log('getRecordDetailData options',options);
  const queryParameters = getQueryParameters(options);
  console.log('getRecordDetailData query',queryParameters);
  let data = {
    id: "e4521370099611eab758c1a8394e77de",
    code: "2019111833092113085",
    sourceName: "视频抓拍123",
    type1Name: "事件asd",
    type2Name: "街面秩序123",
    type3Name: "乱堆物堆料wffff",
    description: "2019-11-18 08:00:03:乱堆物堆料sdfdgfghfhjdfgdjghshdfhkgkdfhg",

    hsResult: '',
    hcResult: '',

    streetName: "高亭镇",
    countryName: "安澜社区",
    gridName: "330921102900001",
    address: "长河路五叉路口-3枪",

    creator: "xsly001",
    supervisor: "jdyspzp",
    reporterName: "",
    reporterPhone: ""
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
Mock.mock(/\/@test\/getRecordDetailData/, 'get', getRecordDetailData)

const getRecordPhotosData = options => {
  console.log('getRecordPhotosData options',options);
  const queryParameters = getQueryParameters(options);
  console.log('getRecordPhotosData query',queryParameters);
  let data = {
    handleBefore: {
      uploadTime: 1574730352000,
      photosList: ['http://61.153.37.213:8087/upload/file/2019/11/20/20191120145436458442.jpg','http://61.153.37.213:8087/upload/file/2019/11/20/20191120145452931177.jpg']
    },
    handleAfter: {
      uploadTime: 1574739352000,
      photosList: ['http://61.153.37.213:8087/camera/2019/11/18/20191118092357512929.jpg']
    }
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
Mock.mock(/\/@test\/getRecordPhotosData/, 'get', getRecordPhotosData)

const getRecordLogsData = options => {
  console.log('getRecordLogsData options',options);
  const queryParameters = getQueryParameters(options);
  console.log('getRecordLogsData query',queryParameters);
  let data = []
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
Mock.mock(/\/@test\/getRecordLogsData/, 'get', getRecordLogsData)
