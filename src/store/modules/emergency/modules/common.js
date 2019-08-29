import {getAllLevelData, getAllPeopleDataList} from '@/api/emergency/common.js'

export default {
    namespaced: true,
    actions: {
        getAllLevelData(state,data){
            return new Promise((resolve, reject) =>{
                getAllLevelData(data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
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
