<template>
  <div class="search">
    <i-input class="search__input"
      search
      placeholder="请输入关键词..."
      @on-search="onSearch" />
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style lang="scss" scoped>
.search-wrapper {
  overflow-y: auto;
  height: 100%;
  border: 1px solid #e8eaec;
  border-radius: 5px;
}
</style>

