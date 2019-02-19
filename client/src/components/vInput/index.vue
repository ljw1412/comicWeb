<template>
  <div :class="wrapClasses"
    :style="wrapStyles"
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
      <div class="v-input__suffix"
        v-if="search || $slots.suffix || suffixIcon || showClear">
        <Icon v-if="showClear"
          class="suffix__clear v-input__fixed-icon"
          :class="{'suffix__clear--search':search}"
          type="ios-close-circle"
          @click="clear" />
        <template v-if="!search">
          <slot v-if="!showClear"
            name="suffix">
            <Icon v-if="suffixIcon"
              :type="suffixIcon" />
          </slot>
        </template>
        <Icon v-else
          class="suffix__search v-input__fixed-icon"
          type="ios-search"
          @click="searchClick" />
      </div>
      <input ref="input"
        :class="inputClasses"
        :type="type"
        :value="currentValue"
        :maxlength="maxlength"
        :disabled="disabled"
        :readonly="readonly"
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
      :class="textareaClasses"
      :value="currentValue"
      :rows="rows"
      :maxlength="maxlength"
      :disabled="disabled"
      :readonly="readonly"
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
    width: String,
    maxlength: Number,
    os: {
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
    readonly: {
      type: Boolean,
      default: false
    },
    resize: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 2
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

    currentOS() {
      return oneOf(this.os, ['windows', 'mac']) ? this.os : ''
    },

    currentSize() {
      return oneOf(this.size, ['mini', 'small', 'medium']) ? this.size : ''
    },

    wrapClasses() {
      return [
        'v-input',
        {
          [`v-input--${this.currentOS}`]: this.currentOS,
          [`v-input--${this.currentSize}`]:
            !this.isTextarea && this.currentSize,
          'v-input--prefix': this.$slots.prefix || this.prefixIcon,
          'v-input--suffix':
            this.$slots.suffix || this.suffixIcon || this.clearable
        }
      ]
    },

    wrapStyles() {
      return {
        width: this.width
      }
    },

    inputClasses() {
      return [
        'v-input__inner-input',
        { 'v-input__inner-input--radius': this.radius }
      ]
    },

    textareaClasses() {
      return [
        'v-input__textarea',
        {
          'v-input__textarea--disabled': this.disabled,
          'v-input__textarea--resize': this.resize,
          'v-input__textarea--radius': this.radius
        }
      ]
    },

    showClear() {
      return (
        this.clearable &&
        !this.disabled &&
        !this.readonly &&
        this.currentValue !== '' &&
        (this.focused || this.hovering)
      )
    }
  },

  data() {
    return {
      currentValue: this.value,
      hovering: false,
      focused: false,
      // 正在拼写
      isOnComposition: false
    }
  },

  methods: {
    focus() {
      ;(this.$refs.input || this.$refs.textarea).focus()
    },

    blur() {
      ;(this.$refs.input || this.$refs.textarea).blur()
    },

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
      this.focused = true
      this.$emit('focus', event)
    },

    handleBlur(event) {
      this.focused = false
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
    },

    clear() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
      this.setCurrentValue('')
      this.focus()
    },

    searchClick() {
      this.$emit('search', this.currentValue)
    }
  }
}
</script>

<style lang="scss">
$border-color--normal: #d2d2d2;
$border-color--foucs-windows: #818387;
$border-color--foucs-mac: #7eb9fc;
$font-color: #606266;
@mixin icon {
  line-height: 1;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s;
  text-align: center;
  z-index: 9;
  // height: 100%;
  color: #c0c4cc;
}

.v-input {
  position: relative;
  display: inline-block;
  font-size: 14px;
  width: 100%;

  &__prefix {
    @include icon;
    left: 4px;
    transition: all 0.3s;
    pointer-events: all;
  }

  &__suffix {
    @include icon;
    right: 5px;
    transition: all 0.3s;
    pointer-events: all;
    .suffix__clear--search {
      margin-right: 2px;
    }
  }

  &__fixed-icon {
    cursor: pointer;
    &:hover {
      color: #909399;
    }
  }

  &__inner-input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border: 1px solid $border-color--normal;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 32px;
    line-height: 32px;
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
      &__inner-input {
        height: 20px;
        line-height: 20px;
        padding: 0 2px;
      }
    }
  }

  &--small {
    font-size: 13px;
    .v-input {
      &__inner-input {
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
      &__inner-input {
        height: 32px;
        line-height: 32px;
        padding: 0 6px;
      }
    }
  }

  &--prefix {
    .v-input {
      &__inner-input {
        padding-left: 22px;
      }
    }
  }

  &--suffix {
    .v-input {
      &__inner-input {
        padding-right: 22px;
      }
    }
  }

  &__textarea {
    width: 100%;
    border: 1px solid $border-color--normal;
    padding: 5px;
    resize: none;
    &--resize {
      resize: vertical;
    }
    &--radius {
      border-radius: 4px;
    }
  }

  &--windows {
    .v-input {
      &__inner-input,
      &__textarea {
        border: 1px solid $border-color--normal;
        &:focus {
          outline: none;
          border-color: $border-color--foucs-windows;
          box-shadow: none;
        }
      }
    }
  }

  &--mac {
    .v-input {
      &__inner-input,
      &__textarea {
        border: 1px solid $border-color--normal;
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
