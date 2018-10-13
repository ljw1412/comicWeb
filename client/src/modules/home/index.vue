<template>
  <div class="home">
    <div class="home__main">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
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
  &__main {
    margin: 0 auto;
    width: 1160px;
    height: 100%;
    padding: 10px;
  }
}
@media screen and (max-width: 1160px) {
  .home {
    &__main {
      width: 980px;
    }
  }
}
@media screen and (max-width: 980px) {
  .home {
    &__main {
      width: 100%;
    }
  }
}
</style>

