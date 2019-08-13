import { getMonitorInfoById } from '@/api/monitor/index.js'

export default {
  namespaced: true,
  actions: {
    getMonitorInfoById(state, data) {
      console.log('store', data);
      return new Promise((resolve, reject) => {
        getMonitorInfoById(data)
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
