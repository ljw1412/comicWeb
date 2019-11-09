const moment = require('moment')
const fetch = require('node-fetch')
const async = require('async')
const path = require('path')
const cheerio = require('cheerio')
const util = require('util')
const URL = require('url')
const FileUtil = require('../../utils/fileUtil')

const website = 'MangaBox'

const homeUrl = 'https://www.mangabox.me'

async function browsePage(url) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Linux; U; Android 4.1.1; zh-cn;  MI2 Build/JRO03L) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30 XiaoMi/MiuiBrowser/1.0'
      // 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
    },
    timeout: 60000
  }).catch(() => '')
  return res ? res.text() : res
}

// 获得漫画列表
async function getComicList() {
  const sourceCode = await browsePage(homeUrl)
  const $ = cheerio.load(sourceCode)
  return $('.item_manga_detail .bt_blue_content a')
    .map((index, el) => {
      return homeUrl + $(el).attr('href')
    })
    .get()
}

// 获得漫画信息
async function getComicInfo(url) {
  const sourceCode = await browsePage(url)
  const $ = cheerio.load(sourceCode)
  let info = $('script:contains(@context)').html()
  console.log(info.replace(/\s/g, ''))

  info = JSON.parse(info.replace(/\s/g, ''))
  const comic = {}
  if (!info['@graph']) return comic
  info['@graph'].forEach(item => {
    if (item['@type'] === 'Book') {
      comic.name = item.name
      if (item.author instanceof Array) {
        comic.author = item.author.map(element => element.name).join()
      } else if (item.author instanceof Object) {
        comic.author = item.author.name
      }
      comic.description = item.description
      comic.cover = item.image
      comic.datePublished = item.datePublished
      comic.url = item.url
    }
    if (item['@type'] === 'ItemList') {
      comic.list = item.itemListElement.map(element =>
        Object.assign(element.item, { position: element.position })
      )
    }
  })
  return comic
}

// 并发获得漫画信息
async function getComicInfoAsync(url) {
  emitMsg('获取漫画信息:' + url)
  const comicInfo = await getComicInfo(url)
  const temp = url.match(/reader\/(\w+)\/episodes/)
  if (temp && temp.length > 1) {
    comicInfo.id = temp[1]
  }
  emitMsg('获取漫画信息结果: ' + comicInfo.name)
  return comicInfo
}

// 获得具体章节下的图片
async function getImageList(url) {
  emitMsg('解析页面:' + url)
  const result = { portrait: [], landscape: [] }
  const sourceCode = await browsePage(url)
  const $ = cheerio.load(sourceCode)
  let imageStr = $('script:contains(portrait_img)').html()
  if (imageStr) {
    const imageList = imageStr
      .replace(/[ \n\r]/g, '')
      .replace(/,]/g, ']')
      .match(/\[.*?\]/g)
    imageList.forEach(item => {
      if (item.includes('/sp/')) {
        result.portrait = JSON.parse(item)
      } else {
        result.landscape = JSON.parse(item)
      }
    })
  }
  return result
}

const timeLimit = 10
async function downloadImage(dirPath, url) {
  let time = 0
  const pathname = URL.parse(url).pathname
  const fileName = pathname.substr(pathname.lastIndexOf('/') + 1)
  const imagePath = path.join(dirPath, fileName)
  const download = async () => {
    await fetch(url, { timeout: 10000 })
      .then(res => res.arrayBuffer())
      .then(buffer => FileUtil.writeFile(imagePath, Buffer.from(buffer)))
      .then(() => {
        emitMsg('[下载完成]:' + imagePath)
      })
      .catch(err => {
        emitMsg('[下载失败]:' + imagePath)
        time++
        if (time >= timeLimit) return
        return download()
      })
  }
  await download()
}

async function eachDownloadImage(dirPath, list) {
  return new Promise((resolve, reject) => {
    let i = 0
    let len = list.length
    async.eachLimit(list, 10, async url => {
      await downloadImage(dirPath, url)
      i++
      if (i >= len) {
        resolve(true)
      }
    })
  })
}

async function downloadChapterImage(data) {
  const { author, name, list } = data
  const dirName = path.join('download', website, `[${author}]${name}`)
  FileUtil.mkdirsSync(dirName)
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    const {
      name: chapterName,
      imageList: { landscape, portrait }
    } = item
    const chapterPath = path.join(dirName, chapterName)
    FileUtil.mkdirsSync(chapterPath)

    const fileLength = await FileUtil.readDir(chapterPath)
      .then(data => data.length)
      .catch(err => 0)
    console.log(fileLength + '/' + portrait.length, chapterPath)

    if (fileLength >= portrait.length) continue

    await eachDownloadImage(chapterPath, portrait)
  }
}

async function getEachImageList(list) {
  return new Promise((resolve, reject) => {
    let i = 0
    let len = list.length
    async.eachLimit(list, 10, async item => {
      const imageList = await getImageList(homeUrl + item.url)
      item.imageList = imageList
      i++
      console.log(i + '/' + len + ' ' + item.url)
      if (i >= len) {
        resolve(true)
      }
    })
  })
}

const mapLimit = util.promisify(async.mapLimit)
const eachLimit = util.promisify(async.eachLimit)
async function getImageListAsync(comicInfo) {
  emitMsg(`[${comicInfo.name}] 开始章节图片下载`)
  if (!comicInfo || !comicInfo.list || !comicInfo.list.length) return
  // for (let i = 0; i < comicInfo.list.length; i++) {
  //   const item = comicInfo.list[i]
  //   const imageList = await getImageList(homeUrl + item.url)
  //   item.imageList = imageList
  // }

  await getEachImageList(comicInfo.list)
  await downloadChapterImage(comicInfo)
  emitMsg(`[${comicInfo.name}] 章节图片下载完毕`)
  wirteFinalId(comicInfo.id)
}

const wirteFinalId = id => {
  FileUtil.writeFile(
    path.join('download', website, moment().format('YYYYMMDD')),
    id + '\t',
    { flag: 'a' }
  )
}

const readFinalId = async () => {
  return await FileUtil.readFile(
    path.join('download', website, moment().format('YYYYMMDD')),
    { encoding: 'utf8' }
  )
    .then(data => {
      const list = data.split('\t')
      return list.splice(0, list.length - 1)
    })
    .catch(err => {
      emitError(JSON.stringify(err))
      return []
    })
}

let mScoket
const emitMsg = (message, error = false) => {
  console.log(message)
  mScoket.emit('message', {
    date: moment().format('YYYY-MM-DD HH:mm:ss'),
    error,
    message
  })
}

const emitError = message => {
  emitMsg(message, true)
}

const startSpider = async socket => {
  if (socket) mScoket = socket
  emitMsg(`-----------下载开始-----------`)

  try {
    const finalList = await readFinalId()
    emitMsg('已完成的漫画id：' + finalList.join())
    let comicList = await getComicList()
    emitMsg(`获取漫画列表成功:${comicList.length}部`)
    comicList = comicList.filter(item => {
      for (id of finalList) {
        if (item.includes(id)) return false
      }
      return true
    })
    emitMsg(`实际需要下载的还有${comicList.length}部`)
    for (let i = 0; i < comicList.length; i++) {
      const url = comicList[i]
      const comicInfo = await getComicInfoAsync(url)
      await getImageListAsync(comicInfo)
    }
  } catch (err) {
    emitError(err)
    startSpider(socket)
  }

  emitMsg(`-----------下载结束-----------`)
}

module.exports = startSpider
