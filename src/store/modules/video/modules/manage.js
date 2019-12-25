import {
  getAllAlarmTypeDataList,
  getAllAlarmDataList,
  getCameraUrl,
  alarmNormalHandle,
  alarmReportHandle,
  getAllCameraTreeData,
  getAllCameraDataList
} from '@/api/video/manage.js'

export default {
  namespaced: true,
  actions: {
    getAllAlarmTypeDataList(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllAlarmTypeDataList(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getAllAlarmDataList(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllAlarmDataList(data)
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
    alarmNormalHandle(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        alarmNormalHandle(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    alarmReportHandle(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        alarmReportHandle(data)
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
    getAllCameraDataList(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
          getAllCameraDataList(data)
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
