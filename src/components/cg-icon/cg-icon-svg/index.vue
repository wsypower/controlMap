<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$listeners"
  ></div>
  <!-- 本地SVG调用 -->
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="icon"></use>
  </svg>
</template>

<script>
export default {
  name: 'cg-icon-svg',
  props: {
    /**
     * @description SVG名
     * @author weiyafei
     * @date 2019-06-20-16:19:49
     */
    name: {
      type: String,
      required: true
    },
    /**
     * @description 你自定义class
     * @author weiyafei
     * @date 2019-06-20-16:20:15
     */
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal() {
      return this.isExternalUrl(this.iconClass)
    },
    icon() {
      return `#cg-${this.name}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  },
  methods: {
    /**
     * @description 是否外部链接
     * @author weiyafei
     * @date 2019-06-20-16:14:09
     * @param {string} path
     * @returns {Boolean}
     */
    isExternalUrl(path) {
      return /^(https?:|mailto:|tel:)/.test(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>

