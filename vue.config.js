module.exports = {

  devServer: {
    proxy: {
      '/tomailsendler-feniks.php': {
        // target: 'https://sorokinphoto.ru/wp-content/themes/photoplace/assets/form-mail/tomailsendler-feniks.php.php',
        target: 'https://fenikstour.ru/assets/php/tomailsendler-feniks.php',
        secure: false,
        changeOrigin: true
      }
    }
  }

  // publicPath: process.env.NODE_ENV === 'production'
  //   ? './jsv/kalendar'
  //   : '/'
}