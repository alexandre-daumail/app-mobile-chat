const db = require("../models");
const User = db.user


/* 
  SECURITY : GET USER ROLE WITH GIVEN TOKEN
*/
async function securityMiddleware(token, id) {
  const userToken = token;

  const user = await User.findOne({ where: { 
    id: userToken.id
  }})
  const userRole = user.roles

  if (userRole === 'USER' && userToken.id == id) {
    return 1;
  } else if (userRole === 'ADMIN') {
    return 2;
  } else {
    return 0;
  }
}


module.exports = {
  securityMiddleware
}