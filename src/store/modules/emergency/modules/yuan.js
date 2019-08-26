import {getYuAnDataList,getYuAnInfoById,addNewYuAn,deleteYuAn,getResourceDataList} from '@/api/emergency/yuan.js'

export default {
    namespaced: true,
    actions: {

        getYuAnDataList(state,data){
            return new Promise((resolve, reject) =>{
                getYuAnDataList(data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        getYuAnInfoById(state,data){
            return new Promise((resolve, reject) =>{
                getYuAnInfoById(data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        addNewYuAn(state,data){
            return new Promise((resolve, reject) =>{
                addNewYuAn(data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        deleteYuAn(state,data){
            return new Promise((resolve, reject) =>{
                deleteYuAn(data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },

        getResourceDataList(state,data){
            return new Promise((resolve, reject) =>{
                getResourceDataList(data)
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
