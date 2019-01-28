<template>
  <div class="v-reader v-comic-reader"
    :data-page-number="index + 1">
    <operation-area @area-click="handleAreaClick"
      @area1-click="previousPage"
      @area2-click="showTools"
      @area3-click="nextPage"></operation-area>
    <div class="v-comic-reader__image"
      :style="{'background-image':`url(${currentImageUrl})`}"></div>
  </div>
</template>

<script>
import OperationArea from './components/operationArea'
export default {
  props: {
    imageList: Array,
    website: String,
    comicId: String,
    chapterId: String
  },

  computed: {
    total() {
      return this.mImageList.length
    },

    isFirstImage() {
      return this.index <= 0
    },

    isLastImage() {
      return this.index >= this.total - 1
    },

    currentImageUrl() {
      return this.total > 0 ? this.mImageList[this.index] : ''
    },

    needLoadImageList() {
      return this.mImageList.slice(
        this.index - 2 < 0 ? 0 : this.index - 2,
        this.index + 3
      )
    }
  },

  data() {
    return {
      index: 0,
      // 章节的图片列表
      mImageList: [],
      // 已经加载的图片列表
      loadedImageList: []
    }
  },

  components: {
    OperationArea
  },

  methods: {
    handleAreaClick(e) {
      console.log(e)
    },

    previousPage() {
      if (this.isFirstImage) {
        console.log('前面没有了')
        return
      }
      this.index--
    },

    showTools() {
      console.log('Area2Click')
    },

    nextPage() {
      if (this.isLastImage) {
        console.log('最后一页了')
        return
      }
      this.index++
    },

    preloadImage() {
      this.needLoadImageList.forEach(item => {
        if (!this.loadedImageList.includes(item)) {
          const image = new Image()
          image.src = item
          this.loadedImageList.push(item)
        }
      })
    },

    reFindChapter() {
      this.$post({
        api: '/comic/chapter',
        param: {
          website: this.website,
          comicId: this.comicId,
          chapterId: this.chapterId
        }
      }).then(data => {
        this.mImageList = data.imageList
      })
    }
  },

  watch: {
    needLoadImageList(val) {
      this.preloadImage()
    }
  },

  mounted() {
    if (this.imageList) {
      this.mImageList = this.imageList
    } else {
      this.reFindChapter()
    }
  }
}
</script>

<style lang="scss" scoped>
.v-reader {
  position: relative;
  height: 100%;
}

.v-comic-reader {
  &__image {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>
