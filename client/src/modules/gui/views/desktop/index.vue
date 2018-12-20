<template>
  <div class="desktop"
    @contextmenu.prevent="onContextmenu">
    <contextmenu v-show="contextmenu.isShow"
      ref="contextmenu"
      :x="contextmenu.x"
      :y="contextmenu.y"></contextmenu>
    <div class="desktop__shortcut">
      <shortcut v-for="(item,index) of shortcutList"
        :key="index"
        :index="index"
        :icon="item.icon"
        :name="item.name"></shortcut>
    </div>
  </div>
</template>

<script>
import Contextmenu from '../../../../components/menu/contextmenu'
import Shortcut from './components/shortcut'

export default {
  components: {
    Contextmenu,
    Shortcut
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
          icon: 'http://localhost:3000/image/bg/windows10.jpeg',
          name: '测试中文字啊啊湿答答SD大傻叼'
        },
        {
          icon: 'http://localhost:3000/image/bg/windows10.jpeg',
          name: '测试中文字啊啊湿答答SD大傻叼'
        },
        {
          icon: 'http://localhost:3000/image/bg/windows10.jpeg',
          name: '测试中文字啊啊湿答答SD大傻叼'
        },
        {
          icon: 'http://localhost:3000/image/bg/windows10.jpeg',
          name: '测试中文字啊啊湿答答SD大傻叼'
        },
        {
          icon: 'http://localhost:3000/image/bg/windows10.jpeg',
          name: '测试中文字啊啊湿答答SD大傻叼'
        },
        {
          icon: 'http://localhost:3000/image/bg/windows10.jpeg',
          name: '测试中文字啊啊湿答答SD大傻叼'
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
