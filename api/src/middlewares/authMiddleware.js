const { verifyToken } = require('../jwt/authJwt');

/* 
  SECURITY : JWT AUTHENTICATION
*/
const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  
  if (auth && auth.startsWith('Bearer')) {
    const token = auth.slice(7);

    try {
      const tokenData = verifyToken(token);
      req.body.tokenData = tokenData;

      next();
    } 
    catch(error) {
      res.status(401).send({
        status: 'Error',
        message: 'You need to check your credentials'
      });
    }
  } else {
    res.status(404).send({
      status: 'Error',
      message: 'No credentials'
    });
  }
};


module.exports = {
  authMiddleware
}