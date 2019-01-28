<template>
  <div class="ui-component-reader">
    <h1>VReader</h1>
    <h2></h2>
    <div style="height:300px;width:200px;">
      <v-comic-reader website="dmzj"
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
    return {
      list: [
        'http://static.weixiaotong.com.cn//b48c0d1be6ba4a79255bc126873e25f3.jpg',
        'http://static.weixiaotong.com.cn/7272ca00280198938f21f45b8f9c3d0e9cd8b0c4.jpg',
        'http://static.weixiaotong.com.cn//ff37ad70084f5baa86c1e192bacc1fbc.jpg',
        'http://static.weixiaotong.com.cn/dd2c23b9e1d7c700af1f363ba3c41eef38e852cc.jpg',
        'http://static.weixiaotong.com.cn/83b547b025fb8cdb70cce9c5e960dbe74602fcb6.jpg',
        'http://static.weixiaotong.com.cn/16b8009be7cba8114768db30c1975170568ba2cc.jpg'
      ]
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
