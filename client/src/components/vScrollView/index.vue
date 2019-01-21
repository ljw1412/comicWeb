<template>
  <div class="scroll-view__wrapper">
    <div ref="view"
      class="scroll-view">
      <div ref="content"
        class="scroll-view__inner"
        :class="contentClasses">
        <slot></slot>
      </div>
    </div>

    <div v-if="isBarYShow"
      ref="barY"
      class="scroll-view__bar-y"
      @mousedown="handleBarYMousedown">
      <div ref="thumbY"
        class="bar-y__thumb bar-thumb"
        :style="thumbStyles"
        @mousedown.stop="handleThumbYMoveStart"></div>
    </div>
  </div>
</template>

<script>
import { on, off } from '../../utils/dom'
export default {
  props: {
    scrollX: Boolean,
    scrollY: Boolean
  },

  computed: {
    contentClasses() {
      return {
        'scroll-view__inner--scroll-x': this.scrollX,
        'scroll-view__inner--scroll-y': this.scrollY
      }
    },

    isBarYShow() {
      return this.wrapperHeight < this.innerHeight
    },

    thumbStyles() {
      return {
        height: (this.wrapperHeight / this.innerHeight) * 100 + '%',
        transform: `translateY(${(this.scrollTop / this.wrapperHeight) * 100}%)`
      }
    },

    thumbYHeight() {
      return (this.wrapperHeight / this.innerHeight) * this.wrapperHeight
    },
    //垂直(Y轴)外内比例
    verticalScale() {
      return this.wrapperHeight / this.innerHeight
    }
  },

  data() {
    return {
      // 外层高度，即滚动轨道高度，可见范围高度
      wrapperHeight: 0,
      // 内层高度，即滚动内容的总高度
      innerHeight: 0,
      // 内层滚动的位置
      scrollTop: 0,
      // 滚动条所在位置
      thumbScrollTop: 0,
      thumbPosition: 0
    }
  },

  methods: {
    handleBarYMousedown(e) {
      const scrollTop =
        (e.offsetY - this.thumbYHeight / 2) *
        (this.innerHeight / this.wrapperHeight)
      $(this.$refs.content).animate({ scrollTop }, 200)
    },

    // 滚动条按下时
    handleThumbYMoveStart(e) {
      this.thumbPosition = e.clientY

      on(window, 'mousemove', this.handleThumbYMove)
      on(window, 'mouseup', this.handleThumbYMoveEnd)
    },

    // 滚动条移动时
    handleThumbYMove(e) {
      const scrollTop =
        (e.clientY - this.thumbPosition) *
        (this.innerHeight / this.wrapperHeight)
      $(this.$refs.content).scrollTop(scrollTop + this.scrollTop)
      this.thumbPosition = e.clientY
    },

    // 滚动条移动结束
    handleThumbYMoveEnd(e) {
      off(window, 'mousemove', this.handleThumbYMove)
      off(window, 'mouseup', this.handleThumbYMoveEnd)
    },

    handleScroll(e) {
      this.scrollTop = this.$refs.content.scrollTop
    },

    addListener() {
      on(this.$refs.content, 'scroll', this.handleScroll)
    },

    removeListener() {
      off(this.$refs.content, 'scroll', this.handleScroll)
    },

    initBar() {
      this.wrapperHeight = this.$refs.view.clientHeight
      this.innerHeight = this.$refs.content.scrollHeight
    }
  },

  mounted() {
    this.addListener()
    this.initBar()
  },

  beforeDestroy() {
    this.removeListener()
  }
}
</script>

<style lang="scss">
.scroll-view {
  height: 100%;

  &__wrapper {
    position: relative;
    overflow: hidden;
  }

  &__inner {
    height: 100%;
    margin-bottom: -15px;
    margin-right: -15px;
    &--scroll-x {
      overflow-x: auto;
    }

    &--scroll-y {
      overflow-y: auto;
    }
  }

  &__bar-y {
    user-select: none;
    position: absolute;
    height: 100%;
    width: 10px;
    top: 0;
    right: 0;
    background: #ccc;
    .bar-y__thumb {
      width: 100%;
      height: 10px;
      background-color: #ff0000;
      transition-duration: 0.1s;
    }
  }

  .bar-thumb {
    cursor: pointer;
  }
}
</style>
