/**
 * 任务层，负责包裹任务窗体
 */
<template>
  <div class="task-layer">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TaskLayer',

  created() {
    this.name = 'TaskLayer'
  }
}
</script>

<style lang="scss" scoped>
</style>
