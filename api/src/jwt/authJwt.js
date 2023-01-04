const jwt = require('jsonwebtoken');
require('dotenv').config()


/* 
  JWT : GENERATE A TOKEN
*/
const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id, 
      email: user.email
    }, 
    process.env.SECRET, 
    {
      expiresIn: '1 hours'
    }
  )
  return token
}

/* 
  JWT : REFRESH TOKEN
*/
const refreshToken = (user) => {
  const refresh_token = jwt.sign(
    {
      id: user.id, 
      email: user.email
    }, 
    process.env.REFRESH_SECRET, 
    {
      expiresIn: '1 hours'
    }
  )
  return refresh_token
}

/* 
  JWT : VERIFY GIVEN TOKEN
*/
const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET);
};


module.exports = {
  generateToken,
  refreshToken,
  verifyToken
}