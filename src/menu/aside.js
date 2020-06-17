/*
 * @Author: mo xuejuan
 * @Date: 2020-03-18 10:36
 */
// 菜单 侧边栏
export default [
  {
    path: '/drainoffwater',
    title: '排水监测',
    icon: 'menu-drainoffwater',
    active: false,
    role: ['admin'],
    hash: ['drainoffwater']
  },
  {
    path: '/watersupply',
    title: '供水监测',
    icon: 'menu-watersupply',
    active: false,
    role: ['admin'],
    hash: ['drainoffwater']
  },
  {
    path: '/gas',
    title: '燃气监测',
    icon: 'menu-gas',
    active: false,
    role: ['admin'],
    hash: ['drainoffwater']
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
  }
]
