import Vue from 'vue'

let scrollBarWidth = []

export default function(dom) {
  if (Vue.prototype.$isServer) return 0
  if (scrollBarWidth[dom] !== undefined) return scrollBarWidth[dom]

  if (!dom) dom = document.body

  const outer = document.createElement('div')
  outer.className = 'test__wrap'
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.position = 'absolute'
  outer.style.top = '-9999px'
  dom.appendChild(outer)

  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'

  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth
  outer.parentNode.removeChild(outer)
  scrollBarWidth[dom] = widthNoScroll - widthWithScroll

  return scrollBarWidth[dom]
}
