module.exports = {
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },
    devServer: {
        host: 'localhost',
        port: 8080,

        proxy: {
            '/api': {
                //webSocker
                ws: false,
                // 目标地址
                target: 'http://localhost:8081',
                //发送请求host会被设置成target的地址
                changeOrigin: true,
                //补充些请求地址
                pathRewrite: {
                    '/api': ''
                }
            }

        }
    }
}