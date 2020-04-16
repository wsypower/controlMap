import {
  getCountyList,
  getAllCameraTreeData,
  getCameraUrl,
  getAllRainMacTreeData,
  getOneRainMacData,
  getRainfallTrendDataForOneMac,
  getAllWatchPlaceData,
  getAllWaterLevelMacTreeData,
  getOneWaterLevelMacData,
  getWaterLevelTrendDataForOneMac,
  getAllManholeMacData
} from '@/api/drainoffwater/manage.js'

export default {
  namespaced: true,
  actions: {
    getCountyList(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getCountyList(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getAllCameraTreeData(state, data) {
      return new Promise((resolve, reject) => {
        getAllCameraTreeData(data)
          .then(res => {
            let rs = {
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
            resolve(rs)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getCameraUrl(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getCameraUrl(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getAllRainMacTreeData(state, data) {
      return new Promise((resolve, reject) => {
        getAllRainMacTreeData(data)
          .then(res => {
            let rs = {
              treeData: [
                {
                  id: 'jianche1',
                  isLeaf: false,
                  name: '监测点1名称',
                  children: [
                    {
                      id: '33092104001320015992',
                      name: '设备0001',
                      online: false,
                      value: 6,
                      unit: 'mm',
                      isLeaf: true,
                      x: '122.202261',
                      y: '30.247886'
                    },
                    {
                      id: '33092104001320010677',
                      name: '设备0002',
                      isLeaf: true,
                      online: false,
                      value: 7,
                      unit: 'mm',
                      y: '30.247886',
                      x: '122.202261'
                    }
                  ]
                },
                {
                  id: 'jiance2',
                  isLeaf: false,
                  name: '监测点2名称',
                  children: [
                    {
                      id: '33092104001320011640',
                      name: '设备0001',
                      isLeaf: true,
                      online: false,
                      value: 12,
                      unit: 'mm',
                      y: '30.245140',
                      x: '122.208213'
                    },
                    {
                      id: '33092104001320011641',
                      name: '设备0002',
                      isLeaf: true,
                      online: false,
                      value: 18,
                      unit: 'mm',
                      y: '30.245140',
                      x: '122.208213'
                    },
                    {
                      id: '33092104001320011642',
                      name: '设备0003',
                      isLeaf: true,
                      online: false,
                      value: 3,
                      unit: 'mm',
                      y: '30.252779',
                      x: '122.220688'
                    },
                    {
                      id: '33092104001320011643',
                      name: '设备0004',
                      isLeaf: true,
                      online: false,
                      value: 6,
                      unit: 'mm',
                      y: '30.252779',
                      x: '122.220688'
                    },
                    {
                      id: '33092104001320011644',
                      name: '设备0005',
                      isLeaf: true,
                      online: false,
                      value: 10,
                      unit: 'mm',
                      y: '30.245192',
                      x: '122.206967'
                    },
                    {
                      id: '33092104001320011645',
                      name: '设备0006',
                      isLeaf: true,
                      online: false,
                      value: 2,
                      unit: 'mm',
                      y: '30.240435',
                      x: '122.203112'
                    },
                    {
                      id: '33092104001320011646',
                      name: '设备0007',
                      isLeaf: true,
                      online: false,
                      value: 4,
                      unit: 'mm',
                      y: '30.247607',
                      x: '122.202172'
                    }
                  ]
                }
              ],
              totla: 23
            }
            resolve(rs)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getOneRainMacData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getOneRainMacData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getRainfallTrendDataForOneMac(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getRainfallTrendDataForOneMac(data)
          .then(res => {
            let rs = [
              {
                dayTime: '2020-03-19 07:00',
                value: 13
              },
              {
                dayTime: '2020-03-19 07:30',
                value: 23
              },
              {
                dayTime: '2020-03-19 08:00',
                value: 16
              },
              {
                dayTime: '2020-03-19 08:30',
                value: 29
              },
              {
                dayTime: '2020-03-19 09:00',
                value: 55
              },
              {
                dayTime: '2020-03-19 09:30',
                value: 33
              },
              {
                dayTime: '2020-03-19 10:00',
                value: 40
              }
            ]
            resolve(rs)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getAllWatchPlaceData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllWatchPlaceData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getAllWaterLevelMacTreeData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllWaterLevelMacTreeData(data)
          .then(res => {
            let rs = {
              treeData: [
                {
                  id: 'jianche1',
                  isLeaf: false,
                  name: '监测点1名称',
                  children: [
                    {
                      id: '33092104001320015992',
                      name: '设备0001',
                      isLeaf: true,
                      online: false,
                      value: 1.5,
                      unit: 'm',
                      y: '30.247886',
                      x: '122.202261'
                    }
                  ]
                },
                {
                  id: 'jiance2',
                  isLeaf: false,
                  name: '监测点2名称',
                  children: [
                    {
                      id: '33092104001320011647',
                      name: '设备0001',
                      isLeaf: true,
                      online: true,
                      value: 2.1,
                      unit: 'm',
                      y: '30.252497',
                      x: '122.201541'
                    },
                    {
                      id: '33092104001320011648',
                      name: '设备0002',
                      isLeaf: true,
                      online: false,
                      value: 1.5,
                      unit: 'm',
                      y: '30.252497',
                      x: '122.201541'
                    },
                    {
                      id: '33092104001320011649',
                      name: '设备0010',
                      isLeaf: true,
                      online: false,
                      value: 2.6,
                      unit: 'm',
                      y: '30.252497',
                      x: '122.201541'
                    }
                  ]
                }
              ],
              total: 4
            }
            resolve(rs)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getOneWaterLevelMacData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getOneWaterLevelMacData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getWaterLevelTrendDataForOneMac(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getWaterLevelTrendDataForOneMac(data)
          .then(res => {
            let rs = [
              {
                dayTime: '2020-03-19 07:00',
                value: 13
              },
              {
                dayTime: '2020-03-19 07:30',
                value: 23
              },
              {
                dayTime: '2020-03-19 08:00',
                value: 16
              },
              {
                dayTime: '2020-03-19 08:30',
                value: 29
              },
              {
                dayTime: '2020-03-19 09:00',
                value: 55
              },
              {
                dayTime: '2020-03-19 09:30',
                value: 33
              },
              {
                dayTime: '2020-03-19 10:00',
                value: 40
              }
            ]
            resolve(rs)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getAllManholeMacData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllManholeMacData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    }
  }
}
