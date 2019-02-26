<template>
  <div class="search-wrapper">
    <div class="search">
      <div ref="searchInput"
        class="search__input-wrapper"
        :class="{
          'search__input-wrapper--isSearched':isSearched,
          'search__input-wrapper--shadow':isShowShadow
        }">
        <div class="search__input">
          <i-input v-model="keyword"
            search
            :size="isSearched ? 'small':'default'"
            @on-search="search"></i-input>
        </div>
      </div>
      <div v-show="isSearched"
        class="search__result">
        <div class="result__statistics">为您找到相关漫画 <span class="result__count">{{count}}</span> 本</div>
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
      return style
    }
  },

  data() {
    return {
      keyword: '',
      isSearched: false,
      isShowShadow: false,
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
      }).then(({ list, count }) => {
        this.comicList = list
        this.count = count
        this.isShowShadow = true
      })
    }
  },

  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.search-wrapper {
  position: relative;
  height: 100%;
  .search {
    height: 100%;
    &__input-wrapper {
      height: 100%;
      position: fixed;
      top: 0;
      height: 100%;
      width: 100%;
      background-color: #fff;
      border-bottom: 1px solid #ebebeb;
      // transition: height 2s;
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
      width: 1160px;
      @media screen and (max-width: 1400px) {
        width: 980px;
      }
      .result {
        &__statistics {
          color: #999;
          font-size: 12px;
          padding: 10px 0;
        }
        &__count {
          color: $primary-color;
        }
      }
    }
  }
}
</style>
