<template>
  <div :class="wrapClasses"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false">
    <template v-if="!isTextarea">
      <div class="v-input__prefix"
        v-if="$slots.prefix || prefixIcon">
        <slot name="prefix">
          <Icon v-if="prefixIcon"
            :type="prefixIcon"></Icon>
        </slot>
      </div>
      <input ref="input"
        :class="inputClasses"
        :type="type"
        :value="currentValue"
        :disabled="disabled"
        :placeholder="placeholder"
        @keyup.enter="handleEnter"
        @keyup="handleKeyup"
        @keypress="handleKeypress"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
        @change="handleChange" />
    </template>
    <textarea v-else
      ref="textarea"
      :value="currentValue"
      :disabled="disabled"
      :placeholder="placeholder"
      @keyup.enter="handleEnter"
      @keyup="handleKeyup"
      @keypress="handleKeypress"
      @keydown="handleKeydown"
      @focus="handleFocus"
      @blur="handleBlur"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      @input="handleInput"
      @change="handleChange"></textarea>
  </div>
</template>

<script>
import { oneOf } from '@/utils/assist'
export default {
  name: 'VInput',

  componentName: 'VInput',

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: Boolean,
    radius: Boolean,
    size: String,
    theme: {
      type: String,
      default: ''
    },
    type: {
      validator(value) {
        return oneOf(value, [
          'text',
          'textarea',
          'password',
          'url',
          'email',
          'date'
        ])
      },
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    suffixIcon: String,
    prefixIcon: String,
    search: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isTextarea() {
      return this.type === 'textarea'
    },

    currentTheme() {
      return oneOf(this.theme, ['windows', 'mac']) ? this.theme : ''
    },

    currentSize() {
      return oneOf(this.size, ['mini', 'small', 'medium']) ? this.size : ''
    },

    wrapClasses() {
      return [
        'v-input',
        {
          [`v-input--${this.currentTheme}`]: this.currentTheme,
          [`v-input--${this.currentSize}`]:
            !this.isTextarea && this.currentSize,
          'v-input--prefix': this.$slots.prefix || this.prefixIcon,
          'v-input--suffix':
            this.$slots.suffix || this.suffixIcon || this.clearable
        }
      ]
    },

    inputClasses() {
      return ['v-input__inner', { 'v-input__inner--radius': this.radius }]
    }
  },

  data() {
    return {
      currentValue: this.value,
      hovering: false,
      // 正在拼写
      isOnComposition: false
    }
  },

  methods: {
    setCurrentValue(value) {
      if (value === this.currentValue) return
      this.currentValue = value
    },

    handleEnter(event) {
      this.$emit('enter', event)
      if (this.search) this.$emit('search', this.currentValue)
    },

    handleKeydown(event) {
      this.$emit('keydown', event)
    },

    handleKeypress(event) {
      this.$emit('keypress', event)
    },

    handleKeyup(event) {
      this.$emit('keyup', event)
    },

    handleIconClick(event) {
      this.$emit('icon-click', event)
    },

    handleFocus(event) {
      this.$emit('focus', event)
    },

    handleBlur(event) {
      this.$emit('blur', event)
    },

    handleComposition(event) {
      if (event.type === 'compositionstart') {
        this.isOnComposition = true
      }
      if (event.type === 'compositionend') {
        this.isOnComposition = false
        this.handleInput(event)
      }
    },

    handleInput(event) {
      if (this.isOnComposition) return
      let value = event.target.value
      this.setCurrentValue(value)
      this.$emit('input', value)
    },

    handleChange(event) {
      this.$emit('change', event.target.value)
    }
  }
}
</script>

<style lang="scss">
.v-input {
  position: relative;
  display: inline-block;
  font-size: 14px;
  width: 100%;

  &__prefix,
  &__suffix {
    line-height: 1;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.3s;
    text-align: center;
    // height: 100%;
    color: #c0c4cc;
  }

  &__prefix {
    left: 3px;
    transition: all 0.3s;
  }

  &__suffix {
    right: 3px;
    transition: all 0.3s;
    pointer-events: none;
  }

  &__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 6px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    &--radius {
      border-radius: 4px;
    }
  }

  &--mini {
    font-size: 12px;
    .v-input {
      &__inner {
        height: 20px;
        line-height: 20px;
        padding: 0 2px;
      }
    }
  }

  &--small {
    .v-input {
      font-size: 13px;
      &__inner {
        height: 26px;
        line-height: 26px;
        padding: 0 4px;
      }
    }
  }

  &--medium {
    font-size: 14px;
    .v-input {
      &__prefix,
      &__suffix {
        font-size: 16px;
      }
      &__inner {
        height: 32px;
        line-height: 32px;
        padding: 0 6px;
      }
    }
  }

  &--windows {
    .v-input {
      &__inner {
        border: 1px solid #c6c6c6;
      }
    }
  }

  &--prefix {
    .v-input {
      &__inner {
        padding-left: 22px;
      }
    }
  }

  &--mac {
    .v-input {
      &__inner {
        border: 1px solid #d2d2d2;
        &:focus {
          outline: none;
          border: 1px solid #7eb9fc;
          box-shadow: 1px 0 3px #7eb9fc, -1px 0 3px #7eb9fc, 0 1px 3px #7eb9fc,
            0 -1px 3px #7eb9fc, 0 0 3px #7eb9fc inset;
        }
        // height: 20px;
        // line-height: 20px;
      }
    }
  }
}
</style>
