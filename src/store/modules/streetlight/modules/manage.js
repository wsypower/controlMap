import {
  getAllLightListData,
  getOneLightMacData
} from '@/api/streetlight/manage.js'

export default {
  namespaced: true,
  actions: {
    getAllLightListData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllLightListData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getOneLightMacData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getOneLightMacData(data)
          .then(res => {
            let data = [
              {
                dayTime: '2020-03-19 07:00',
                value: 13,
              },
              {
                dayTime: '2020-03-19 07:30',
                value: 23,
              },
              {
                dayTime: '2020-03-19 08:00',
                value: 16,
              },
              {
                dayTime: '2020-03-19 08:30',
                value: 29,
              },
              {
                dayTime: '2020-03-19 09:00',
                value: 55,
              },
              {
                dayTime: '2020-03-19 09:30',
                value: 33,
              },
              {
                dayTime: '2020-03-19 10:00',
                value: 40,
              }
            ]
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    }
  }
}
