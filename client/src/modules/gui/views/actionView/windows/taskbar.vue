<template>
  <div class="taskbar">
    <div class="taskbar__background">
      <div v-if="taskbar.blur"
        class="background__image"
        :style="backgroudImageStyles"></div>
      <div class="background__color"
        :style="backgroudStyles"></div>
    </div>
    <!-- 菜单栏 -->
    <div class="taskbar__menu">
      <Icon class="menu__icon"
        type="logo-windows"
        size="24"
        color="#fff" />
    </div>
    <!-- 任务栏 -->
    <div class="taskbar__tasks">
      <template v-for="(item,index) of taskList">
        <div v-if="!item.isClose"
          :key="index"
          class="tasks__item"
          @click="onTaskClick(item)">{{item.name}}</div>
      </template>
    </div>
    <!-- 状态栏 -->
    <div class="taskbar__status">

    </div>
    <!-- 时间日期 -->
    <div class="taskbar__date-time"
      @click="onDateTimeClick">
      <div>{{nTime}}</div>
      <div>{{nDate}}</div>
    </div>
    <!-- 通知图标 -->
    <div class="taskbar__notifications"
      @click="onNotificationsClick">
      <Badge dot
        :count="messageCount"
        :overflow-count="9"
        :offset="[4,4]">
        <Icon :type="notificationsIcon"
          size="22"></Icon>
      </Badge>
    </div>
    <!-- 返回桌面 -->
    <div class="taskbar__back-home"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
    ...mapState('gui', ['taskTree', 'taskbar', 'desktop']),
    ...mapGetters('gui', ['taskBackgroundColor']),

    notificationsIcon() {
      return this.messageCount ? 'md-notifications' : 'md-notifications-outline'
    },

    taskList() {
      return Object.keys(this.taskTree)
        .filter(
          item =>
            this.taskTree[item].tasks && this.taskTree[item].tasks.length > 0
        )
        .map(item => ({
          name: item,
          list: this.taskTree[item].tasks
        }))
    },

    opacity() {
      return this.taskbar.opacity
    },

    backgroudStyles() {
      return {
        'background-color': this.taskBackgroundColor,
        opacity: this.opacity
      }
    },

    backgroudImageStyles() {
      if (!this.taskbar.blur) return {}
      return {
        'background-image': `url('${this.desktop.imageUrl}')`,
        filter: `blur(${this.taskbar.blur}px)`
      }
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
    },

    onTaskClick(item) {
      console.log(item)

      if (item.list.length === 1) {
        const task = item.list[0]
        task.isDisplay = !task.isDisplay
        task.component.visible = task.isDisplay
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 与鼠标的互动
@mixin interact {
  transition-duration: 0.5s;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  &:active {
    background: rgba(0, 0, 0, 0.1);
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
  display: flex;
  &__background {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    box-shadow: 0 0 5px rgba($color: #fff, $alpha: 0.2);
    overflow: hidden;
    .background {
      // 背景图复制，用于任务栏模糊效果
      &__image {
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100px;
        top: -30px;
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
        filter: blur(2px);
      }
      &__color {
        width: 100%;
        height: 100%;
        transition-duration: 1.2s;
      }
    }
  }

  &__menu {
    position: relative;
    flex-shrink: 0;
    width: 50px;
    @include interact;
    .menu__icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__tasks {
    flex-grow: 1;
    display: flex;
    .tasks__item {
      &:hover {
        @include interact;
      }
    }
  }

  &__status {
    color: #fff;
    display: flex;
    align-items: center;
  }

  &__date-time {
    font-family: 'Microsoft YaHei';
    color: #fff;
    text-align: center;
    line-height: 20px;
    padding: 0 5px;
    @include interact;
  }

  &__notifications {
    padding: 9px 5px;
    height: 100%;
    color: #fff;
    text-align: center;
    @include interact;
    .item__badge {
      font-size: 10px;
    }
  }

  &__back-home {
    border-left: 1px solid rgba($color: #fff, $alpha: 0.2);
    width: 10px;
    @include interact;
  }
}
</style>
