<template>
  <div class="home">
    <div class="home__main">
      <router-view/>
    </div>
    <action-view></action-view>
  </div>
</template>

<script>
import ActionView from '../../components/actionView'
export default {
  components: {
    ActionView
  },
  data() {
    return {}
  },
  methods: {},
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
    height: 100%;
    width: 100%;
  }
}
</style>

