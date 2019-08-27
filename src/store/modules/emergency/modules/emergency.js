import { getEventDataList,
    addNewEvent,
    deleteEvent,
    getEventYuAnInfoById,
    startYuAn} from '@/api/emergency/index.js'

export default {
    namespaced: true,
    actions: {
        getEventDataList(state,data) {
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
        addNewEvent(state,data){
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
        deleteEvent(state,data){
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
        getEventYuAnInfoById(state,data){
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

        startYuAn(state,data){
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
