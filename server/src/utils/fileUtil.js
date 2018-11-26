const path = require('path')
const util = require('util')
const fs = require('fs')
const AdmZip = require('adm-zip')

// 解压zip 到 zip同名文件名的文件夹
async function unzipFile(file) {
  const fileObj = path.parse(file)
  const outPath = path.join(fileObj.dir, fileObj.name)
  console.log(`解压到'${file}' >> '${outPath}'`)
  const zip = new AdmZip(file)
  // Promise化
  const zipExtractAllToAsync = util.promisify(zip.extractAllToAsync)
  return zipExtractAllToAsync(outPath, true)
}

const fsReadDir = util.promisify(fs.readdir)
async function readDir(dirPath, options) {
  return fsReadDir(dirPath, options)
}

const fsWriteFile = util.promisify(fs.writeFile)
// 异步写文件，并返回生成文件路径
async function writeFile(file, data, options) {
  return fsWriteFile(file, data, options)
    .then(() => file)
    .catch(err => err)
}

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
  writeFile,
  unzipFile
}
