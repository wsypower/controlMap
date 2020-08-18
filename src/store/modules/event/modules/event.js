import { getCountForHandle,
  getEventList,
  setEventToTemplate,
  deleteEventByIds,
  getTemplateEventDataList,
  getLogDataByEventId,
  getMessageByEventId,
  checkEvent} from '@/api/event/index.js'

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
      getMessageByEventId(state,data){
        console.log('store',data);
        return new Promise((resolve, reject) => {
          getMessageByEventId(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
      deleteEventByIds(state,data){
        console.log('store',data);
        return new Promise((resolve, reject) => {
          deleteEventByIds(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
      setEventToTemplate(state,data){
        console.log('store',data);
        return new Promise((resolve, reject) => {
          setEventToTemplate(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
      checkEvent(state,data){
        console.log('store',data);
        return new Promise((resolve, reject) => {
          checkEvent(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
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
