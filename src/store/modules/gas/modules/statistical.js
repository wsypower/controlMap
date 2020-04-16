import { getStatusAnalysisData, getGasTrendData } from '@/api/gas/statistical.js'

export default {
  namespaced: true,
  actions: {
    getStatusAnalysisData(state, data) {
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
    getGasTrendData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getGasTrendData(data)
          .then(res => {
            let data1 = [
              {
                dayTime: '2020-03-16 00:00',
                value: 40
              },
              {
                dayTime: '2020-03-16 01:00',
                value: 32
              },
              {
                dayTime: '2020-03-16 02:00',
                value: 21
              },
              {
                dayTime: '2020-03-16 03:00',
                value: 10
              },
              {
                dayTime: '2020-03-16 04:00',
                value: 16
              },
              {
                dayTime: '2020-03-16 05:00',
                value: 12
              },
              {
                dayTime: '2020-03-16 06:00',
                value: 40
              },
              {
                dayTime: '2020-03-16 07:00',
                value: 32
              },
              {
                dayTime: '2020-03-16 08:00',
                value: 21
              },
              {
                dayTime: '2020-03-16 09:00',
                value: 10
              },
              {
                dayTime: '2020-03-16 10:00',
                value: 16
              },
              {
                dayTime: '2020-03-16 11:00',
                value: 12
              },
              {
                dayTime: '2020-03-16 12:00',
                value: 40
              },
              {
                dayTime: '2020-03-16 13:00',
                value: 32
              },
              {
                dayTime: '2020-03-16 14:00',
                value: 21
              },
              {
                dayTime: '2020-03-16 15:00',
                value: 10
              },
              {
                dayTime: '2020-03-16 16:00',
                value: 16
              },
              {
                dayTime: '2020-03-16 17:00',
                value: 12
              },
              {
                dayTime: '2020-03-16 18:00',
                value: 40
              },
              {
                dayTime: '2020-03-16 19:00',
                value: 32
              },
              {
                dayTime: '2020-03-16 20:00',
                value: 21
              },
              {
                dayTime: '2020-03-16 21:00',
                value: 10
              },
              {
                dayTime: '2020-03-16 22:00',
                value: 16
              },
              {
                dayTime: '2020-03-16 23:00',
                value: 12
              }
            ]
            let data2 = [
              {
                dayTime: '2020-03-17 00:00',
                value: 40
              },
              {
                dayTime: '2020-03-17 01:00',
                value: 32
              },
              {
                dayTime: '2020-03-17 02:00',
                value: 21
              },
              {
                dayTime: '2020-03-17 03:00',
                value: 10
              },
              {
                dayTime: '2020-03-17 04:00',
                value: 16
              },
              {
                dayTime: '2020-03-17 05:00',
                value: 12
              },
              {
                dayTime: '2020-03-17 06:00',
                value: 40
              },
              {
                dayTime: '2020-03-17 07:00',
                value: 32
              },
              {
                dayTime: '2020-03-17 08:00',
                value: 33
              },
              {
                dayTime: '2020-03-17 09:00',
                value: 10
              },
              {
                dayTime: '2020-03-17 10:00',
                value: 16
              },
              {
                dayTime: '2020-03-17 11:00',
                value: 12
              },
              {
                dayTime: '2020-03-17 12:00',
                value: 40
              },
              {
                dayTime: '2020-03-17 13:00',
                value: 32
              },
              {
                dayTime: '2020-03-17 14:00',
                value: 40
              },
              {
                dayTime: '2020-03-17 15:00',
                value: 10
              },
              {
                dayTime: '2020-03-17 16:00',
                value: 16
              },
              {
                dayTime: '2020-03-17 17:00',
                value: 12
              },
              {
                dayTime: '2020-03-17 18:00',
                value: 40
              },
              {
                dayTime: '2020-03-17 19:00',
                value: 7
              },
              {
                dayTime: '2020-03-17 20:00',
                value: 21
              },
              {
                dayTime: '2020-03-17 21:00',
                value: 10
              },
              {
                dayTime: '2020-03-17 22:00',
                value: 16
              },
              {
                dayTime: '2020-03-17 23:00',
                value: 12
              }
            ]
            let data3 = [
              {
                dayTime: '2020-03-18 00:00',
                value: 40
              },
              {
                dayTime: '2020-03-18 01:00',
                value: 32
              },
              {
                dayTime: '2020-03-18 02:00',
                value: 21
              },
              {
                dayTime: '2020-03-18 03:00',
                value: 10
              },
              {
                dayTime: '2020-03-18 04:00',
                value: 16
              },
              {
                dayTime: '2020-03-18 05:00',
                value: 12
              },
              {
                dayTime: '2020-03-18 06:00',
                value: 40
              },
              {
                dayTime: '2020-03-18 07:00',
                value: 32
              },
              {
                dayTime: '2020-03-18 08:00',
                value: 21
              },
              {
                dayTime: '2020-03-18 09:00',
                value: 10
              },
              {
                dayTime: '2020-03-18 10:00',
                value: 16
              },
              {
                dayTime: '2020-03-18 11:00',
                value: 12
              },
              {
                dayTime: '2020-03-18 12:00',
                value: 40
              },
              {
                dayTime: '2020-03-18 13:00',
                value: 32
              },
              {
                dayTime: '2020-03-18 14:00',
                value: 21
              },
              {
                dayTime: '2020-03-18 15:00',
                value: 10
              },
              {
                dayTime: '2020-03-18 16:00',
                value: 16
              },
              {
                dayTime: '2020-03-18 17:00',
                value: 12
              },
              {
                dayTime: '2020-03-18 18:00',
                value: 40
              },
              {
                dayTime: '2020-03-18 19:00',
                value: 32
              },
              {
                dayTime: '2020-03-18 20:00',
                value: 21
              },
              {
                dayTime: '2020-03-18 21:00',
                value: 10
              },
              {
                dayTime: '2020-03-18 22:00',
                value: 16
              },
              {
                dayTime: '2020-03-18 23:00',
                value: 12
              }
            ]
            let data4 = [
              {
                dayTime: '2020-03-19 00:00',
                value: 40
              },
              {
                dayTime: '2020-03-19 01:00',
                value: 32
              },
              {
                dayTime: '2020-03-19 02:00',
                value: 21
              },
              {
                dayTime: '2020-03-19 03:00',
                value: 10
              },
              {
                dayTime: '2020-03-19 04:00',
                value: 16
              },
              {
                dayTime: '2020-03-19 05:00',
                value: 12
              },
              {
                dayTime: '2020-03-19 06:00',
                value: 40
              },
              {
                dayTime: '2020-03-19 07:00',
                value: 32
              },
              {
                dayTime: '2020-03-19 08:00',
                value: 8
              },
              {
                dayTime: '2020-03-19 09:00',
                value: 10
              },
              {
                dayTime: '2020-03-19 10:00',
                value: 16
              },
              {
                dayTime: '2020-03-19 11:00',
                value: 12
              },
              {
                dayTime: '2020-03-19 12:00',
                value: 40
              },
              {
                dayTime: '2020-03-19 13:00',
                value: 32
              },
              {
                dayTime: '2020-03-19 14:00',
                value: 21
              },
              {
                dayTime: '2020-03-19 15:00',
                value: 10
              },
              {
                dayTime: '2020-03-19 16:00',
                value: 16
              },
              {
                dayTime: '2020-03-19 17:00',
                value: 12
              },
              {
                dayTime: '2020-03-19 18:00',
                value: 40
              },
              {
                dayTime: '2020-03-19 19:00',
                value: 32
              }
            ]
            let data = [...data1, ...data2, ...data3, ...data4]
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
