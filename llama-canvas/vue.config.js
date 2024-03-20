const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  resolve: {
    alias: {
      'jsoncanvas': path.resolve(__dirname, 'jsoncanvas')
    }
  }
})
