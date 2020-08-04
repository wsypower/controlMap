import {
  getAllCameraTreeData
} from '@/api/video/manage.js'

export default {
  namespaced: true,
  actions: {
    getAllCameraTreeData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllCameraTreeData(data)
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
