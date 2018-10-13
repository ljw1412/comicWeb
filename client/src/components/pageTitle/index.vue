<script>
export default {
  name: 'pageTitle',
  render: function(createElement) {
    return createElement('div', { class: { 'page-title': true } }, [
      createElement('h' + this.level, this.title || this.$slots.default),
      createElement('h3', this.summary || this.$slots.summary)
    ])
  },
  props: {
    level: {
      type: Number,
      default: 1
    },
    title: {
      type: String
    },
    summary: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.page-title {
  margin-bottom: 10px;
  * {
    display: inline-block;
  }
  h3 {
    margin-left: 5px;
  }
}
</style>

