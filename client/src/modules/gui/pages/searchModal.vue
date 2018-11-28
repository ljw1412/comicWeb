<template>
  <modal-view v-model="visible"
    name="TaskSearch"
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

  </modal-view>
</template>

<script>
import ModalView from '../../../components/modalView'
export default {
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
    y: { type: Number, default: 0 }
  },

  components: {
    ModalView
  },

  data() {
    return {
      title: '搜索',
      visible: true,
      isClose: false
    }
  },

  created() {
    this.name = 'TaskSearch'
  }
}
</script>

<style lang="scss" scoped>
</style>
