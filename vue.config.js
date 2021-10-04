module.exports = {

    // 选项
    //  基本路径
    publicPath: "./",

    //  构建时的输出目录
    outputDir: "dist",

    //  放置静态资源的目录
    assetsDir: "static",
    //  html 的输出路径
    indexPath: "index.html",
    //文件名哈希
    filenameHashing: true,
    lintOnSave: true,

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
                target: 'http://www.52coco.xyz',
                // target: 'http://localhost:8081',
                //发送请求host会被设置成target的地址
                changeOrigin: true,
                // 补充些请求地址
                // pathRewrite: {
                //     '/api': ''
                // }
            }

        }
    }
}