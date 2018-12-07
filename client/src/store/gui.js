const namespaced = true

const state = {
  taskTree: {
    TaskDetail: { tasks: [] }
  }
}

const getters = {}

function checkTaskTree(taskTree, taskName, config) {
  if (!taskTree[taskName]) {
    Object.assign(taskTree, { [taskName]: {} })
  }
  if (!taskTree[taskName].tasks) {
    Object.assign(taskTree[taskName], { tasks: [], config })
  }
}

const mutations = {
  ADD_TASK({ taskTree }, { config = { name: '???', unique: false }, task }) {
    checkTaskTree(taskTree, config.name, config)
    const blankTask = taskTree[config.name].tasks.find(item => !item.id)

    if (blankTask) {
      Object.assign(blankTask, task)
    }
  },

  CHANGE_TASK_DISPLAY({ taskTree }, name) {
    const item = taskTree.find(item => item.name === name)
    if (item) {
      item.isDisplay = !item.isDisplay
    }
  },

  NEW_TASK({ taskTree }, { taskName, taskConfig }) {
    checkTaskTree(taskTree, taskName)
    taskTree[taskName].tasks.push({ name: taskName, config: taskConfig })
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
