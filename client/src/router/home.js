import Home from '@/modules/home'
import Main from '@/modules/home/main'

module = {
  path: '/',
  name: 'home',
  component: Home
}

module.children = [
  {
    path: '/main',
    name: 'main',
    component: Main
  }
]
export default module
