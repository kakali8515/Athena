const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  devServer: {
    port:  process.env.VUE_APP_PORT,
  },
  transpileDependencies: true,
  lintOnSave: false,
  filenameHashing: true,
})
