import Admin from '@/modules/admin'
import Dashboard from '@/modules/admin/dashboard'
import Progress from '@/modules/admin/progress'

module = {
  path: '/admin',
  name: 'admin',
  component: Admin
}

module.children = [
  {
    path: 'dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: 'progress',
    name: 'progress',
    component: Progress
  }
]

export default module
