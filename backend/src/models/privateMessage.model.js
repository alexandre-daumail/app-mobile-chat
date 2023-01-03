module.exports = (sequelize, Sequelize) => {
  const PrivateMessage = sequelize.define('PrivateMessage', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      field: 'created_at',
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  }, {
    tableName: 'private_message'
  });
  
  return PrivateMessage;
};