var config = require('./webpack.config.js')

config.entry = {
  'vue-grid-view': './src/index.js',
}

config.output = {
  filename: './dist/[name].js',
  library: 'VueGridView',
  libraryTarget: 'umd'
}


module.exports = config
