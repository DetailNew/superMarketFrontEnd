// 自定义配置

const path = require('path')
module.exports = {
  // 仅用于解决开发环境的跨域问题
    // devServer: {
    //     open: false, // 是否自动弹出浏览器页面
    //     host: "0.0.0.0",
    //     port: '8081',
    //     proxy: {
    //       '/message': {
    //         target: 'http://82.156.205.208:8080', // 请求服务器根路径
    //         changeOrigin: true, // 是否跨域
    //         ws: true, // websocket
    //         pathRewrite: { // 重写路径: 当检测到请求地址里包含 /message 时,将此路径进行跨域代理操作
    //           '^/message': '/message'
    //         }
    //       }
    //     }
    //   },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname,'./src'),
                'assets': path.resolve(__dirname,'./src/assets'),
                'common': path.resolve(__dirname,'./src/common'),
                'components': path.resolve(__dirname,'./src/components'),
                'network': path.resolve(__dirname,'./src/network'),
                'views': path.resolve(__dirname,'./src/views')
            }
        }
    }
}