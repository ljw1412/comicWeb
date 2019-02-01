/* 采用无头浏览器通用获取漫画 */
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const URL = require('url')
const cheerio = require('cheerio')
const refererFetch = require('../utils/refererFetch')
const FileUtil = require('../utils/fileUtil')
const ObjectUtil = require('../utils/objectUtil')

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36'
}

function log(webName, ...args) {
  console.log('\x1B[33m', `${webName}`, ...args)
}

function commandItemExec(dom, command) {
  const $ = cheerio.load(dom)
  const object = {}
  Object.keys(command).forEach(key => {
    try {
      object[key] = eval(command[key])
    } catch (error) {
      object[key] = ''
      console.log(key, '\n', error)
    }
  })
  return object
}

function commandListExec(domList, command) {
  try {
    return domList.map((i, el) => commandItemExec(el, command)).get()
  } catch (error) {
    return []
  }
}

async function getDom(url) {
  const html = await fetch(url, headers).then(res => res.text())
  return cheerio.load(html)
}

// 解析搜索页
async function parseSearchPage(url, command) {
  const $ = await getDom(url)
  const itemList = eval(command.itemList)
  delete command.itemList
  let pageCount = 0
  try {
    pageCount = eval(command.pageCount)
  } catch (error) {}
  delete command.pageCount
  return { list: commandListExec(itemList, command), pageCount }
}

// 解析详情页中的章节信息
function parseDetailsChapter($, chapterCommand) {
  const chapterTitleList = eval(chapterCommand.title)
  delete chapterCommand.title
  const chapterList = eval(chapterCommand.chapter)
  delete chapterCommand.chapter
  const chapters = chapterList.map(item => {
    return commandListExec(item, chapterCommand)
  })
  return chapters.map((item, index) => ({
    title: chapterTitleList[index] || '',
    list: item
  }))
}

// 解析详情页
async function parseDetails(url, command, chapterCommand) {
  const $ = await getDom(url)
  const comic = commandItemExec($.html(), command)
  const chapters = parseDetailsChapter($, chapterCommand)
  comic.chapters = chapters
  return comic
}

module.exports = {
  search: async (website, keyword, page) => {
    const result = {}
    const rule = require(`./origin/${website}.json`)
    const searchRule = rule.page.search
    const searchUrl =
      rule.origin +
      searchRule.url.replace('{keyword}', keyword).replace('{page}', page)
    log(rule.name, '搜索:', searchUrl)
    // 页面是否分页
    result.pagination = searchRule.pagination
    return parseSearchPage(searchUrl, searchRule.command)
  },
  details: (website, comicId) => {
    const rule = require(`./origin/${website}.json`)
    const detailsRule = rule.page.details
    const detailsUrl =
      rule.origin + detailsRule.url.replace('{comicId}', comicId)
    log(rule.name, '详情获取:', detailsUrl)
    return parseDetails(
      detailsUrl,
      detailsRule.command,
      detailsRule.chapterCommand
    )
  }
}
