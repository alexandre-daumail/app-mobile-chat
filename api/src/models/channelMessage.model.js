module.exports = (sequelize, Sequelize) => {
  User = require('./user.model')(sequelize, Sequelize);
  Channel = require('./channel.model')(sequelize, Sequelize);

  const ChannelMessage = sequelize.define('ChannelMessage', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    createdAt: {
      field: 'created_at',
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updatedAt: {
      field: 'updated_at',
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  }, {
    tableName: 'channel_message'
  });

  ChannelMessage.belongsTo(User, {
    foreignKey: 'user_id', 
  });
  
  ChannelMessage.belongsTo(Channel, {
    foreignKey: 'channel_id',
  });
  
  return ChannelMessage;
};