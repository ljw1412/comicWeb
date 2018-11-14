<template>
  <div class="home">
    <div class="home__main">
      <router-view/>
    </div>
    <sidebar :postion="2"></sidebar>
    <taskbar></taskbar>
  </div>
</template>

<script>
import Taskbar from '../../components/taskbar'
import Sidebar from './components/sidebar'
export default {
  components: {
    Sidebar,
    Taskbar
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
  display: flex;
  flex-direction: column;
  &__main {
    flex-grow: 1;
    width: 100%;
    height: 0;
    padding: 10px;
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

