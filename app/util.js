const fs = require('fs')

var M = module.exports = {
  /**
   * 将 fs.readFile 包装成 Promise ，方便在 async/await 中使用 总之就是读文件
   */
  readFile: (path) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, content) => {
        if (err) {
          return reject(err)
        }

        resolve(content)
      })
    })
  },

  /**
   * 处理请求，返回 JSON 格式 把请求结果包装了一下
   */
  parse: (param, type) => {
    var ret = {
      result: param,
      type
    }

    M.log(`接受到的参数：${JSON.stringify(param)}`)

    return JSON.stringify(ret)
  },

  /**
   * 简易的日志方法
   */
  log: msg => {
    console.log(msg)
  }
}
