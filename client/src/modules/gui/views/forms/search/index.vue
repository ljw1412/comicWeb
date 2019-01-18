<template>
  <v-form v-model="visible"
    name="TaskSearch"
    class="search-form"
    resizable
    icon="ios-search"
    :close="isClose"
    :title="title"
    :windowHeight="windowHeight"
    :minWidth="minWidth"
    :minHeight="minHeight"
    :width="width"
    :height="height"
    :x="x"
    :y="y"
    :splashScreen="splashScreen"
    @resize="onFormResize">
    <div slot="menu"
      class="search__input">
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
    </div>
    <div class="search__result">
      <comic-item v-for="item of list"
        :key="item.id"
        class="result__item"
        :name="item.name"
        :cover="item.cover"
        :description="item.description"
        @click.native="onComicItemClick(item)"></comic-item>
    </div>
  </v-form>
</template>

<script>
import VForm from '@/components/vForm'
import ComicItem from './components/comicItem'
import customForm from '../../../mixins/customForm.js'

export default {
  mixins: [customForm],

  components: {
    VForm,
    ComicItem
  },

  data() {
    return {
      title: '搜索',
      list: [],
      unique: true,
      currentComic: {},
      website: '',
      websiteList: [{ id: 0, value: 'dmzj', label: '动漫之家' }]
    }
  },

  methods: {
    search(keyword) {
      this.$callApi({
        method: 'post',
        api: '/comic/search',
        param: {
          website: this.website,
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
      item.website = this.website
      this.currentComic = item
      this.newTask('TaskDetail', item)
    },

    onFormResize(e) {
      console.log(e)
    }
  },

  beforeCreate() {
    this.name = 'TaskSearch'
  },

  created() {
    this.website = this.websiteList[0].value
  }
}
</script>

<style lang="scss" scoped>
* {
  user-select: none;
}
.search {
  &__input {
    padding-bottom: 1px;
    background-color: #fff;
  }
  &__result {
    display: flex;
    flex-wrap: wrap;
    padding: 0 3px;
  }
}
</style>
