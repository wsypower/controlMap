import { getStatusAnalysisData, getWaterQualityTrendData } from '@/api/watersupply/statistical.js'

export default {
  namespaced: true,
  actions: {
    getStatusAnalysisData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getStatusAnalysisData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getWaterQualityTrendData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getWaterQualityTrendData(data)
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
