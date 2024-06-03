const path = require('path');
const fs = require('fs');

module.exports = {
  // Your other Webpack configurations...
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './certs/private.key')),
      cert: fs.readFileSync(path.resolve(__dirname, './certs/certificate.crt')),
    },
  },
};