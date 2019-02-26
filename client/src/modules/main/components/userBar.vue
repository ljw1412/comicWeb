<template>
  <div class="user-bar"
    :class="{'user-bar--mask':isDisplayMask}">
    <div class="user-bar__icon"
      @click="handlerIconClick">
      <Icon type="ios-contact"
        size="40"
        color="#fff" />
    </div>
    <transition enter-active-class="scaleInRight"
      leave-active-class="fadeOut"
      :duration="{ enter: 1000, leave: 500 }"
      v-on:before-enter="cardBeforeEnter"
      v-on:afterEnter="cardAfterEnter"
      v-on:afterLeave="cardAfterLeave">
      <div v-if="isDisplayCard"
        class="user-bar__card">
        <div v-if="isDisplayCardContent"
          class="card__content">123</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDisplayMask: false,
      isDisplayCard: false,
      isDisplayCardContent: false
    }
  },

  methods: {
    handlerIconClick() {
      this.isDisplayCard = !this.isDisplayCard
      this.isDisplayMask = this.isDisplayCard
    },

    cardBeforeEnter() {
      document.body.style.overflow = 'hidden'
    },

    cardAfterEnter(el) {
      this.isDisplayCardContent = true
    },

    cardAfterLeave(el) {
      this.isDisplayCardContent = false
      this.isDisplayMask = false
      document.body.style.overflow = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.user-bar {
  z-index: 40;
  pointer-events: none;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transition: background-color 0.5s;

  &--mask {
    background-color: rgba(0, 0, 0, 0.6);
    pointer-events: all;
  }

  &__icon {
    pointer-events: all;
    z-index: 99;
    position: absolute;
    border-radius: 50%;
    background-color: #bbb;
    width: 40px;
    height: 40px;
    right: 20px;
    top: 20px;
    overflow: hidden;
    cursor: pointer;
  }

  &__mask {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }

  &__card {
    z-index: 50;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    border: 1px solid #dcdee2;
    border-radius: 5px;
    background-color: #fff;
    width: calc(100% - 80px);
    height: calc(100% - 80px);
    margin: 40px;
    .card__content {
      padding: 15px;
    }
  }
}

.scaleInRight {
  animation-name: scaleInRight;
  animation-duration: 1s;
}

@keyframes scaleInRight {
  0% {
    opacity: 0;
    max-height: 0;
  }

  30% {
    opacity: 0.7;
    max-height: 0;
  }

  100% {
    opacity: 1;
    max-height: 100%;
  }
}
</style>
