<template>
  <div class="action-view">
    <template v-if="isMac">
      <dock></dock>
    </template>
    <template v-else>
      <taskbar :n-time="time"
        :n-date="date"
        :isNotificationsShow.sync="isNotificationsShow"
        :isDateTimeShow.sync="isDateTimeShow"></taskbar>
      <transition enter-active-class="slideInRight"
        leave-active-class="slideOutRight">
        <div v-if="isNotificationsShow"
          class="action-view__notifications">
          <notifications></notifications>
        </div>
      </transition>
      <transition enter-active-class="fadeIn"
        leave-active-class="fadeOut">
        <div v-if="isDateTimeShow"
          class="action-view__calendar">
          <calendar :n-time="time"
            :n-date="date"></calendar>
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
import Taskbar from './windows/taskbar'
import Notifications from './windows/notifications'
import Calendar from './windows/calendar'
import Dock from './mac/dock'
import { oneOf } from '@/utils/assist'
import moment from 'moment'

export default {
  components: {
    Taskbar,
    Notifications,
    Calendar,
    Dock
  },

  props: { os: { type: String } },

  computed: {
    date() {
      return moment(this.now).format('YYYY-MM-DD')
    },

    time() {
      return moment(this.now).format('HH:mm:ss')
    },

    currentOS() {
      return oneOf(this.os, ['windows', 'mac']) ? this.os : ''
    },

    isMac() {
      return this.currentOS === 'mac'
    }
  },

  data() {
    return {
      dateTimeTimer: null,
      now: new Date(),
      isNotificationsShow: false,
      isDateTimeShow: false
    }
  },

  methods: {
    startTimer() {
      this.clearTimer()
      this.timer = setInterval(() => {
        this.now = new Date()
      }, 1000)
    },

    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    }
  },

  mounted() {
    this.startTimer()
  },

  beforeDestroy() {
    this.clearTimer()
  }
}
</script>

<style lang="scss" scoped>
.action-view {
  &__notifications {
    width: 300px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 40px;
    z-index: 99990;
    animation-duration: 0.3s;
  }
  &__calendar {
    width: 300px;
    position: absolute;
    bottom: 40px;
    right: 0;
    z-index: 99980;
    animation-duration: 0.5s;
  }
}
</style>
