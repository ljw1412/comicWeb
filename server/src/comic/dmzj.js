const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const URL = require('url')

const refererFetch = require('../utils/refererFetch')
const {
  mkdirsSync,
  writeFile,
  unzipFile,
  readDir
} = require('../utils/fileUtil')

const searchUrl = 'https://sacg.dmzj.com/comicsum/search.php?s=*'
const chapterUrl = 'http://v2.api.dmzj.com/comic/*.json'

const webName = '(动漫之家)'

function log(...args) {
  console.log('\x1B[33m', webName, ...args)
}

const search = async keyword => {
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
}

const details = async id => {
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
        firstLetter: data.first_letter,
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

const download = async ({ website, url, type }) => {
  const baseDir = path.join('download', website)
  let pathName = URL.parse(url).pathname
  if (pathName.startsWith('/')) {
    pathName = path.join('.', pathName)
  }
  // 文件所要保存的相对路径
  const filePath = path.join('download', website, pathName)
  // 文件所要保存的文件夹的相对路径
  const dirName = path.dirname(filePath)
  // 创建文件夹
  mkdirsSync(dirName)

  let referer
  if (website === 'dmzj') {
    referer = 'http://images.dmzj.com/'
  }

  let success = false
  await refererFetch(url, referer)
    .then(response => {
      if (response.status === 403 || response.status === 404) {
        return Promise.reject(response.status)
      }
      console.log('下载流的请求情况:', response.status)
      return response.arrayBuffer()
    })
    .then(data => {
      console.log('正在写入文件流:' + filePath)
      return writeFile(filePath, Buffer.from(data))
    })
    .then(zipFile => {
      return unzipFile(zipFile)
    })
    .then(() => {
      success = true
      console.log('下载成功')
    })
    .catch(err => console.error('下载失败:', err))
  return success
}

const getLocalImageList = async ({ website, id, chapterId }) => {}

module.exports = {
  search,
  details,
  download,
  getLocalImageList
}
