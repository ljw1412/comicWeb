<template>
  <modal-view class="search-modal"
    resizable
    icon="ios-search"
    :title="title">

  </modal-view>
</template>

<script>
import ModalView from '../../../components/modalView'
export default {
  components: {
    ModalView
  },
  data() {
    return {
      title: '搜索'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
