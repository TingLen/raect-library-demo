module.exports = {
  module: {                           
    rules: [                               
      {                                    
        test: /\.jsx?$/,                                 
        exclude: /node_modules/,                                 
        loader: 'babel-loader'                            
      },{
        test: /\.(less)$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]},
   ]                           
  }
}