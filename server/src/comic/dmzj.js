const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const URL = require('url')
const refererFetch = require('../utils/refererFetch')
const FileUtil = require('../utils/fileUtil')
const ObjectUtil = require('../utils/objectUtil')

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Linux; U; Android 8.0.0; zh-cn;  MI8 Build/JRO03L) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30 XiaoMi/MiuiBrowser/1.0'
}
const query = '?channel=Android&version=2.6.004'
const searchUrl = 'https://sacg.dmzj.com/comicsum/search.php?s={keyword}'
const detailUrl = 'http://v2.api.dmzj.com/comic/{comicId}.json' + query
const chapterUrl =
  'http://v2.api.dmzj.com/chapter/{comicId}/{chapterId}.json' + query

const { baseServerUrl } = require('../config')
const imageBaseUrl = `//${baseServerUrl}/image?website=dmzj&url=`

const webName = '(动漫之家)'

function log(...args) {
  console.log('\x1B[33m', webName, ...args)
}

// 搜索
const search = async keyword => {
  const url = searchUrl.replace(/\{keyword\}/, encodeURIComponent(keyword))
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
        cover: imageBaseUrl + item.cover.replace(/^\/\//, 'https://'),
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

// 漫画详情
const details = async comicId => {
  const url = detailUrl.replace(/\{comicId\}/, comicId)
  log('详情获取:', url)
  let result
  await fetch(url, { method: 'GET', headers })
    .then(res => res.json())
    .then(data => {
      result = {
        comicId: data.id,
        // 是否竖排版
        isVertical: data.direction != '1',
        title: data.title,
        cover: imageBaseUrl + data.cover.replace(/^\/\//, 'https://'),
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

// 漫画章节，获得当前章节的信息
const chapter = async ({ website, comicId, chapterId }) => {
  const list = await getLocalImageList(website, comicId, chapterId)
  if (list.length) return list

  const url = chapterUrl
    .replace(/\{comicId\}/, comicId)
    .replace(/\{chapterId\}/, chapterId)
  log('详情获取:', url)
  const json = await fetch(url, {
    method: 'GET',
    headers
  })
    .then(res => res.json())
    .then(json => ObjectUtil.keyToHump(json))
    .then(json => {
      json.imageList = json.pageUrl.map(url => imageBaseUrl + url)
      delete json.pageUrl
      return json
    })
    .catch(error => console.error(error))
  return json
}

// 漫画下载
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
  FileUtil.mkdirsSync(dirName)

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
      return FileUtil.writeFile(filePath, Buffer.from(data))
    })
    .then(zipFile => {
      return FileUtil.unzipFile(zipFile)
    })
    .then(() => {
      success = true
      console.log('下载成功')
    })
    .catch(err => console.error('下载失败:', err))
  return success
}

const getLocalImageList = async (website, comicId, chapterId) => {
  // TODO 数据库查询是否下载过, 下面的文件夹为暂时写死
  return []
  const chapterPath = path.join('.', 'download/dmzj/b/42084/67136')
  let result = []
  await FileUtil.readDir(chapterPath)
    .then(data => {
      data.sort((a, b) => {
        return a.length == b.length ? a.localeCompare(b) : a.length - b.length
      })
      for (let i in data) {
        data[i] = path.relative('download', path.join(chapterPath, data[i]))
      }
      result = data
    })
    .catch(err => console.error(err))
  return result
}

module.exports = {
  search,
  details,
  chapter,
  download,
  getLocalImageList
}
