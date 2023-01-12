module.exports = (sequelize, Sequelize) => {
  User = require('./user.model')(sequelize, Sequelize);
  UserConversation = require('./userConversation.model')(sequelize, Sequelize);

  const ConversationMessage = sequelize.define('ConversationMessage', {
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
    tableName: 'conversation_message'
  });

  ConversationMessage.belongsTo(User, {
    foreignKey: 'user_id_from',
    as: 'id_from',
  });
  ConversationMessage.belongsTo(User, {
    foreignKey: 'user_id_to',
    as: 'id_to',
  });
  ConversationMessage.belongsTo(UserConversation, {
    foreignKey: 'conversation_id',
  });
  
  return ConversationMessage;
};