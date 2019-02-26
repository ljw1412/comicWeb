module.exports = {
  // 驼峰转下划线命名
  underline(str) {
    return str.replace(/\B([A-Z])/g, '_$1').toLowerCase()
  },
  // 下划线转驼峰命名
  toHump(str) {
    return str.replace(/\B_([a-z])/g, function(all, letter) {
      return letter.toUpperCase()
    })
  },
  // 驼峰转连字符
  hyphenate(str) {
    return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
  },
  // 连字符转驼峰
  camelize(str) {
    return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
  }
}
