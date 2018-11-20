<template>
  <div class="contextmenu"
    :style="{top:mY,left:mX}">
    <ul>
      <li>菜单一</li>
      <li>菜单二</li>
      <li>菜单三</li>
      <li>菜单四</li>
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
      if (typeof val === 'number') val += 'px'
      this.mX = val
    },
    y(val) {
      if (typeof val === 'number') val += 'px'
      this.mY = val
    }
  }
}
</script>

<style lang="scss" scoped>
.contextmenu {
  position: absolute;
  z-index: 9980;
  user-select: none;
  border: 1px solid #ccc;
}
ul {
  list-style: none;
  li {
    line-height: 20px;
    padding: 3px 10px;
    font-size: 16px;
  }
}
</style>
