// module.exports = (sequelize, Sequelize) => {
//   const Account = sequelize.define('Account', {
//     id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     access_token: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     refresh_token: {
//       type: Sequelize.STRING,
//       allowNull: true
//     },
//   }, {
//     tableName: 'account'
//   });
  
//   return Account;
// };