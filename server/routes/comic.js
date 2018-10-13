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
      const result = await dmzj.getDetails(params.id)
      ctx.body = result
    } else {
      ctx.body = { error: true, errorMsg: '暂时不支持这个站点' }
    }
    return
  }
  ctx.body = { error: true, errorMsg: '入参有误' }
})

module.exports = router
