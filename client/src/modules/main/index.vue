<template>
  <div class="main">
    <!-- <website-dialog :visible="isDisplayWebsiteDialog"
      @close="isDisplayWebsiteDialog = false"></website-dialog>
    <user-bar></user-bar> -->
    <sidebar class="main__sidebar"></sidebar>
    <div class="main__body">
      <!-- <button @click="isDisplayWebsiteDialog = true">a</button> -->
      <router-view />
    </div>
  </div>
</template>

<script>
// import WebsiteDialog from './components/websiteDialog'
// import UserBar from './components/userBar'
import noScrollBar from '@/mixins/noScrollBar'
import Sidebar from './components/sidebar'
export default {
  mixins: [noScrollBar],

  components: {
    Sidebar
    // WebsiteDialog, UserBar
  },

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
  display: flex;
  height: 100%;
  &__body {
    flex-grow: 1;
  }
  &__sidebar {
    flex-shrink: 0;
  }
}
</style>
