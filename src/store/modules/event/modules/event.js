import { getCountForHandle,
  getEventList,
  setEventToTemplate,
  deleteEventByIds,
  getTemplateEventDataList,
  getLogDataByEventId,
  getMessageByEventId,
  checkEvent,
  addNewEvent,
  updateEvent,
  addTeamPersonForNewEvent,
  submitEventToCheck,
  submitEvent} from '@/api/event/index.js'

export default {
    namespaced: true,
    actions: {
      getToHandleCountData(state,data){
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
      addNewEvent(state,data){
        return new Promise((resolve, reject) => {
          addNewEvent(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
      updateEvent(state,data){
        return new Promise((resolve, reject) => {
          updateEvent(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
      getMessageByEventId(state,data){
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
      addTeamPersonForNewEvent(state,data){
        return new Promise((resolve, reject) => {
          addTeamPersonForNewEvent(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
      getTemplateEventDataList(state,data){
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
      },
      submitEventToCheck(state,data){
        return new Promise((resolve, reject) => {
          submitEventToCheck(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
      submitEvent(state,data){
        return new Promise((resolve, reject) => {
          submitEvent(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
    }
}
