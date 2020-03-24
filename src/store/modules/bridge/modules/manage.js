import {
  getAllCameraTreeDataForBridge,
  getCameraUrl
} from '@/api/bridge/manage.js'

export default {
  namespaced: true,
  actions: {
    getAllCameraTreeDataForBridge(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllCameraTreeDataForBridge(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getCameraUrl(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getCameraUrl(data)
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
