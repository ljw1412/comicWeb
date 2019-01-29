<template>
  <div class="ui-component-marquee">
    <h1>VMarquee</h1>
    <example>
      <div slot="demo"
        style="border:1px solid #ccc;">
        <v-marquee :width="width"
          :height="height"
          :direction="direction"
          :duration="duration"
          :always="always">{{ text }}</v-marquee>
      </div>
      <div slot="controller">
        <i-form slot="controller"
          :label-width="80">
          <i-form-item label="value">
            <i-input v-model="text"></i-input>
          </i-form-item>
          <i-form-item label="width">
            <i-input v-model="width"></i-input>
          </i-form-item>
          <i-form-item label="height">
            <i-input v-model="height"></i-input>
          </i-form-item>
          <i-form-item label="direction">
            <i-select v-model="direction">
              <i-option value="left"
                label="left"></i-option>
              <i-option value="right"
                label="right"></i-option>
              <i-option value="up"
                label="up"></i-option>
              <i-option value="down"
                label="down"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="duration">
            <i-input v-model="duration"></i-input>
          </i-form-item>
          <i-form-item label="always">
            <i-switch v-model="always"></i-switch>
          </i-form-item>
        </i-form>
      </div>
    </example>
  </div>
</template>

<script>
import VMarquee from '@/components/vMarquee'
import Example from './base/example'
export default {
  components: { VMarquee, Example },

  data() {
    return {
      text: '',
      width: '100%',
      height: '20px',
      direction: 'left',
      duration: '5000ms',
      always: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
