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
    <div class="taskbar__date-time"
      @click="onDateTimeClick">
      <div>{{nTime}}</div>
      <div>{{nDate}}</div>
    </div>
    <div class="taskbar__back-home"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    messageCount: {
      type: Number,
      default: 0
    },
    nTime: String,
    nDate: String,
    isNotificationsShow: Boolean,
    isDateTimeShow: Boolean
  },
  computed: {
    notificationsIcon() {
      return this.messageCount ? 'md-notifications' : 'md-notifications-outline'
    }
  },
  data() {
    return {}
  },
  methods: {
    onNotificationsClick() {
      this.$emit('update:isNotificationsShow', !this.isNotificationsShow)
    },
    onDateTimeClick() {
      this.$emit('update:isDateTimeShow', !this.isDateTimeShow)
    }
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
  position: absolute;
  z-index: 99999;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
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
