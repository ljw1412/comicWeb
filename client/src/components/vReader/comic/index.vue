<template>
  <div class="v-reader v-comic-reader">
    <operation-area></operation-area>
  </div>
</template>

<script>
import OperationArea from './components/operationArea'
export default {
  components: {
    OperationArea
  }
}
</script>

<style lang="scss" scoped>
.v-reader {
  position: relative;
  height: 100%;
}
</style>
