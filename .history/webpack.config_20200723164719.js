const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'hello-webpack.js'
  },
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