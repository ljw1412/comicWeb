import Home from '@/modules/home'
import Main from '@/modules/home/main'

module = {
  path: '/',
  name: 'home',
  component: Home,
  redirect: { name: 'main' }
}

module.children = [
  {
    path: '/main',
    name: 'main',
    component: Main,
    alias: ''
  }
]
export default module
