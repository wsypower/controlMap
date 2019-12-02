import {
  getAlarmTypeAnalysisData,
  getHighIncidenceRoadAnalysisData,
  getHighIncidenceTimeAnalysisData
} from '@/api/video/statistical.js'

export default {
  namespaced: true,
  actions: {
    getAlarmTypeAnalysisData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAlarmTypeAnalysisData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getHighIncidenceRoadAnalysisData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getHighIncidenceRoadAnalysisData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getHighIncidenceTimeAnalysisData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getHighIncidenceTimeAnalysisData(data)
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
