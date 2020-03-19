import {
  getStatusAnalysisData,
  getRainTrendData
} from '@/api/drainoffwater/statistical.js'

export default {
  namespaced: true,
  actions: {
    getStatusAnalysisData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getStatusAnalysisData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getRainTrendData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getRainTrendData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    // getPeopleTopThreeData(state, data) {
    //   console.log('store', data)
    //   return new Promise((resolve, reject) => {
    //     getPeopleTopThreeData(data)
    //       .then(res => {
    //         resolve(res)
    //       })
    //       .catch(err => {
    //         console.log(err)
    //         reject(err)
    //       })
    //   })
    // }
  }
}
