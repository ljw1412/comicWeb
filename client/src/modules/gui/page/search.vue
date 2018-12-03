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
    <div ref="result"
      class="search__result">
      <comic-item name="测试1"
        width="50%"></comic-item>
      <comic-item name="测试2"
        width="50%"></comic-item>
      <comic-item name="测试3"
        width="50%"></comic-item>
    </div>
  </div>
</template>

<script>
import { on, off } from '../../../utils/dom'
import ComicItem from '../components/comicItem'
export default {
  components: { ComicItem },
  data() {
    return {
      website: '',
      websiteList: [{ id: 0, value: '33', label: '11' }]
    }
  },
  methods: {
    onSearch() {},
    onResize(e) {
      console.log(e)
    }
  },
  mounted() {
    on(this.$refs.result, 'resize', this.onResize)
  },
  beforeDestroy() {
    off(this.$refs.result, 'resize', this.onResize)
  }
}
</script>

<style lang="scss" scoped>
.search {
  overflow-y: auto;
  height: 100%;
  margin-right: 2px;
  &__result {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>

