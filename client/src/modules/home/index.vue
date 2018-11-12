<template>
  <div class="home">
    <div class="home__main">
      <router-view/>
    </div>
    <div class="home__sidebar">
      <sidebar :postion="2"></sidebar>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/sidebar'
export default {
  components: {
    Sidebar
  },
  data() {
    return {}
  },
  mounted() {
    // this.$callApi({
    //   method: 'post',
    //   api: 'user/login',
    //   param: {
    //     username: 'lll',
    //     password: '123456'
    //   }
    // }).then(data => {
    //   console.log(data)
    // })
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  &__main {
    margin: 0 auto;
    width: 1160px;
    height: 100%;
    padding: 10px;
  }
  &__sidebar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 100%;
    width: 100%;
    height: 100%;
  }
}
@media screen and (max-width: 1160px) {
  .home {
    &__main {
      width: 980px;
    }
    &__sidebar {
      width: 1160px;
    }
  }
}
</style>

