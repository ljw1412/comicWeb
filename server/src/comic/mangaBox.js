const fetch = require('node-fetch')
const async = require('async')
const path = require('path')
const cheerio = require('cheerio')
const util = require('util')
const { mkdirsSync, writeFile } = require('../utils/fileUtil')

const homeUrl = 'https://www.mangabox.me'

async function browsePage(url) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Linux; U; Android 8.0.0; zh-cn;  MI8 Build/JRO03L) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30 XiaoMi/MiuiBrowser/1.0'
      // 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
    }
  })
  return res.text()
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
  info = JSON.parse(info)

  const comic = {}
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
const mapLimit = util.promisify(async.mapLimit)
async function getComicInfoAsync(comicList, website) {
  const result = await mapLimit(comicList, 3, async url => {
    let message = '',
      isSuccess = false,
      comic = {}
    try {
      const comicInfo = await getComicInfo(url)
      const temp = url.match(/reader\/(\w+)\/episodes/)
      if (temp && temp.length > 1) {
        const comicId = temp[1]
        comic = comicInfo
        console.log(comicId)
        const filePath = path.join('download', website, comicId)
        mkdirsSync(path.dirname(filePath))
        await writeFile(filePath, JSON.stringify(comicInfo))
      } else {
        const filePath = path.join('download', website, 'error.log')
        await writeFile(filePath, url, { flag: 'a+' })
      }
      isSuccess = true
    } catch (error) {
      console.error(error)
      message = error.message
    }
    return { url, isSuccess, message, comic }
  })
  return result
}

// 获得具体章节下的图片
async function getImageList(url) {
  const sourceCode = await browsePage(url)
  const $ = cheerio.load(sourceCode)
  let imageStr = $('script:contains(portrait_img)').html()
  const imageList = imageStr
    .replace(/[ \n\r]/g, '')
    .replace(/,]/g, ']')
    .match(/\[.*?\]/g)
  const result = {}
  imageList.forEach(item => {
    if (item.includes('/sp/')) {
      result.portrait = JSON.parse(item)
    } else {
      result.landscape = JSON.parse(item)
    }
  })
  return result
}

async function getImageListAsync(chapterList) {
  const result = await mapLimit(chapterList, 3, async item => {
    const imageList = await getImageList(homeUrl + item.url)
    item.imageList = imageList
    return imageList
  }).catch(err => console.log(err))
  return result
}

const startSpider = async website => {
  const comicList = await getComicList()
  if (comicList.length) {
    const comicInfoList = await getComicInfoAsync(
      comicList.slice(0, 1),
      website
    )
    for (let i = 0; i < comicInfoList.length; i++) {
      await getImageListAsync(comicInfoList[i].comic.list)
    }

    return comicInfoList
  }

  // const comicImageList = await getImageList(homeUrl + comicInfo.list[0].url)
  // return comicImageList
  return []
}

module.exports = startSpider
