<template>
  <div class="search">
    <div ref="searchInput"
      class="search__input-wrapper"
      :class="{'search__input-wrapper--isSearched':isSearched}">
      <i-input v-model="keyword"
        search
        @on-search="search"></i-input>
    </div>
    <div v-show="isDisplayResult"
      class="search__result">
    </div>
  </div>
</template>

<script>
import { on, off } from '../../../utils/dom'
export default {
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

    displayResult() {
      if (
        this.$refs.searchInput.className.includes(
          'search__input-wrapper--isSearched'
        )
      ) {
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
.search {
  position: relative;
  height: 100%;
  padding-top: 80px;

  &__input-wrapper {
    position: absolute;
    width: 500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: top 1s;
    &--isSearched {
      top: 40px;
    }
  }
  &__result {
    background-color: #abcabc;
  }
}
</style>
