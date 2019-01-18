import vue from '../main.js'
import { UUID } from '../class'

const namespaced = true

const state = {
  windowSize: {
    width: 0,
    height: 0
  },
  // 任务树
  taskTree: {
    TaskDetail: { tasks: [] },
    TaskSearch: { tasks: [] }
  },
  // 桌面
  desktop: {
    // 主题色
    themeColor: '',
    // 使用纯色
    usePure: false,
    // 背景图片地址
    imageUrl: 'http://localhost:3000/image/bg/windows10.jpeg'
  },
  // 任务栏
  taskbar: {
    // 使用主题色
    useThemeColor: true,
    // 背景色
    bgColor: '',
    // 透明度
    opacity: 0.8,
    // 模糊属性存在显示问题，暂不使用
    blur: 0
  }
}

const getters = {
  taskBackgroundColor({ taskbar, desktop }) {
    return (
      (taskbar.useThemeColor ? desktop.themeColor : taskbar.bgColor) ||
      'rgba(0, 179, 0)'
    )
  }
}

function checkTaskTree(taskTree, taskName, config = { unique: false }) {
  try {
    if (!taskTree[taskName]) {
      vue.$set(taskTree, taskName, { tasks: [], config })
    } else if (!taskTree[taskName].config) {
      taskTree[taskName].config = config
    }
    return taskTree[taskName].config.unique
  } catch (error) {
    console.error(error)
    return false
  }
}

const mutations = {
  // 新建进程
  NEW_TASK({ taskTree }, { taskName, data }) {
    if (checkTaskTree(taskTree, taskName)) return
    const id = UUID.random()
    taskTree[taskName].tasks.push({ name: taskName, data, id })
  },
  // 更新进程(必须先新建)
  UPDATE_TASK({ taskTree }, { config = { name: '???', unique: false }, task }) {
    checkTaskTree(taskTree, config.name, config)
    const blankTask = taskTree[config.name].tasks.find(item => !item.isBuilt)

    if (blankTask) {
      Object.assign(blankTask, task, { isBuilt: true })
    }
  },
  // 修改进程显示/隐藏
  CHANGE_TASK_DISPLAY({ taskTree }, name) {
    const item = taskTree.find(item => item.name === name)
    if (item) {
      item.isDisplay = !item.isDisplay
    }
  },
  // 设置主题颜色
  SET_THEME_COLOR({ desktop }, color) {
    desktop.themeColor = color
  },
  // 设置壁纸
  SET_WALLPAPER({ desktop }, { usePure = false, color, imageUrl }) {
    if (usePure) {
      desktop.themeColor = color
    }
    desktop.usePure = usePure
    desktop.imageUrl = imageUrl
  },
  SET_WINDOW_SIZE({ windowSize }, size) {
    Object.assign(windowSize, size)
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
