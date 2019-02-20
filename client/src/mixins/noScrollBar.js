export default {
  created() {
    $('html').addClass('no-scroll')
  },
  beforeDestroy() {
    $('html').removeClass('no-scroll')
  }
}
