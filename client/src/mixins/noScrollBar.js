export default {
  created() {
    $('html').addClass('no-scroll')
  },

  mounted() {
    if (!$('html').hasClass('no-scroll')) {
      $('html').addClass('no-scroll')
    }
  },

  beforeDestroy() {
    $('html').removeClass('no-scroll')
  }
}
