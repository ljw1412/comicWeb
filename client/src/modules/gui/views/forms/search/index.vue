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
    @resize="onFormResize"
    @bottom="onContentBottom">
    <div slot="menu"
      class="search__menu">
      <i-select v-model="website"
        size="small"
        placeholder="请选择站点"
        style="width: 120px">
        <i-option v-for="website of websiteList"
          :key="website.id"
          :value="website.value"
          :label="website.label"></i-option>
      </i-select>
      <v-input search
        theme="windows"
        size="small"
        placeholder="请输入关键词..."
        @search="onSearch">
      </v-input>
    </div>
    <div class="search__result">
      <comic-item v-for="item of list"
        :key="item.comicId"
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
import VInput from '@/components/vInput'
import ComicItem from './components/comicItem'
import customForm from '../../../mixins/customForm.js'

export default {
  name: 'TaskSearch',

  mixins: [customForm],

  components: {
    VForm,
    VInput,
    ComicItem
  },

  data() {
    return {
      title: '搜索',
      list: [],
      unique: true,
      website: '',
      websiteList: [{ id: 0, value: 'dmzj', label: '动漫之家' }],
      page: 1,
      pageCount: 0
    }
  },

  methods: {
    reGetOrigin() {
      this.$get({
        api: '/getOrigin',
        param: { type: 'comic' }
      }).then(data => {
        this.websiteList = data
        this.website = this.websiteList[0].value
      })
    },

    search(keyword) {
      this.$callApi({
        method: 'post',
        api: '/comic/search',
        param: {
          website: this.website,
          keyword,
          page: this.page
        }
      }).then(data => {
        this.list = data.list
      })
    },

    onSearch(value) {
      if (!value.trim()) return
      this.list = []
      this.search(value)
    },

    onComicItemClick(item) {
      item.website = this.website
      this.newTask('TaskDetail', item)
    },

    onFormResize(e) {
      console.log(e)
    },

    onContentBottom() {}
  },

  created() {
    this.reGetOrigin()
  }
}
</script>

<style lang="scss" scoped>
* {
  user-select: none;
}
.search {
  &__menu {
    display: flex;
  }
  &__result {
    display: flex;
    flex-wrap: wrap;
    padding: 0 3px;
  }
}
</style>
