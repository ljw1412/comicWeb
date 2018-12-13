import { UUID } from '../../../class'
import { mapMutations } from 'vuex'

export default {
  props: {
    // 浏览器有效的宽高
    windowWidth: Number,
    windowHeight: Number,
    // modal最小的宽高
    minWidth: { type: Number, default: 300 },
    minHeight: { type: Number, default: 400 },
    // modal 初始化时的宽高
    width: { type: Number, default: 300 },
    height: { type: Number, default: 400 },
    // modal 初始化时的位置
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 }
  },

  methods: {
    ...mapMutations('gui', ['UPDATE_TASK', 'NEW_TASK']),
    newTask(taskName, taskConfig) {
      this.NEW_TASK({ taskName, taskConfig })
    }
  },

  created() {
    this.taskId = UUID.random()
    this.UPDATE_TASK({
      config: { name: this.name, unique: true },
      task: {
        id: this.taskId,
        component: this,
        name: this.name,
        isDisplay: true,
        isClose: false
      }
    })
  }
}
