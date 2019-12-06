import {
  getShiBuJianAnalysisData,
  getRecordsStatisticalAnalysisData,
  getRecordsSourceAnalysisData,
  getHighIncidenceTOP5Data,
  getRecordsDayAnalysisData
} from '@/api/records/statistical.js'

export default {
  namespaced: true,
  actions: {
    getShiBuJianAnalysisData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getShiBuJianAnalysisData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getRecordsStatisticalAnalysisData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getRecordsStatisticalAnalysisData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getRecordsSourceAnalysisData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getRecordsSourceAnalysisData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getHighIncidenceTOP5Data(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getHighIncidenceTOP5Data(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getRecordsDayAnalysisData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getRecordsDayAnalysisData(data)
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
