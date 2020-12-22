import {
  getAllWaterQMMacTreeData,
  getOneWaterQMMacData,
  getWaterQualityTrendDataForOneMac,
  getAllPressMacTreeData,
  getOnePressMacData,
  getPressTrendDataForOneMac,
  getAllFlowMacTreeData,
  getOneFlowMacData,
  getFlowTrendDataForOneMac
} from '@/api/watersupply/manage.js'

export default {
  namespaced: true,
  actions: {
    getAllWaterQMMacTreeData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllWaterQMMacTreeData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getOneWaterQMMacData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getOneWaterQMMacData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getWaterQualityTrendDataForOneMac(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getWaterQualityTrendDataForOneMac(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getAllPressMacTreeData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllPressMacTreeData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getOnePressMacData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getOnePressMacData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getPressTrendDataForOneMac(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getPressTrendDataForOneMac(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getAllFlowMacTreeData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllFlowMacTreeData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getOneFlowMacData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getOneFlowMacData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getFlowTrendDataForOneMac(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getFlowTrendDataForOneMac(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
  }
}
