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
            resolve(res)

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
            resolve(res)
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
            resolve(res)
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
            resolve(res)
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
