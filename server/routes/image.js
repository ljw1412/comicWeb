const router = require('koa-router')()
const imageProxy = require('../src/utils/imageProxy')

router.prefix('/image')

router.get('/', async ctx => {
  const { url, website } = ctx.query
  let referer
  if (website === 'dmzj') {
    referer = 'https://manhua.dmzj.com/tags/search.shtml'
  }
  await imageProxy(url, referer)
    .then(res => {
      // copy Response Headers
      ctx.set(res.headers.raw())
      // copy Response Body
      ctx.body = res.body
    })
    .catch(err => ctx.throw(500, err))
})

module.exports = router
