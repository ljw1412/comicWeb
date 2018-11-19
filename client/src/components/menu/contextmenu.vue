<template>
  <div class="contextmenu"
    :style="{top:mX,left:mY}">
    <ul>
      <li>菜单一</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
    x: [String, Number],
    y: [String, Number]
  },
  data() {
    return {
      mX: '',
      mY: ''
    }
  },
  mounted() {},
  watch: {
    x(val) {
      mX = val
    },
    y(val) {
      mY = val
    }
  }
}
</script>

<style lang="scss" scoped>
.contextmenu {
  position: absolute;
}
</style>
