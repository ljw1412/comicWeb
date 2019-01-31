const dmzj = require('../src/comic/dmzj')
const common = require('../src/comic/common')
const router = require('koa-router')()

const origin = require('../config/origin').filter(item => item.type === 'comic')
const commonOrigin = origin
  .filter(item => item.module === 'common')
  .map(item => item.value)
const permissionOrigin = origin.map(item => item.value)

router.prefix('/comic')

router.post('/search', async (ctx, next) => {
  const { website, keyword, page } = ctx.request.body
  console.log('search:', { website, keyword })
  if (!website || !keyword) return ctx.throw(500, '入参有误')
  if (!permissionOrigin.includes(website))
    return ctx.throw(500, '暂时不支持这个站点')
  let result
  if (website === 'dmzj') {
    result = await dmzj.search(keyword)
  } else if (commonOrigin.includes(website)) {
    result = await common.search(website, keyword, page)
  } else {
    ctx.throw(500, '暂时不支持这个站点')
  }
  ctx.body = result
})

router.post('/details', async (ctx, next) => {
  const { website, comicId } = ctx.request.body
  console.log('details:', { website, comicId })
  if (!website || !comicId) return ctx.throw(500, '入参有误')
  if (!permissionOrigin.includes(website))
    return ctx.throw(500, '暂时不支持这个站点')
  let result
  if (website === 'dmzj') {
    result = await dmzj.details(comicId)
  } else if (commonOrigin.includes(website)) {
    result = await common.details(website, comicId)
  } else {
    ctx.throw(500, '暂时不支持这个站点')
  }
  ctx.body = result
})

router.post('/chapter', async (ctx, next) => {
  console.log('chapter:', ctx.request.body)
  const params = ctx.request.body
  if (params.website && params.comicId && params.chapterId) {
    if (params.website === 'dmzj') {
      const result = await dmzj.chapter(params)
      ctx.body = result
    } else {
      ctx.body = { error: true, errorMsg: '暂时不支持这个站点' }
    }
    return
  }
  ctx.body = { error: true, errorMsg: '入参有误' }
})

router.post('/download', async (ctx, next) => {
  console.log('download:', ctx.request.body)
  const { website, url, type } = ctx.request.body
  if (website && url && type) {
    if (website === 'dmzj') {
      const success = await dmzj.download({ website, url, type })
      ctx.body = { error: !success, massage: success ? 'success' : 'error' }
    } else {
      ctx.body = { error: true, errorMsg: '暂时不支持这个站点' }
    }
    return
  }
  ctx.body = { error: true, errorMsg: '入参有误' }
})

// 无头浏览器测试页面
const { test } = require('../src/browser')
router.post('/test', async (ctx, next) => {
  console.log(ctx.request.body)
  const { url } = ctx.request.body
  ctx.body = await test(url)
})

const startSpider = require('../src/comic/mangaBox')
// 爬虫页面
router.get('/crawler', async ctx => {
  const { website } = ctx.request.query

  await startSpider(website).then(data => {
    ctx.body = data
  })
})

module.exports = router
