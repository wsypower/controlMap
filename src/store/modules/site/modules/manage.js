import {
  getAllCameraTreeDataForConstructionSite
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
    }
  }
}
