/* 快捷方式 */
<template>
  <div class="shortcut"
    :style="styles">
    <div class="shortcut__icon">
      <img :src="icon" />
    </div>
    <div class="shortcut__name">{{name}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    index: Number,
    icon: String,
    name: String
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

    styles() {
      return {
        top: this.row * 90 + 'px',
        left: this.column * 60 + 'px'
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
.shortcut {
  position: absolute;
  display: inline-block;
  width: 60px;
  height: 90px;
  &__icon {
    border: 1px solid #fff;
    height: 40px;
    width: 40px;
    margin: 5px auto 0;
    img {
      width: 100%;
      height: 100%;
      padding: 5px;
    }
  }
  &__name {
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
