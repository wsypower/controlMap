import {
  getAllCameraTreeData,
  getCameraUrl,
  getAllRainMacTreeData,
  getOneRainMacData,
  getAllWaterLevelMacTreeData,
  getOneWaterLevelMacData,
  getDeviceDataList
} from '@/api/drainoffwater/manage.js'

export default {
  namespaced: true,
  actions: {
    getAllCameraTreeData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllCameraTreeData(data)
          .then(res => {
            resolve(res)
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
      console.log('store', data)
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
    getDeviceDataList(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getDeviceDataList(data)
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
