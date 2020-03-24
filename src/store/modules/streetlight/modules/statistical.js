import { getStatusAnalysisData, getPowerConsumptionTrendData } from '@/api/streetlight/statistical.js'

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
    getPowerConsumptionTrendData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getPowerConsumptionTrendData(data)
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
