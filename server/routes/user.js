const router = require('koa-router')()

router.prefix('/user')

router.get('/', async (ctx, next) => {
  ctx.body = { error: 0, name: 'mike' }
})

router.post('/', async (ctx, next) => {
  ctx.body = { error: 0, name: 'mike', menthod: 'post' }
})

router.post('/login', async (ctx, next) => {
  result = { success: false }
  try {
    const { username, password } = ctx.request.body
    if (username === 'lll' && password === '123456') {
      result.success = true
    }
  } catch (error) {}
  ctx.body = result
})

module.exports = router
