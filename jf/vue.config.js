const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  lintOnSave: false,
  devServer: {
    // can be overwritten by process.env.HOST
    host: '0.0.0.0',  
    port: 8080
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'));
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
          win: {
            icon: './public/app.ico',
            target: [
              {
                "target": "nsis",//利用nsis制作安装程序
                "arch": [
                    "x64",//64位
                    "ia32"//32位
                ]
              }
            ]
          },
          mac: {
              icon: './public/app.png'
          },
          productName: 'JF QFII'
      },
    }
  }
};