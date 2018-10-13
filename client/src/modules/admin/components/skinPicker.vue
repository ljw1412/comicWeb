<template>
  <transition name="slide-fade">
    <div v-if="visible"
      class="skin-picker">
      <div class="skin-picker__warpper">
        <div class="skin-picker__title">
          <span>选择皮肤</span>
          <Icon class="title__close"
            type="md-close"
            size="22"
            @click="onCancelClick" />
        </div>
        <div class="skin-picker__content">
          <div class="content__palette">
            <div v-for="(item,index) of themeList"
              :key="index"
              class="content__color-block"
              :style="{backgroundColor:item.color}"
              @click="onColorBlockClick(item)">
              {{item.label}}
            </div>
          </div>
        </div>
      </div>
      <div class="skin-picker__footer">
        <div class="skin-picker__warpper">
          <i-button type="primary"
            class="footer__button"
            @click="onOkClick">确定</i-button>
          <i-button class="footer__button"
            @click="onCancelClick">取消</i-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { SET_BACKGROUND_COLOR } from '@/store/admin.js'
export default {
  props: {
    visible: Boolean
  },
  computed: {
    ...mapState('admin', {
      theme: state => state.theme
    }),
    themeList() {
      return this.isPurity ? this.colorList : this.skinList
    }
  },
  data() {
    return {
      isPurity: true,
      colorList: [
        { label: '热情红', color: '#f44336' },
        { label: '哔哩粉', color: '#fb7299' },
        { label: '伊藤橙', color: '#ff9800' },
        { label: '知乎蓝', color: '#2196f3' },
        { label: '靛青蓝', color: '#00bcd4' },
        { label: '酷安绿', color: '#4caf50' },
        { label: '水鸭绿', color: '#009688' },
        { label: '古铜棕', color: '#795548' },
        { label: '基佬紫', color: '#673ab7' },
        { label: '颐堤蓝', color: '#3f51b5' },
        { label: '低调灰', color: '#607d8b' },
        { label: '夜间黑', color: '#000000' }
      ],
      skinList: []
    }
  },
  methods: {
    ...mapMutations('admin', [SET_BACKGROUND_COLOR]),
    onOkClick() {
      const theme = Object.assign({}, this.theme)
      Store.set('theme', this.theme)
      if (this.theme && this.theme.bgColor) {
        this.SET_BACKGROUND_COLOR(this.theme.bgColor)
      }
      this.$emit('update:visible', false)
    },
    onCancelClick() {
      const theme = Store.get('theme') || {}
      if (this.theme.bgColor) {
        this.SET_BACKGROUND_COLOR(theme.bgColor)
      }
      this.$emit('update:visible', false)
    },
    onColorBlockClick(item) {
      const theme = Store.get('theme') || {}
      theme.bgColor = item.color
      this.SET_BACKGROUND_COLOR(item.color)
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
.skin-picker {
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: #292929;
  &__warpper {
    margin: auto;
    width: 800px;
  }
  &__title {
    margin: 10px 5px;
    font-weight: bold;
    font-size: 15px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title__close {
      cursor: pointer;
      font-weight: bold;
    }
  }
  &__content {
    margin-bottom: 20px;
    .content__palette {
      display: flex;
      .content__color-block {
        cursor: pointer;
        width: 60px;
        height: 60px;
        transition: 0.3s;
        line-height: 60px;
        text-align: center;
        font-size: 16px;
        color: rgba($color: #000000, $alpha: 0);
        user-select: none;
        &:hover {
          color: #fff;
        }
      }
    }
  }
  &__footer {
    background-color: #222;
    text-align: center;
    padding: 8px 0;
    .footer__button {
      width: 90px;
      &:nth-child(1) {
        margin-right: 5px;
      }
    }
  }
}

// 滑动并淡入
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style>

