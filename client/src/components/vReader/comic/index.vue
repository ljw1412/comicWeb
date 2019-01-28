<template>
  <div class="v-reader v-comic-reader">
    <operation-area @area-click="handleAreaClick"
      @area1-click="handleArea1Click"
      @area2-click="handleArea2Click"
      @area3-click="handleArea3Click"></operation-area>
  </div>
</template>

<script>
import OperationArea from './components/operationArea'
export default {
  components: {
    OperationArea
  },

  methods: {
    handleAreaClick(e) {
      console.log(e)
    },

    handleArea1Click() {
      console.log('Area1Click')
    },

    handleArea2Click() {
      console.log('Area2Click')
    },

    handleArea3Click() {
      console.log('Area3Click')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-reader {
  position: relative;
  height: 100%;
}
</style>
