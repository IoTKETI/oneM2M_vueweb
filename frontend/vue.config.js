module.exports = { 
  devServer: { 
    proxy: { 
      '/api': { 
        target: 'http://localhost:3000/api',
        changeOrigin: true, 
        pathRewrite: { 
          '^/api': ''
        } 
      } 
    } 
  },
  outputDir: '../backend/public',
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/views/'
  //   : '/'
  // ,
   // Various Dev Server settings
   publicPath: '/',
   assetsDir: ''
}