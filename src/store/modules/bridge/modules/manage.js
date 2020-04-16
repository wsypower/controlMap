import {
  getAllCameraTreeDataForBridge,
  getCameraUrl
} from '@/api/bridge/manage.js'

export default {
  namespaced: true,
  actions: {
    getAllCameraTreeDataForBridge(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getAllCameraTreeDataForBridge(data)
          .then(res => {
            let rs = {
              treeData: [
                {
                  id: 'testStandardId',
                  name: '高空瞭望',
                  isLeaf: false,
                  children: [
                    {
                      id: '33092104001320015992',
                      name: '三江购物-球',
                      videoUrl: 'http://117.71.25.18:81/pag/117.71.25.18/7302/116458/0/SUB/TCP/live.m3u8',
                      isLeaf: true,
                      x: '122.202261',
                      y: '30.247886'
                    },
                    {
                      id: '33092104001320010677',
                      name: '三江购物-全景',
                      videoUrl: '',
                      isLeaf: true,
                      x: '122.202261',
                      y: '30.247886'
                    },
                    {
                      id: '33092104001320015002',
                      name: '新区广电大楼楼顶-球',
                      videoUrl: '',
                      isLeaf: true,
                      x: '122.218019',
                      y: '30.265587'
                    }
                  ]
                },
                {
                  id: 'testStandardId2',
                  name: '公园广场',
                  isLeaf: false,
                  children: [
                    {
                      id: '33092104001320013870',
                      name: '蓬莱公园铁塔-球',
                      videoUrl: '',
                      isLeaf: true,
                      x: '122.208213',
                      y: '30.245140'
                    },
                    {
                      id: '33092104001320017369',
                      name: '蓬莱公园铁塔-全景',
                      videoUrl: '',
                      isLeaf: true,
                      x: '122.208213',
                      y: '30.245140'
                    }
                  ]
                }
              ],
              total: 5
            }
            resolve(rs)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getCameraUrl(state, data) {
      console.log('store', data)
      return new Promise((resolve, reject) => {
        getCameraUrl(data)
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
