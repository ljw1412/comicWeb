<template>
  <div class="admin"
    :style="{backgroundColor:theme.bgColor}">
    <topbar @event="onTopBarEvent"></topbar>
    <div class="admin__container">
      <div class="admin__sidebar">
        <sidebar :list="featureList"></sidebar>
      </div>
      <div class="admin__router-view">
        <router-view/>
      </div>
    </div>
    <skin-picker :visible.sync="isSkinShow"></skin-picker>
  </div>
</template>

<script>
import Topbar from './components/topbar'
import Sidebar from './components/sidebar'
import SkinPicker from './components/skinPicker'
import { mapState, mapMutations } from 'vuex'
import { SET_THEME } from '@/store/admin.js'

export default {
  components: {
    SkinPicker,
    Topbar,
    Sidebar
  },
  computed: {
    ...mapState('admin', {
      theme: state => state.theme
    })
  },
  data() {
    return {
      isSkinShow: false,
      featureList: [
        {
          label: '仪表盘',
          componentName: 'dashboard',
          icon: 'ios-analytics-outline',
          activedIcon: 'ios-analytics'
        },
        {
          label: '开发进度',
          componentName: 'progress',
          icon: 'ios-bulb-outline',
          activedIcon: 'ios-bulb'
        }
      ]
    }
  },
  methods: {
    ...mapMutations('admin', [SET_THEME]),
    onTopBarEvent(eventName) {
      switch (eventName) {
        case 'skin':
          this.isSkinShow = true
          break
      }
    }
  },
  created() {
    this.SET_THEME(Store.get('theme'))
  }
}
</script>

<style lang="scss" scoped>
.admin {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(0, 128, 0);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  &__sidebar {
    flex-shrink: 0;
  }
  &__container {
    flex-grow: 1;
    height: 0;
    display: flex;
  }
  &__router-view {
    background-color: #fff;
    overflow-y: auto;
    flex-grow: 1;
    width: 0;
    padding: 15px 20px;
  }
}
</style>

