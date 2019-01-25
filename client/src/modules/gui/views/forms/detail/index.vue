<template>
  <v-form v-model="visible"
    ref="form"
    name="TaskDetail"
    class="detail-form"
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
    :mainStyle="{width:'100%'}"
    @resize="onFormResize">
    <transition slot="menu"
      name="fade">
      <div class="detail__action-bar">
        <div :style="{opacity : actionBar.opacity}">
          <div class="action-bar__bg"></div>
          <div class="action-bar__info">
            <span class="info__title">{{comic.name}} </span>
            <span class="info__status"
              :class="isfinish?'finish':'serialize'">{{comic.status}}</span>
          </div>
        </div>
        <div class="action-bar__action">
          <i-icon class="action__icon"
            type="ios-download-outline" />
        </div>
      </div>
    </transition>
    <div class="detail">
      <div ref="cover"
        class="detail__cover">
        <div class="cover__bg"
          v-lazy:background-image="comic.cover"
          :style="{filter: `blur(${coverBlur}px)`}"></div>
        <div class="cover__base-info"
          :style="{opacity : 1 - actionBar.opacity * 2}">
          <div>
            <span class="base-info__name">{{comic.name}}</span>
            <span class="base-info__status"
              :class="isfinish ? 'finish' : 'serialize'">{{comic.status}}</span>
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
          <v-grid width="100%"
            item-width="60"
            :gutter="5">
            <v-grid-item v-for="chapter of item.list"
              :key="chapter.chapterId">
              <div class="chapters__item">{{chapter.chapterName}}</div>
            </v-grid-item>
          </v-grid>
        </div>
      </div>
    </div>
  </v-form>
</template>

<script>
import VForm from '@/components/vForm'
import { VGrid, VGridItem } from '@/components/vGrid'
import customForm from '../../../mixins/customForm.js'
import { mapState } from 'vuex'
import { findComponentDownward } from '@/utils/assist.js'
import { on, off } from '@/utils/dom.js'

export default {
  name: 'TaskDetail',

  mixins: [customForm],

  components: {
    VForm,
    VGrid,
    VGridItem
  },

  computed: {
    comicId() {
      return this.comic.id
    },

    isfinish() {
      return this.comic.status.includes('完')
    },

    coverBlur() {
      return this.actionBar.opacity * 5
    },

    scrollTop() {
      return this.bodyDOM ? this.bodyDOM.scrollTop : 0
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
      // 顶部操作栏
      actionBar: {
        opacity: 0
      },
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
        if (!this.isReverseOrder && Array.isArray(this.comic.chapters)) {
          this.comic.chapters.forEach(item => {
            item.list = item.list.reverse()
          })
        }
      })
    },

    onMoreDescriptionClick() {
      this.isDisplayDescription = !this.isDisplayDescription

      if (this.isDisplayDescription) {
        this.$nextTick(() => {
          const vScrollView = findComponentDownward(this, 'VScrollView')
          vScrollView &&
            vScrollView.setScrollTop(this.$refs.operate.offsetTop + 15, true)
        })
      }
    },

    onOrderClick(isReverse) {
      this.isReverseOrder = isReverse
      Store.set('isReverseOrder', isReverse)
    },

    onFormResize(e) {
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

    isReverseOrder() {
      this.comic.chapters.forEach(item => {
        item.list = item.list.reverse()
      })
    },

    scrollTop(val) {
      if (val > this.$refs.operate.offsetTop + 10) {
        this.actionBar.opacity = 1
        this.actionBar.isDisplayShadow = true
      } else if (val > 10) {
        this.actionBar.opacity =
          (val - 10) / (this.$refs.operate.offsetTop + 10)
        this.actionBar.isDisplayShadow = false
      } else {
        this.actionBar.opacity = 0
      }
    }
  },

  mounted() {
    this.bodyDOM = this.$children[0].$refs.main
    this.isReverseOrder = Store.get('isReverseOrder', true)
  },

  beforeDestroy() {}
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
  width: 100%;
  &__action-bar {
    z-index: 19;
    position: absolute;
    padding: 0 10px;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    box-sizing: border-box;
    animation-duration: 0.3s;
    // box-shadow: 0 2px 8px $line-color;
    .action-bar {
      &__info {
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
      &__bg {
        position: absolute;
        z-index: -1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #fff;
      }
      &__action {
        position: absolute;
        right: 10px;
        top: 0;
        bottom: 0;
        .action__icon {
          font-size: 26px;
          line-height: 40px;
        }
      }
    }
  }
  &__cover {
    position: relative;
    width: 200%;
    margin-left: -50%;
    min-height: 150px;
    border-radius: 0 0 50% 50%;
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
    .cover {
      &__bg {
        width: 100%;
        height: 160px;
        margin-top: -10px;
        background-repeat: no-repeat;
        background-size: 50%;
        background-position: center;
      }
      &__base-info {
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
            margin-left: 2px;
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
          // width: 25%;
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
