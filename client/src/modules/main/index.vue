<template>
  <div class="main">
    <website-dialog :visible="isDisplayWebsiteDialog"
      @close="isDisplayWebsiteDialog = false"></website-dialog>
    <user-bar></user-bar>
    <div class="main__body">
      <!-- <button @click="isDisplayWebsiteDialog = true">a</button> -->
      <router-view />
    </div>
  </div>
</template>

<script>
import WebsiteDialog from './components/websiteDialog'
import UserBar from './components/userBar'
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
.main {
  position: relative;
  min-height: 100%;
  &__body {
    height: 100%;
  }
}
</style>
