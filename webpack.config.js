const path = require('path')
const nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: './lib/index.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'dtchain-fe.min.js',
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
        use: ExtractTextPlugin.extract(['css-loader', 'less-loader' ])
      },
   ]                           
  },
  plugins: [
    new ExtractTextPlugin("dtchain-fe.less"),
  ]
}