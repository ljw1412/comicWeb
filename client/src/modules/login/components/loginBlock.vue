<template>
  <div class="login-block">
    <i-form class="login-block__warpper"
      :model="user">
      <transition name="slide-fade-1">
        <i-form-item v-if="isLoaded">
          <i-input v-model="user.name"
            placeholder="请输入用户名"></i-input>
        </i-form-item>
      </transition>
      <transition name="slide-fade-2">
        <i-form-item v-if="isLoaded">
          <i-input v-model="user.password"
            type="password"
            placeholder="请输入密码"></i-input>
        </i-form-item>
      </transition>
      <transition name="slide-fade-1">
        <i-form-item v-if="isRegisterInputShow">
          <i-input v-model="user.retypePassword"
            type="password"
            placeholder="请再次输入密码"></i-input>
        </i-form-item>
      </transition>
      <transition name="slide-fade-2">
        <i-form-item v-if="isRegisterInputShow">
          <i-input v-model="user.email"
            type="email"
            placeholder="请输入邮箱"></i-input>
        </i-form-item>
      </transition>
      <transition name="slide-fade-3">
        <div v-if="isLoaded"
          class="login-block__button">
          <span @click="onRegisterClick">{{registerText}}</span>
          <i-button type="primary">{{buttonText}}</i-button>
        </div>
      </transition>
    </i-form>
  </div>
</template>

<script>
export default {
  computed: {
    registerText() {
      return this.isRegister ? '返回登录' : '立刻注册'
    },
    buttonText() {
      return this.isRegister ? '注册' : '登录'
    }
  },
  data() {
    return {
      isLoaded: false,
      isRegister: false,
      isRegisterInputShow: false,
      user: {
        name: '',
        password: '',
        retypePassword: '',
        email: ''
      }
    }
  },
  methods: {
    onRegisterClick() {
      this.isRegisterInputShow = !this.isRegisterInputShow
      this.isRegister = !this.isRegister
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoaded = true
    }, 900)
  }
}
</script>

<style lang="scss" scoped>
.login-block {
  width: 240px;
  margin: 0 auto;
  &__warpper {
    overflow: hidden;
  }
  &__button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      cursor: pointer;
      margin-right: 10px;
      &:hover {
        color: #ff8c00;
      }
    }
  }
}
@mixin slide-fade($in-delay, $out-delay) {
  &-enter-active {
    transition: all 0.5s ease $in-delay;
  }
  &-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1) $out-delay;
  }
  &-enter,
  &-leave-to {
    transform: translateX(240px);
    opacity: 0;
  }
}
.slide-fade-1 {
  @include slide-fade(0s, 0.3s);
}
.slide-fade-2 {
  @include slide-fade(0.3s, 0s);
}
.slide-fade-3 {
  @include slide-fade(0.6s, 0s);
}
</style>
