<template>
  <aside class="sidebar"
    :class="{'sidebar--collapsed':isCollapsed}">
    <avatar-area :isCollapsed="isCollapsed"></avatar-area>

    <div class="sidebar__toggle"
      @click="isCollapsed =! isCollapsed"></div>
  </aside>
</template>

<script>
import AvatarArea from './avatarArea'
export default {
  components: {
    AvatarArea
  },

  props: {
    isFixed: Boolean
  },

  data() {
    return {
      isCollapsed: true
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  user-select: none;
}
.sidebar {
  position: relative;
  width: 360px;
  height: 100%;
  background-color: #00baff;
  transition-duration: 0.5s;
  &__toggle {
    position: absolute;
    width: 100%;
    height: 50px;
    left: 0;
    bottom: 0;
    transition-duration: 0.3s;
    &::after {
      position: absolute;
      top: 50%;
      right: 50%;
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      border-style: solid solid none none;
      border-width: 1px 1px 0 0;
      border-color: #000;
      transform: matrix(0.71, 0.71, -0.71, 0.71, 1, 1) translate(-50%, -50%);
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.4);
    }
  }

  &.sidebar--collapsed {
    width: 50px;
  }
}
</style>
