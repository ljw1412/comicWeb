<template>
  <div class="login">
    <transition name="expand">
      <div v-if="isReady"
        class="login__warpper">
        <login-block></login-block>
      </div>
    </transition>
  </div>
</template>

<script>
import LoginBlock from './components/loginBlock'
export default {
  components: {
    LoginBlock
  },
  data() {
    return {
      isReady: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.isReady = true
    }, 300)
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  background-color: #ccc;
  position: relative;
  &__warpper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.92);
    padding: 50px 0 20px 0;
    border-radius: 4px;
    min-height: 220px;
  }
}

.expand-enter {
  min-height: 0;
  padding: 0;
}
.expand-enter-to {
  min-height: 220px;
  padding: 50px 0 20px 0;
}
.expand-enter-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.64, 2.14);
}
</style>
