<template>
  <div class="scroll-view__wrapper"
    :class="wrapClasses">
    <div ref="view"
      class="scroll-view"
      :style="viewStyles">
      <div ref="content"
        class="scroll-view__inner"
        :class="contentClasses"
        :style="[innerStyle]">
        <slot></slot>
      </div>
    </div>

    <div v-if="isBarYShow"
      ref="barY"
      class="scroll-bar scroll-bar--vertical"
      @mousedown="handleBarMousedown($event,'y')">
      <div ref="thumbY"
        class="scroll-bar__thumb"
        :style="thumbYStyles"
        @mousedown.stop="handleThumbDragStart($event,'y')"></div>
    </div>

    <div v-if="isBarXShow"
      ref="barX"
      class="scroll-bar scroll-bar--horizontal"
      @mousedown="handleBarMousedown($event,'x')">
      <div ref="thumbX"
        class="scroll-bar__thumb"
        :style="thumbXStyles"
        @mousedown.stop="handleThumbDragStart($event,'x')"></div>
    </div>
  </div>
</template>

<script>
import { on, off } from '../../utils/dom'
import scrollbarWidth from '../../utils/scrollbar-width'
import {
  addResizeListener,
  removeResizeListener
} from '../../utils/resize-event.js'

export default {
  name: 'VScrollView',

  props: {
    innerStyle: { type: Object, default: () => ({}) },
    // hover 悬浮界面时显示，不悬浮是半透明
    // always 总是显示
    showMode: { type: String, default: () => 'hover' }
  },

  computed: {
    wrapClasses() {
      return `scroll-view__wrapper--${this.showMode}`
    },

    viewStyles() {
      return {
        width: `calc(100% + ${this.scrollbarWidth}px)`,
        height: `calc(100% + ${this.scrollbarWidth}px)`
      }
    },

    contentClasses() {
      return {
        'scroll-view__inner--scroll-x': this.isBarXShow,
        'scroll-view__inner--scroll-y': this.isBarYShow
      }
    },

    isBarXShow() {
      return this.wrapperWidth < this.innerWidth
    },

    // 水平(X轴)外内比例
    horizontalScale() {
      return this.wrapperWidth / this.innerWidth
    },

    thumbXStyles() {
      return {
        width: this.horizontalScale * 100 + '%',
        transform: `translateX(${(this.scrollLeft / this.wrapperWidth) * 100}%)`
      }
    },

    thumbXWidth() {
      return this.horizontalScale * this.wrapperWidth
    },

    //垂直(Y轴)外内比例
    verticalScale() {
      return this.wrapperHeight / this.innerHeight
    },

    isBarYShow() {
      return this.wrapperHeight < this.innerHeight
    },

    thumbYStyles() {
      return {
        height: this.verticalScale * 100 + '%',
        transform: `translateY(${(this.scrollTop / this.wrapperHeight) * 100}%)`
      }
    },

    thumbYHeight() {
      return this.verticalScale * this.wrapperHeight
    }
  },

  data() {
    return {
      scrollbarWidth: 15,

      // 外层宽
      wrapperWidth: 0,
      // 内层宽
      innerWidth: 0,
      // 内层水平滚动的位置
      scrollLeft: 0,
      // 水平滚动条所在位置
      thumbXScrollLeft: 0,

      // 外层高度，即滚动轨道高度，可见范围高度
      wrapperHeight: 0,
      // 内层高度，即滚动内容的总高度
      innerHeight: 0,
      // 内层垂直滚动的位置
      scrollTop: 0,
      // 垂直滚动条所在位置
      thumbYScrollTop: 0,

      // 操作的滚动条 : '', x, y
      handleThumb: ''
    }
  },

  methods: {
    handleBarMousedown(e, thumb) {
      if (thumb === 'y') {
        const scrollTop =
          (e.offsetY - this.thumbYHeight / 2) / this.verticalScale
        $(this.$refs.view).animate({ scrollTop }, 200)
      } else if (thumb === 'x') {
        const scrollLeft =
          (e.offsetX - this.thumbXWidth / 2) / this.horizontalScale
        $(this.$refs.view).animate({ scrollLeft }, 200)
      }
    },

    // 滚动条按下时
    handleThumbDragStart(e, thumb) {
      this.handleThumb = thumb
      this.thumbYScrollTop = e.clientY
      this.thumbXScrollLeft = e.clientX

      on(window, 'mousemove', this.handleThumbDrag)
      on(window, 'mouseup', this.handleThumbDragEnd)
      document.onselectstart = () => false
    },

    // 滚动条移动时
    handleThumbDrag(e) {
      if (this.handleThumb === 'y') {
        const scrollTop =
          (e.clientY - this.thumbYScrollTop) / this.verticalScale
        this.setScrollTop(scrollTop + this.scrollTop)
        this.thumbYScrollTop = e.clientY
      } else {
        const scrollLeft =
          (e.clientX - this.thumbXScrollLeft) / this.horizontalScale
        this.setScrollLeft(scrollLeft + this.scrollLeft)
        this.thumbXScrollLeft = e.clientX
      }
    },

    // 滚动条移动结束
    handleThumbDragEnd(e) {
      off(window, 'mousemove', this.handleThumbDrag)
      off(window, 'mouseup', this.handleThumbDragEnd)
      document.onselectstart = null
      this.handleThumb = ''
    },

    handleScroll(e) {
      this.scrollTop = this.$refs.view.scrollTop
      this.scrollLeft = this.$refs.view.scrollLeft
    },

    addListener() {
      on(this.$refs.view, 'scroll', this.handleScroll)
      addResizeListener(this.$refs.content, this.initBar)
    },

    removeListener() {
      off(this.$refs.view, 'scroll', this.handleScroll)
      removeResizeListener(this.$refs.content, this.initBar)
    },

    initBar() {
      this.wrapperHeight = this.$refs.view.clientHeight
      this.innerHeight = this.$refs.view.scrollHeight
      this.wrapperWidth = this.$refs.view.clientWidth
      this.innerWidth = this.$refs.view.scrollWidth
    },

    setScrollTop(scrollTop) {
      $(this.$refs.view).scrollTop(scrollTop)
    },

    setScrollLeft(scrollLeft) {
      $(this.$refs.view).scrollLeft(scrollLeft)
    }
  },

  mounted() {
    this.addListener()
    this.scrollbarWidth = scrollbarWidth(this.$refs.view)
  },

  beforeDestroy() {
    this.removeListener()
  }
}
</script>

<style lang="scss">
.scroll-view {
  height: 100%;
  width: 100%;
  overflow: scroll;

  &__wrapper {
    position: relative;
    overflow: hidden;
    &--always .scroll-bar,
    &--hover:hover .scroll-bar {
      opacity: 1;
    }
  }

  &__inner {
    display: inline-block;

    // &--scroll-x {
    //   padding-bottom: 5px;
    // }

    // &--scroll-y {
    //   padding-right: 5px;
    // }
  }
}

.scroll-bar {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 1;
  border-radius: 4px;
  opacity: 0.4;
  transition: opacity 0.12s ease-out;
  &--horizontal {
    height: 6px;
    left: 2px;
    .scroll-bar__thumb {
      height: 100%;
    }
  }

  &--vertical {
    width: 6px;
    top: 2px;
    .scroll-bar__thumb {
      width: 100%;
    }
  }

  &__thumb {
    position: relative;
    display: block;
    width: 0;
    height: 0;
    cursor: pointer;
    border-radius: inherit;
    background-color: hsla(223, 3%, 50%, 0.3);
    transition: background-color 0.3s;
  }
}
</style>
