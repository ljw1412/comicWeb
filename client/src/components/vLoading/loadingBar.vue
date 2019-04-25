<template>
  <div v-show="value"
    class="loading-bar-wrapper"
    :style="{'background-color':bgColor,height}">
    <div ref="progress"
      class="loading-bar-progress"
      :class="{'loading':isLoading,'done':isLoading && isDown}"
      :style="{'background-color':progressColor}"></div>
  </div>
</template>

<script>
import { on, off } from '../../utils/dom'
export default {
  props: {
    value: { type: Boolean, default: false },
    height: String,
    progressColor: String,
    bgColor: String
  },

  data() {
    return {
      isLoading: false,
      isDown: false
    }
  },

  methods: {
    done() {
      this.isLoading && (this.isDown = true)
    },

    transitionEnd(e) {
      if (this.$refs.progress.className.includes('done')) {
        this.isDown = false
        this.$emit('input', false)
        off(this.$refs.progress, 'transitionend', this.transitionEnd)
      }
    }
  },

  watch: {
    value(val) {
      setTimeout(() => {
        this.isLoading = val
        if (val) {
          on(this.$refs.progress, 'transitionend', this.transitionEnd)
        } else {
          off(this.$refs.progress, 'transitionend', this.transitionEnd)
        }
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-bar-wrapper {
  height: 5px;
}

.loading-bar-progress {
  height: 100%;
  width: 0;
  background-color: #c21212;
  transition: width 3s ease;
  &.loading {
    width: 80%;
  }
  &.done {
    width: 100%;
    transition: width 0.5s linear;
  }
}
</style>
