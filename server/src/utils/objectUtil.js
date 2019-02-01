const CommonUtil = require('./commonUtil')
const StringUtil = require('./stringUtil')

/**
 * 对象key下划线转驼峰命名
 */
function keyToHump(obj) {
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

/**
 * 深拷贝 deepCopy
 * @param {*} data
 */
function deepCopy(data) {
  const t = CommonUtil.typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}

module.exports = {
  keyToHump,
  deepCopy
}
