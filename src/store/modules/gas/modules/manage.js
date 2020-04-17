import {
  getAllGasMacTreeData,
  getOneGasMacData,
  getGasTrendDataForOneMac
} from '@/api/gas/manage.js'

export default {
  namespaced: true,
  actions: {
    getAllGasMacTreeData(state, data) {
      return new Promise((resolve, reject) => {
        getAllGasMacTreeData(data)
          .then(res => {
            let data = {
              treeData: [
                {
                  id: 'jianche1',
                  name: '监测点1名称',
                  isLeaf: false,
                  children: [
                    {
                      id: '33092104001320015992',
                      name: '设备0001',
                      isLeaf: true,
                      online: true,
                      value: 2,
                      unit: '%',
                      x: '116.45',
                      y: '31.75'
                    },
                    {
                      id: '33092104001320010677',
                      name: '设备0002',
                      isLeaf: true,
                      online: false,
                      value: 3,
                      unit: '%',
                      x: '116.47',
                      y: '31.75'
                    },
                    {
                      id: '33092104001320010678',
                      name: '设备0003',
                      isLeaf: true,
                      online: false,
                      value: 4,
                      unit: '%',
                      x: '116.46',
                      y: '31.74'
                    },
                    {
                      id: '33092104001320010679',
                      name: '设备0004',
                      isLeaf: true,
                      online: true,
                      value: 5,
                      unit: '%',
                      x: '116.48',
                      y: '31.73'
                    }
                  ]
                },
                {
                  id: 'jiance2',
                  isLeaf: false,
                  name: '监测点2名称',
                  children: [
                    {
                      id: '33092104001320011640',
                      name: '设备0001',
                      isLeaf: true,
                      online: false,
                      value: 2,
                      unit: '%',
                      x: '116.50',
                      y: '31.75'
                    },
                    {
                      id: '33092104001320011641',
                      name: '设备0002',
                      isLeaf: true,
                      online: false,
                      value: 8,
                      unit: '%',
                      x: '116.61',
                      y: '31.76'
                    },
                    {
                      id: '33092104001320011642',
                      name: '设备0003',
                      isLeaf: true,
                      online: true,
                      value: 1,
                      unit: '%',
                      x: '116.55',
                      y: '31.66'
                    },
                    {
                      id: '33092104001320011643',
                      name: '设备0004',
                      isLeaf: true,
                      online: false,
                      value: 6,
                      unit: '%',
                      x: '116.56',
                      y: '31.49'
                    },
                    {
                      id: '33092104001320011644',
                      name: '设备0005',
                      isLeaf: true,
                      online: false,
                      value: 8,
                      unit: '%',
                      x: '116.45',
                      y: '31.78'
                    },
                    {
                      id: '33092104001320011645',
                      name: '设备0006',
                      isLeaf: true,
                      online: false,
                      value: 1,
                      unit: '%',
                      x: '116.48',
                      y: '31.75'
                    }
                  ]
                }
              ],
              total: 10
            }
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getOneGasMacData(state, data) {
      return new Promise((resolve, reject) => {
        getOneGasMacData(data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getGasTrendDataForOneMac(state, data) {
      return new Promise((resolve, reject) => {
        getGasTrendDataForOneMac(data)
          .then(res => {
            let data = [
              {
                dayTime: '2020-03-19 07:00',
                value: 6.9
              },
              {
                dayTime: '2020-03-19 07:30',
                value: 7.2
              },
              {
                dayTime: '2020-03-19 08:00',
                value: 7.2
              },
              {
                dayTime: '2020-03-19 08:30',
                value: 7.0
              },
              {
                dayTime: '2020-03-19 09:00',
                value: 6.9
              },
              {
                dayTime: '2020-03-19 09:30',
                value: 6.8
              },
              {
                dayTime: '2020-03-19 10:00',
                value: 7.0
              }
            ]
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    }
  }
}
