import {
  getStatusAnalysisData,
  getWaterQualityTrendData,
  getPressMacStatusAnalysisData,
  getPressTrendData,
  getFlowMacStatusAnalysisData,
  getFlowTrendData
} from '@/api/watersupply/statistical.js'

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
    },
    getPressMacStatusAnalysisData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getPressMacStatusAnalysisData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getPressTrendData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getPressTrendData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getFlowMacStatusAnalysisData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getFlowMacStatusAnalysisData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getFlowTrendData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getFlowTrendData(data)
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
