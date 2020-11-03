import { getDeviceDataList } from '@/api/intelligence/index.js'

export default {
    namespaced: true,
    actions: {
        getDeviceDataList(state,data) {
            console.log('store',data);
            return new Promise((resolve, reject) => {
                getDeviceDataList(data)
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
