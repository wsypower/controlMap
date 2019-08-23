import { getEventDataList } from '@/api/emergency/index.js'

export default {
    namespaced: true,
    actions: {
        getEventDataList(state,data) {
            console.log('store',data);
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
        // addNewEmergencyYuAn(state,data){
        //     console.log('store:addNewEmergencyYuAn',data);
        //     return new Promise((resolve, reject) => {
        //         addNewEmergencyYuAn(data)
        //             .then(res => {
        //                 resolve(res)
        //             })
        //             .catch(err => {
        //                 console.log(err)
        //                 reject(err)
        //             })
        //     })
        // },
        // deleteEmergencyYuAn(state,data){
        //     console.log('store:deleteEmergencyYuAn',data);
        //     return new Promise((resolve, reject) => {
        //         deleteEmergencyYuAn(data)
        //             .then(res => {
        //                 resolve(res)
        //             })
        //             .catch(err => {
        //                 console.log(err)
        //                 reject(err)
        //             })
        //     })
        // },
        // getAllEmergencyPeople(state,data){
        //     console.log('store:getAllEmergencyPeople',data);
        //     return new Promise((resolve, reject) => {
        //         getAllEmergencyPeople(data)
        //             .then(res => {
        //                 resolve(res)
        //             })
        //             .catch(err => {
        //                 console.log(err)
        //                 reject(err)
        //             })
        //     })
        // },
        // getPersonInfo(state,data){
        //     console.log('store:getPersonInfo',data);
        //     return new Promise((resolve, reject) => {
        //         getPersonInfo(data)
        //             .then(res => {
        //                 resolve(res)
        //             })
        //             .catch(err => {
        //                 console.log(err)
        //                 reject(err)
        //             })
        //     })
        // }
    }
}
