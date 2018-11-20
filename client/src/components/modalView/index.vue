<template>
  <div ref="model"
    class="model-view"
    :style="styles">
    <div class="model-view__header"
      @mousedown="onDragStart">
      <slot name="header">{{title}}</slot>
    </div>
    <div class="model-view__body">
      <slot></slot>
    </div>
    <div class="model-view__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import { on, off } from '../../utils/dom'

export default {
  props: {
    title: String
  },

  computed: {
    styles() {
      let style = {}

      if (this.dragData.x !== null) style.left = `${this.dragData.x}px`
      if (this.dragData.y !== null) style.top = `${this.dragData.y}px`

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
      }
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
      console.log(event)
    }
  }
}
</script>

<style lang="scss" scoped>
.model-view {
  position: absolute;
  background-color: #000;
  height: 100px;
  width: 100px;
  &__header {
    background-color: red;
    height: 40px;
  }
}
</style>
