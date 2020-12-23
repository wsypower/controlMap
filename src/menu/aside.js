/*
 * @Author: mo xuejuan
 * @Date: 2020-03-18 10:36
 */
// 菜单 侧边栏
export default [
  {
    path: '/drainoffwater',
    title: '排水',
    icon: 'menu-drainoffwater',
    active: false,
    role: ['admin'],
    hash: ['drainoffwater', 'watersupply', 'gas']
  },
  {
    path: '/watersupply',
    title: '供水',
    icon: 'menu-watersupply',
    active: false,
    role: ['admin'],
    hash: ['drainoffwater', 'watersupply', 'gas']
  },
  {
    path: '/gas',
    title: '燃气',
    icon: 'menu-gas',
    active: false,
    role: ['admin'],
    hash: ['drainoffwater', 'watersupply', 'gas']
  },
  {
    path: '/streetlight',
    title: '智慧路灯',
    icon: 'menu-streetlight',
    active: false,
    role: ['admin'],
    hash: ['streetlight']
  },
  {
    path: '/sso',
    title: 'sso',
    icon: 'menu-streetlight',
    active: false,
    role: ['admin'],
    hash: ['streetlight']
  },
  {
    path: '/bridge',
    title: '桥梁监控',
    icon: 'menu-bridge',
    active: false,
    role: ['admin'],
    hash: ['bridge']
  },
  {
    path: '/site',
    title: '工地监控',
    icon: 'menu-site',
    active: false,
    role: ['admin'],
    hash: ['site']
  },
  {
    path: '/car',
    title: '车辆监控',
    icon: 'menu-car',
    active: false,
    role: ['admin'],
    hash: ['site']
  },
  {
    path: '/streetVideo',
    title: '街道摄像头监控',
    icon: 'menu-street',
    active: false,
    role: ['admin'],
    hash: ['streetVideo']
  }
]
