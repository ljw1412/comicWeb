const fetch = require('node-fetch')

const searchUrl = 'https://sacg.dmzj.com/comicsum/search.php?s=*'
const chapterUrl = 'http://v2.api.dmzj.com/comic/*.json'

const webName = '(动漫之家)'

function log(...args) {
  console.log('\x1B[33m', webName, ...args)
}

module.exports = {
  async search(keyword) {
    const url = searchUrl.replace(/\*/, encodeURIComponent(keyword))
    log('搜索:', url)
    let result
    await fetch(url)
      .then(res => res.text())
      .then(js => {
        eval(js)
        return (data = g_search_data)
      })
      .then(data => {
        result = data.map(item => ({
          id: item.id,
          name: item.name,
          status: item.status.includes('完') ? '已完结' : '连载中',
          cover:
            '//localhost:3000/image?website=dmzj&url=' +
            item.cover.replace(/^\/\//, 'https://'),
          authors: item.authors,
          lastUpdateChapterName: item.last_update_chapter_name,
          lastUpdateChapterId: item.last_update_chapter_id,
          lastUpdateTime: item.last_updatetime,
          description: item.description,
          isHidden: item.hidden === '1'
        }))
      })
      .catch(error => console.error(error))
    return result
  },
  async getDetails(id) {
    const url = chapterUrl.replace(/\*/, id)
    log('详情获取:', url)
    let result
    await fetch(url)
      .then(res => res.json())
      .then(data => {
        result = {
          id: data.id,
          // 是否竖排版
          isVertical: data.direction != '1',
          title: data.title,
          cover:
            '//localhost:3000/image?website=dmzj&url=' +
            data.cover.replace(/^\/\//, 'https://'),
          description: data.description,
          lastUpdateTime: data.last_updatetime,
          types: data.types.map(item => item.tag_name),
          authors: data.authors.map(item => item.tag_name),
          status: data.status[0].tag_name,
          chapters: data.chapters.map(item => ({
            title: item.title,
            list: item.data.map(chapter => ({
              chapterId: chapter.chapter_id,
              chapterName: chapter.chapter_title,
              chapterOrder: chapter.chapter_order,
              updateTime: chapter.updatetime,
              fileSize: chapter.filesize
            }))
          }))
        }
      })
      .catch(error => console.error(error))
    return result
  }
}
