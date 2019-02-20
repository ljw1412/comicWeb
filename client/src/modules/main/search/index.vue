<template>
  <div class="search-wrapper">
    <div class="search">
      <div ref="searchInput"
        class="search__input-wrapper"
        :class="{
          'search__input-wrapper--isSearched':isSearched,
          'search__input-wrapper--shadow':isDisplayResult
        }">
        <div class="search__input">
          <i-input v-model="keyword"
            search
            :size="isSearched ? 'small':'default'"
            @on-search="search"></i-input>
        </div>
      </div>
      <div v-show="isDisplayResult"
        class="search__result">
        <div class="result__statistics">为您找到相关漫画{{count}}</div>
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
      count: 0,
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
  .search {
    height: 100%;

    &__input-wrapper {
      position: fixed;
      top: 0;
      height: 100%;
      width: 100%;
      background-color: #fff;
      border-bottom: 1px solid #ebebeb;
      transition: height 1s;
      * {
        transition-duration: 1s;
      }
      &--shadow {
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.4);
      }
      &--isSearched {
        height: 40px;
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
      margin: 40px auto 0 auto;
      background-color: #abcabc;
      width: 1160px;
      @media screen and (max-width: 1400px) {
        width: 980px;
      }
    }
  }
}
</style>
