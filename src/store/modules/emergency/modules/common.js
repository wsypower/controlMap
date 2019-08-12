import {getStatusDataList,getYuAnTypeDataList,getAllPeopleDataList, getReviewPeopleDataList} from '@/api/emergency/common.js'

export default {
    namespaced: true,
    actions: {
        getStatusDataList(state, data) {
            return new Promise((resolve, reject) => {
                getStatusDataList(data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        getYuAnTypeDataList(state, data) {
            return new Promise((resolve, reject) => {
                getYuAnTypeDataList(data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
      getAllPeopleDataList(state, data){
        return new Promise((resolve, reject) => {
          getAllPeopleDataList(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
      getReviewPeopleDataList(state, data){
        return new Promise((resolve, reject) => {
          getReviewPeopleDataList(data)
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
