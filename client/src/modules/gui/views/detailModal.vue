<template>
  <modal-view v-model="visible"
    name="TaskDetail"
    class="detail-modal"
    resizable
    icon=""
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
    @resize="onModalResize">
    <transition slot="bodyTop"
      name="fade">
      <div v-if="isDisplayTopDetail"
        class="detail__fixed-view">
        <div class="fixed-view__info">
          <span class="info__title">{{comic.name}} </span>
          <span class="info__status"
            :class="isfinish?'finish':'serialize'">{{comic.status}}</span>
        </div>
      </div>
    </transition>
    <div class="detail">
      <div ref="cover"
        class="detail__cover"
        v-lazy:background-image="comic.cover">
        <div class="cover__base-info">
          <div>
            <span class="base-info__name">{{comic.name}}</span>
            <span class="base-info__status"
              :class="isfinish?'finish':'serialize'">
              {{comic.status}}
            </span>
          </div>
          <div class="base-info__authors">
            <span v-for="(item,index) of comic.authors"
              :key="index">{{item}}</span>
          </div>
        </div>
      </div>
      <div ref="operate"
        class="detail__operate">
        <div class="operate__like">加入收藏</div>
        <div class="operate__read">开始阅读</div>
      </div>
      <div ref="description"
        class="detail__description"
        :class="isDisplayDescription?'detail__description--more':'detail__description--closed'"
        @click="onMoreDescriptionClick">
        {{comic.description}}
      </div>
      <div class="detail__chapter-header">
        <span class="chapter-header__title">全部章节</span>
        <div class="chapter-header__order">
          <span :class="!isReverseOrder?'order--active':''"
            @click="onOrderClick(false)">正序</span>
          <span class="order__divider"></span>
          <span :class="isReverseOrder?'order--active':''"
            @click="onOrderClick(true)">倒序</span>
        </div>
      </div>
      <div v-for="(item,index) of comic.chapters"
        :key="index"
        class="detail__chapter-group">
        <div class="chapter-group__title">{{item.title}}</div>
        <div class="chapter-group__chapters">
          <div v-for="chapter of item.list"
            :key="chapter.chapterId"
            class="chapters__item"
            :style="{width:chapterWidth}">{{chapter.chapterName}}</div>
        </div>
      </div>
    </div>
  </modal-view>
</template>

<script>
import ModalView from '../../../components/modalView'
import customModal from '../mixins/customModal.js'
import { mapState } from 'vuex'
import { scrollTop, getScrollBarSize } from '../../../utils/assist.js'
import { on, off } from '../../../utils/dom.js'

export default {
  mixins: [customModal],

  components: {
    ModalView
  },

  computed: {
    comicId() {
      return this.comic.id
    },
    isfinish() {
      return this.comic.status.includes('完')
    },
    chapterWidth() {
      const columnCount = Math.floor(this.self.width / 65)
      return 100 / columnCount + '%'
    }
  },

  props: {
    data: { type: Object, default: () => ({}) }
  },

  data() {
    return {
      title: '详情页',
      bodyDOM: null,
      // 是否展开介绍
      isDisplayDescription: false,
      // 是否显示顶部悬浮标题
      isDisplayTopDetail: false,
      // 是否为倒序
      isReverseOrder: true,
      comic: {
        id: '',
        cover: '',
        name: '',
        status: '',
        description: '',
        isVertical: false,
        lastUpdateTime: '',
        website: '',
        authors: [],
        types: [],
        chapters: []
      },
      self: { width: this.width }
    }
  },

  methods: {
    reFindDetail() {
      this.$post({
        api: '/comic/details',
        param: { website: this.comic.website, id: this.comic.id }
      }).then(data => {
        ;({
          status: this.comic.status,
          description: this.comic.description,
          isVertical: this.comic.isVertical,
          lastUpdateTime: this.comic.lastUpdateTime,
          authors: this.comic.authors,
          types: this.comic.types,
          chapters: this.comic.chapters
        } = data)
      })
    },

    onMoreDescriptionClick() {
      this.isDisplayDescription = !this.isDisplayDescription
      if (this.isDisplayDescription) {
        this.$nextTick(() => {
          scrollTop(
            this.bodyDOM,
            this.bodyDOM.scrollTop,
            this.$refs.operate.offsetTop + 15,
            2000
          )
        })
      }
    },

    onOrderClick(isReverse) {
      this.isReverseOrder = isReverse
    },

    // 当页面滚动时
    onScroll(e) {
      if (this.bodyDOM.scrollTop > this.$refs.operate.offsetTop + 10) {
        this.isDisplayTopDetail = true
      } else {
        this.isDisplayTopDetail = false
      }
    },

    onModalResize(e) {
      this.self.width = e.width
    }
  },

  watch: {
    data: {
      immediate: true,
      handler(val) {
        if (val) {
          this.title = val.name
          this.comic.website = val.website
          this.comic.cover = val.cover
          this.comic.name = val.name
          this.comic.id = val.id
          this.comic.status = val.status
          this.reFindDetail()
        }
      }
    },
    isReverseOrder(val) {
      this.comic.chapters.forEach(item => {
        item.list = item.list.reverse()
      })
    }
  },

  beforeCreate() {
    this.name = 'TaskDetail'
  },

  mounted() {
    this.bodyDOM = this.$children[0].$refs.body
    on(this.bodyDOM, 'scroll', this.onScroll)
  },

  beforeDestroy() {
    off(this.bodyDOM, 'scroll', this.onScroll)
  }
}
</script>

