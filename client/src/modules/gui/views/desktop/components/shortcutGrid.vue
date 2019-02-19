<template>
  <div class="shortcut-grid">
    <shortcut v-for="(item,index) of value"
      :key="index"
      :index="index"
      :icon="item.icon"
      :src="item.src"
      :color="item.color"
      :name="item.name"
      @dblclick="onDblclick(item)"></shortcut>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { typeOf } from '@/utils/assist.js'
import Shortcut from './shortcut'
export default {
  computed: {},

  components: {
    Shortcut
  },

  props: {
    value: { type: Array, default: () => [] },
    free: Boolean
  },

  methods: {
    ...mapMutations('gui', ['UPDATE_TASK', 'NEW_TASK']),
    newTask(taskName, data) {
      this.NEW_TASK({ taskName, data })
    },

    onDblclick(item) {
      if (item.handler && typeOf(item.handler) === 'function') {
        item.handler()
      }
      if (item.launch) {
        this.newTask(item.launch)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
