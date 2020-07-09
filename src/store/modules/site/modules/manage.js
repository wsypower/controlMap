import {
  getAllCameraTreeDataForConstructionSite,
  getAllCameraTreeDataForCar,
  getCameraByCarId
} from '@/api/site/manage.js'

export default {
  namespaced: true,
  actions: {
    getAllCameraTreeDataForConstructionSite(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllCameraTreeDataForConstructionSite(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getAllCameraTreeDataForCar(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllCameraTreeDataForCar(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
      })
    },
    getCameraByCarId(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getCameraByCarId(data)
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
