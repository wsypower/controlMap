import { getStatusAnalysisData, getWaterQualityTrendData } from '@/api/watersupply/statistical.js'

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
    getWaterQualityTrendData(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getWaterQualityTrendData(data)
          .then(res => {
            let data = [
              {
                dayTime: '2020-03-16 00:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 01:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 02:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 03:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 04:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 05:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 06:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 07:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 08:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 09:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 10:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 11:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 12:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 13:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 14:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 15:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 16:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 17:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 18:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 19:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 20:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 21:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 22:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
              },
              {
                dayTime: '2020-03-16 23:00',
                phValue: 7,
                turbidityValue: 4.6,
                rcValue: 1.3
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
