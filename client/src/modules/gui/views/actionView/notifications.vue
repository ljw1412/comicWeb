// 通知栏
<template>
  <div class="notifications"
    :style="[bgStyle]">
    <div class="notifications__header">
      <div class="header__title">通知</div>
    </div>
    <div class="notifications__container"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Color from 'color'
export default {
  computed: {
    ...mapGetters('gui', ['taskBackgroundColor']),
    bgStyle() {
      return { 'background-color': Color(this.taskBackgroundColor).alpha(0.9) }
    }
  }
}
</script>

<style lang="scss" scoped>
.notifications {
  user-select: none;
  height: 100%;
  width: 100%;
  transition: 1.2s;
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
