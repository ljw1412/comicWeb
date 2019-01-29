<template>
  <v-form v-model="visible"
    name="TaskReader"
    class="reader-form"
    resizable
    icon="md-book"
    :close="isClose"
    :title="title"
    :windowHeight="windowHeight"
    :minWidth="minWidth"
    :minHeight="minHeight"
    :width="width"
    :height="height"
    :x="x"
    :y="y"
    @resize="onFormResize">
    <v-comic-reader slot="full"
      ref="VComicReader"
      :website="website"
      :comic-id="comicId"
      :comic-title="comicTitle"
      :chapter-id="chapterId"></v-comic-reader>
  </v-form>
</template>

<script>
import VForm from '@/components/vForm'
import { VComicReader } from '@/components/vReader'
import customForm from '../../../mixins/customForm.js'
export default {
  name: 'TaskReader',

  mixins: [customForm],

  components: {
    VForm,
    VComicReader
  },

  props: {
    // modal最小的宽高
    minWidth: { type: Number, default: 600 },
    minHeight: { type: Number, default: 400 },
    // modal 初始化时的宽高
    width: { type: Number, default: 600 },
    height: { type: Number, default: 400 },

    data: { type: Object, default: () => ({}) }
  },

  computed: {},

  data() {
    return {
      title: '阅读器',
      website: '',
      comicId: '',
      comicTitle: '',
      chapterId: ''
    }
  },

  methods: {
    onFormResize(e) {
      console.log(this.title, e)
    }
  },

  watch: {
    data: {
      immediate: true,
      handler(val) {
        if (val) {
          this.website = val.website
          this.comicId = val.comicId
          this.comicTitle = val.comicTitle
          this.chapterId = val.chapterId
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
