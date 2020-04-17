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
                      name: '九月山庄',
                      videoUrl: 'http://117.71.25.18:81/pag/117.71.25.18/7302/116458/0/SUB/TCP/live.m3u8',
                      isLeaf: true,
                      x: '116.56',
                      y: '31.49'
                    },
                    {
                      id: '33092104001320010677',
                      name: '人民医院河西分院',
                      videoUrl: '',
                      isLeaf: true,
                      x: '116.45',
                      y: '31.78'
                    },
                    {
                      id: '33092104001320015002',
                      name: '紫荆花怡养小镇',
                      videoUrl: '',
                      isLeaf: true,
                      x: '116.39',
                      y: '31.81'
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
                      name: '六安第一中学',
                      videoUrl: '',
                      isLeaf: true,
                      x: '116.48',
                      y: '31.85'
                    },
                    {
                      id: '33092104001320017369',
                      name: '新安镇财政所',
                      videoUrl: '',
                      isLeaf: true,
                      x: '116.49',
                      y: '31.87'
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
                      x: '116.46',
                      y: '31.74'
                    },
                    {
                      id: '33092104001320010677',
                      name: '设备0002',
                      isLeaf: true,
                      online: false,
                      value: 7,
                      unit: 'mm',
                      x: '116.45',
                      y: '31.75'
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
                      x: '116.50',
                      y: '31.75'
                    },
                    {
                      id: '33092104001320011641',
                      name: '设备0002',
                      isLeaf: true,
                      online: false,
                      value: 18,
                      unit: 'mm',
                      x: '116.51',
                      y: '31.76'
                    },
                    {
                      id: '33092104001320011642',
                      name: '设备0003',
                      isLeaf: true,
                      online: false,
                      value: 3,
                      unit: 'mm',
                      x: '116.55',
                      y: '31.66'
                    },
                    {
                      id: '33092104001320011643',
                      name: '设备0004',
                      isLeaf: true,
                      online: false,
                      value: 6,
                      unit: 'mm',
                      x: '116.56',
                      y: '31.49'
                    },
                    {
                      id: '33092104001320011644',
                      name: '设备0005',
                      isLeaf: true,
                      online: false,
                      value: 10,
                      unit: 'mm',
                      x: '116.45',
                      y: '31.78'
                    },
                    {
                      id: '33092104001320011645',
                      name: '设备0006',
                      isLeaf: true,
                      online: false,
                      value: 2,
                      unit: 'mm',
                      x: '116.39',
                      y: '31.81'
                    },
                    {
                      id: '33092104001320011646',
                      name: '设备0007',
                      isLeaf: true,
                      online: false,
                      value: 4,
                      unit: 'mm',
                      x: '116.48',
                      y: '31.75'
                    }
                  ]
                }
              ],
              total: 9
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
                      x: '116.46',
                      y: '31.74'
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
                      x: '116.50',
                      y: '31.75'
                    },
                    {
                      id: '33092104001320011648',
                      name: '设备0002',
                      isLeaf: true,
                      online: false,
                      value: 1.5,
                      unit: 'm',
                      x: '116.51',
                      y: '31.76'
                    },
                    {
                      id: '33092104001320011649',
                      name: '设备0010',
                      isLeaf: true,
                      online: false,
                      value: 2.6,
                      unit: 'm',
                      x: '116.56',
                      y: '31.49'
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
