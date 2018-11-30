// 通知栏
<template>
  <div class="notifications">
    <div class="notifications__header">
      <div class="header__title">通知</div>
    </div>
    <div class="notifications__container"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.notifications {
  user-select: none;
  height: 100%;
  width: 100%;
  background-color: rgba($color: #ccc, $alpha: 0.9);
  &__header {
    .header {
      &__title {
        color: #fff;
        font-size: 20px;
        padding-top: 10px;
        padding-left: 10px;
      }
    }
  }
  &__container {
    overflow-y: auto;
  }
}
</style>
