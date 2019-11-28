import { getCarTypeAnalysisData, getCarGroupAnalysisData, getCarWorkInfoData, getBreakTypeAnalysisData } from '@/api/car/statistical.js'

export default {
    namespaced: true,
    actions: {
        getCarTypeAnalysisData(state,data){
            console.log('store',data);
            return new Promise((resolve, reject) => {
                getCarTypeAnalysisData(data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        getCarGroupAnalysisData(state,data){
            console.log('store',data);
            return new Promise((resolve, reject) => {
                getCarGroupAnalysisData(data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        getCarWorkInfoData(state,data){
            console.log('store',data);
            return new Promise((resolve, reject) => {
                getCarWorkInfoData(data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        getBreakTypeAnalysisData(state,data){
            console.log('store',data);
            return new Promise((resolve, reject) => {
                getBreakTypeAnalysisData(data)
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
