const router = require('koa-router')()

const userRouter = require('./user')
const comicRouter = require('./comic')

router.prefix('/api')

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello World!'
})

router.get('/getOrigin', async ctx => {
  const { type } = ctx.query
  if (type) {
    const originList = require('../config/origin')
    ctx.body = originList.filter(item => item.type === type)
  } else {
    ctx.throw(500, '参数错误: 没有正确的传入type字段')
  }
})

// 二级路由
// "*/api/user"
router.use(userRouter.routes(), userRouter.allowedMethods())
// "*/api/comic"
router.use(comicRouter.routes(), comicRouter.allowedMethods())

module.exports = router
