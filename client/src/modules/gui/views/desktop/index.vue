<template>
  <div class="desktop"
    @contextmenu.prevent="onContextmenu">
    <contextmenu v-show="contextmenu.isShow"
      ref="contextmenu"
      :x="contextmenu.x"
      :y="contextmenu.y"></contextmenu>

  </div>
</template>

<script>
import Contextmenu from '../../../../components/menu/contextmenu'

export default {
  components: {
    Contextmenu
  },

  data() {
    return {
      contextmenu: {
        x: 0,
        y: 0,
        isShow: true
      }
    }
  },

  methods: {
    onContextmenu(e) {
      console.log(e)

      this.contextmenu.x = e.x
      this.contextmenu.y = e.y
      console.log(this.$refs.taskLayer)
    }
  }
}
</script>

<style lang="scss" scoped>
.desktop {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
