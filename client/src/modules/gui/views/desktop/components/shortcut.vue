/* 快捷方式 */
<template>
  <div class="shortcut__wrapper"
    :style="wrapStyles">
    <div class="shortcut">
      <div class="shortcut__icon">
        <img v-if="src"
          :src="src" />
        <Icon v-else
          :type="icon"
          :color="color"></Icon>
      </div>
      <div class="shortcut__name">{{name}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    index: Number,
    icon: String,
    // 仅icon情况下有效
    color: String,
    src: String,
    name: String,
    free: Boolean
  },

  computed: {
    ...mapState('gui', ['windowSize']),

    maxRow() {
      return Math.floor((this.windowSize.height - 40) / 90)
    },

    column() {
      return Math.floor(this.index / this.maxRow)
    },

    row() {
      return this.index % this.maxRow
    },

    wrapStyles() {
      return {
        top: this.row * 90 + 'px',
        left: this.column * 70 + 'px'
      }
    }
  },

  data() {
    return {
      top: 0,
      left: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.shortcut__wrapper {
  position: absolute;
  width: 70px;
  height: 90px;
  transition-duration: 0.5s;
}

.shortcut {
  display: inline-block;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  &:focus {
    background: #000;
  }
  &__icon {
    height: 40px;
    width: 40px;
    margin: 5px auto 0;
    img {
      width: 100%;
      height: 100%;
      padding: 5px;
    }
    .ivu-icon {
      font-size: 38px;
    }
  }
  &__name {
    text-align: center;
    font-size: 12px;
    color: #fff;
    text-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.7);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
</style>
