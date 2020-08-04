/*
 * @Author: wei.yafei
 * @Date: 2019-06-14 15:44:26
 * @Last Modified by: wei.yafei 
 * @Last Modified time: 2019-08-13 14:58:54
 */
// 菜单 侧边栏
export default [
  // {
  //   path: '/section',
  //   title: '人员管控',
  //   icon: 'menu-section',
  //   active: false,
  //   role: ['admin']
  // },
  // {
  //   path: '/car',
  //   title: '车辆管控',
  //   icon: 'menu-car',
  //   active: false,
  //   role: ['admin']
  // },
  {
    path: '/records',
    title: '案卷',
    icon: 'menu-records',
    active: true,
    role: ['admin']
  },
  // {
  //   path: '/special',
  //   title: '专题服务',
  //   icon: 'menu-special',
  //   active: false,
  //   role: ['admin']
  // },
  {
    // path: '/emergency/456/new',
    path: '/emergency',
    title: '应急指挥',
    icon: 'menu-emergency',
    active: false,
    role: ['admin', 'super_editor']
  },
  {
    path: '/video',
    title: '视频',
    icon: 'menu-video',
    active: false,
    role: ['admin']
  },
]
