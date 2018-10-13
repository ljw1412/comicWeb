<template>
  <div class="topbar">
    <div class="topbar__left"></div>
    <div class="topbar__center"></div>
    <div class="topbar__right">
      <div v-for="(icon,index) of functionIcon"
        :key="index"
        class="icon"
        @mouseenter="icon.isHover = true"
        @mouseleave="icon.isHover = false">
        <Icon size="30"
          :type="icon.isHover ? icon.hoverIcon : icon.icon"
          @click="onSkinClick" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      functionIcon: [
        {
          label: '换肤',
          name: 'skin',
          icon: 'ios-color-palette-outline',
          hoverIcon: 'ios-color-palette',
          isHover: false
        }
      ]
    }
  },
  methods: {
    onSkinClick() {
      this.$emit('event', 'skin')
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.topbar {
  width: 100%;
  height: 50px;
  z-index: 997;
  display: flex;
  &__left {
    flex-shrink: 0;
    width: 100px;
  }
  &__center {
    flex: 1;
  }
  &__right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
    color: #fff;
  }
  .icon {
    cursor: pointer;
  }
}
</style>
