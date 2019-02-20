<template>
  <div class="search-wrapper">
    <div class="search">
      <div ref="searchInput"
        class="search__input-wrapper"
        :class="{'search__input-wrapper--isSearched':isSearched}">
        <div class="search__input">
          <i-input v-model="keyword"
            search
            @on-search="search"></i-input>
        </div>
      </div>
      <div v-show="isDisplayResult"
        class="search__result">
        <div v-for="item of comicList"
          :key="item.comicId"
          class="result__item">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { on, off } from '../../../utils/dom'
export default {
  computed: {
    scrollViewInnerStyle() {
      const style = { width: '100%' }
      !this.isDisplayResult && (style.height = '100%')
      return style
    }
  },

  data() {
    return {
      keyword: '',
      isSearched: false,
      isDisplayResult: false,
      comicList: [],
      website: 'dmzj',
      page: 1
    }
  },

  methods: {
    search(keyword) {
      if (!keyword.trim()) return
      this.comicList = []
      this.isSearched = true
      this.$callApi({
        method: 'post',
        api: '/comic/search',
        param: {
          website: this.website,
          keyword,
          page: this.page
        }
      }).then(data => {
        this.comicList = data.list
      })
    },

    displayResult(event) {
      if (event.propertyName === 'height') {
        this.isDisplayResult = true
        off(this.$refs.searchInput, 'transitionend', this.displayResult)
      }
    }
  },

  mounted() {
    on(this.$refs.searchInput, 'transitionend', this.displayResult)
  }
}
</script>

<style lang="scss" scoped>
.search-wrapper {
  position: relative;
  height: 100%;
  overflow: auto;
  .search {
    height: 100%;
    &__input-wrapper {
      position: fixed;
      top: 0;
      height: 100%;
      width: 100%;
      background-color: #fff;
      transition: height 1s;
      &--isSearched {
        height: 80px;
      }

      .search__input {
        position: absolute;
        width: 500px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    &__result {
      margin-top: 80px;
      background-color: #abcabc;
    }
  }
}
</style>
