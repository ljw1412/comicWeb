<template>
  <div ref="modal"
    class="modal-view"
    :style="[styles,mouseStyles]"
    @mousemove="onModalMousemove"
    @mousedown="onModalMousedown">
    <div class="modal-view__header"
      @mousedown="onDragStart">
      <slot name="header">{{title}}</slot>
    </div>
    <div class="modal-view__body">
      <slot></slot>
    </div>
    <div class="modal-view__footer">
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
    windowHeight: Number,
    minWidth: { type: Number, default: 300 },
    minHeight: { type: Number, default: 400 },
    width: { type: Number, default: 300 },
    height: { type: Number, default: 400 },
    // 是否可以调节大小
    resizable: Boolean
  },

  computed: {
    styles() {
      return {
        zIndex: this.view.index + this.zIndex,
        width: `${this.view.width}px`,
        height: `${this.view.height}px`,
        minWidth: `${this.minWidth}px`,
        minHeight: `${this.minHeight}px`,
        left: `${this.dragData.x}px`,
        top: `${this.dragData.y}px`
      }
    },
    mouseStyles() {
      return { cursor: this.resizeData.cursor }
    }
  },

  data() {
    return {
      dragData: {
        x: 0,
        y: 0,
        dragX: null,
        dragY: null,
        dragging: false
      },
      resizeData: {
        resizing: false,
        direction: '',
        cursor: ''
      },
      view: {
        index: viewIndex.getIndex(),
        width: this.width,
        height: this.height
      }
    }
  },

  methods: {
    // 增加弹窗层级
    increaseModalIndex() {
      viewIndex.indexIncrease()
      this.view.index = viewIndex.getIndex()
    },

    getModalRect() {
      const modal = this.$refs.modal
      const rect = modal.getBoundingClientRect()
      // this.view.width = rect.width
      // this.view.height = rect.height
      return rect
    },
    checkEdgeArea(event) {
      const rect = this.getModalRect()

      const x = event.layerX
      const y = event.layerY
      let direction = ''

      // 不支持，暂时没有想到很好的解决left，width，min-width之间的关系
      // if (x <= 5) {
      //   direction += 'left'
      // }

      if (x >= this.view.width - 5) {
        direction += 'right'
      }

      if (y >= this.view.height - 5) {
        direction += 'bottom'
      }

      return direction
    },
    // 当鼠标在视图上移动时
    onModalMousemove(event) {
      if (!this.resizable) return false
      const direction = this.checkEdgeArea(event)
      if (['left', 'right'].includes(direction)) {
        this.resizeData.cursor = 'ew-resize'
        return
      } else if ('bottom' === direction) {
        this.resizeData.cursor = 'ns-resize'
        return
      } else if (['rightbottom', 'bottomright'].includes(direction)) {
        this.resizeData.cursor = 'nwse-resize'
        return
      }

      this.resizeData.cursor = ''
    },
    // 当鼠标按下时
    onModalMousedown(event) {
      this.increaseModalIndex()
      if (!this.resizable || event.button) return false
      this.resizeData.direction = this.checkEdgeArea(event)
      if (!this.resizeData.direction) return

      this.resizeData.resizing = true
      on(window, 'mousemove', this.onResizing)
      on(window, 'mouseup', this.onResizeEnd)
    },

    onResizing(event) {
      const rect = this.getModalRect()
      switch (this.resizeData.direction) {
        case 'bottom':
          this.view.height = event.y - rect.top
          if (this.view.height < this.minHeight) {
            this.view.height = this.minHeight
          }
          break
        case 'left':
          this.view.width = rect.right - event.x
          if (this.view.width >= this.minWidth) {
            this.dragData.x = event.x
          } else {
            this.view.width = this.minWidth
          }
          break
        case 'right':
          this.view.width = event.x - rect.left
          if (this.view.width < this.minWidth) {
            this.view.width = this.minWidth
          }
          break
        case 'rightbottom':
        case 'bottomright':
          this.view.width = event.x - rect.left
          this.view.height = event.y - rect.top
          if (this.view.height < this.minHeight) {
            this.view.height = this.minHeight
          }
          if (this.view.width < this.minWidth) {
            this.view.width = this.minWidth
          }
          break
      }
    },

    onResizeEnd(event) {
      this.resizeData.direction = ''
      this.resizeData.resizing = false
      off(window, 'mousemove', this.onResizing)
      off(window, 'mouseup', this.onResizeEnd)
    },
    // 拖拽时检查位置的合理性
    checkVaildPostion(event) {
      if (this.dragData.x < 0) {
        this.dragData.x = 0
      }
      if (this.dragData.y < 0) {
        this.dragData.y = 0
      }
      const rect = this.getModalRect()

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

    onDragStart(event) {
      if (event.button) return false
      const rect = this.getModalRect()

      this.dragData.x = rect.x
      this.dragData.y = rect.y

      this.dragData.dragX = event.clientX
      this.dragData.dragY = event.clientY

      this.dragData.dragging = true

      // this.increaseModalIndex()
      // 将鼠标拖动事件和抬起事件监听于全局
      on(window, 'mousemove', this.onDragging)
      on(window, 'mouseup', this.onDragEnd)
    },

    onDragging(event) {
      if (this.resizeData.resizing) return false

      this.dragData.x += event.clientX - this.dragData.dragX
      this.dragData.y += event.clientY - this.dragData.dragY

      this.dragData.dragX = event.clientX
      this.dragData.dragY = event.clientY
    },

    onDragEnd(event) {
      this.dragData.dragging = false
      this.checkVaildPostion(event)
      off(window, 'mousemove', this.onDragging)
      off(window, 'mouseup', this.onDragEnd)
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
  },

  mounted() {}
}
</script>

<style lang="scss" scoped>
.modal-view {
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
