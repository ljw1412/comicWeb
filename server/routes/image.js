const router = require('koa-router')()
const refererFetch = require('../src/utils/refererFetch')

router.prefix('/image')

router.get('/', async ctx => {
  const { url, website } = ctx.query
  if (!url) return ctx.throw(500, '没有传入url字段')
  let referer
  if (website === 'dmzj') {
    referer = 'https://manhua.dmzj.com/tags/search.shtml'
  }
  await refererFetch(url, referer)
    .then(res => {
      // copy Response Headers
      ctx.set(res.headers.raw())
      // copy Response Body
      ctx.body = res.body
    })
    .catch(err => ctx.throw(500, err))
})

router.get('/free', async ctx => {
  const { url, referer } = ctx.query
  await refererFetch(url, referer)
    .then(res => {
      // copy Response Headers
      ctx.set(res.headers.raw())
      // copy Response Body
      ctx.body = res.body
    })
    .catch(err => ctx.throw(500, err))
})

module.exports = router
