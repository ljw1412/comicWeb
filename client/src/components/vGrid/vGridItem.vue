<template>
  <div ref="gridItem"
    class="v-grid-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VGridItem'
}
</script>

<style lang="scss">
.v-grid-item {
  display: inline-block;
  box-sizing: border-box;
}
</style>
