const jwt = require('jsonwebtoken');
require('dotenv').config()


/**
 * GENERATE ACCESS TOKEN
 * @param {*} user 
 * @returns 
 */
const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id, 
      email: user.email
    }, 
    process.env.SECRET, 
    { expiresIn: '12 hours' }
  )
  return token
}

/**
 * VERIFY ACCESS TOKEN
 * @param {*} token 
 * @returns 
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET);
};


/**
 * GENERATE REFRESH TOKEN
 * @param {*} user 
 * @returns 
 */
const generateRefreshToken = (user) => {
  const refresh_token = jwt.sign(
    {
      id: user.id, 
      email: user.email
    }, 
    process.env.REFRESH_SECRET, 
    { expiresIn: '12 hours' }
  )
  return refresh_token
}

/**
 * VERIFY REFRESH TOKEN
 * @param {*} token 
 * @returns 
 */
const verifyRefreshToken = (res, token) => {
  jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
    if(err) {
      return res.status(401).send({
        status: 'Error',
        message: err.message,
      });
    }

    delete user.iat;
    delete user.exp;

    const newAccessToken = generateToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res.status(201).send({
      status: 'Success',
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    });
  });
};


module.exports = {
  generateToken,
  verifyToken,
  generateRefreshToken,
  verifyRefreshToken,
}