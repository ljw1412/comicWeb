<template>
  <div class="desktop"
    @contextmenu.prevent="onContextmenu">
    <contextmenu v-show="contextmenu.isShow"
      ref="contextmenu"
      :x="contextmenu.x"
      :y="contextmenu.y"></contextmenu>
    <div class="desktop__shortcut">
      <shortcut-grid v-model="shortcutList"></shortcut-grid>
    </div>
  </div>
</template>

<script>
import Contextmenu from '../../../../components/menu/contextmenu'
import ShortcutGrid from './components/shortcutGrid'

export default {
  name: 'Desktop',

  components: {
    Contextmenu,
    ShortcutGrid
  },

  data() {
    return {
      contextmenu: {
        x: 0,
        y: 0,
        isShow: false
      },
      shortcutList: [
        {
          icon: 'md-search',
          name: '漫画搜索',
          color: '#FFF',
          launch: 'TaskSearch'
        },
        {
          icon: 'md-notifications-outline',
          name: '测试中文字啊啊湿答答SD大傻叼',
          color: '#F00'
        },
        {
          icon: 'md-notifications-outline',
          name: '测试中文字啊啊湿答答SD大傻叼',
          color: '#00F'
        }
      ]
    }
  },

  methods: {
    onContextmenu(e) {
      console.log(e)

      this.contextmenu.x = e.x
      this.contextmenu.y = e.y
      console.log(this.$refs.taskLayer)
    },

    onShortcutMove(event, originalEvent) {
      console.log(event, originalEvent)
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  user-select: none;
}
.desktop {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  &__shortcut {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
}
</style>
