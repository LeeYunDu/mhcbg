const scpClient = require('scp2')
// const ora = require('ora')
function ora(str) {
  return str
}
const loading = {
  start: () => {
    console.log('正在部署中')
  },
  stop: () => {
    console.log('部署完成')
  }
}
const Client = require('ssh2').Client
const projectPath = '/data/projects/scgip/html/gecp/bigscreen/dist'
// 第一步：cd /project/vue/smartcheck/h5/dist
// 第二步：删除压缩包： rm -f dist.zip
// 第三部 上传压缩包到指定目录
// 第四部 解压压缩包，覆盖之前内容：sudo unzip -o  dist.zip

const service = {
  // 本地打包文件的位置
  host: '192.168.1.73', // IP地址
  port: '22', // 服务器端口
  username: 'root', // 用户名
  password: 'Passw0rd@212!', // 密码
  path: projectPath // 项目路径
}

const conn = new Client()
conn
  .on('ready', function () {
    // 删除上个版本的文件
    conn.exec(`rm -rf ${projectPath}/*`, function (err, stream) {
      if (err) throw err
      stream
        .on('close', function () {
          loading.start()
          scpClient.scp('./dist', service, function (err) {
            loading.stop()
            if (err) {
              console.log('发布失败!')
              throw err
            } else {
              console.log('成功发布!')
            }
          })
          conn.end()
        })
        .on('data', function (data) {
          console.log('STDOUT: ' + data)
        })
        .stderr.on('data', function (data) {
          console.log('STDERR: ' + data)
        })
    })
  })
  .connect(service)
