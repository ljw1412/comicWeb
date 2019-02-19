<template>
  <div class="comic">
    <website-dialog :visible="isDisplayWebsiteDialog"
      @close="isDisplayWebsiteDialog = false"></website-dialog>
    <button @click="isDisplayWebsiteDialog = true">a</button>
    <user-bar></user-bar>
    <div class="comic__body">
      <router-view />
    </div>
  </div>
</template>

<script>
import WebsiteDialog from '../components/websiteDialog'
import UserBar from '../components/userBar'
export default {
  components: { WebsiteDialog, UserBar },

  data() {
    return {
      isDisplayWebsiteDialog: false
    }
  }
}
</script>

<style lang="scss" scoped>
.comic {
  position: relative;
  height: 100%;
  overflow: hidden;

  &__body {
    height: calc(100% - 60px);
  }
}
</style>
