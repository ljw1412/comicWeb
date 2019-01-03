<template>
  <div class="crawler">
    <page-title summary="(手动管理爬虫状态)">爬虫开关</page-title>
    <div class="crawler__grid">
      <div v-for="(item,index) of websiteList"
        :key="index"
        class="crawler__item">
        <span>{{item.name}}</span>
        <i-button @click="reStartCrawler(item)">{{getRunState(item.state)}}</i-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      websiteList: [
        {
          name: 'mangaBox',
          value: 'mangaBox',
          state: 0
        }
      ]
    }
  },

  methods: {
    getRunState(state) {
      switch (state) {
        case 0:
          return '开始爬取'
        case 1:
          return '正在爬取'
        case 2:
          return '再次爬取'
      }
    },

    reStartCrawler(item) {
      this.$get({
        api: '/comic/crawler',
        param: {
          website: item.value
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
