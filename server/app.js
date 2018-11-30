const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('kcors')
const path = require('path')

const index = require('./routes/index')
const image = require('./routes/image')
const api = require('./routes/api')
// error handler
onerror(app)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(
  cors({
    origin: ctx => ctx.header.origin,
    optionsSuccessStatus: 200,
    credentials: true // 是否带cookie
  })
)

app.use(require('koa-static')(path.join(__dirname, 'static')))
app.use(require('koa-static')(path.join(__dirname, 'download')))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(image.routes(), image.allowedMethods())
app.use(api.routes(), api.allowedMethods())

module.exports = app
