const jwt = require('jsonwebtoken');
// 颁发令牌 token
const generateToken = function(_id) {
    const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60*60)*24, //1小时 *24
    data: _id
  }, 'secret')
  return token;
}
module.exports = {
  generateToken
}