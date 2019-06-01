<template>
  <div class="level">
    <div class="level__name"
      :class="`level${level}`">{{level}}</div>
    <div class="level__bar">
      <div class="level__progress"
        :class="`level${level}`"
        :style="{width:progressWidth}"></div>
    </div>
    <div class="level__num">
      <span>{{mCurrent}}</span>/<span>{{max}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    level: { type: [String, Number], default: '' },
    max: Number,
    current: Number
  },

  data() {
    return {
      mCurrent: 0
    }
  },

  computed: {
    progressWidth() {
      if (this.max === 0) return 0
      return (this.mCurrent / this.max) * 100 + '%'
    }
  },

  watch: {
    current: {
      immediate: true,
      handler(val) {
        setTimeout(() => {
          this.mCurrent = val
        }, 0)
      }
    }
  },

  mounted() {}
}
</script>

<style lang="scss" scoped>
.level {
  position: relative;
  display: flex;
  &__name {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
  }

  &__bar {
    flex-grow: 1;
    height: 8px;
    background-color: #eeeeee;
  }

  &__progress {
    width: 0;
    height: 100%;
    transition: width 0.5s;
  }

  &__num {
    position: absolute;
    top: 8px;
    right: 0;
    font-size: 14px;
  }

  &1 {
    color: #ffffff;
    background-color: #707070;
  }
}
</style>
