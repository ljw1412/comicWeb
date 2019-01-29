<template>
  <div ref="wrap"
    class="v-marquee-wrapper"
    :style="wrapStyles">
    <div class="v-marquee"
      :class="{
         'v-marquee--oneline': !this.isVertical,
         'v-marquee--vertical': this.isVertical}">
      <div ref="inner"
        class="v-marquee__text"
        :class="textClasses"
        :style="textStyles">
        <slot>{{value}}</slot>
      </div>
      <div class="v-marquee__text"
        :class="textClasses"
        :style="textStyles">
        <slot>{{value}}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import {
  addResizeListener,
  removeResizeListener
} from '../../utils/resize-event'
export default {
  name: 'VMarquee',

  props: {
    value: { type: String, default: '' },
    fontSize: String,
    // 方向 'left','right','up','down'
    direction: { type: String, default: 'left' },
    // 滚动时长
    duration: [String, Number],
    width: String,
    height: String,
    // 不管是否完全显示，总是滚动
    always: Boolean
  },

  computed: {
    wrapStyles() {
      return [
        {
          width: this.width,
          height:
            this.height || (this.isVertical ? this.inner.height + 'px' : ''),
          'font-size': this.fontSize
        }
      ]
    },

    textClasses() {
      let tramslationClass = ''
      if (this.always || !this.isShowFully) {
        tramslationClass = this.isVertical
          ? 'v-marquee__text--tramslation-y'
          : 'v-marquee__text--tramslation-x'
      }
      return [tramslationClass]
    },

    textStyles() {
      const style = {}
      style['animation-duration'] = this.duration
      if (!this.isShowFully && !this.isVertical) style['padding-right'] = '10%'
      return style
    },

    isVertical() {
      return ['up', 'down'].includes(this.direction)
    },

    isShowFully() {
      if (this.isVertical) {
        return this.wrap.height >= this.inner.height
      } else {
        return this.wrap.width >= this.inner.width
      }
    }
  },

  data() {
    return {
      wrap: {
        width: 0,
        height: 0
      },
      inner: {
        width: 0,
        height: 0
      }
    }
  },

  methods: {
    getWrapSize() {
      const wrapRect = this.$refs.wrap.getBoundingClientRect()
      this.wrap.width = wrapRect.width
      this.wrap.height = wrapRect.height
    },

    getInnerSize() {
      const innerRect = this.$refs.inner.getBoundingClientRect()
      this.inner.width = innerRect.width
      this.inner.height = innerRect.height
    }
  },

  mounted() {
    addResizeListener(this.$refs.wrap, this.getWrapSize)
    addResizeListener(this.$refs.inner, this.getInnerSize)
  },

  beforeDestroy() {
    removeResizeListener(this.$refs.wrap, this.getWrapSize)
    removeResizeListener(this.$refs.inner, this.getInnerSize)
  }
}
</script>

<style lang="scss" scoped>
.v-marquee-wrapper {
  display: flex;
  overflow: hidden;
}

.v-marquee {
  position: relative;
  user-select: none;
  min-width: 100%;
  &--oneline {
    white-space: nowrap;
  }
  &--vertical {
    word-break: break-all;
  }

  &__text {
    display: inline-block;
    min-width: 100%;
    min-height: 100%;
    text-align: center;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    &--tramslation-x {
      animation-name: translationX;
    }
    &--tramslation-y {
      animation-name: translationY;
    }
    &--overflow {
      padding-left: 20px;
    }
  }
}

@keyframes translationX {
  30% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes translationY {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>
