<template>
  <div class="action-view">
    <taskbar :n-time="time"
      :n-date="date"
      :isNotificationsShow.sync="isNotificationsShow"
      :isDateTimeShow.sync="isDateTimeShow"></taskbar>
    <transition name="slideIn"
      enter-active-class="slideInRight"
      leave-active-class="slideOutRight">
      <div v-if="isNotificationsShow"
        class="action-view__notifications">
        <notifications></notifications>
      </div>
    </transition>
    <transition name="fadeIn"
      enter-active-class="fadeIn"
      leave-active-class="fadeOut">
      <div v-if="isDateTimeShow"
        class="action-view__calendar">
        <calendar :n-time="time"
          :n-date="date"></calendar>
      </div>
    </transition>
  </div>
</template>

<script>
import Taskbar from './taskbar'
import Notifications from './notifications'
import Calendar from './calendar'
import moment from 'moment'

export default {
  components: {
    Taskbar,
    Notifications,
    Calendar
  },
  computed: {
    date() {
      return moment(this.now).format('YYYY-MM-DD')
    },
    time() {
      return moment(this.now).format('HH:mm:ss')
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
  position: absolute;
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  &__notifications {
    width: 300px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 40px;
    animation-duration: 0.3s;
  }
  &__calendar {
    width: 300px;
    position: absolute;
    bottom: 40px;
    right: 0;
    z-index: -1;
    animation-duration: 0.5s;
  }
}
</style>
