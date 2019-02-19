import Main from '@/modules/main'
import Comic from '@/modules/main/comic'
import Search from '@/modules/main/search'

const module = {
  path: '/main',
  name: 'main',
  component: Main,
  children: [
    {
      path: 'comic',
      name: 'mainComic',
      component: Comic
    },
    {
      path: 'search',
      name: 'mainSearch',
      component: Search
    }
  ]
}

export default module
