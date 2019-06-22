// 组件
import cgContainerFull from './components/cg-container-full.vue'
import cgContainerFullBs from './components/cg-container-full-bs.vue'
import cgContainerGhost from './components/cg-container-ghost.vue'
import cgContainerGhostBs from './components/cg-container-ghost-bs.vue'
import cgContainerCard from './components/cg-container-card.vue'
import cgContainerCardBs from './components/cg-container-card-bs.vue'
import cgSource from './components/cg-source.vue'

export default {
  name: 'cg-container',
  props: {
    // 容器样式
    type: {
      type: String,
      required: false,
      default: 'full'
    },
    // 滚动优化
    scroll: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    // 始终返回渲染组件
    component() {
      if (this.type === 'card' && !this.scroll) return cgContainerCard
      if (this.type === 'card' && this.scroll) return cgContainerCardBs
      if (this.type === 'ghost' && !this.scroll) return cgContainerGhost
      if (this.type === 'ghost' && this.scroll) return cgContainerGhostBs
      if (this.type === 'full' && !this.scroll) return cgContainerFull
      if (this.type === 'full' && this.scroll) return cgContainerFullBs
      else {
        return 'div'
      }
    }
  },
  render(h) {
    const slots = [this.$slots.default]
    if (this.$slots.header) slots.push(h('template', { slot: 'header' }, [this.$slots.header]))
    if (this.$slots.footer) slots.push(h('template', { slot: 'footer' }, [this.$slots.footer]))
    return h(
      'div',
      {
        ref: 'container',
        class: 'container-component'
      },
      [
        h(
          this.component,
          {
            ref: 'component',
            props: this.$attrs,
            on: {
              scroll: e => this.$emit('scroll', e)
            }
          },
          slots
        )
        //跳转至github源码页面
        // h(cgSource)
      ]
    )
  },
  methods: {
    // 返回顶部
    scrollToTop() {
      this.$refs.component.scrollToTop()
      // 如果开启了 better scroll 还需要手动触发一遍 scroll 事件
      const bs = this.$refs.component.BS
      if (bs) this.$refs.component.scroll()
    },
    // 用法同原生方法 scrollBy
    scrollBy(x = 0, y = 0, time = 300) {
      if (this.scroll) {
        const bs = this.$refs.component.BS
        if (bs) {
          bs.scrollBy(-x, -y, time)
          // 手动触发一遍 scroll 事件
          this.$refs.component.scroll()
        }
      } else {
        this.$refs.component.$refs.body.scrollBy(x, y)
      }
    },
    // 用法同原生方法 scrollTo
    scrollTo(x = 0, y = 0, time = 300) {
      if (this.scroll) {
        const bs = this.$refs.component.BS
        if (bs) {
          bs.scrollTo(-x, -y, time)
          // 手动触发一遍 scroll 事件
          this.$refs.component.scroll()
        }
      } else {
        this.$refs.component.$refs.body.scrollTo(x, y)
      }
    },
    // 用法同原生方法 scrollTop
    scrollTop(top = 0, time = 300) {
      if (this.scroll) {
        const bs = this.$refs.component.BS
        if (bs) {
          bs.scrollTo(bs.x, -top, time)
          // 手动触发一遍 scroll 事件
          this.$refs.component.scroll()
        }
      } else {
        this.$refs.component.$refs.body.scrollTop = top
      }
    }
  }
}
