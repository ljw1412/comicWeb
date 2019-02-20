<template>
  <div class="gui">
    <desktop :os="os"
      :style="desktopStyle"></desktop>
    <task-layer ref="taskLayer"
      @close="onTaskClose">
      <search-form v-for="item of taskSearchList"
        :key="item.id"></search-form>
      <detail-form v-for="item of taskDetailList"
        :key="item.id"
        :data="item.data"></detail-form>
      <reader-form v-for="item of taskReaderList"
        :key="item.id"
        :data="item.data"></reader-form>
      <!-- <setting-form></setting-form> -->
    </task-layer>
    <action-view :os="os"></action-view>
  </div>
</template>

<script>
import Desktop from './views/desktop'
import ActionView from './views/actionView'
import TaskLayer from './views/taskLayer'
import SearchForm from './views/forms/search'
import DetailForm from './views/forms/detail'
import ReaderForm from './views/forms/reader'
// import SettingForm from './views/forms/setting'
import noScrollBar from '@/mixins/noScrollBar'
import { on, off } from '../../utils/dom.js'
import { mapState, mapMutations } from 'vuex'
import Color from 'color'
import themeColor from '../../utils/themeColor.js'

export default {
  name: 'Gui',

  mixins: [noScrollBar],

  components: {
    Desktop,
    ActionView,
    TaskLayer,
    SearchForm,
    DetailForm,
    ReaderForm
    // SettingForm
  },

  computed: {
    ...mapState('gui', ['os', 'taskTree', 'desktop']),

    taskSearchList() {
      return this.taskTree['TaskSearch']
        ? this.taskTree['TaskSearch'].tasks
        : []
    },

    taskDetailList() {
      return this.taskTree['TaskDetail']
        ? this.taskTree['TaskDetail'].tasks
        : []
    },

    taskReaderList() {
      return this.taskTree['TaskReader']
        ? this.taskTree['TaskReader'].tasks
        : []
    },

    desktopStyle() {
      const style = {}
      if (this.desktop.isPure) {
        style['background-color'] = this.desktop.themeColor
      } else {
        style['background-image'] = `url('${this.desktop.imageUrl}')`
      }
      return style
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
      'CHANGE_OS',
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

    onTaskClose(componentName) {
      console.log('close', componentName)
    },

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
    },

    // 将本地储存加载到Vuex中
    initLocalStorage2Vuex() {
      this.CHANGE_OS(Store.get('theme-os') || '')
    }
  },

  watch: {
    taskTree(val) {
      console.log('taskTree', val)
    },
    'desktop.imageUrl'() {
      this.getThemeColor()
    }
  },

  mounted() {
    this.initLocalStorage2Vuex()
    this.addResizeListener()
    this.$eventBus.$on('close', data => {
      console.log(data)
    })
    this.getThemeColor()
    // window.SET_WALLPAPER = this.SET_WALLPAPER
  },

  beforeDestroy() {
    this.removeResizeListener()
  }
}
</script>

<style lang="scss">
.gui {
  height: 100%;
  max-height: 100%;
  overflow: hidden;

  /* 滚动条整体 */
  ::-webkit-scrollbar {
    // width: 6px;
    // height: 6px;
    width: 0;
    height: 0;
    background-color: transparent;
  }

  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 100px;
    transition: background-color 0.12s ease-out;
    &:hover {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }

  /* 滚动条轨道 */
  ::-webkit-scrollbar-track {
    background-color: transparent;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>

