import { getAllCarTreeData } from '@/api/car/manage.js'

export default {
  namespaced: true,
  actions: {
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
    }
    // getUserTrailDataList(state,data){
    //     console.log('store',data);
    //     return new Promise((resolve, reject) => {
    //         getUserTrailDataList(data)
    //             .then(res => {
    //                 resolve(res)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //                 reject(err)
    //             })
    //     })
    // },
    // getTrailDetailData(state,data){
    //     console.log('store',data);
    //     return new Promise((resolve, reject) => {
    //         getTrailDetailData(data)
    //             .then(res => {
    //                 resolve(res)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //                 reject(err)
    //             })
    //     })
    // },
    // getUserWorkTimeDataList(state,data){
    //     console.log('store',data);
    //     return new Promise((resolve, reject) => {
    //         getUserWorkTimeDataList(data)
    //             .then(res => {
    //                 resolve(res)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //                 reject(err)
    //             })
    //     })
    // },
    // getUserSignDetailData(state,data){
    //     console.log('store',data);
    //     return new Promise((resolve, reject) => {
    //         getUserSignDetailData(data)
    //             .then(res => {
    //                 resolve(res)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //                 reject(err)
    //             })
    //     })
    // },
    // getUserViolateRulesDataList(state,data){
    //     console.log('store',data);
    //     return new Promise((resolve, reject) => {
    //         getUserViolateRulesDataList(data)
    //             .then(res => {
    //                 resolve(res)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //                 reject(err)
    //             })
    //     })
    // },
    // deleteUserViolateRules(state,data){
    //     console.log('store',data);
    //     return new Promise((resolve, reject) => {
    //         deleteUserViolateRules(data)
    //             .then(res => {
    //                 resolve(res)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //                 reject(err)
    //             })
    //     })
    // },
  }
}
