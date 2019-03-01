<template>
  <div class="ui-component-loading-view">
    <h1>VLoading</h1>
    <h4>加载中的等待动画</h4>
    <h2>代码示例</h2>
    <example>
      <div slot="demo">
        <div v-for="index of 7"
          :key="index">
          <google-loading :type="index"></google-loading>
          <span>type:{{index}}</span>
        </div>
      </div>
    </example>
  </div>
</template>

<script>
import Example from './base/example'
import { GoogleLoading } from '@/components/vLoading'
export default {
  components: {
    Example,
    GoogleLoading
  }
}
</script>

<style lang="scss" scoped>
</style>
