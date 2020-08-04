/*=============================================
=                 mock Server                 =
=============================================*/

import Mock from 'mockjs'
// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
if (process.env.NODE_ENV !== 'production') {
  // 使用同步加载依赖
  // 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
  require('./services/user')
  require('./services/add')
  require('./services/common')
  require('./services/emergencyDataList')
  require('./services/video')
  Mock.setup({
    timeout: 800 // setter delay time
  })
}
