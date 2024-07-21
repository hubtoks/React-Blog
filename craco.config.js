//扩展webpack配置
const path = require('path');

module.exports = {
  webpack: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
   },
};