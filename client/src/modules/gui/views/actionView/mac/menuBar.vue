<template>
  <div class="menu-bar">
  </div>
</template>

<script>
export default {
  name: 'MenuBar'
}
</script>

<style lang="scss" scoped>
* {
  user-select: none;
}

.menu-bar {
  position: absolute;
  z-index: 99999;
  top: 0;
  height: 20px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
