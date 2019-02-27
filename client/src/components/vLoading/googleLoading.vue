<template>
  <div class="v-loading-wrappper">
    <div class="v-loading"
      :class="`animation-${type}`">
      <div v-for="index of 4"
        class="shape"
        :key="'shape'+index"
        :class="`shape${index}`"></div>
    </div>
  </div>

</template>

<script>
export default {
  props: { type: { type: Number, default: 1 } }
}
</script>

<style lang="scss" scoped>
.v-loading-wrappper {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  padding: 10px;
}
.v-loading {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  .shape {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 1px;
    &.shape1 {
      left: 0;
      background-color: #5c6bc0;
    }
    &.shape2 {
      right: 0;
      background-color: #8bc34a;
    }
    &.shape3 {
      bottom: 0;
      background-color: #ffb74d;
    }
    &.shape4 {
      bottom: 0;
      right: 0;
      background-color: #f44336;
    }
  }

  &.animation-1 {
    transform: rotate(45deg);
  }
  &.animation-2,
  &.animation-4 {
    transform: rotate(10deg);
  }
  &.animation-2 .shape,
  &.animation-4 .shape {
    border-radius: 5px;
  }
  &.animation-2,
  &.animation-3,
  &.animation-4 {
    -webkit-animation: rotation 1s infinite;
    animation: rotation 3s infinite;
  }
  &.animation-3 .shape1 {
    border-top-left-radius: 10px;
  }
  &.animation-3 .shape2 {
    border-top-right-radius: 10px;
  }
  &.animation-3 .shape3 {
    border-bottom-left-radius: 10px;
  }
  &.animation-3 .shape4 {
    border-bottom-right-radius: 10px;
  }
  &.animation-4,
  &.animation-5 {
    transform: rotate(45deg);
  }
  &.animation-5 .shape {
    width: 15px;
    height: 15px;
  }
  &.animation-6 {
    -webkit-animation: rotation 1s infinite;
    animation: rotation 1s infinite;
  }
  &.animation-6 .shape {
    width: 12px;
    height: 12px;
    border-radius: 2px;
  }
}

.animation-1 {
  .shape1 {
    animation: animation1shape1 0.5s ease 0s infinite alternate;
  }
  .shape2 {
    animation: animation1shape2 0.5s ease 0s infinite alternate;
  }
  .shape3 {
    animation: animation1shape3 0.5s ease 0s infinite alternate;
  }
  .shape4 {
    animation: animation1shape4 0.5s ease 0s infinite alternate;
  }
}

@mixin animation1($shapeNum, $translateX, $translateY) {
  @keyframes animation1shape#{$shapeNum} {
    from {
      transform: translate(0, 0);
    }
    to {
      transform: translate($translateX + px, $translateY + px);
    }
  }
}

@include animation1(1, 16, 16);
@include animation1(2, -16, 16);
@include animation1(3, 16, -16);
@include animation1(4, -16, -16);

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
