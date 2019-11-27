import {
  getAllCarDataList,
  getAllCarTreeData,
  getCarTrailDataList,
  getTrailDetailData,
  getCarViolateRulesDataList,
  deleteCarViolateRules,
  getAllCarCompanyDataList
} from '@/api/car/manage.js'

export default {
  namespaced: true,
  actions: {
    getAllCarDataList(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllCarDataList(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getAllCarTreeData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllCarTreeData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getCarTrailDataList(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getCarTrailDataList(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getTrailDetailData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getTrailDetailData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getAllCarCompanyDataList(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllCarCompanyDataList(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getCarViolateRulesDataList(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getCarViolateRulesDataList(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    deleteCarViolateRules(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        deleteCarViolateRules(data)
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
