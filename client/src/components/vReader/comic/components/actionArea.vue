<template>
  <div class="action-area">
    <transition enter-active-class="slideInDown"
      leave-active-class="slideOutUp">
      <div v-show="visible"
        class="action-area__header can-pointer">
        <v-marquee font-size="14px">{{comicTitle}}</v-marquee>
        <v-marquee font-size="12px">{{chapterTitle}}</v-marquee>
      </div>
    </transition>
    <transition enter-active-class="slideInUp"
      leave-active-class="slideOutDown">
      <div v-show="visible"
        class="action-area__tools can-pointer">
        <div class="tools__page-controller">
          <i-slider :value="this.pageIndex || 1"
            :min="1"
            :max="this.pageCount || 1"
            @on-change="handleSliderChange"></i-slider>
        </div>
      </div>
    </transition>
    <transition name="fade"
      :duration="{enter: 300, leave: 0}">
      <div v-show="!visible && pageStr"
        class="action-area__page">{{ pageStr }}</div>
    </transition>
  </div>
</template>

<script>
import VMarquee from '../../../vMarquee'
export default {
  components: {
    VMarquee
  },

  computed: {
    pageStr() {
      if (!this.pageIndex || !this.pageCount) return ''
      return this.pageIndex + '/' + this.pageCount
    }
  },

  props: {
    visible: Boolean,
    comicTitle: String,
    chapterTitle: String,
    pageIndex: [Number, String],
    pageCount: [Number, String]
  },

  data() {
    return {}
  },

  methods: {
    handleSliderChange(index) {
      this.$emit('page-change', index - 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.action-area {
  pointer-events: none;
  position: absolute;
  overflow: hidden;
  z-index: 9;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  &__header {
    position: absolute;
    left: 0;
    top: 0;
    // height: 40px;
    width: 100%;
    color: #fff;
    background-color: rgba($color: #000000, $alpha: 0.8);
    animation-duration: 0.3s;
  }

  &__tools {
    position: absolute;
    left: 0;
    bottom: 0;
    // height: 10%;
    width: 100%;
    color: #fff;
    background-color: rgba($color: #000000, $alpha: 0.8);
    animation-duration: 0.3s;
    .tools {
      &__page-controller {
        padding: 0 8px;
      }
    }
  }

  &__page {
    font-size: 12px;
    line-height: 12px;
    position: absolute;
    bottom: 0;
    right: 0;
    color: #fff;
    background-color: rgba($color: #000000, $alpha: 0.6);
    padding: 2px 3px;
    border-radius: 4px 0 0 0;
  }
}

.can-pointer {
  pointer-events: auto;
}
</style>
