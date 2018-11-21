<template>
  <div class="main">
    <search></search>
  </div>
</template>

<script>
import search from '../components/search'
export default {
  components: {
    search
  }
}
</script>

<style lang="scss" scoped>
.main {
  overflow-y: auto;
  height: 100%;
  border: 1px solid #e8eaec;
  border-radius: 5px;
}
</style>

