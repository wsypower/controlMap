import {getAllPeopleDataList} from '@/api/emergency/common.js'

export default {
    namespaced: true,
    actions: {
        // getAllTypeData(state,data){
        //     return new Promise((resolve, reject) =>{
        //         getAllTypeData(data)
        //             .then(res => {
        //                 resolve(res)
        //             })
        //             .catch(err => {
        //                 console.log(err)
        //                 reject(err)
        //             })
        //     })
        // },
        // getAllLevelData(state,data){
        //     return new Promise((resolve, reject) =>{
        //         getAllLevelData(data)
        //             .then(res => {
        //                 resolve(res)
        //             })
        //             .catch(err => {
        //                 console.log(err)
        //                 reject(err)
        //             })
        //     })
        // },
        getAllPeopleDataList(state,data){
            return new Promise((resolve, reject) =>{
                getAllPeopleDataList(data)
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
