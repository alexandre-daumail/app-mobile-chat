module.exports = (sequelize, Sequelize) => {
  const ChanelMessage = sequelize.define('ChanelMessage', {
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
    tableName: 'chanel_message'
  });
  
  return ChanelMessage;
};