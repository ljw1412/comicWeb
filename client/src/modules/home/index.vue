<template>
  <div class="home">
    <div class="home__main"
      @contextmenu.prevent="onContextmenu">
      <contextmenu v-show="contextmenu.isShow"
        ref="contextmenu"
        :x="contextmenu.x"
        :y="contextmenu.y"></contextmenu>
      <router-view/>
      <modal-view></modal-view>
    </div>
    <action-view></action-view>
  </div>
</template>

<script>
import Contextmenu from '../../components/menu/contextmenu'
import ActionView from '../../components/actionView'
import ModalView from '../../components/modalView'

export default {
  components: {
    ModalView,
    Contextmenu,
    ActionView
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
      console.log(this.$refs)
      console.log()

      this.contextmenu.x = e.x
      this.contextmenu.y = e.y
      // this.contextmenu.isShow = !this.contextmenu.isShow
    }
  },
  mounted() {
    // this.$callApi({
    //   method: 'post',
    //   api: 'user/login',
    //   param: {
    //     username: 'lll',
    //     password: '123456'
    //   }
    // }).then(data => {
    //   console.log(data)
    // })
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  &__main {
    height: 100%;
    // height: calc(100% - 40px);
    width: 100%;
  }
}
</style>

