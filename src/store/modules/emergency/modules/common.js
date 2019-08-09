import {getStatusDataList,getYuAnTypeDataList } from '@/api/emergency/common.js'

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
        }
    }
}
