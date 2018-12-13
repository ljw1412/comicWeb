<template>
  <div class="gui">
    <div class="desktop"
      @contextmenu.prevent="onContextmenu"
      :style="desktopStyle"></div>
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
    </task-layer>
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
import SettingModal from './views/settingModal'

import { on, off } from '../../utils/dom.js'
import { mapState, mapMutations } from 'vuex'
import Color from 'color'
import themeColor from '../../utils/themeColor.js'

export default {
  components: {
    ModalView,
    Contextmenu,
    ActionView,
    TaskLayer,
    SearchModal,
    DetailModal,
    SettingModal
  },

  computed: {
    ...mapState('gui', ['taskTree', 'desktop']),
    taskDetailList() {
      if (this.taskTree['TaskDetail']) {
        return this.taskTree['TaskDetail'].tasks
      }
      return []
    },
    desktopStyle() {
      if (this.desktop.isPure) {
        return { 'background-color': this.desktop.themeColor }
      } else {
        return { 'background-image': `url('${this.desktop.imageUrl}')` }
      }
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
    ...mapMutations('gui', ['UPDATE_TASK', 'SET_THEME_COLOR', 'SET_WALLPAPER']),
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

    onTaskClose(componentName) {},

    getThemeColor() {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.src = this.desktop.imageUrl
      img.onload = () => {
        themeColor(img).then(data => {
          const primaryColor = Color.rgb(data[0])
          this.SET_THEME_COLOR(primaryColor.hex())
        })
      }
    }
  },

  watch: {
    taskTree(val) {
      console.log(val)
    },
    'desktop.imageUrl'(val) {
      this.getThemeColor()
    }
  },

  mounted() {
    this.addResizeListener()
    this.$eventBus.$on('close', data => {
      console.log(data)
    })
    this.getThemeColor()

    window.SET_WALLPAPER = this.SET_WALLPAPER
  },

  beforeDestroy() {
    this.removeResizeListener()
  }
}
</script>

<style lang="scss" scoped>
.gui {
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  .desktop {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
</style>