<style lang="scss" scoped>
$line-color: #ddd;
* {
  user-select: none;
}
.detail {
  position: relative;
  overflow-x: hidden;
  &__fixed-view {
    z-index: 19;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0 2px 8px $line-color;
    animation-duration: 0.3s;
    .fixed-view__info {
      padding: 0 15px;
      line-height: 40px;
      .info {
        &__title {
          font-size: 16px;
        }
        &__status {
          font-size: 14px;
        }
      }
    }
  }
  &__cover {
    position: relative;
    width: 200%;
    margin-left: -50%;
    min-height: 150px;
    background-repeat: no-repeat;
    background-size: 50%;
    border-radius: 0 0 50% 50%;
    background-position: center;
    overflow: hidden;
    &::after {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      content: ' ';
      background: linear-gradient(
        rgba($color: #333, $alpha: 0),
        rgba($color: #333, $alpha: 0.9)
      );
    }
    .cover__base-info {
      z-index: 9;
      position: absolute;
      bottom: 15px;
      left: 25%;
      margin-left: 15px;
      color: #fff;
      .base-info {
        &__name {
          font-size: 14px;
        }
        &__status {
          padding: 1px 3px;
          border: 1px solid #fff;
          border-radius: 3px;
          font-size: 12px;
          line-height: 12px;
        }
        &__authors {
          font-size: 12px;
        }
      }
    }
  }
  &__description {
    position: relative;
    padding: 0 15px 15px 15px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: break-word;
    &--more {
      overflow: visible;
      white-space: initial;
      word-wrap: initial;
      &::after {
        transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0) translateX(-50%)
          rotate(180deg);
        bottom: 12px !important;
      }
    }
    &--closed {
      &::after {
        transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0) translateX(-50%);
      }
    }
    &::after {
      content: ' ';
      display: inline-block;
      height: 8px;
      width: 8px;
      border-width: 1px 1px 0 0;
      border-style: solid;
      position: absolute;
      bottom: 5px;
      right: 50%;
      transition: 0.3s;
    }
  }
  &__operate {
    padding: 15px;
    display: flex;
    justify-content: space-around;
    font-size: 15px;
    text-align: center;
    .operate {
      &__like {
        flex-grow: 1;
        padding: 5px 0;
      }
      &__read {
        flex-grow: 1;
        padding: 5px 0;
        color: #fff;
        background-color: #ff8c00;
        border-radius: 5px;
      }
    }
  }
  &__chapter-header {
    border-width: 1px 0;
    border-style: solid;
    border-color: $line-color;
    padding: 5px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .chapter-header {
      &__title {
        font-size: 14px;
        font-weight: bold;
      }
      &__order {
        .order {
          &__divider {
            margin: 0 8px;
            display: inline-block;
            height: 1em;
            width: 1px;
            vertical-align: middle;
            background: $line-color;
          }
          &--active {
            color: #ff8c00 !important;
          }
        }
      }
    }
  }
  &__chapter-group {
    padding: 5px 10px;
    .chapter-group {
      &__title {
        margin: 5px;
        text-align: center;
      }
      &__chapters {
        display: flex;
        flex-wrap: wrap;
        .chapters__item {
          position: relative;
          background: #fff;
          border: 1px solid $line-color;
          width: 25%;
          margin: -0.5px;
          padding: 4px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: break-word;
          text-align: center;
          &:hover {
            background: rgba($color: #ff8c00, $alpha: 0.5);
          }
        }
      }
    }
  }
}
.finish {
  color: #ff8c00 !important;
  border-color: #ff8c00 !important;
}
.serialize {
  color: #19be6b !important;
  border-color: #19be6b !important;
}
.read-here {
  background: #ff8c00 !important;
  color: #fff;
}
</style>
