<template>
  <div class="search">
    <i-input class="search__input"
      search
      placeholder="请输入关键词..."
      @on-search="onSearch">
      <i-select v-model="website"
        slot="prepend"
        placeholder="请选择站点"
        style="width: 120px">
        <i-option v-for="website of websiteList"
          :key="website.id"
          :value="website.value"
          :label="website.label"></i-option>
      </i-select>
    </i-input>
    <div class="search__result">
      <comic-item v-for="item of list"
        :key="item.id"
        class="result__item"
        :name="item.name"
        :cover="item.cover"
        :description="item.description"
        @click.native="onComicItemClick(item)"></comic-item>
    </div>
  </div>
</template>

<script>
import ComicItem from '../components/comicItem'
export default {
  components: { ComicItem },
  data() {
    return {
      list: [],
      currentComic: {},
      website: '',
      websiteList: [{ id: 0, value: '33', label: '11' }]
    }
  },
  methods: {
    search(keyword) {
      this.$callApi({
        method: 'post',
        api: '/comic/search',
        param: {
          website: 'dmzj',
          keyword
        }
      }).then(data => {
        this.list = data
      })
    },

    onSearch(value) {
      if (!value.trim()) return
      this.search(value)
    },

    onComicItemClick(item) {
      this.currentComic = item
      this.isDetailShow = true
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.search {
  * {
    user-select: none;
  }
  overflow-y: auto;
  height: 100%;
  margin-right: 2px;
  &__result {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>

