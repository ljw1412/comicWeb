<template>
  <div v-if="isDisplayLoginDialog"
    class="login-wrapper">
    <div class="login">
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('main', ['isDisplayLoginDialog'])
  },

  methods: {
    ...mapActions('main', ['hideLogin'])
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  height: 410px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>
