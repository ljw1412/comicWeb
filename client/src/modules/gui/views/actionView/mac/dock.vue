<template>
  <div class="dock">
    <div class="dock__background"></div>
    <div class="dock__tasks">
      <div v-for="(item,index) of taskList"
        :key="index"
        class="tasks__item"
        @click="onTaskClick(item)">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Dock',

  computed: {
    ...mapState('gui', ['taskTree']),

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
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  user-select: none;
}

.dock {
  position: absolute;
  z-index: 99999;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 50px;
  min-width: 100px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;

  &__background {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    bottom: 0;
    background-color: rgba(230, 230, 230, 0.8);
  }

  &__tasks {
    height: 100%;
    .tasks__item {
      height: 50px;
      width: 50px;
      padding: 5%;
    }
  }
}
</style>
