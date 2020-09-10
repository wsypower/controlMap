import Viewer from 'viewerjs'
import { debounce } from 'throttle-debounce'
const install = (Vue, { name = 'viewer', debug = false }) => {
  function createViewer(el, options, rebuild = false) {
    // nextTick执行，否则可能漏掉未渲染完的子元素
    // nextTick => 本质是异步 setTimeout(nextTick,0,data)
    Vue.nextTick(() => {
      console.log(11)
      // el[`$${name}`] => [number,HTMLElement] viewer 默认的数组队列, Viewer-js 获取HTMLImageElement.src
      if (rebuild || !el[`$${name}`]) {
        destroyViewer(el)
        console.log(Object.prototype.toString.call(el))
        el.dataset.show = false
        //  el对象扩展生viewer属性
        //  HTMLDivElement + HTMLImageElement =>HTMLElement => Element =>Node <=> EventTarget(接收事件的对象实现的接口)

        // TODO: 1. 除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。
        // TODO: 2. el[`$${name}`] => $Viewer => 实例 内注册 HTMLImageElement.src的增删改查  （ 注：viewer el内Ele数组 变化 ）

        el[`$${name}`] = new Viewer(el, options)
        el.addEventListener('hidden', function() {
          console.log('出来吧你神龙')
          // > true
        })
        log('viewer created')
      } else {
        // 当源图像更改（添加，删除或排序）时，更新查看器实例。
        el[`$${name}`].update()
        log('viewer updated')
      }
    })
  }

  function createObserver(el, options, debouncedCreateViewer, rebuild) {
    console.log('开始监听')
    destroyObserver(el)
    const MutationObserver = global.MutationObserver || global.WebKitMutationObserver || global.MozMutationObserver
    if (!MutationObserver) {
      log('observer not supported')
      return
    }
    // MutationObserver 是一个可以监听DOM结构变化的接口。
    el['$viewerMutationObserver'] = new MutationObserver(function(mutations) {
      console.log('mutations', mutations)
      mutations.forEach(function(mutation) {
        log('viewer mutation:' + mutation.type)
        debouncedCreateViewer(el, options, rebuild)
      })
    })
    const config = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    }
    el['$viewerMutationObserver'].observe(el, config)
    console.log('el11111111111111', el)
    console.log('viewerMutationObserver', el['$viewerMutationObserver'])
    log('observer created')
  }

  function createWatcher(el, { expression }, vnode, debouncedCreateViewer) {
    const simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/
    if (!expression || !simplePathRE.test(expression)) {
      log('only simple dot-delimited paths can create watcher')
      return
    }
    el['$viewerUnwatch'] = vnode.context.$watch(
      expression,
      function(newVal, oldVal) {
        log('change detected by watcher: ', expression)
        debouncedCreateViewer(el, newVal, true)
      },
      {
        deep: true
      }
    )
    console.log(vnode)
    log('watcher created, expression: ', expression)
  }

  function destroyViewer(el) {
    console.log('进入销毁阶段11111111')
    if (!el[`$${name}`]) {
      return
    }
    console.log('进入销毁阶段222222222')
    el[`$${name}`].destroy()
    delete el[`$${name}`]
    log('viewer destroyed')
  }

  function destroyObserver(el) {
    console.log('销毁监听器1111111')
    if (!el['$viewerMutationObserver']) {
      return
    }
    console.log('销毁监听器222222')
    el['$viewerMutationObserver'].disconnect()
    delete el['$viewerMutationObserver']
    log('observer destroyed')
  }

  function destroyWatcher(el) {
    if (!el['$viewerUnwatch']) {
      return
    }
    el['$viewerUnwatch']()
    delete el['$viewerUnwatch']
    log('watcher destroyed')
  }

  function log() {
    debug && console.log(...arguments)
  }

  Vue.directive('viewer', {
    bind(el, binding, vnode) {
      log('viewer bind')
      // 创建一个防抖柯里化函数
      const debouncedCreateViewer = debounce(50, createViewer)
      // 收集createViewer参数，并且执行
      debouncedCreateViewer(el, binding.value)

      // 创建watch监听options表达式变化
      createWatcher(el, binding, vnode, debouncedCreateViewer)

      // 是否监听dom变化
      if (!binding.modifiers.static) {
        // 增加dom变化监听
        createObserver(el, binding.value, debouncedCreateViewer, binding.modifiers.rebuild)
      }
    },
    update() {
      console.log('更新了！！！！！！！！！！！！！！！！！')
    },
    componentUpdated() {
      console.log('componentUpdated')
    },
    unbind(el, binding) {
      log('viewer unbind')
      // 销毁dom变化监听
      destroyObserver(el)
      // 销毁指令表达式监听
      destroyWatcher(el)
      // 销毁viewer
      destroyViewer(el)
    }
  })
}

export default {
  install
}
