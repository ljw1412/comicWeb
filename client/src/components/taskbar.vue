<template>
  <div class="taskbar">
    <div class="taskbar__menu">菜单</div>
    <div class="taskbar__tasks">任务</div>
    <div class="taskbar__status">
      <div class="status__notifications"
        @click="onNotificationsClick">
        <Badge dot
          :count="messageCount"
          :overflow-count="9"
          :offset="[4,4]">
          <Icon :type="notificationsIcon"
            size="22"></Icon>
        </Badge>
      </div>
    </div>
    <div class="taskbar__date-time">
      <div>{{time}}</div>
      <div>{{date}}</div>
    </div>
    <div class="taskbar__back-home"></div>
    <notifications v-model="isNotificationsShow"></notifications>
    <calendar></calendar>
  </div>
</template>

<script>
import Notifications from './notifications'
import Calendar from './calendar'
import moment from 'moment'
export default {
  components: {
    Notifications,
    Calendar
  },
  props: {
    messageCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    date() {
      return moment(this.now).format('YYYY-MM-DD')
    },
    time() {
      return moment(this.now).format('HH:mm:ss')
    },
    notificationsIcon() {
      return this.messageCount ? 'md-notifications' : 'md-notifications-outline'
    }
  },
  data() {
    return {
      dateTimeTimer: null,
      now: new Date(),
      isNotificationsShow: false
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
    },
    onNotificationsClick() {
      this.isNotificationsShow = !this.isNotificationsShow
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
@mixin hover {
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}
* {
  user-select: none;
}
.taskbar {
  flex-shrink: 0;
  height: 40px;
  background-color: rgba(0, 179, 0, 0.6);
  display: flex;
  &__menu {
    flex-shrink: 0;
    width: 50px;
    @include hover;
  }
  &__tasks {
    flex-grow: 1;
  }
  &__status {
    color: #fff;
    display: flex;
    align-items: center;
    .status__notifications {
      padding: 9px 5px;
      height: 100%;
      @include hover;
      .item__badge {
        font-size: 10px;
      }
    }
  }
  &__date-time {
    font-family: 'Microsoft YaHei';
    color: #fff;
    text-align: center;
    line-height: 20px;
    padding: 0 5px;
    @include hover;
  }
  &__back-home {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    width: 10px;
    @include hover;
  }
}
</style>
