<template>
  <div class="ui-component-grid">
    <vui-title> VGrid </vui-title>
    <v-grid item-width="100"
      align="center"
      :width="`${width}px`"
      :gutter="10"
      :style="{border:'1px solid #ccc'}">
      <v-grid-item v-for="index of 50"
        :key="index">
        <div style="border:1px solid #ccc;text-align:center;">{{index}}</div>
      </v-grid-item>
    </v-grid>
    <button @click="width = width + 10">宽度 +10</button>
    <button @click="width = width - 10">宽度 -10</button>
    <button @click="startTimer">计时器变宽度</button>
  </div>
</template>

<script>
import VuiTitle from './base/title'
import { VGrid, VGridItem } from '@/components/vGrid'
export default {
  components: {
    VuiTitle,
    VGrid,
    VGridItem
  },

  data() {
    return {
      width: 300,
      timer: undefined,
      ticket: 1
    }
  },

  methods: {
    startTimer() {
      if (!this.timer)
        this.timer = setInterval(() => {
          this.width = this.width + this.ticket
          if (this.width < 300 || this.width > 800) {
            this.ticket *= -1
          }
        }, 100)
    }
  }
}
</script>

<style lang="scss">
</style>
