import { UUID } from '../../../class'
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations('gui', ['ADD_TASK', 'NEW_TASK']),
    newTask(taskName, taskConfig) {
      this.NEW_TASK({ taskName, taskConfig })
    }
  },

  created() {
    this.taskId = UUID.random()
    this.ADD_TASK({
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
