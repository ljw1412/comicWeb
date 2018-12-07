<template>
  <div class="home">
    <div class="home__main">
      <div class="main__warpper"
        @contextmenu.prevent="onContextmenu"></div>
      <contextmenu v-show="contextmenu.isShow"
        ref="contextmenu"
        :x="contextmenu.x"
        :y="contextmenu.y"></contextmenu>
      <task-layer ref="taskLayer"
        @close="onTaskClose">
        <search-modal></search-modal>
        <detail-modal v-for="(item,index) of taskDetailList"
          :key="index"
          :data="item.config"></detail-modal>
        <!-- <modal-view resizable
          :window-height="view.height"
          :window-width="view.width"
          :body-style="{'background-color':'#ccc'}"> 
        </modal-view>-->
      </task-layer>
    </div>
    <action-view></action-view>
  </div>
</template>

<script>
import Contextmenu from '../../components/menu/contextmenu'
import ActionView from './views/actionView'
import ModalView from '../../components/modalView'
import TaskLayer from './views/taskLayer'
import SearchModal from './views/searchModal'
import DetailModal from './views/detailModal'

import { on, off } from '../../utils/dom.js'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    ModalView,
    Contextmenu,
    ActionView,
    TaskLayer,
    SearchModal,
    DetailModal
  },

  computed: {
    ...mapState('gui', ['taskTree']),
    taskDetailList() {
      if (this.taskTree['TaskDetail']) {
        return this.taskTree['TaskDetail'].tasks
      }
      return []
    }
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
    ...mapMutations('gui', ['ADD_TASK']),
    onContextmenu(e) {
      console.log(e)

      this.contextmenu.x = e.x
      this.contextmenu.y = e.y
      console.log(this.$refs.taskLayer)
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
    },

    onTaskClose(componentName) {}
  },

  watch: {
    taskTree(val) {
      console.log(val)
    }
  },

  mounted() {
    this.addResizeListener()
    this.$eventBus.$on('close', data => {
      console.log(data)
    })
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

