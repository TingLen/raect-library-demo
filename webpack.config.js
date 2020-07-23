const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/index.js',
  output: {
      path: path.resolve(__dirname, 'lib'),
      filename: 'dtchain-fe.js',
      library: 'dtchain-fe',
      libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  mode: 'production',
  externals: nodeExternals({modulesDir: path.join(__dirname, 'node_modules')}),
  module: {
    rules: [                               
      {                                    
        test: /\.jsx?$/,                                 
        exclude: /node_modules/,                                 
        loader: 'babel-loader'                            
      },{
        test: /\.(less)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'less-loader']},
   ]                           
  }
}