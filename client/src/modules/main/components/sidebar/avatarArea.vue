<template>
  <div class="avatar-area"
    :class="{'avatar-area--collapsed':isCollapsed}">
    <div class="avatar"
      @click="handleAvatarClick"></div>
    <transition enter-active-class="fade-enter-active"
      v-on:after-enter="infoAfterEnter">
      <div v-show="!isCollapsed"
        class="info">
        <div class="info__row">
          <span class="info__username">用户名</span>
          <span class="info__m-coin">M币</span>
        </div>
        <div class="info__level">
          <level-bar v-if="isDisplayedInfo"
            :level="1"
            :current="70"
            :max="100"></level-bar>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import LevelBar from '../levelBar'
import { mapActions } from 'vuex'
export default {
  name: 'AvatarArea',

  components: {
    LevelBar
  },

  props: { isCollapsed: Boolean },

  data() {
    return {
      isDisplayedInfo: false
    }
  },

  methods: {
    ...mapActions('main', ['showLogin']),
    infoAfterEnter(el) {
      this.isDisplayedInfo = true
    },

    // infoLeave(el) {
    //   this.isDisplayedInfo = false
    // }

    handleAvatarClick() {
      this.showLogin()
    }
  }
}
</script>

<style lang="scss" scoped>
/* 折叠状态  */
.avatar-area.avatar-area--collapsed {
  width: 50px;
  height: 50px;
  padding: 5px;
  .avatar {
    width: 40px;
    height: 40px;
    transition-delay: 0;
  }
}
/* 展开状态 */
.avatar-area {
  display: flex;
  width: 100%;
  padding: 20px;
  transition-duration: 0.3s;
  .avatar {
    cursor: pointer;
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid #707070;
    transition-duration: 0.3s;
    transition-delay: 0.1s;
  }
  .info {
    min-width: 250px;
    overflow: hidden;
    flex-grow: 1;
    margin-left: 10px;
    &__row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    &__username {
      font-size: 20px;
    }
  }
}

.fade-enter-active {
  animation-delay: 0.3s;
  animation-duration: 0.3s;
}
</style>
