import { getEmergencyYuAnList,addNewEmergencyYuAn } from '@/api/emergency/index.js'

export default {
    namespaced: true,
    actions: {
        /**
         * @description
         *
         */
        getEmergencyYuAnDataList(state,data) {
            console.log('store',data);
            return new Promise((resolve, reject) => {
                getEmergencyYuAnList(data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        addNewEmergencyYuAn(state,data){
            console.log('store:addNewEmergencyYuAn',data);
            return new Promise((resolve, reject) => {
                addNewEmergencyYuAn(data)
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
