const path = require('path')
const util = require('util')
let fs = require('fs')
const writeFile = util.promisify(fs.writeFile)

// 递归创建目录 异步方法
function mkdirs(dirname, callback) {
  fs.exists(dirname, function(exists) {
    if (exists) {
      callback()
    } else {
      // console.log(path.dirname(dirname));
      mkdirs(path.dirname(dirname), function() {
        fs.mkdir(dirname, callback)
        console.log(
          '在' + path.dirname(dirname) + '目录创建好' + dirname + '目录'
        )
      })
    }
  })
}

// 递归新建文件夹 同步方法
const mkdirsSync = dirname => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

module.exports = {
  mkdirsSync,
  writeFile
}
