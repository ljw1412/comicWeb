<template>
  <div class="home">
    <div class="home__main">
      <div class="main__warpper"
        @contextmenu.prevent="onContextmenu"></div>
      <contextmenu v-show="contextmenu.isShow"
        ref="contextmenu"
        :x="contextmenu.x"
        :y="contextmenu.y"></contextmenu>
      <!-- <modal-view :window-height="view.height"
        :window-width="view.width"
        resizable>
      </modal-view> -->
      <search-modal></search-modal>
      <!-- <modal-view resizable
        :body-style="{'background-color':'#ccc'}">
      </modal-view> -->

    </div>
    <action-view></action-view>
  </div>
</template>

<script>
import Contextmenu from '../../components/menu/contextmenu'
import ActionView from '../../components/actionView'
import ModalView from '../../components/modalView'
import SearchModal from './pages/searchModal'

import { on, off } from '../../utils/dom.js'

export default {
  components: {
    ModalView,
    Contextmenu,
    ActionView,
    SearchModal
  },
  data() {
    return {
      view: {
        width: 0,
        height: 0
      },
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
    },
    resizeListener() {
      this.view.width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      this.view.height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
    },
    addResizeListener() {
      this.resizeListener()
      on(window, 'resize', this.resizeListener)
    },
    removeResizeListener() {
      off(window, 'resize', this.resizeListener)
    }
  },
  mounted() {
    this.addResizeListener()
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
  },
  beforeDestroy() {
    this.removeResizeListener()
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
    width: 100%;
    .main__warpper {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

