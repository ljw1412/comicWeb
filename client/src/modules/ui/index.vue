<template>
  <div class="ui">
    <div>
      <div class="v-icon v-icon-ios-add-circle-outline"></div>
      <div>VInput - input(value:'{{input.value1}}')</div>
      <v-input v-model="input.value1"
        theme="windows"
        size="mini"
        @input="onInput"
        @change="onInputChange"
        @enter="onInputEnter"
        @keydown="onInputKeydown"
        @keypress="onInputKeypress"
        @keyup="onInputKeyup"
        @focus="onInputFocus"
        @blur="onInputBlur"></v-input>
      <div>VInput - textarea(value:'{{input.value2}}')</div>
      <v-input v-model="input.value2"
        type="textarea"
        theme="mac"
        @input="onInput"
        @change="onInputChange"
        @enter="onInputEnter"
        @keydown="onInputKeydown"
        @keypress="onInputKeypress"
        @keyup="onInputKeyup"
        @focus="onInputFocus"
        @blur="onInputBlur"></v-input>
    </div>
  </div>
</template>

<script>
import VInput from '@/components/vInput'
export default {
  components: {
    VInput
  },

  data() {
    return {
      input: { value1: '', value2: '' }
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
    }
  }
}
</script>

<style lang="scss">
</style>
