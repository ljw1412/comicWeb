<template>
  <div class="gui">
    <desktop :style="desktopStyle"></desktop>
    <task-layer ref="taskLayer"
      @close="onTaskClose">
      <!-- <search-form></search-form> -->
      <!-- <detail-form v-for="(item,index) of taskDetailList"
        :key="index"
        :data="item.config"></detail-form> -->
      <!-- <setting-form></setting-form> -->
    </task-layer>
    <action-view></action-view>
  </div>
</template>

<script>
import Desktop from './views/desktop'
import ActionView from './views/actionView'
import TaskLayer from './views/taskLayer'
import VForm from '../../components/vForm'
import SearchForm from './views/forms/search'
import DetailForm from './views/forms/detail'
import SettingForm from './views/forms/setting'

import { on, off } from '../../utils/dom.js'
import { mapState, mapMutations } from 'vuex'
import Color from 'color'
import themeColor from '../../utils/themeColor.js'

export default {
  components: {
    Desktop,
    ActionView,
    TaskLayer,
    VForm,
    SearchForm,
    DetailForm,
    SettingForm
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
      }
    }
  },

  methods: {
    ...mapMutations('gui', [
      'UPDATE_TASK',
      'SET_THEME_COLOR',
      'SET_WALLPAPER',
      'SET_WINDOW_SIZE'
    ]),

    resizeListener() {
      this.view.width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      this.view.height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
      this.SET_WINDOW_SIZE(this.view)
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
        // 主题色获取后调教
        themeColor(img).then(data => {
          let primaryColor = Color.rgb(data[0])
          // if (primaryColor.isLight()) {
          //   primaryColor = primaryColor.darken(1)
          // }
          // if (primaryColor.isDark()) {
          //   primaryColor = primaryColor.lighten(1)
          // }
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
}
</style>

