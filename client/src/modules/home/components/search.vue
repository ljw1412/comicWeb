<template>
  <div class="search">
    <i-input class="search__input"
      search
      placeholder="Enter something..."
      @on-search="onSearch" />
    <div class="search__result">
      <comic-item v-for="item of list"
        :key="item.id"
        :name="item.name"
        :cover="item.cover"
        :description="item.description"></comic-item>
    </div>
  </div>
</template>

<script>
import ComicItem from './comicItem'
export default {
  components: {
    ComicItem
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    onSearch(value) {
      if (!value.trim()) return
      this.$callApi({
        method: 'post',
        api: '/comic/search',
        param: {
          website: 'dmzj',
          keyword: value
        }
      }).then(data => {
        this.list = data
      })
    }
  }
}
</script>

<style lang="scss">
.search {
  height: 100%;
  display: flex;
  flex-direction: column;
  &__input {
    flex-shrink: 0;
  }
  &__result {
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>

