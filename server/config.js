var path = require('path');

var basePath = path.resolve('.');
var result = basePath.match(/.+?server/);
if (result) { basePath = result[0]; } else { basePath = path.resolve('server'); }
exports.SERVER_PATH = path.resolve(basePath);


exports.DB = {
  host: '127.0.0.1',
  port: 27077,
  db: 'maycake',
  user: 'maymay',
  password: 'maymay'
}


