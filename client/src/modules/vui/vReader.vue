<template>
  <div class="ui-component-reader">
    <h1>VReader</h1>
    <h2></h2>
    <div style="height:300px;">
      <v-comic-reader></v-comic-reader>
    </div>
  </div>
</template>

<script>
import { VComicReader } from '@/components/vReader'
export default {
  components: { VComicReader }
}
</script>

<style lang="scss" scoped>
</style>
