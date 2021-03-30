/*
 * @Author: wei.yafei
 * @Date: 2019-06-14 15:44:26
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-07-05 19:24:54
 */
// 菜单 侧边栏
export default [
  {
    path: '/section',
    title: '人员管控',
    icon: 'menu-section',
    active: false,
    role: ['admin']
  },
  {
    path: '/car',
    title: '车辆管控',
    icon: 'menu-car',
    active: false,
    role: ['admin']
  },
  {
    path: '/records',
    title: '案卷',
    icon: 'menu-records',
    active: false,
    role: ['admin']
  },
  {
    path: '/video',
    title: '视频',
    icon: 'menu-video',
    active: false,
    role: ['admin']
  },
  {
    path: '/zcc',
    title: '早餐摊点',
    icon: 'menu-zcc',
    active: false,
    role: ['admin']
  }
  // {
  //   path: '/special',
  //   title: '专题服务',
  //   icon: 'menu-special',
  //   active: false,
  //   role: ['admin']
  // },
  // {
  //     path: '/manhole',
  //     title: '智慧窨井盖',
  //     icon: 'manhole',
  //     active: false,
  //     role: ['admin', 'super_editor']
  // },{
  //     path: '/dustbin',
  //     title: '智慧垃圾桶',
  //     icon: 'dustbin',
  //     active: false,
  //     role: ['admin', 'super_editor']
  // },{
  //     path: '/water',
  //     title: '智慧水位',
  //     icon: 'waterl',
  //     active: false,
  //     role: ['admin', 'super_editor']
  // },
  // {
  //   path: '/emergency',
  //   title: '应急指挥',
  //   icon: 'menu-emergency',
  //   active: false,
  //   role: ['admin', 'super_editor']
  // }
]
