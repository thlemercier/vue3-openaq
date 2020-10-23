// eslint-disable-next-line
const fs = require('fs')

const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0

console.log('--------------------------------------------------------')
console.log('--               Pharmmap version %s', version)
console.log('--------------------------------------------------------')
console.log('--               Proxy : %s', process.env.PROXY)
console.log('--------------------------------------------------------')
console.log('--------------------------------------------------------')
console.log('--               Endpoint : %s', process.env.VUE_APP_ENDPOINT)
console.log('--------------------------------------------------------')

module.exports = {

  publicPath: process.env.NODE_ENV === 'production' ? '/vue3-openaq/' : '/',
  outputDir: 'docs',
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/core/styles/_variables.module.scss";
          @import "@/core/styles/_spacing.module.scss";
        `,
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin('html')
      .tap(args => ([{
        title: 'OpenAQ - Vue 3 poc',
        templateParameters: args[0].templateParameters,
        template: args[0].template,
      }]))
    config.module
      .rule('vue')
      .use('string-replace-loader')
      .loader('string-replace-loader')
      .tap(() => ({
        search: '$$version_number$$',
        replace: version,
      }))
    config.output.chunkFilename('js/[id].[chunkhash:8].js')
  },
  devServer: {
    hot: true,
    proxy: {
      '^/api/': {
        target: process.env.PROXY,
        changeOrigin: true,
        logLevel: 'debug',
        secure: false,
        pathRewrite: { '^/api': '/' },
      },
    },
  },
}
