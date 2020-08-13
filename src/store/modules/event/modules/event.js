import { getCountForHandle,
  getEventList,
  getTemplateEventDataList,
  getLogDataByEventId} from '@/api/event/index.js'

export default {
    namespaced: true,
    actions: {
      getToHandleCountData(state,data){
        console.log('store',data);
        return new Promise((resolve, reject) => {
          getCountForHandle(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
      getEventList(state,data) {
          console.log('store',data);
          return new Promise((resolve, reject) => {
              getEventList(data)
                  .then(res => {
                      resolve(res)
                  })
                  .catch(err => {
                      console.log(err)
                      reject(err)
                  })
          })
      },
      // addNewEmergencyYuAn(state,data){
      //   console.log('store',data);
      //   return new Promise((resolve, reject) => {
      //     addNewEmergencyYuAn(data)
      //       .then(res => {
      //         resolve(res)
      //       })
      //       .catch(err => {
      //         console.log(err)
      //         reject(err)
      //       })
      //   })
      // },
      // getEmergencyYuAnById(state,data){
      //   console.log('store',data);
      //   return new Promise((resolve, reject) => {
      //     getEmergencyYuAnById(data)
      //       .then(res => {
      //         resolve(res)
      //       })
      //       .catch(err => {
      //         console.log(err)
      //         reject(err)
      //       })
      //   })
      // },
      // setEmergencyYuAnToPass(state,data){
      //   console.log('store',data);
      //   return new Promise((resolve, reject) => {
      //     setEmergencyYuAnToPass(data)
      //       .then(res => {
      //         resolve(res)
      //       })
      //       .catch(err => {
      //         console.log(err)
      //         reject(err)
      //       })
      //   })
      // },
      // setEmergencyYuAnToBack(state,data){
      //   console.log('store',data);
      //   return new Promise((resolve, reject) => {
      //     setEmergencyYuAnToBack(data)
      //       .then(res => {
      //         resolve(res)
      //       })
      //       .catch(err => {
      //         console.log(err)
      //         reject(err)
      //       })
      //   })
      // },
      // deleteEmergencyYuAn(state,data){
      //   console.log('store',data);
      //   return new Promise((resolve, reject) => {
      //     deleteEmergencyYuAn(data)
      //       .then(res => {
      //         resolve(res)
      //       })
      //       .catch(err => {
      //         console.log(err)
      //         reject(err)
      //       })
      //   })
      // },
      // setEmergencyYuAnToTemplate(state,data){
      //   console.log('store',data);
      //   return new Promise((resolve, reject) => {
      //     setEmergencyYuAnToTemplate(data)
      //       .then(res => {
      //         resolve(res)
      //       })
      //       .catch(err => {
      //         console.log(err)
      //         reject(err)
      //       })
      //   })
      // },
      // setEmergencyYuAnToFinishReview(state,data){
      //   console.log('store',data);
      //   return new Promise((resolve, reject) => {
      //     setEmergencyYuAnToFinishReview(data)
      //       .then(res => {
      //         resolve(res)
      //       })
      //       .catch(err => {
      //         console.log(err)
      //         reject(err)
      //       })
      //   })
      // },
      getTemplateEventDataList(state,data){
        console.log('store',data);
        return new Promise((resolve, reject) => {
          getTemplateEventDataList(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
      getLogDataByEventId(state,data){
        console.log('store',data);
        return new Promise((resolve, reject) => {
          getLogDataByEventId(data)
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
