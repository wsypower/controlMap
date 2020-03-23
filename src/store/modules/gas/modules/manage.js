import {
  getAllGasMacTreeData,
  getOneGasMacData
} from '@/api/gas/manage.js'

export default {
  namespaced: true,
  actions: {
    getAllGasMacTreeData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllGasMacTreeData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getOneGasMacData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getOneGasMacData(data)
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
