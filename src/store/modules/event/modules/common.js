import {getUserInfo,getEventTypeDataList,getTeamDataList,getPeopleDataList,getPeopleTreeData} from '@/api/event/common.js'

export default {
  namespaced: true,
  actions: {
    getUserInfo(state, data){
      console.log('store',data);
      return new Promise((resolve, reject) => {
        getUserInfo(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getEventTypeDataList(state, data) {
        return new Promise((resolve, reject) => {
          getEventTypeDataList(data)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    },
    getTeamDataList(state, data) {
      return new Promise((resolve, reject) => {
        getTeamDataList(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getPeopleDataList(state, data){
      return new Promise((resolve, reject) => {
        getPeopleDataList(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getPeopleTreeData(state, data){
      return new Promise((resolve, reject) => {
        getPeopleTreeData(data)
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
