<template>
  <div class="desktop"
    @contextmenu.prevent="onContextmenu">
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.desktop {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
