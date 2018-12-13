<template>
  <div class="setting">

  </div>
</template>

<script>
import ModalView from '../../../../components/modalView'
import customModal from '../../mixins/customModal.js'

export default {
  mixins: [customModal],

  components: {
    ModalView
  },

  beforeCreate() {
    this.name = 'TaskSetting'
  }
}
</script>

<style lang="scss" scoped>
</style>
