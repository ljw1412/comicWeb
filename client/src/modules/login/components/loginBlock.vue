<template>
  <div class="login-block">
    <div class="login-block__username input-warpper">
      <i-input v-model="user.name"
        placeholder="请输入用户名"></i-input>
    </div>
    <div class="login-block__password input-warpper">
      <i-input v-model="user.password"
        type="password"
        placeholder="请输入密码"></i-input>
    </div>
    <template v-if="isRegister">
      <div class="login-block__retype-password input-warpper">
        <i-input v-model="user.retypePassword"
          type="password"
          placeholder="请再次输入密码"></i-input>
      </div>
      <div class="login-block__email input-warpper">
        <i-input v-model="user.email"
          type="email"
          placeholder="请输入邮箱"></i-input>
      </div>
    </template>
    <div class="login-block__button input-warpper">
      <span @click="onRegisterClick">{{registerText}}</span>
      <i-button type="primary">{{buttonText}}</i-button>
    </div>
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
      isRegister: false,
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
      this.isRegister = !this.isRegister
    }
  }
}
</script>

<style lang="scss" scoped>
.login-block {
  width: 240px;
  .input-warpper {
    padding-top: 20px;
  }
  &__button {
    display: flex;
    justify-content: flex-end;
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
</style>
