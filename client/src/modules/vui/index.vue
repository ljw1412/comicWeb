<template>
  <div class="vui">
    <div class="header">
      <div class="header__logo">VUI</div>
    </div>
    <div class="main">
      <v-scroll-view class="menu"
        right="17px">
        <side-menu></side-menu>
      </v-scroll-view>
      <v-scroll-view class="content"
        innerStyle="width: 100%; padding: 10px;">
        <router-view />
      </v-scroll-view>
    </div>
  </div>
</template>

<script>
import VScrollView from '@/components/vScrollView'
import noScrollBar from '@/mixins/noScrollBar'
import SideMenu from './base/sideMenu'

export default {
  mixins: [noScrollBar],

  components: {
    VScrollView,
    SideMenu
  },

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="scss">
.vui {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    z-index: 100;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.4);
    flex-shrink: 0;
    height: 48px;
    &__logo {
      user-select: none;
      font-size: 30px;
      width: 100px;
      text-align: center;
    }
  }
  .main {
    z-index: 0;
    flex-grow: 1;
    display: flex;
    .menu {
      margin-right: -10px;
      flex-shrink: 0;
    }
    .content {
      flex-grow: 1;
      h1 {
        font-size: 26px;
        font-weight: 400;
        margin: 10px 0;
      }

      h2 {
        font-size: 20px;
        font-weight: 400;
        margin: 8px 0;
      }

      h3 {
        font-size: 16px;
        font-weight: 400;
        margin: 5px 0;
      }

      h4 {
        font-size: 14px;
        font-weight: 400;
      }

      h5,
      h6 {
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
}
</style>
