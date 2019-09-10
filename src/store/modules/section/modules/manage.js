import { getUserWorkInfoData, getUserTrailDataList, getTrailDetailData } from '@/api/section/manage.js'

export default {
    namespaced: true,
    actions: {
        getUserWorkInfoData(state,data){
            console.log('store',data);
            return new Promise((resolve, reject) => {
                getUserWorkInfoData(data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        getUserTrailDataList(state,data){
            console.log('store',data);
            return new Promise((resolve, reject) => {
                getUserTrailDataList(data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        getTrailDetailData(state,data){
            console.log('store',data);
            return new Promise((resolve, reject) => {
                getTrailDetailData(data)
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
