import {
  getStatusAnalysisData,
  getRainTrendData,
  getWaterStatusAnalysisData,
  getWaterLevelTrendData,
  getDrainpumpMacStatusAnalysisData,
  getDrainpumpTrendData,
  getManholeStatusAnalysisData
} from '@/api/drainoffwater/statistical.js'

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
    getRainTrendData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getRainTrendData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getWaterStatusAnalysisData(state, data) {
      return new Promise((resolve, reject) => {
        getWaterStatusAnalysisData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getWaterLevelTrendData(state, data) {
      return new Promise((resolve, reject) => {
        getWaterLevelTrendData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getDrainpumpMacStatusAnalysisData(state, data) {
      return new Promise((resolve, reject) => {
        getDrainpumpMacStatusAnalysisData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getDrainpumpTrendData(state, data) {
      return new Promise((resolve, reject) => {
        getDrainpumpTrendData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getManholeStatusAnalysisData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getManholeStatusAnalysisData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
