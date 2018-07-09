const Koa = require('koa')
const app = new Koa()
const path = require('path')
const util = require('./util')
const koaBody = require('koa-body')
const fs = require('fs')
const staticServer = require('koa-static')

// koa-static中间件 加载js css img等 静态资源
app.use(staticServer(
  path.join(__dirname, '../public')
))

// koa-body中间件 用于解析请求体
app.use(koaBody({
  multipart: true, // 可解析multipart/form-data
  formLimit: '5mb'
}))

app.use(async ctx => {
  const url = ctx.url

  util.log(`访问地址：${url}；请求方法：${ctx.method}`)

  if (url === '/') { // 首页
    ctx.body = await util.readFile(path.resolve(__dirname, '../public/index.html'))
  } else if (url.indexOf('/get?') === 0) { // get 请求
    // 暂不设计到get请求
    // ctx.body = util.parse(ctx.query, 'get')
  } else if (url === '/post') { // post 请求 '/post'是我设的请求地址
    // request.body 获取表格数据 request.files获取文件 将两者合并作为响应体
    ctx.body = util.parse(Object.assign({}, ctx.request.body, ctx.request.files), 'post')

    const file = ctx.request.files.file // 获取上传文件

    // 以下为写文件操作 if判定上传的是一个还是多个文件
    if (typeof file === 'object' && !file.length) {
      // 创建可读流
      const reader = fs.createReadStream(file.path)
      let filePath = path.join(__dirname, '../upload') + `/${file.name}`
      // 创建可写流
      const upStream = fs.createWriteStream(filePath)
      // 可读流通过管道写入可写流
      reader.pipe(upStream)
    } else {
      file.forEach((file) => {
        // 创建可读流
        const reader = fs.createReadStream(file.path)
        let filePath = path.join(__dirname, '../upload') + `/${file.name}`
        // 创建可写流
        const upStream = fs.createWriteStream(filePath)
        // 可读流通过管道写入可写流
        reader.pipe(upStream)
      })
    }
  }
})

app.listen(3000, () => {
  util.log('服务启动，打开 http://127.0.0.1:3000/')
})
