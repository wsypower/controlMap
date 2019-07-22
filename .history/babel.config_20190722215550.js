/*  
如果该依赖交付 ES5 代码，但使用了 ES6+
特性且没有显式地列出需要的 polyfill(例如 Vuetify)
请使用 useBuiltIns: 'entry' 然后在入口文件添加
import '@babel/polyfill'。这会根据 browserslist
目标导入所有 polyfill，这样你就不用再担心依赖的 polyfill
问题了，但是因为包含了一些没有用到的 polyfill 所以最终的包
大小可能会增加。
 */
module.exports = {
  presets: [
    '@vue/app',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry'
      }
    ],
    ['@vue/babel-preset-jsx',
        {
            "injectH": false
        }]
  ]
}
