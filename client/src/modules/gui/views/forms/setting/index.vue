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

  props: {
    // modal最小的宽高
    minWidth: { type: Number, default: 600 },
    minHeight: { type: Number, default: 400 },
    // modal 初始化时的宽高
    width: { type: Number, default: 600 },
    height: { type: Number, default: 400 }
  },

  computed: {},

  data() {
    return {
      title: '设置'
    }
  },

  methods: {
    onModalResize(e) {}
  },

  beforeCreate() {
    this.name = 'TaskSetting'
  }
}
</script>

<style lang="scss" scoped>
</style>
