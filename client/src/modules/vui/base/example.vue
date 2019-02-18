<template>
  <div class="example">
    <div class="example__perview">
      <div class="perview__panel">
        <div v-if="$slots.demo"
          class="perview__demo">
          <div class="subtitle">效果预览：</div>
          <slot name="demo"></slot>
        </div>
        <div v-if="$slots.controller"
          class="perview__controller">
          <div class="subtitle">参数操作：</div>
          <slot name="controller"></slot>
        </div>
      </div>
      <div v-if="$slots.code"
        class="perview__code">
        <div class="subtitle">代码预览：</div>
        <slot name="code"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.example {
  position: relative;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-bottom: 20px;
  transition: all 0.2s ease-in-out;
  padding: 5px;
  &:hover {
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);
  }
  .perview {
    &__panel {
      position: relative;
      &::after {
        content: ' ';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        border: 0.5px dashed #ccc;
        transform: translateX(-50%);
      }
    }
    &__demo,
    &__controller {
      display: inline-block;
      width: 50%;
      padding: 0 10px 10px;
      vertical-align: top;
    }
    &__code {
      border-top: 1px dashed #ccc;
      padding: 5px;
    }
  }
}
.subtitle {
  position: relative;
  font-weight: bold;
  font-size: 14px;
  padding: 5px;
  padding-left: 10px;
  &::before {
    content: ' ';
    position: absolute;
    left: 0;
    top: 50%;
    background-color: #ff8c00;
    transform: translateY(-50%);
    display: inline-block;
    width: 5px;
    height: 14px;
  }
}
</style>
