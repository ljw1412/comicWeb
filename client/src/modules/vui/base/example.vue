<template>
  <div class="example">
    <div class="example__perview">
      <div class="perview__panel">
        <div class="perview__demo">
          <slot name="demo"></slot>
        </div>
        <div class="perview__controller">
          <slot name="controller"></slot>
        </div>
      </div>
      <div class="perview__code">
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
  width: 94%;
  border: 1px solid #eee;
  border-radius: 6px;
  margin: 0 auto 20px;
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
      padding: 5px;
      vertical-align: top;
    }
  }
}
</style>
