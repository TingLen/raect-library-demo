module.exports = {
  module: {                           
    rules: [                               
      {                                    
        test: /\.jsx?$/,                                 
        exclude: /node_modules/,                                 
        loader: "babel-loader"                              
      },{
        test: /\.less$/,
        loader: 'less-loader', // compiles Less to CSS
      },
   ]                           
}
}