const router = require('koa-router')()

const userRouter = require('./user')
const comicRouter = require('./comic')

router.prefix('/api')

router.all('*', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  await next()
})

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello World!'
})

// 二级路由
// "*/api/user"
router.use(userRouter.routes(), userRouter.allowedMethods())
// "*/api/comic"
router.use(comicRouter.routes(), comicRouter.allowedMethods())

module.exports = router
