<template>
  <i-menu :active-name="activeName"
    width="200px"
    @on-select="handleMenuSelect">
    <i-menu-group v-for="group of menuList"
      :key="group.groupName"
      :title="group.groupName">
      <i-menu-item v-for="item of group.itemList || []"
        :key="item.name"
        :name="item.name">
        <span>{{item.label}}</span>
      </i-menu-item>
    </i-menu-group>
  </i-menu>
</template>

<script>
export default {
  data() {
    return {
      activeName: '',
      menuList: [
        {
          groupName: '基础',
          itemList: [
            {
              name: 'vscrollview',
              label: 'ScrollView 滚动布局'
            },
            {
              name: 'vmarquee',
              label: 'Marquee 走马灯文字'
            },
            {
              name: 'vgrid',
              label: 'Grid 网格布局'
            }
          ]
        },
        {
          groupName: '表单',
          itemList: [
            {
              name: 'vinput',
              label: 'Input 输入框'
            }
          ]
        },
        {
          groupName: '自定义',
          itemList: [
            {
              name: 'vreader',
              label: 'VReader 阅读器'
            }
          ]
        }
      ]
    }
  },

  methods: {
    handleMenuSelect(name) {
      this.$router.push({ name })
    }
  },

  mounted() {
    this.activeName = this.$route.name
  }
}
</script>

<style lang="scss">
</style>
