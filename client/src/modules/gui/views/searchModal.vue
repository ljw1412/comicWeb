<template>
  <modal-view v-model="visible"
    name="TaskSearch"
    class="search-modal"
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
    @resize="onModalResize">
    <div slot="bodyTop"
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
  </modal-view>
</template>

<script>
import ModalView from '../../../components/modalView'
import ComicItem from '../components/comicItem'
import customModal from '../mixins/customModal.js'

export default {
  mixins: [customModal],

  components: {
    ModalView,
    ComicItem
  },

  props: {
    // 浏览器有效的宽高
    windowWidth: Number,
    windowHeight: Number,
    // modal最小的宽高
    minWidth: { type: Number, default: 300 },
    minHeight: { type: Number, default: 400 },
    // modal 初始化时的宽高
    width: { type: Number, default: 300 },
    height: { type: Number, default: 400 },
    // modal 初始化时的位置
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 }
  },

  data() {
    return {
      title: '搜索',
      visible: true,
      isClose: false,
      list: [],
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

    onModalResize(e) {
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
    overflow-y: auto;
    height: 100%;
    margin-right: 2px;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
