const fetch = require('node-fetch')
const { Headers } = require('node-fetch')
const cheerio = require('cheerio')
const homeUrl = 'https://www.mangabox.me'

async function browsePage(url) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
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

async function getChapterList(url) {
  const sourceCode = await browsePage(url)
  // console.log(sourceCode)

  const $ = cheerio.load(sourceCode)
  // const chapterWrapper = $('.episodes_list .episodes_item a')
  // const comicTitle = $('.episodes_title').text()
  // const comicAuthor = $('.episodes_author').text()
  // const chapterList = chapterWrapper
  //   .map((index, el) => {
  //     const chapterUrl = homeUrl + $(el).attr('href')
  //     const title = $(el)
  //       .find('.episodes_item_detail .episodes_strong_text')
  //       .text()
  //     return { title, url: chapterUrl }
  //   })
  //   .get()
  // return {
  //   title: comicTitle,
  //   author: comicAuthor,
  //   list: chapterList
  // }
}

const startSpider = async website => {
  const comicList = await getComicList()
  if (comicList.length) {
  }
  const chapterList = await getChapterList(comicList[0])
  return chapterList
}

module.exports = startSpider
