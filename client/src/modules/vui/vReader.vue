<template>
  <div class="ui-component-reader">
    <h1>VReader</h1>
    <div style="margin-bottom:10px;">
      <i-button @click="onDisplayGuideClick">显示点击区块</i-button>
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
    return {}
  },

  methods: {
    onDisplayGuideClick() {
      this.$refs.VComicReader.displayGuide()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
