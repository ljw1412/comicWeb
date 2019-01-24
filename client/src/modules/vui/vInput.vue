<template>
  <div class="ui-component-input">
    <vui-title>VInput</vui-title>
    <h3>VInput - input(value:'{{value1}}')</h3>
    <v-input v-model="value1"
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
    <h3>VInput - textarea(value:'{{value2}}')</h3>
    <v-input v-model="value2"
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
</template>

<script>
import VuiTitle from './base/title'
import VInput from '@/components/vInput'
export default {
  components: { VuiTitle, VInput },

  data() {
    return {
      value1: '',
      value2: ''
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
    }
  }
}
</script>

<style lang="scss">
</style>
