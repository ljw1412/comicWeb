<template>
  <div class="comic-item"
    :style="{width,height,padding:'5px'}">
    <div class="comic-item__cover">
      <div class="cover__image"
        v-lazy:background-image="cover">
        <div class="image__link"></div>
      </div>
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
    width: { type: String, default: '140px' },
    height: { type: String, default: '200px' },
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
  flex-shrink: 0;
  position: relative;
  &,
  * {
    transition: 0.2s;
  }
  &:hover {
    .cover__image {
      border-color: #ff8c00;
      .image__link {
        opacity: 0.1;
        background-color: #000;
      }
    }
    .comic-item {
      &__title {
        color: #ff8c00;
        font-size: 16px;
      }
    }
  }
  &__cover {
    height: 100%;
    display: flex;
    flex-direction: column;
    .cover__image {
      flex-grow: 1;
      position: relative;
      border: 2px solid #bebebe;
      box-sizing: border-box;
      background-size: cover;
      background-repeat: no-repeat;
      background-clip: content-box;
      background-position: center;
      // height: 200px;
      width: 100%;
      .image__link {
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }
  &__title {
    flex-shrink: 0;
    cursor: pointer;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    margin-top: 5px;
  }
  &__details {
    display: none;
    position: absolute;
  }
}
</style>
