module.exports = {
  module: {                           
    rules: [                               
      {                                    
        test: /\.jsx?$/,                                 
        exclude: /node_modules/,                                 
        loader: 'babel-loader'                            
      },{
        test: /\.(css|less)$/,
        loader: 'style-loader', // compiles Less to CSS
      },{
        test: /\.less$/,
        loader: 'less-loader', // compiles Less to CSS
      },
   ]                           
}
}