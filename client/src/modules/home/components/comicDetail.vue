<template>
  <div class="detail">
    <div class="detail__info">
      <div class="info__cover"
        :style="{'background-image':`url(${mComic.cover || comic.cover})`}"></div>
      <div class="info__name">{{mComic.name || comic.name}}</div>
      <div class="info__authors">{{mComic.authors || comic.authors}}</div>
      <div class="info__status">{{mComic.status || comic.status}}</div>
    </div>
    <div class="detail__chapter">
      <div class="info__description">{{mComic.description || comic.description}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comic: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      mComic: {}
    }
  },
  methods: {
    reFindDetail() {
      this.$callApi({
        method: 'post',
        api: '/comic/details',
        param: {
          website: 'dmzj',
          id: this.comic.id
        }
      }).then(data => {
        this.mComic = data
      })
    }
  },
  watch: {
    comic(val) {
      this.reFindDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  .detail {
    &__info {
      .info__ {
        &cover {
          box-sizing: border-box;
          background-size: cover;
          background-repeat: no-repeat;
          background-clip: content-box;
          background-position: center;
          width: 120px;
          height: 150px;
        }
      }
    }
  }
}
</style>
