<template>
  <div class="ui-component-reader">
    <h1>VReader</h1>
    <div style="margin-bottom:10px;display:flex;">
      <i-button @click="onDisplayGuideClick">显示点击区块</i-button>
      <i-input v-model="pageIndex"
        number
        style="margin-left:10px;width:120px">
        <i-button slot="append"
          @click="toPage">跳转</i-button>
      </i-input>
    </div>
    <div style="height:300px;width:200px;">
      <v-comic-reader ref="VComicReader"
        website="dmzj"
        comicId="5"
        chapterId="62621"></v-comic-reader>
    </div>
  </div>
</template>

<script>
import { VComicReader } from '@/components/vReader'
export default {
  components: { VComicReader },

  data() {
    return { pageIndex: 1 }
  },

  methods: {
    onDisplayGuideClick() {
      this.$refs.VComicReader.displayGuide()
    },

    toPage() {
      this.$refs.VComicReader.index = this.pageIndex - 1
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
