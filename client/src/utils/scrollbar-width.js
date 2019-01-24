import Vue from 'vue'

let scrollBarWidth = []

export default function(name = 'default', dom) {
  if (Vue.prototype.$isServer) return 0
  if (scrollBarWidth[name] !== undefined) return scrollBarWidth[name]

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
  scrollBarWidth[name] = widthNoScroll - widthWithScroll

  return scrollBarWidth[name]
}
