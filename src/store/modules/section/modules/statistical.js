import { getPeopleAnalysisData,
    getStatusAnalysisData,
    getOverstepAnalysisData,
    getPeopleTopThreeData} from '@/api/section/statistical.js'

export default {
    namespaced: true,
    actions: {
        getPeopleAnalysisData(state,data){
            console.log('store',data);
            return new Promise((resolve, reject) => {
                getPeopleAnalysisData(data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        getStatusAnalysisData(state,data){
            console.log('store',data);
            return new Promise((resolve, reject) => {
                getStatusAnalysisData(data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        getOverstepAnalysisData(state,data){
            console.log('store',data);
            return new Promise((resolve, reject) => {
                getOverstepAnalysisData(data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        getPeopleTopThreeData(state,data){
            console.log('store',data);
            return new Promise((resolve, reject) => {
                getPeopleTopThreeData(data)
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
