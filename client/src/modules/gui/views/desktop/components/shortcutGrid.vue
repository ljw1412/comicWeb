<template>
  <div class="shortcut-grid">
    <shortcut v-for="(item,index) of value"
      :key="index"
      :index="index"
      :icon="item.icon"
      :src="item.src"
      :color="item.color"
      :name="item.name"></shortcut>
  </div>
</template>

<script>
import Shortcut from './shortcut'
export default {
  components: {
    Shortcut
  },

  props: {
    value: { type: Array, default: () => [] },
    free: Boolean
  }
}
</script>

<style lang="scss" scoped>
</style>
