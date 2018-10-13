<template>
  <div class="comic-item">
    <div class="comic-item__cover">
      <div class="cover__image"
        :style="{backgroundImage:`url('${cover}')`}"></div>
      <div class="comic-item__title">{{name}}</div>
    </div>
    <div class="comic-item__details">
      {{description}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    cover: String,
    // 是否隐藏介绍提示
    hiddenTip: Boolean,
    description: String
  }
}
</script>

<style lang="scss" scoped>
.comic-item {
  position: relative;
  width: 150px;
  &__cover {
    .cover__image {
      background-size: cover;
      background-repeat: no-repeat;
      background-clip: content-box;
      background-position: center;
      height: 200px;
      width: 100%;
    }
  }
  &__title {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__details {
    display: none;
    position: absolute;
  }
}
</style>
