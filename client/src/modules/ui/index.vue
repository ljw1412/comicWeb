<template>
  <div class="ui">
    <div>
      <div class="v-icon v-icon-ios-add-circle-outline"></div>
      <div>VInput - input(value:'{{input.value1}}')</div>
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
      <div>VInput - textarea(value:'{{input.value2}}')</div>
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
    <div>VScrollView</div>
    <v-scroll-view style="height:200px;width: 300px;">
      <div v-for="index of 100"
        :key="index">
        <span v-for="j of 100"
          :key="j">{{index*j}}</span>
      </div>
    </v-scroll-view>
  </div>
</template>

<script>
import VInput from '@/components/vInput'
import VScrollView from '@/components/vScrollView'

export default {
  components: {
    VInput,
    VScrollView
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
    },

    onSearch(e) {
      console.log('onSearch', e)
    }
  }
}
</script>

<style lang="scss">
</style>
