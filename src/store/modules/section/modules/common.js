import { getAllPeopleTreeData, getAllPeopleDataList } from '@/api/section/common.js'

export default {
  namespaced: true,
  actions: {
    getAllPeopleTreeData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllPeopleTreeData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getAllPeopleDataList(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllPeopleDataList(data)
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
