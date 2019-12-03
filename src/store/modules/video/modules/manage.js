import { getAllAlarmTypeDataList, getAllAlarmDataList, alarmNormalHandle, alarmReportHandle, getAllCameraTreeData } from '@/api/video/manage.js'

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
    }
    // getCarViolateRulesDataList(state, data) {
    //   console.log('store', data)
    //   return new Promise((resolve, reject) => {
    //     getCarViolateRulesDataList(data)
    //       .then(res => {
    //         resolve(res)
    //       })
    //       .catch(err => {
    //         console.log(err)
    //         reject(err)
    //       })
    //   })
    // },
    // deleteCarViolateRules(state, data) {
    //   console.log('store', data)
    //   return new Promise((resolve, reject) => {
    //     deleteCarViolateRules(data)
    //       .then(res => {
    //         resolve(res)
    //       })
    //       .catch(err => {
    //         console.log(err)
    //         reject(err)
    //       })
    //   })
    // }
  }
}
