const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello World!'
})

module.exports = router
