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
    <h3>VScrollView props:</h3>
    <i-table border
      size="small"
      class="api-table"
      :columns="propsColumns"
      :data="propsData">
    </i-table>
    <h3>VScrollView slots:</h3>
    <i-table border
      size="small"
      class="api-table"
      :columns="slotsColumns"
      :data="slotsData">
    </i-table>
    <h3>VScrollView events:</h3>
    <i-table border
      size="small"
      class="api-table"
      :columns="eventsColumns"
      :data="eventsData">
    </i-table>
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
      propsColumns: [
        { title: '属性', key: 'prop' },
        { title: '说明', key: 'instruction' },
        { title: '类型', key: 'type' },
        { title: '默认值', key: 'default' }
      ],
      propsData: [
        {
          prop: 'innerStyle',
          instruction: 'VScrollView 内层内容样式',
          type: 'Object/String',
          default: '{}'
        },
        {
          prop: 'showMode',
          instruction:
            '显示模式: hover-悬浮时显示，否则半透明；always-总是显示',
          type: 'String',
          default: 'hover'
        },
        {
          prop: 'right',
          instruction: '垂直导航栏距离右边的距离',
          type: 'String',
          default: ''
        },
        {
          prop: 'bottom',
          instruction: '水平导航栏距离底部的距离',
          type: 'String',
          default: ''
        },
        {
          prop: 'width',
          instruction: 'VScrollView 的宽',
          type: 'String',
          default: ''
        },
        {
          prop: 'height',
          instruction: 'VScrollView 的高',
          type: 'String',
          default: ''
        }
      ],
      slotsColumns: [
        { title: '名称', key: 'name' },
        { title: '说明', key: 'instruction' }
      ],
      slotsData: [{ name: 'default', instruction: '默认插槽' }],
      eventsColumns: [
        { title: '名称', key: 'name' },
        { title: '说明', key: 'instruction' },
        { title: '返回值', key: 'callback' }
      ],
      eventsData: [
        { name: 'bottom', instruction: '触底事件', callback: '' },
        { name: 'right', instruction: '触右事件', callback: '' }
      ],
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

<style lang="scss" scoped>
.api-table {
  margin-bottom:  20px;
}
</style>
