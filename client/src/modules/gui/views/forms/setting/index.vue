<template>
  <v-form v-model="visible"
    name="TaskSetting"
    class="setting-form"
    resizable
    splashScreen
    icon="md-settings"
    :close="isClose"
    :title="title"
    :windowHeight="windowHeight"
    :minWidth="minWidth"
    :minHeight="minHeight"
    :width="width"
    :height="height"
    :x="x"
    :y="y"
    @resize="onFormResize"></v-form>
</template>

<script>
import VForm from '@/components/vForm'
import customForm from '../../../mixins/customForm.js'
export default {
  mixins: [customForm],

  components: {
    VForm
  },

  data() {
    return { title: '设置' }
  },

  methods: {
    onFormResize(e) {}
  },

  beforeCreate() {
    this.name = 'TaskSetting'
  }
}
</script>

<style lang="scss" scoped>
</style>
