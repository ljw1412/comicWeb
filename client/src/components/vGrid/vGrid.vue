<template>
  <div ref="grid"
    class="v-grid"
    :class="gridClasses"
    :style="gridStyles">
    <slot></slot>
  </div>
</template>

<script>
import {
  addResizeListener,
  removeResizeListener
} from '../../utils/resize-event'
export default {
  name: 'VGrid',

  props: {
    width: String,

    // 元素间的间隔
    gutter: Number,

    // 元素宽度
    itemWidth: {
      type: [String, Number],
      default: 0
    },

    // 列数 优先级高于元素宽度
    column: [String, Number],

    align: String
  },

  computed: {
    gridClasses() {
      if (!this.align) return ''
      return `v-grid--${this.align}`
    },

    gridStyles() {
      return {
        width: this.width,
        padding: this.gutter ? this.mGutter : undefined
      }
    },

    mColumn() {
      return this.column || this.itemWidth
        ? Math.floor(this.gridWidth / this.itemWidth)
        : 3
    },

    mItemWidth() {
      return 100 / this.mColumn + '%'
    },

    mGutter() {
      return this.gutter / 2 + 'px'
    }
  },

  data() {
    return {
      gridWidth: 0
    }
  },

  methods: {
    addListener() {
      addResizeListener(this.$refs.grid, this.initGrid)
    },

    removeListener() {
      removeResizeListener(this.$refs.grid, this.initGrid)
    },

    initGrid() {
      this.gridWidth = this.$refs.grid.offsetWidth
    }
  },

  mounted() {
    this.addListener()
  },

  beforeDestroy() {
    this.removeListener()
  },

  watch: {
    mItemWidth: {
      immediate: true,
      handler(val) {
        console.log(val)

        this.$slots.default.forEach(item => {
          item.elm.style.width = val
          item.elm.style.padding = this.mGutter
        })
      }
    }
  }
}
</script>

<style lang="scss">
.v-grid {
  box-sizing: content-box;
  &--left {
    margin-left: 0;
    margin-right: auto;
  }
  &--center {
    margin: 0 auto;
  }
  &--right {
    margin-left: auto;
    margin-right: 0;
  }
}
</style>
