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
            // let rs = {
            //   treeData: [
            //     {
            //       id: 'testStandardId',
            //       name: '高空瞭望',
            //       isLeaf: false,
            //       children: [
            //         {
            //           id: '33092104001320015992',
            //           name: '六安市第六中学',
            //           videoUrl: 'http://117.71.25.18:81/pag/117.71.25.18/7302/116458/0/SUB/TCP/live.m3u8',
            //           isLeaf: true,
            //           x: '116.45',
            //           y: '31.75'
            //         },
            //         {
            //           id: '33092104001320010677',
            //           name: '六安市环卫处',
            //           videoUrl: '',
            //           isLeaf: true,
            //           x: '116.46',
            //           y: '31.74'
            //         },
            //         {
            //           id: '33092104001320015002',
            //           name: '裕安酒店',
            //           videoUrl: '',
            //           isLeaf: true,
            //           x: '116.48',
            //           y: '31.73'
            //         }
            //       ]
            //     },
            //     {
            //       id: 'testStandardId2',
            //       name: '公园广场',
            //       isLeaf: false,
            //       children: [
            //         {
            //           id: '33092104001320013870',
            //           name: '六安市林业局',
            //           videoUrl: '',
            //           isLeaf: true,
            //           x: '116.51',
            //           y: '31.73'
            //         },
            //         {
            //           id: '33092104001320017369',
            //           name: '东城国际大厦',
            //           videoUrl: '',
            //           isLeaf: true,
            //           x: '116.61',
            //           y: '31.76'
            //         }
            //       ]
            //     }
            //   ],
            //   total: 5
            // }
            resolve(res)
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
