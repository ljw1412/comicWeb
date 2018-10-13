<template>
  <div class="progress">
    <page-title summary="(开发的进度情况)">开发进度</page-title>
    <i-tabs v-model="currentTab"
      type="card">
      <i-tab-pane label="TODO"></i-tab-pane>
      <i-tab-pane label="DOING"></i-tab-pane>
      <i-tab-pane label="DONE"></i-tab-pane>
    </i-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: ''
    }
  }
}
</script>


<style lang="scss" scoped>
</style>