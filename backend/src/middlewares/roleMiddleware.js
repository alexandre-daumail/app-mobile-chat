const db = require("../models");
const User = db.user;


/* 
  SECURITY : GET USER ROLE WITH GIVEN TOKEN
*/
async function rolesMiddleware(user_role) {
  const userData = user_role;

  const thisUser = await User.findOne({ where: { 
    id: userData.id
  }})
  return thisUser.roles;
}


module.exports = {
  rolesMiddleware
}