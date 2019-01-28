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
  }
}
