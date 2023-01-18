module.exports = (sequelize, Sequelize) => {
  User = require('./user.model')(sequelize, Sequelize);

  const UserConversation = sequelize.define('UserConversation', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    blocked: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
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
    tableName: 'user_conversation'
  });

  UserConversation.belongsTo(User, {
    foreignKey: 'user_id_to',
    as: 'id_from',
  });
  UserConversation.belongsTo(User, {
    foreignKey: 'user_id_from', 
    as: 'id_to',
  });
  
  return UserConversation;
};