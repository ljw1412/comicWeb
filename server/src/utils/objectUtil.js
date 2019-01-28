const CommonUtil = require('./commonUtil')
const StringUtil = require('./stringUtil')

module.exports = {
  // 对象key下划线转驼峰命名
  keyToHump(obj) {
    if (CommonUtil.typeOf(obj) !== 'object') return obj
    try {
      const newObj = {}
      Object.keys(obj).forEach(key => {
        newObj[StringUtil.toHump(key)] = obj[key]
      })
      return newObj
    } catch (err) {
      console.error('[下划线转驼峰命名-转换失败]', err)
      return obj
    }
  }
}
