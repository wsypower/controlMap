import {
  getAllAddressData,
  getAllRecordsDataList,
  getRecordDetailData,
  getRecordPhotosData,
  getRecordLogsData
} from '@/api/records/manage.js'

export default {
  namespaced: true,
  actions: {
    getAllAddressData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllAddressData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getAllRecordsDataList(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllRecordsDataList(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getRecordDetailData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getRecordDetailData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getRecordPhotosData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getRecordPhotosData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getRecordLogsData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getRecordLogsData(data)
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
