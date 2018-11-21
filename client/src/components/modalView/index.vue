<template>
  <div ref="model"
    class="model-view"
    :style="styles">
    <div class="model-view__header"
      @mousedown="onDragStart">
      <slot name="header">{{title}}</slot>
    </div>
    <div class="model-view__body"
      @click="increaseModalIndex">
      <slot></slot>
    </div>
    <div class="model-view__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import { on, off } from '../../utils/dom'
import viewIndex from './ViewIndex'

export default {
  props: {
    title: String,
    zIndex: {
      type: Number,
      default: 100
    },
    windowWidth: Number,
    windowHeight: Number
  },

  computed: {
    styles() {
      let style = {}

      if (this.dragData.x !== null) style.left = `${this.dragData.x}px`
      if (this.dragData.y !== null) style.top = `${this.dragData.y}px`
      style.zIndex = this.modalIndex + this.zIndex

      return style
    }
  },

  data() {
    return {
      dragData: {
        x: null,
        y: null,
        dragX: null,
        dragY: null,
        dragging: false
      },
      modalIndex: viewIndex.getIndex()
    }
  },

  methods: {
    onDragStart(event) {
      const model = this.$refs.model
      const rect = model.getBoundingClientRect()

      this.dragData.x = rect.x
      this.dragData.y = rect.y

      this.dragData.dragX = event.clientX
      this.dragData.dragY = event.clientY

      this.dragData.dragging = true

      this.increaseModalIndex()
      // 将鼠标拖动事件和抬起事件监听于全局
      on(window, 'mousemove', this.onDragMove)
      on(window, 'mouseup', this.onDragEnd)
    },

    onDragMove(event) {
      this.dragData.x += event.clientX - this.dragData.dragX
      this.dragData.y += event.clientY - this.dragData.dragY

      this.dragData.dragX = event.clientX
      this.dragData.dragY = event.clientY
    },

    onDragEnd(event) {
      this.dragData.dragging = false
      this.checkVaildPostion(event)
      off(window, 'mousemove', this.onDragMove)
      off(window, 'mouseup', this.onDragEnd)
    },

    checkVaildPostion(event) {
      if (this.dragData.x < 0) {
        this.dragData.x = 0
      }
      if (this.dragData.y < 0) {
        this.dragData.y = 0
      }
      const model = this.$refs.model
      const rect = model.getBoundingClientRect()

      const validWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      const validHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
      if (validWidth < this.dragData.x + 20) {
        this.dragData.x = validWidth - 20
      }
      if (validHeight < this.dragData.y + 60) {
        this.dragData.y = validHeight - 60
      }
    },

    increaseModalIndex() {
      viewIndex.indexIncrease()
      this.modalIndex = viewIndex.getIndex()
    }
  },

  watch: {
    windowWidth(val) {
      if (val) {
        this.checkVaildPostion()
      }
    },
    windowHeight(val) {
      if (val) {
        this.checkVaildPostion()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.model-view {
  position: absolute;
  background-color: #000;
  width: 100px;
  &__header {
    background-color: red;
    height: 40px;
  }
  &__body {
    // padding: 5px;
    height: 100px;
  }
}
</style>
