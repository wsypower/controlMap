import {
  getCountyList,
  getAllRainMacTreeData,
  getOneRainMacData,
  getRainfallTrendDataForOneMac,
  getAllWatchPlaceData,
  getAllWaterLevelMacTreeData,
  getOneWaterLevelMacData,
  getWaterLevelTrendDataForOneMac,
  getAllDrainpumpMacTreeData,
  getOneDrainpumpMacData,
  getDrainpumpTrendDataForOneMac,
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
    getAllDrainpumpMacTreeData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllDrainpumpMacTreeData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getOneDrainpumpMacData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getOneDrainpumpMacData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getDrainpumpTrendDataForOneMac(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getDrainpumpTrendDataForOneMac(data)
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
