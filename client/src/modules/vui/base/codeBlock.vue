<template>
  <pre>
    <code ref="code" :class="lang"><slot>{{code}}</slot></code>
  </pre>
</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

export default {
  props: {
    code: {
      type: String
    },
    lang: {
      type: String,
      default: 'html'
    }
  },

  mounted() {
    hljs.highlightBlock(this.$refs.code)
  }
}
</script>

<style lang="scss" scoped>
pre {
  display: flex;
  font-size: 14px;
  code {
    flex-grow: 1;
    background: #f7f7f7;
    border-radius: 3px;
  }
}
</style>
