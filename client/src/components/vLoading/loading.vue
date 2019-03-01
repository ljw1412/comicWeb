<template>
  <div class="v-loading-wrappper"
    :class="`v-loading-wrappper-${finalType}`">
    <div class="v-loading"
      :class="animationClasses">
      <div v-for="index of 4"
        class="shape"
        :key="'shape'+index"
        :class="`shape${index}`"></div>
    </div>
  </div>

</template>

<script>
export default {
  props: { type: { type: Number, default: 1 } },

  computed: {
    finalType() {
      return this.type > 7 ? 7 : this.type < 1 ? 1 : this.type
    },

    animationClasses() {
      return `animation-${this.finalType}`
    }
  }
}
</script>

<style lang="scss" scoped>
.v-loading-wrappper {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  padding: 10px;
  &-7 {
    width: 70px;
    height: 70px;
    padding: 20px;
  }
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

  &.animation-1,
  &.animation-4,
  &.animation-5,
  &.animation-7 {
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
    animation: rotation 3s infinite;
  }
  &.animation-3 {
    .shape1 {
      border-top-left-radius: 10px;
    }
    .shape2 {
      border-top-right-radius: 10px;
    }
    .shape3 {
      border-bottom-left-radius: 10px;
    }
    .shape4 {
      border-bottom-right-radius: 10px;
    }
  }
  &.animation-5 .shape,
  &.animation-7 .shape {
    width: 15px;
    height: 15px;
  }
  &.animation-6 {
    animation: rotation 1.5s infinite;
  }
  &.animation-6 .shape {
    width: 12px;
    height: 12px;
    border-radius: 2px;
  }
  &.animation-7 {
    @keyframes loading-center-absolute {
      0% {
        transform: rotate(45deg);
      }
      25% {
        transform: rotate(135deg);
      }
      50% {
        transform: rotate(225deg);
      }
      75% {
        transform: rotate(315deg);
      }
      100% {
        transform: rotate(405deg);
      }
    }
    animation: loading-center-absolute 8s infinite;
  }
}

@for $j from 1 through 3 {
  .animation-#{$j} {
    @for $i from 1 through 4 {
      .shape#{$i} {
        animation: animation#{$j}shape#{$i} 0.5s ease 0s infinite alternate;
      }
    }
  }
}

.animation-4 {
  @each $i, $delay in (1: 0, 2: 0.3, 3: 0.3, 4: 0) {
    .shape#{$i} {
      animation: animation4shape#{$i} 0.3s ease $delay + s infinite alternate;
    }
  }
}

.animation-5 {
  @for $i from 1 through 4 {
    .shape#{$i} {
      animation: animation5shape#{$i} 2s ease 0s infinite reverse;
    }
  }
}

.animation-6 {
  @for $i from 1 through 4 {
    .shape#{$i} {
      animation: animation6shape#{$i} 2s linear 0s infinite normal;
    }
  }
}

.animation-7 {
  @for $i from 1 through 4 {
    .shape#{$i} {
      animation: animation7shape#{$i} 2s infinite;
    }
  }
}

@mixin animationTranslate($animationNum, $shapeNum, $translateX, $translateY) {
  @keyframes animation#{$animationNum}shape#{$shapeNum} {
    from {
      transform: translate(0, 0);
    }
    to {
      transform: translate($translateX + px, $translateY + px);
    }
  }
}

@mixin animationT2($animationNum, $index, $x25, $y25, $x50, $y50, $x75, $y75) {
  @keyframes animation#{$animationNum}shape#{$index} {
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate($x25 + px, $y25 + px);
    }
    50% {
      transform: translate($x50 + px, $y50 + px);
    }
    75% {
      transform: translate($x75 + px, $y75 + px);
    }
  }
}

@mixin animationTR($index, $sX, $sY, $sAngle, $eX, $eY, $eAngle) {
  @keyframes animation7shape#{$index} {
    25% {
      transform: translate($sX + px, $sY + px) rotate($sAngle + deg);
    }
    100% {
      transform: translate($eX + px, $eY + px) rotate($eAngle + deg);
    }
  }
}

@each $index, $size in (1: 16, 2: 20, 3: 5, 4: 5) {
  @include animationTranslate($index, 1, $size, $size);
  @include animationTranslate($index, 2, -$size, $size);
  @include animationTranslate($index, 3, $size, -$size);
  @include animationTranslate($index, 4, -$size, -$size);
}

@each $index, $size in (5: 15, 6: 18) {
  @include animationT2($index, 1, 0, $size, $size, $size, $size, 0);
  @include animationT2($index, 2, -$size, 0, -$size, $size, 0, $size);
  @include animationT2($index, 3, $size, 0, $size, -$size, 0, -$size);
  @include animationT2($index, 4, 0, -$size, -$size, -$size, -$size, 0);
}

@include animationTR(1, 0, -15, -180, 0, 0, -180);
@include animationTR(2, 15, 0, -180, 0, 0, -180);
@include animationTR(3, -15, 0, -180, 0, 0, -180);
@include animationTR(4, 0, 15, -180, 0, 0, -180);

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
