<template>
  <div class="v-reader v-comic-reader"
    :data-page-number="index + 1">
    <!-- 操作区块 -->
    <operation-area ref="operationArea"
      @area-click="handleAreaClick"
      @area1-click="previousPage"
      @area2-click="showTools"
      @area3-click="nextPage"></operation-area>
    <!-- 功能区块 -->
    <action-area :visible="isDisplayActionArea"
      :comic-title="comicTitle"
      :chapter-title="chapterTitle"
      :page-index="index + 1"
      :page-count="count"
      @page-change="handlePageChange"></action-area>
    <!-- 图片 -->
    <div class="v-comic-reader__image"
      :style="{'background-image':`url(${currentImageUrl})`}"></div>
  </div>
</template>

<script>
import OperationArea from './components/operationArea'
import ActionArea from './components/actionArea'

export default {
  components: {
    OperationArea,
    ActionArea
  },

  props: {
    imageList: Array,
    website: String,
    comicTitle: String,
    comicId: [Number, String],
    chapterId: [Number, String]
  },

  computed: {
    count() {
      return this.mImageList.length
    },

    isFirstImage() {
      return this.index <= 0
    },

    isLastImage() {
      return this.index >= this.count - 1
    },

    currentImageUrl() {
      return this.count > 0 ? this.mImageList[this.index] : ''
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
      loadedImageList: [],
      // 功能区块是否显示
      isDisplayActionArea: false,
      chapterTitle: ''
    }
  },

  methods: {
    handleAreaClick(info) {},

    displayGuide() {
      this.isDisplayActionArea = false
      this.$refs.operationArea.displayGuide()
    },

    previousPage() {
      this.isDisplayActionArea = false
      if (this.isFirstImage) {
        console.log('前面没有了')
        return
      }
      this.index--
    },

    showTools() {
      this.isDisplayActionArea = !this.isDisplayActionArea
    },

    nextPage() {
      this.isDisplayActionArea = false
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

    handlePageChange(index) {
      this.index = index
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
        this.chapterTitle = data.title
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
  border: 1px solid #ccc;
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
