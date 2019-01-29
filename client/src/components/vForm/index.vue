/* 窗体 */
<template>
  <div v-if="!isClose"
    v-show="visible"
    class="v-form-wrapper"
    :class="{'v-form-wrapper--resizable':resizable && !splashScreenShow}"
    :style="[styles,mouseStyles]"
    @mousemove.capture="onFormMousemove"
    @mousedown.capture="onFormMousedown">
    <transition leave-active-class="fadeOut">
      <div v-if="splashScreenShow"
        class="v-form__splash"
        :style="{ 'background-color': taskBackgroundColor }">
        <Icon v-if="icon"
          class="splash__icon"
          :type="icon" />
      </div>
    </transition>
    <div ref="vForm"
      class="v-form">
      <!-- 标题栏 -->
      <div class="v-form__title-bar"
        :style="[titleBarStyles]"
        @mousedown="onDragStart">
        <div v-if="backable"
          class="title-bar__back"
          @click.prevent="onBackClick">
          <Icon class="back__icon"
            type="md-arrow-back"
            color="#fff"
            size="18" />
        </div>
        <div class="title-bar__title">
          <slot name="icon">
            <Icon v-if="icon"
              :type="icon" />
          </slot>
          <span>{{title}}</span>
        </div>
        <div class="title-bar__handle">
          <div class="handle__minimize"
            @click="onMinimizeClick"></div>
          <div class="handle__maximize"
            @click="onMaximizeClick"></div>
          <div class="handle__close"
            @click="onCloseClick"></div>
        </div>
      </div>
      <transition enter-active-class="fadeIn">
        <div v-if="!splashScreenShow"
          class="v-form__container">
          <!-- 菜单栏 -->
          <div v-if="$slots.menu"
            class="v-form__menu-bar">
            <slot name="menu"></slot>
          </div>
          <!-- 主体 -->
          <v-scroll-view v-if="$slots.default"
            ref="main"
            class="v-form__main"
            :innerStyle="mainStyle">
            <slot></slot>
          </v-scroll-view>
          <div v-if="$slots.full"
            ref="full"
            class="v-form__full"
            :style="mainStyle">
            <slot name="full"></slot>
          </div>
          <!-- 状态栏 -->
          <div v-if="$slots.status"
            class="from__status-bar">
            <slot name="status"></slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import VScrollView from '@/components/vScrollView'
import { on, off } from '../../utils/dom'
import viewIndex from './ViewIndex'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'VForm',

  components: {
    VScrollView
  },

  props: {
    name: { type: String, default: 'FormView' },
    value: { type: Boolean, default: true },
    icon: String,
    title: String,
    // form的层级
    zIndex: { type: Number, default: 100 },
    // 浏览器有效的宽高
    windowWidth: Number,
    windowHeight: Number,
    // form最小的宽高
    minWidth: { type: Number, default: 300 },
    minHeight: { type: Number, default: 400 },
    // form 初始化时的宽高
    width: { type: Number, default: 300 },
    height: { type: Number, default: 400 },
    // form 初始化时的位置
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    // 是否可以调节大小
    resizable: Boolean,
    // 可以返回上一级
    backable: Boolean,
    // body的样式
    mainStyle: { type: Object, default: () => ({}) },
    // 头部的样式
    titleBarStyle: { type: Object, default: () => ({}) },
    close: Boolean,
    // 是否需要启动页
    splashScreen: Boolean
  },

  computed: {
    ...mapGetters('gui', ['taskBackgroundColor']),
    ...mapState('gui', ['taskbar', 'desktop', 'windowSize']),
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
    },
    titleBarStyles() {
      return Object.assign(
        { 'background-color': this.taskBackgroundColor },
        this.titleBarStyle
      )
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
      rect: {},
      splashScreenShow: this.splashScreen
    }
  },

  methods: {
    // 增加弹窗层级
    increaseFormIndex() {
      viewIndex.indexIncrease()
      this.view.index = viewIndex.getIndex()
    },

    getFormRect() {
      const form = this.$refs.vForm
      const rect = form.getBoundingClientRect()
      // this.view.width = rect.width
      // this.view.height = rect.height
      return rect
    },
    checkEdgeArea(event) {
      const rect = this.getFormRect()

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
    onFormMousemove(event) {
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
    onFormMousedown(event) {
      this.increaseFormIndex()
      if (!this.resizable || event.button) return false
      this.resizeData.direction = this.checkEdgeArea(event)
      if (!this.resizeData.direction) return

      this.resizeData.resizing = true
      on(window, 'mousemove', this.onResizing)
      on(window, 'mouseup', this.onResizeEnd)
    },

    onResizing(event) {
      const rect = this.getFormRect()
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
      this.$emit('resize', this.getFormRect())
    },

    // 拖拽时检查位置的合理性
    checkVaildPostion(event) {
      if (this.dragData.x < 0) {
        this.dragData.x = 0
      }
      if (this.dragData.y < 0) {
        this.dragData.y = 0
      }
      const rect = this.getFormRect()

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
      const rect = this.getFormRect()
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

      // this.increaseFormIndex()
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
    }

    // // 向父级递归直到找到TaskLayer
    // findTaskLayer(current) {
    //   if (
    //     typeof current.$parent === 'object' &&
    //     current.$parent.name === 'TaskLayer'
    //   ) {
    //     return current.$parent
    //   } else if (current.$parent === undefined) {
    //     return undefined
    //   } else {
    //     return this.findTaskLayer(current.$parent)
    //   }
    // },

    // /**
    //  * 如果找到存在父级是 TaskLayer，那么事件就由 TaskLayer 发出。
    //  * 否则由自己发出。
    //  */
    // parentEmit(event, obj) {
    //   const taskLayer = this.findTaskLayer(this)
    //   if (taskLayer) {
    //     taskLayer.$emit(event, obj)
    //     return
    //   }
    //   this.$emit(event, obj)
    // }
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
        this.increaseFormIndex()
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
    },
    // 检查当 window大小变换时窗体的位置合法性
    windowSize: {
      deep: true,
      handler(val) {
        this.checkVaildPostion()
      }
    }
  },

  mounted() {
    this.rect = this.getFormRect()
    if (this.splashScreenShow) {
      setTimeout(() => {
        this.splashScreenShow = false
      }, 3000)
    }
  }
}
</script>

<style lang="scss">
$broder-color: #9f9f9f;

.v-form-wrapper {
  position: absolute;
  width: 100px;
  box-sizing: content-box;
  padding-right: 3px;
  padding-bottom: 3px;
  * {
    user-select: none;
  }

  &--resizable {
    &::after {
      content: ' ';
      position: absolute;
      bottom: 4px;
      right: 4px;
      border-style: solid;
      border-width: 0 1px 1px 0;
      border-color: $broder-color;
      width: 8px;
      height: 8px;
    }
  }
}

.v-form {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 10px 50px rgba($color: #000000, $alpha: 0.7);

  &__splash {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    transition-duration: 1.2s;
    .splash__icon {
      color: #fff;
      font-size: 140px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__title-bar {
    position: relative;
    display: flex;
    flex-shrink: 0;
    height: 30px;
    box-sizing: border-box;
    transition-duration: 1.2s;
    .title-bar {
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
        span {
          padding-left: 5px;
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

  &__container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    animation-delay: 0.2s;
    height: 100%;
  }

  &__menu-bar,
  &__main,
  &__status-bar,
  &__full {
    position: relative;
  }

  &__main {
    height: 100%;
  }

  &__full {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
