<template>
  <div class="search">
    <v-loading-bar ref="loadBar"
      class="loading-bar"
      v-model="isLoading"></v-loading-bar>
    <div class="search__header"
      :class="{'search__header--open':isSearching}">
      <div class="header__search-input-wrapper">
        <input ref="iSearch"
          v-model="keyword"
          type="text"
          placeholder="输入关键词"
          class="header__search-input"
          :class="{'header__search-input--open':isSearching}"
          @focus="handleInputFocus"
          @keydown.enter="search" />
        <div v-show="isSearching"
          class="header__info">回车搜索，ESC 关闭</div>
      </div>
    </div>
    <div class="search__result-wrapper"
      :class="{'search__result-wrapper--move' : isSearching}">
      <div v-if="count"
        class="result__statistics">为您找到相关漫画 <span class="result__count">{{count}}</span> 本</div>
      <div v-for="item of comicList"
        :key="item.comicId"
        class="result__item">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import { on, off } from '../../../utils/dom'
import { VLoadingBar } from '@/components/vLoading'
import noScrollBar from '@/mixins/noScrollBar'
export default {
  mixins: [noScrollBar],

  components: {
    VLoadingBar
  },

  computed: {},

  data() {
    return {
      keyword: '',
      isSearching: false,
      isLoading: false,
      comicList: [],
      count: 0,
      website: 'dmzj',
      page: 1
    }
  },

  methods: {
    handleInputFocus() {
      this.isSearching = true
    },

    cancelSearching() {
      this.isSearching = false
      this.$refs.iSearch.blur()
    },

    search() {
      if (!this.keyword.trim()) return
      this.cancelSearching()
      this.comicList = []
      this.isLoading = true
      this.$callApi({
        method: 'post',
        api: '/comic/search',
        param: {
          website: this.website,
          keyword: this.keyword,
          page: this.page
        }
      })
        .then(({ list, count }) => {
          this.comicList = list
          this.count = count
          this.$refs.loadBar.done()
        })
        .catch(() => {
          this.$refs.loadBar.done()
        })
    },

    handleKeydown(e) {
      if (e.key === 'Escape' || e.keyCode === 27 || e.which === 27) {
        this.cancelSearching()
      }
    }
  },

  mounted() {
    on(window, 'keydown', this.handleKeydown)
  },

  beforeDestroy() {
    off(window, 'keydown', this.handleKeydown)
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/index.scss';
.loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.search {
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #282b2f;
  -webkit-font-smoothing: antialiased;
  * {
    outline: none;
  }
  &__header {
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: height 0.6s;
    &--open {
      width: 100%;
      height: 30vh;
      margin: 5em 0;
    }
    .header {
      &__search-input {
        &-wrapper {
          min-width: 300px;
        }
        border: 0;
        background: transparent;
        border-radius: 0;
        appearance: none;
        font-size: 16px;
        line-height: 1;
        display: inline-block;
        box-sizing: border-box;
        width: 300px;
        max-width: 900px;
        padding: 0 0 0.1em 0;
        color: #ffefb9;
        border-bottom: 1px solid;
        transition: all 0.6s;
        text-align: center;
        &--open {
          font-size: 5vw;
          border-bottom: 4px solid;
          width: 75%;
        }
      }
      &__info {
        font-size: 90%;
        font-weight: bold;
        width: 75%;
        margin: 0 auto;
        padding: 0.85em 0;
        text-align: right;
        color: #ffefb9;
      }
    }
  }
  &__result-wrapper {
    position: relative;
    width: 100%;
    height: calc(100% - 50px);
    background-color: #f4f5f5;
    transform: perspective(1000px);
    transition: transform 0.6s, box-shadow 0.6s;
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    &--move {
      transform: perspective(1000px) translate3d(0, 0, 0)
        rotate3d(1, 0, 0, 30deg);
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
    }
  }
}

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
