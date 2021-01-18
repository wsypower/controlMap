import {
  getAllLightListData,
  getOneLightMacData
} from '@/api/streetlight/manage.js'

export default {
  namespaced: true,
  actions: {
    getAllLightListData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllLightListData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getOneLightMacData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getOneLightMacData(data)
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
