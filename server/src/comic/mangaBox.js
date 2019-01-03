const fetch = require('node-fetch')
const { Headers } = require('node-fetch')
const cheerio = require('cheerio')
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

async function getComicInfo(url) {
  const sourceCode = await browsePage(url)
  const $ = cheerio.load(sourceCode)
  let info = $('script:contains(@context)').html()
  info = JSON.parse(info)

  const comic = {}
  info['@graph'].forEach(item => {
    if (item['@type'] === 'Book') {
      comic.name = item.name
      comic.author = item.author.map(element => element.name).join()
      comic.descroption = item.descroption
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

const startSpider = async website => {
  const comicList = await getComicList()
  if (comicList.length) {
  }
  const comicInfo = await getComicInfo(comicList[1])
  const comicImageList = await getImageList(homeUrl + comicInfo.list[0].url)
  return comicImageList
}

module.exports = startSpider
