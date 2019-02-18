<template>
  <div class="vui">
    <div class="header">header</div>
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
import SideMenu from './base/sideMenu'
export default {
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
    flex-shrink: 0;
    height: 48px;
  }
  .main {
    flex-grow: 1;
    display: flex;
    .menu {
      margin-right: -10px;
      flex-shrink: 0;
    }
    .content {
      flex-grow: 1;
    }
  }

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
</style>
