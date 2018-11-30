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
      <task-layer ref="taskLayer"
        @close="onTaskClose">
        <search-modal></search-modal>
        <modal-view resizable
          :body-style="{'background-color':'#ccc'}">
        </modal-view>
      </task-layer>

      <!-- <modal-view resizable
        :body-style="{'background-color':'#ccc'}">
      </modal-view> -->

    </div>
    <action-view :taskList='taskList'></action-view>
  </div>
</template>

<script>
import Contextmenu from '../../components/menu/contextmenu'
import ActionView from './views/actionView'
import ModalView from '../../components/modalView'
import TaskLayer from './views/taskLayer'
import SearchModal from './views/searchModal'

import { on, off } from '../../utils/dom.js'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    ModalView,
    Contextmenu,
    ActionView,
    TaskLayer,
    SearchModal
  },

  computed: {
    ...mapState('gui', ['taskList'])
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
      // taskList: []
    }
  },

  methods: {
    ...mapMutations('gui', ['ADD_TASK']),
    onContextmenu(e) {
      console.log(e)

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
    },

    onTaskClose(componentName) {
      // console.log(componentName)
      // let index = this.taskList.findIndex(item => item.name === componentName)
      // if (index != -1) {
      //   // this.taskList.splice(index, 1)
      //   this.taskList[index].component.isClose = true
      //   this.taskList[index].isClose = true
      // }
    },

    initTaskList() {
      console.log(this.$refs['taskLayer'].$children)
      if (this.$refs.taskLayer && this.$refs.taskLayer.$children.length) {
        this.$refs.taskLayer.$children.forEach(item => {
          this.ADD_TASK({
            component: item,
            name: item.name,
            isDisplay: true,
            isClose: false
          })
        })
      }
    }
  },
  mounted() {
    this.addResizeListener()
    this.initTaskList()
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

