
var path = require('path');
 
module.exports = {
  entry: './public/scripts/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
