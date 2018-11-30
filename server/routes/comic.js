const dmzj = require('../src/comic/dmzj')
const router = require('koa-router')()

router.prefix('/comic')

router.post('/search', async (ctx, next) => {
  const params = ctx.request.body
  console.log('search:', params)

  if (params.website && params.keyword) {
    if (params.website === 'dmzj') {
      const result = await dmzj.search(params.keyword)
      ctx.body = result
    } else {
      ctx.body = { error: true, errorMsg: '暂时不支持这个站点' }
    }
    return
  }
  ctx.body = { error: true, errorMsg: '入参有误' }
})

router.post('/details', async (ctx, next) => {
  const params = ctx.request.body
  console.log('details:', params)
  if (params.website && params.id) {
    if (params.website === 'dmzj') {
      const result = await dmzj.details(params.id)
      ctx.body = result
    } else {
      ctx.body = { error: true, errorMsg: '暂时不支持这个站点' }
    }
    return
  }
  ctx.body = { error: true, errorMsg: '入参有误' }
})

router.post('/chapter', async (ctx, next) => {
  console.log('chapter:', ctx.request.body)
  const params = ctx.request.body
  if (params.website && params.id && params.chapterId) {
    if (params.website === 'dmzj') {
      const list = await dmzj.chapter(params)
      ctx.body = { list }
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

const { test } = require('../src/browser')
router.post('/test', async (ctx, next) => {
  console.log(ctx.request.body)
  const { url } = ctx.request.body
  ctx.body = await test(url)
})

module.exports = router
