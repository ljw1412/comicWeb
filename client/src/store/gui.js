const namespaced = true

const state = {
  taskList: []
}

const getters = {}

const mutations = {
  ADD_TASK({ taskList }, item) {
    taskList.push(item)
  },
  CHANGE_TASK_DISPLAY({ taskList }, name) {
    const item = taskList.find(item => item.name === name)
    if (item) {
      item.isDisplay = !item.isDisplay
    }
  }
}

const actions = {}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
