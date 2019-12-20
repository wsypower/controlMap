import {
  getEventDataList,
  addNewEvent,
  deleteEvent,
  getEventYuAnInfoById,
  startYuAn,
  submitEventEvaluationMessage,
  getEvaluationListData,
  deleteEvaluation
} from '@/api/emergency/index.js'

export default {
  namespaced: true,
  actions: {
    getEventDataList(state, data) {
      // console.log('store:getEventDataList',data);
      return new Promise((resolve, reject) => {
        getEventDataList(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    addNewEvent(state, data) {
      // console.log('store:addNewEvent',data);
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
    deleteEvent(state, data) {
      // console.log('store:deleteEvent',data);
      return new Promise((resolve, reject) => {
        deleteEvent(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getEventYuAnInfoById(state, data) {
      // console.log('store:getEventYuAnInfoById',data);
      return new Promise((resolve, reject) => {
        getEventYuAnInfoById(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    startYuAn(state, data) {
      // console.log('store:startYuAn',data);
      return new Promise((resolve, reject) => {
        startYuAn(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    submitEventEvaluationMessage(state, data) {
      console.log('store:submitEventEvaluationMessage', data)
      return new Promise((resolve, reject) => {
        submitEventEvaluationMessage(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getEvaluationListData(state, data) {
      console.log('store:getEvaluationListData', data)
      return new Promise((resolve, reject) => {
        getEvaluationListData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    deleteEvaluation(state, data) {
      console.log('store:deleteEvaluation', data)
      return new Promise((resolve, reject) => {
        deleteEvaluation(data)
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
