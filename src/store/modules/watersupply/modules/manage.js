import {
  getAllWaterQMMacTreeData,
  getOneWaterQMMacData,
  getWaterQualityTrendDataForOneMac
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
    }
  }
}
