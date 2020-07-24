module.exports = {
  module: {                           
    rules: [                               
      {                                    
        test: /\.jsx?$/,                                 
        exclude: /node_modules/,                                 
        loader: 'babel-loader'                            
      },{
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        loader: 'style-loader', // compiles Less to CSS
      },{
        test: /\.less$/,
        exclude: /node_modules/,
        loader: 'less-loader', // compiles Less to CSS
      },
   ]                           
}
}