const router = require('koa-router')()

// router.all('*', async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', '*')
//   await next()
// })

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello World!'
})

module.exports = router
