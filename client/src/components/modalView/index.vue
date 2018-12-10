<template>
  <div v-if="!isClose">
    <div v-show="visible"
      ref="modal"
      class="modal-view"
      :style="[styles,mouseStyles]"
      @mousemove="onModalMousemove"
      @mousedown="onModalMousedown">
      <div class="modal-view__header"
        :style="[headerStyle]"
        @mousedown="onDragStart">
        <div v-if="backable"
          class="header__back"
          @click.prevent="onBackClick">
          <Icon class="back__icon"
            type="md-arrow-back"
            color="#fff"
            size="18" />
        </div>
        <div class="header__title">
          <slot name="icon">
            <Icon v-if="icon"
              :type="icon" />
          </slot>
          <span>{{title}}</span>
        </div>
        <div class="header__handle">
          <div class="handle__minimize"
            @click="onMinimizeClick"></div>
          <div class="handle__maximize"
            @click="onMaximizeClick"></div>
          <div class="handle__close"
            @click="onCloseClick"></div>
        </div>
      </div>
      <div class="modal-view__body-top">
        <slot name="bodyTop"></slot>
      </div>
      <div class="modal-view__body"
        :style="bodyStyle">
        <div ref="body"
          class="modal-view__body-warpper">
          <slot></slot>
        </div>
      </div>
      <div v-if="$slots.footer"
        class="modal-view__footer">
        <slot name="footer"></slot>
      </div>
      <div v-if="resizable"
        class="modal-view__resize-icon"></div>
    </div>
  </div>
</template>

<script>
import { on, off } from '../../utils/dom'
import viewIndex from './ViewIndex'
export default {
  props: {
    name: { type: String, default: 'ModalView' },
    value: { type: Boolean, default: true },
    icon: String,
    title: String,
    // modal的层级
    zIndex: { type: Number, default: 100 },
    // 浏览器有效的宽高
    windowWidth: Number,
    windowHeight: Number,
    // modal最小的宽高
    minWidth: { type: Number, default: 300 },
    minHeight: { type: Number, default: 400 },
    // modal 初始化时的宽高
    width: { type: Number, default: 300 },
    height: { type: Number, default: 400 },
    // modal 初始化时的位置
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    // 是否可以调节大小
    resizable: Boolean,
    // 可以返回上一级
    backable: Boolean,
    // body的样式
    bodyStyle: Object,
    // 头部的样式
    headerStyle: Object,
    close: Boolean
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
        top: `${this.dragData.y}px`,
        'background-color': '#fff'
      }
    },
    mouseStyles() {
      return { cursor: this.resizeData.cursor }
    }
  },

  data() {
    return {
      visible: this.value,
      isClose: this.close,
      dragData: {
        x: this.x,
        y: this.y,
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
      },
      rect: {}
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
      // if (x <= 5)  direction += 'left'
      if (x >= this.view.width - 3) direction += 'right'
      if (y >= this.view.height - 3) direction += 'bottom'
      return direction
    },
    // 当鼠标在视图上移动时,如果在边缘修改鼠标样式
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
    // 当鼠标按下时，如果是边缘开始缩放拖拽
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
      this.$emit('resize', rect)
    },

    onResizeEnd(event) {
      this.resizeData.direction = ''
      this.resizeData.resizing = false
      off(window, 'mousemove', this.onResizing)
      off(window, 'mouseup', this.onResizeEnd)
      this.$emit('resize', this.getModalRect())
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
    // 当头部被点击时，开始拖拽
    onDragStart(event) {
      if (event.button) return false
      const rect = this.getModalRect()
      // 头部操作区不可以拖拽
      if (
        (this.backable && event.clientX - rect.x < 35) ||
        event.clientX - rect.x > rect.width - 90
      )
        return false

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
    },

    onBackClick() {
      this.$emit('back', this.name)
    },

    onMinimizeClick() {
      this.$eventBus.$emit('minimize', this.name)
      this.parentEmit('minimize', this.name)
    },

    onMaximizeClick() {
      this.$eventBus.$emit('maximize', this.name)
      this.parentEmit('maximize', this.name)
    },

    onCloseClick() {
      this.$eventBus.$emit('close', this.name)
      this.parentEmit('close', this.name)
    },

    // 向父级递归直到找到TaskLayer
    findTaskLayer(current) {
      if (
        typeof current.$parent === 'object' &&
        current.$parent.name === 'TaskLayer'
      ) {
        return current.$parent
      } else if (current.$parent === undefined) {
        return undefined
      } else {
        return this.findTaskLayer(current.$parent)
      }
    },

    /**
     * 如果找到存在父级是 TaskLayer，那么事件就由 TaskLayer 发出。
     * 否则由自己发出。
     */
    parentEmit(event, obj) {
      const taskLayer = this.findTaskLayer(this)
      if (taskLayer) {
        taskLayer.$emit(event, obj)
        return
      }
      this.$emit(event, obj)
    }
  },

  watch: {
    value(val) {
      this.visible = val
    },
    close(val) {
      this.isClose = val
    },
    visible(val) {
      if (val) {
        this.increaseModalIndex()
      }
    },
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

  mounted() {
    this.rect = this.getModalRect()
  }
}
</script>

<style lang="scss" scoped>
.modal-view {
  position: absolute;
  width: 100px;
  box-sizing: border-box;
  border: 1px solid rgba($color: #9f9f9f, $alpha: 0.5);
  border-top-width: 0;
  display: flex;
  flex-direction: column;

  &__header {
    position: relative;
    flex-shrink: 0;
    background-color: red;
    height: 30px;
    display: flex;
    * {
      user-select: none;
    }
    .header {
      &__back {
        background-color: blue;
        flex-shrink: 0;
        width: 35px;
        height: 100%;
        position: relative;
        &:hover {
          background-color: rgb(78, 78, 255);
        }
        &:active {
          background-color: rgb(0, 0, 179);
        }
        .back__icon {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }

      &__title {
        display: flex;
        align-items: center;
        padding-left: 5px;
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        i {
          margin-top: 2px;
          font-size: 16px;
        }
      }

      &__handle {
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        .handle {
          &__minimize,
          &__maximize,
          &__close {
            width: 30px;
            height: 30px;
            position: relative;
          }
          &__minimize {
            &::before {
              content: ' ';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 10px;
              height: 2px;
              background-color: #fff;
            }
          }
          &__maximize {
            &::before {
              content: ' ';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 10px;
              height: 10px;
              box-sizing: border-box;
              border: 1px solid #fff;
            }
          }
          &__close {
            &::after,
            &::before {
              content: ' ';
              position: absolute;
              top: 50%;
              left: 50%;
              width: 14.14px;
              height: 1px;
              background-color: #fff;
            }
            &::before {
              transform: translate(-50%, -50%) rotate(45deg);
            }
            &::after {
              transform: translate(-50%, -50%) rotate(-45deg);
            }
          }
        }
      }
    }
  }

  &__body-top {
    position: relative;
  }

  &__body {
    flex-grow: 1;
    min-height: 100px;
    height: 0;
    background-color: #fff;
    padding-bottom: 3px;
  }

  &__body-warpper {
    height: 100%;
    overflow-y: auto;
  }

  &__resize-icon {
    position: absolute;
    bottom: 2px;
    right: 2px;
    border-style: solid;
    border-width: 0 1px 1px 0;
    border-color: #9f9f9f;
    width: 8px;
    height: 8px;
  }
}
</style>
