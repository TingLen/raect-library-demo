module.exports = {
  module: {                           
    rules: [                               
      {                                    
        test: /\.jsx?$/,                                 
        exclude: /node_modules/,                                 
        loader: 'babel-loader'                            
      },{
        test: /\.less$/,
        exclude: /node_modules/,
        loader: 'less-loader', // compiles Less to CSS
      },
   ]                           
}
}