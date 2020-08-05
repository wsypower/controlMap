import {
  getAllAddressListTreeData,
  getAllPersonListData
} from '@/api/address/list.js'

export default {
  namespaced: true,
  actions: {
    getAllAddressListTreeData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllAddressListTreeData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getAllPersonListData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllPersonListData(data)
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
