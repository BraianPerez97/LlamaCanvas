module.exports = {
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add(/src/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // Modify options...
        return options;
      });
  }
};
