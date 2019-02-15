<template>
  <div class="comic">
    <!-- <div class="comic__header"></div>
    <div class="comic__sider"></div> -->
    <user-bar></user-bar>
    <div class="comic__body">
      <router-view />
    </div>
  </div>
</template>

<script>
import UserBar from '../components/userBar'
export default {
  components: {
    UserBar
  }
}
</script>

<style lang="scss" scoped>
.comic {
  position: relative;
  height: 100%;
  overflow: hidden;

  &__header {
    height: 60px;
    background-color: #ccc;
  }

  &__sider {
    position: absolute;
    width: 250px;
    left: 0;
    top: 60px;
    bottom: 0;
    background-color: #aaa;
  }

  &__body {
    height: calc(100% - 60px);
  }
}
</style>
