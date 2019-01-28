<template>
  <div ref="area"
    class="operation-area-wrapper"
    :class="wrapClasses"
    @click.stop="onClick">
    <template v-if="isDisplayGuide">
      <div v-for="index of 3"
        :key="index"
        class="operation-area"
        :class="`area${index}`">
        <span>{{guideTextList[index - 1]}}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    isVertical: Boolean,
    noMiddle: Boolean,
    disabled: Boolean,
    textList: { type: Array, default: () => ['上一页', '工具栏', '下一页'] }
  },

  computed: {
    wrapClasses() {
      return this.isVertical
        ? 'operation-area-wrapper--vertical'
        : 'operation-area-wrapper--horizontal'
    },

    guideTextList() {
      return this.textList.concat(['', '', '']).slice(0, 3)
    }
  },

  data() {
    return {
      isDisplayGuide: true
    }
  },

  methods: {
    // 三等分发出
    trisectionEmit(clickInfo) {
      const totalLength = this.isVertical ? clickInfo.height : clickInfo.width
      const length = this.isVertical ? clickInfo.y : clickInfo.x
      if (length <= totalLength / 3) {
        this.$emit('area1-click')
      } else if (length > totalLength / 3 && length < (totalLength * 2) / 3) {
        this.$emit('area2-click')
      } else {
        this.$emit('area3-click')
      }
    },

    onClick(e) {
      if (this.disabled) return
      if (this.isDisplayGuide) {
        this.isDisplayGuide = false
        return
      }
      const area = this.$refs.area.getBoundingClientRect()

      const areaClickInfo = {
        x: e.offsetX,
        y: e.offsetY,
        width: area.width,
        height: area.height
      }
      this.$emit('area-click', areaClickInfo)
      this.trisectionEmit(areaClickInfo)
    },

    displayGuide() {
      this.isDisplayGuide = true
    }
  }
}
</script>

<style lang="scss" scoped>
.operation-area-wrapper {
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  display: flex;

  .operation-area {
    position: relative;
    color: #606266;
    font-size: 2em;
    &.area1 {
      background-color: rgba($color: #f56c6c, $alpha: 0.6);
    }
    &.area2 {
      background-color: rgba($color: #e6a23c, $alpha: 0.6);
    }
    &.area3 {
      background-color: rgba($color: #67c23a, $alpha: 0.6);
    }
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &--vertical {
    flex-direction: column;
    .operation-area {
      height: 33.33333%;
      // width: 100%;
      // 文字水平排列
      writing-mode: horizontal-tb;
    }
  }
  &--horizontal {
    flex-direction: row;
    .operation-area {
      // height: 100%;
      width: 33.3333333%;
      // 文字垂直排列
      writing-mode: vertical-lr;
    }
  }
}
</style>
