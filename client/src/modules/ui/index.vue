<template>
  <div class="ui">
    <div v-if="show"
      class="ui-component-input">
      <div class="v-icon v-icon-ios-add-circle-outline"></div>
      <h3>VInput - input(value:'{{input.value1}}')</h3>
      <v-input v-model="input.value1"
        width="300px"
        theme="windows"
        size="medium"
        prefixIcon="ios-alarm"
        suffixIcon="ios-alarm"
        clearable
        search
        @input="onInput"
        @change="onInputChange"
        @enter="onInputEnter"
        @keydown="onInputKeydown"
        @keypress="onInputKeypress"
        @keyup="onInputKeyup"
        @focus="onInputFocus"
        @blur="onInputBlur"
        @search="onSearch"></v-input>
      <h3>VInput - textarea(value:'{{input.value2}}')</h3>
      <v-input v-model="input.value2"
        width="300px"
        type="textarea"
        theme="mac"
        :rows="5"
        resize
        radius
        @input="onInput"
        @change="onInputChange"
        @enter="onInputEnter"
        @keydown="onInputKeydown"
        @keypress="onInputKeypress"
        @keyup="onInputKeyup"
        @focus="onInputFocus"
        @blur="onInputBlur"></v-input>
    </div>
    <div v-if="show"
      class="ui-component-scroll-view">
      <h3>VScrollView</h3>
      <v-scroll-view style="height:200px;width: 300px;">
        <div v-for="i of 100"
          :key="i">
          <span v-for="j of 100"
            :key="j">{{i*j}}</span>
        </div>
      </v-scroll-view>
    </div>
    <div class="ui-component-grid">
      <h3> VGrid </h3>
      <v-grid item-width="100"
        align="center"
        :width="`${grid.width}px`"
        :gutter="10"
        :style="{border:'1px solid #ccc'}">
        <v-grid-item v-for="index of 100"
          :key="index">
          <div style="border:1px solid #ccc;text-align:center;">{{index*index*index*index}}</div>
        </v-grid-item>
      </v-grid>
      <button @click="grid.width = grid.width+10">宽度 +10</button>
      <button @click="grid.width = grid.width-10">宽度 -10</button>
      <button @click="startTimer">计时器变宽度</button>
    </div>
  </div>
</template>

<script>
import VInput from '@/components/vInput'
import VScrollView from '@/components/vScrollView'
import { VGrid, VGridItem } from '@/components/vGrid'

export default {
  components: {
    VInput,
    VScrollView,
    VGrid,
    VGridItem
  },

  data() {
    return {
      show: false,
      input: { value1: '', value2: '' },
      grid: {
        width: 300,
        timer: undefined,
        ticket: 1
      }
    }
  },

  methods: {
    onInput(e) {
      console.log('onInput', e)
    },

    onInputChange(e) {
      console.log('onInputChange', e)
    },

    onInputEnter(e) {
      console.log('onInputEnter', e)
    },

    onInputKeydown(e) {
      console.log('onInputKeydown', e)
    },

    onInputKeypress(e) {
      console.log('onInputKeypress', e)
    },

    onInputKeyup(e) {
      console.log('onInputKeyup', e)
    },

    onInputFocus(e) {
      console.log('onInputFocus', e)
    },

    onInputBlur(e) {
      console.log('onInputBlur', e)
    },

    onSearch(e) {
      console.log('onSearch', e)
    },

    startTimer() {
      if (!this.grid.timer)
        this.grid.timer = setInterval(() => {
          this.grid.width = this.grid.width + this.grid.ticket
          if (this.grid.width < 300 || this.grid.width > 800) {
            this.grid.ticket *= -1
          }
        }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.ui {
  overflow-y: auto;
  height: 100%;
  padding: 5px;
}
</style>
