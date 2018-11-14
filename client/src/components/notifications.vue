// 通知栏
<template>
  <transition name="slideIn"
    enter-active-class="slideInRight"
    leave-active-class="slideOutRight">
    <div v-if="value"
      class="notifications">
      <div class="notifications__header">
        <div class="header__title">通知</div>
      </div>
      <div class="notifications__container"></div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.notifications {
  width: 300px;
  height: calc(100% - 40px);
  background-color: rgba($color: #ccc, $alpha: 0.9);
  position: absolute;
  right: 0;
  top: 0;
  animation-duration: 0.3s;
  &__header {
    .header {
      &__title {
        color: #fff;
        font-size: 20px;
        margin-top: 10px;
        margin-left: 10px;
      }
    }
  }
  &__container {
    overflow-y: auto;
  }
}
</style>
