import { getCountForMyToCheck,
  getEmergencyYuAnList,
  addNewEmergencyYuAn,
  getEmergencyYuAnById,
  setEmergencyYuAnToPass,
  setEmergencyYuAnToBack,
  deleteEmergencyYuAn,
  setEmergencyYuAnToTemplate,
  setEmergencyYuAnToFinishReview,
  getTemplateYuAnDataList} from '@/api/emergency/index.js'

export default {
    namespaced: true,
    actions: {
      getCountForMyToCheck(state,data){
        console.log('store',data);
        return new Promise((resolve, reject) => {
          getCountForMyToCheck(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
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
        console.log('store',data);
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
      },
      getEmergencyYuAnById(state,data){
        console.log('store',data);
        return new Promise((resolve, reject) => {
          getEmergencyYuAnById(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
      setEmergencyYuAnToPass(state,data){
        console.log('store',data);
        return new Promise((resolve, reject) => {
          setEmergencyYuAnToPass(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
      setEmergencyYuAnToBack(state,data){
        console.log('store',data);
        return new Promise((resolve, reject) => {
          setEmergencyYuAnToBack(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
      deleteEmergencyYuAn(state,data){
        console.log('store',data);
        return new Promise((resolve, reject) => {
          deleteEmergencyYuAn(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
      setEmergencyYuAnToTemplate(state,data){
        console.log('store',data);
        return new Promise((resolve, reject) => {
          setEmergencyYuAnToTemplate(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
      setEmergencyYuAnToFinishReview(state,data){
        console.log('store',data);
        return new Promise((resolve, reject) => {
          setEmergencyYuAnToFinishReview(data)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      },
      getTemplateYuAnDataList(state,data){
        console.log('store',data);
        return new Promise((resolve, reject) => {
          getTemplateYuAnDataList(data)
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
