import {
  getAllGasMacTreeData,
  getOneGasMacData,
  getGasTrendDataForOneMac
} from '@/api/gas/manage.js'

export default {
  namespaced: true,
  actions: {
    getAllGasMacTreeData(state, data) {
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
    },
    getGasTrendDataForOneMac(state, data) {
      return new Promise((resolve, reject) => {
        getGasTrendDataForOneMac(data)
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
