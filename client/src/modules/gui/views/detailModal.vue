<template>
  <modal-view v-model="visible"
    name="TaskDetail"
    class="search-modal"
    resizable
    icon="ios-search"
    :close="isClose"
    :title="title"
    :windowHeight="windowHeight"
    :minWidth="minWidth"
    :minHeight="minHeight"
    :width="width"
    :height="height"
    :x="x"
    :y="y">
    <div class="detail">
      <div class="detail__cover"
        v-lazy:background-image="comic.cover">
        <div class="cover__name">{{comic.name}}</div>
      </div>
    </div>
  </modal-view>
</template>

<script>
import ModalView from '../../../components/modalView'
import customModal from '../mixins/customModal.js'
import { mapState } from 'vuex'

export default {
  mixins: [customModal],

  components: {
    ModalView
  },

  computed: {},

  props: {
    // 浏览器有效的宽高
    windowWidth: Number,
    windowHeight: Number,
    // modal最小的宽高
    minWidth: { type: Number, default: 300 },
    minHeight: { type: Number, default: 400 },
    // modal 初始化时的宽高
    width: { type: Number, default: 300 },
    height: { type: Number, default: 400 },
    // modal 初始化时的位置
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },

    data: { type: Object, default: () => ({}) }
  },

  data() {
    return {
      title: '详情页',
      visible: true,
      isClose: false,
      comic: {
        cover: '',
        name: ''
      }
    }
  },

  methods: {},

  watch: {
    data: {
      immediate: true,
      handler(val) {
        if (val) {
          this.comic.cover = val.cover
          this.comic.name = val.name
        }
      }
    }
  },

  beforeCreate() {
    this.name = 'TaskDetail'
  }
}
</script>

<style lang="scss" scoped>
.detail {
  overflow-x: hidden;
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
      background-color: rgba($color: #333, $alpha: 0.3);
    }
    .cover__name {
      z-index: 9;
      color: #fff;
      font-size: 16px;
      position: absolute;
      bottom: 30px;
      left: 25%;
      margin-left: 15px;
    }
  }
}
</style>
