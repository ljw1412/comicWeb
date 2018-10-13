<template>
  <div class="search">
    <i-input class="search__input"
      search
      placeholder="Enter something..."
      @on-search="onSearch" />
    <div class="search__result">
      <comic-item v-for="item of list"
        :key="item.id"
        class="result__item"
        :name="item.name"
        :cover="item.cover"
        :description="item.description"
        @click.native="onComicItemClick(item)"></comic-item>
    </div>
    <i-modal ref="derailModal"
      v-model="isDetailShow"
      footer-hide>
      <div :style="{'backgroud-image':`url(${currentComic.cover})`}"></div>
      <div>{{currentComic.description}}</div>
    </i-modal>
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
      list: [],
      isDetailShow: false,
      currentComic: {}
    }
  },
  methods: {
    setModalNotRadius() {
      this.$refs.derailModal.$refs.content.style.borderRadius = 0
    },
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
    },
    onComicItemClick(item) {
      console.log(item)
      this.currentComic = item
      this.isDetailShow = true
    }
  },
  mounted() {
    this.setModalNotRadius()
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
    .result__item {
      margin: 8px 5px;
    }
  }
  &__detail {
    border-radius: 0;
  }
}

@media screen and (max-width: 1160px) {
  .search {
    .result__item {
      margin: 6px 4px;
    }
  }
}
</style>

