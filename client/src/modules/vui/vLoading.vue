<template>
  <div class="ui-component-loading-view">
    <h1>VLoading</h1>
    <h4>加载中的等待动画</h4>
    <h2>代码示例</h2>
    <h3>VLoading - 行内加载等待动画</h3>
    <example>
      <div class="demo"
        slot="demo">
        <div class="demo__item"
          v-for="index of 7"
          :key="index">
          <v-loading :type="index"></v-loading>
          <span>type:{{index}}</span>
        </div>
      </div>
    </example>
    <h3>VLoadingBar - 加载进度条</h3>
    <example>
      <div slot="demo">
        <v-loading-bar ref="loadBar"
          v-model="isDisplayLoadBar"></v-loading-bar>
      </div>
      <div slot="controller">
        <div class="controller__item">value : 开始加载 <i-switch v-model="isDisplayLoadBar"></i-switch>
        </div>
        <div class="controller__item">
          <i-button @click="$refs.loadBar.done()">完成加载</i-button>
        </div>
      </div>
    </example>
  </div>
</template>

<script>
import Example from './base/example'
import { VLoading, VLoadingBar } from '@/components/vLoading'
export default {
  components: {
    Example,
    VLoading,
    VLoadingBar
  },

  data() {
    return {
      isDisplayLoadBar: false
    }
  }
}
</script>

<style lang="scss" scoped>
.demo {
  display: flex;
  flex-wrap: wrap;
}
.controller__item {
  margin: 10px 0;
}
</style>
