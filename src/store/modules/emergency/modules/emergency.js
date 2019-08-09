import { getEmergencyYuAnList} from '@/api/emergency/index.js'

export default {
    namespaced: true,
    actions: {

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

    }
}
