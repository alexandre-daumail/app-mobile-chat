module.exports = (sequelize, Sequelize) => {
  User = require('./user.model')(sequelize, Sequelize);
  Channel = require('./channel.model')(sequelize, Sequelize);

  const UserChannel = sequelize.define('UserChannel', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
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
      allowNull: true,
    },
  }, {
    tableName: 'user_channel'
  });

  UserChannel.belongsTo(User, {
    foreignKey: 'user_id',
  });
  UserChannel.belongsTo(Channel, {
    foreignKey: 'channel_id', 
  });
  
  return UserChannel;
};