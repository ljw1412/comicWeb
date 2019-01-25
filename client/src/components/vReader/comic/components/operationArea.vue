<template>
  <div ref="area"
    class="operation-area"
    @click="onClick">
  </div>
</template>

<script>
export default {
  props: {
    isVertical: Boolean
  },

  methods: {
    onClick(e) {
      const area = this.$refs.area.getBoundingClientRect()
      this.$emit('click', {
        x: e.offsetX,
        y: e.offsetY,
        width: area.width,
        height: area.height
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.operation-area {
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
}
</style>
