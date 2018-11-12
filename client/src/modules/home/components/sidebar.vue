<template>
  <div v-if="isShow"
    class="sidebar"
    :style="siderbarStyle">
    <div class="sidebar__warpper">
      <div v-for="(item,index) of itemList"
        :key="index"
        class="sidebar__item">{{item.label}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 0:left-top;1:right-top;2:left-bottom;3:right-bottom
    postion: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    isTop() {
      return [0, 1, '0', '1'].includes(this.postion)
    },
    isLeft() {
      return [0, 2, '0', '2'].includes(this.postion)
    },
    siderbarStyle() {
      const style = {
        [this.isTop ? 'top' : 'bottom']: '20px',
        [this.isLeft ? 'left' : 'right']: '20px'
      }
      return style
    }
  },
  data() {
    return {
      isShow: false,
      itemList: [
        {
          type: 'user',
          label: '个人中心',
          value: 'user'
        },
        {
          type: 'nav',
          label: '历史记录',
          value: 'user'
        },
        {
          type: 'nav',
          label: '漫画收藏',
          value: 'user'
        }
      ]
    }
  },
  mounted() {
    // 在底部时倒序
    if (!this.isTop) {
      this.itemList = this.itemList.reverse()
    }
    this.isShow = true
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: absolute;
  &__item {
    height: 45px;
    width: 45px;
    border-radius: 50%;
    background-color: aquamarine;
  }
}
</style>
