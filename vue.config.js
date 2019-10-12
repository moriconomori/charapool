module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/pool/' : '/',
  pwa: {
    name: 'Charpool',
    themeColor: '#ffffff',
  }
}
