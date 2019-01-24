<script>
export default {
  name: 'VuiTitle',
  render: function(createElement) {
    return createElement('h' + this.level, this.title || this.$slots.default)
  },
  props: {
    level: {
      type: Number,
      default: 1
    },
    title: {
      type: String
    }
  }
}
</script>

<style lang="scss">
</style>

