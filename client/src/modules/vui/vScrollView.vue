<template>
  <div class="ui-component-scroll-view">
    <h1>VScrollView</h1>
    <h4>自定义滚动条视图</h4>
    <h2>代码示例</h2>
    <example>
      <v-scroll-view slot="demo"
        :innerStyle="innerStyle"
        :showMode="showMode"
        :right="right"
        :bottom="bottom"
        :width="width"
        :height="height"
        style="border:1px solid #ccc;">
        <div v-for="i of 100"
          :key="i">
          <span v-for="j of 100"
            :key="j">{{i*j}}</span>
        </div>
      </v-scroll-view>
      <i-form slot="controller"
        :label-width="80">
        <i-form-item label="innerStyle">
          <i-input type="textarea"
            v-model="innerStyle"></i-input>
        </i-form-item>
        <i-form-item label="showMode">
          <i-select v-model="showMode">
            <i-option label="hover"
              value="hover"></i-option>
            <i-option label="always"
              value="always"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="right">
          <i-input v-model="right"></i-input>
        </i-form-item>
        <i-form-item label="bottom">
          <i-input v-model="bottom"></i-input>
        </i-form-item>
        <i-form-item label="width">
          <i-input v-model="width"></i-input>
        </i-form-item>
        <i-form-item label="height">
          <i-input v-model="height"></i-input>
        </i-form-item>
      </i-form>
      <code-block slot="code">{{code}}</code-block>
    </example>
    <h2>API</h2>
    props:
  </div>
</template>

<script>
import Example from './base/example'
import VScrollView from '@/components/vScrollView'
import CodeBlock from './base/codeBlock'
export default {
  components: { Example, VScrollView, CodeBlock },

  data() {
    return {
      innerStyle: '',
      showMode: 'hover',
      right: '',
      bottom: '',
      width: '',
      height: '400px',
      code: `<v-scroll-view height="400px" style="border:1px solid #ccc;">
  <div v-for="i of 100" :key="i">
     <span v-for="j of 100" :key="j">{{i*j}}</span>
  </div>
</v-scroll-view>`
    }
  },

  mounted() {}
}
</script>

<style lang="scss">
</style>
