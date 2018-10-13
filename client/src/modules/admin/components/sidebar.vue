<template>
  <div class="sidebar"
    :class="{'sidebar--notfixed':!isCollapse}">
    <div class="sidebar__list">
      <i-tooltip v-for="(feature,index) of list"
        :key="index"
        transfer
        placement="right"
        style="width: 100%;"
        :content="feature.label"
        :disabled="isCollapse">
        <div class="sidebar__item"
          :class="{'sidebar__item--active': isSelected(feature)}"
          @click="onNavClick(feature)">
          <Icon size="26"
            :type="isSelected(feature) ? 
                        feature.activedIcon : feature.icon " />
          <transition name="fade"
            :duration="300">
            <span class="item__label"
              :class="{'item__label--active': isSelected(feature)}"
              v-show="isCollapse">{{feature.label}}</span>
          </transition>
        </div>
      </i-tooltip>
    </div>
    <div class="sidebar__collapse"
      @click="onCollapseClick">
      <Icon size="26"
        :type="collapseIcon" />
      <transition name="fade"
        :duration="300">
        <span v-show="isCollapse">折叠侧边栏</span>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    collapseIcon() {
      return this.isCollapse ? 'ios-arrow-back' : 'ios-arrow-forward'
    },
    routeName() {
      return this.$route.name
    }
  },
  props: {
    /**
     *  类型:Array<Object>
     *  内部对象格式:{label,componentName,icon,activedIcon}
     */
    list: { type: Array, default: () => [] }
  },
  data() {
    return {
      isCollapse: true,
      currentComponent: ''
    }
  },
  methods: {
    isSelected(feature) {
      return feature.componentName === this.currentComponent
    },
    onCollapseClick() {
      this.isCollapse = !this.isCollapse
    },
    onNavClick(feature) {
      if (this.currentComponent != feature.componentName) {
        this.$router.push({ name: feature.componentName })
      }
    }
  },
  mounted() {
    this.currentComponent = this.$route.name
  },
  watch: {
    routeName(val) {
      this.currentComponent = val
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  transition: 0.3s;
}
.sidebar {
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  height: 100%;
  width: 200px;
  // background: #19be6b;
  &--notfixed {
    width: 48px;
  }

  &__list {
    flex-grow: 1;
    height: 100%;
    padding-bottom: 60px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
  }
  &__item {
    cursor: pointer;
    flex-shrink: 0;
    display: flex;
    height: 48px;
    width: 100%;
    line-height: 48px;
    align-items: center;
    padding-left: 11px;
    overflow: hidden;
    color: #fff;
    &--active,
    &:hover {
      background-color: rgba($color: #000000, $alpha: 0.1);
    }
    .item__label {
      flex-shrink: 0;
      padding-left: 10px;
      font-size: 14px;
      &--active {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

  &__collapse {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 48px;
    line-height: 48px;
    color: #fff;
    font-size: 16px;
    padding-left: 11px;
    overflow: hidden;
    cursor: pointer;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    span {
      flex-shrink: 0;
      padding-left: 5px;
    }
    &:hover {
      background-color: rgba($color: #000000, $alpha: 0.1);
    }
  }
}
</style>
