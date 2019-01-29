import VUI from '@/modules/vui'
import VGrid from '@/modules/vui/vGrid'
import VInput from '@/modules/vui/vInput'
import VScrollView from '@/modules/vui/vScrollView'
import VReader from '@/modules/vui/vReader'
import VMarquee from '@/modules/vui/vMarquee'

const module = {
  path: '/vui',
  name: 'vui',
  component: VUI
}

module.children = [
  { path: 'vscrollview', name: 'vscrollview', component: VScrollView },
  { path: 'vgrid', name: 'vgrid', component: VGrid },
  { path: 'vinput', name: 'vinput', component: VInput },
  { path: 'vreader', name: 'vreader', component: VReader },
  { path: 'vmarquee', name: 'vmarquee', component: VMarquee }
]

export default module
