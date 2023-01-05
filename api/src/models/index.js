const dbConfig = require("../config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER, 
  dbConfig.PASSWORD, 
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    // port: 8889,     // MAMP
    port: 3306,     // WAMP

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.channel = require("./channel.model.js")(sequelize, Sequelize);
db.userChannel = require("./userChannel.model.js")(sequelize, Sequelize);
db.chanelMessage = require("./channelMessage.model.js")(sequelize, Sequelize);
db.userConversation = require("./userConversation.model")(sequelize, Sequelize);
db.conversationMessage = require("./conversationMessage.model.js")(sequelize, Sequelize);

/* Channel ManyToMany User */
db.user.belongsToMany(db.channel, { through: db.userChannel });
db.channel.belongsToMany(db.user, { through: db.userChannel });

/* Foreign key ChannelMessage -> User */
db.chanelMessage.belongsTo(db.user, {
  foreignKey: 'user_id', 
  as: 'User'
});

/* Foreign key Channel -> ChannelMessages */
db.chanelMessage.belongsTo(db.channel, {
  foreignKey: 'channel_id', 
  as: 'Channel'
});
db.channel.hasMany(db.chanelMessage, {
  foreignKey: 'channel_id'
});

db.userConversation.belongsTo(db.user, {
  foreignKey: 'user_id_from', 
  as: 'id_from'
});
db.userConversation.belongsTo(db.user, {
  foreignKey: 'user_id_to',
  as: 'id_to'
});

db.conversationMessage.belongsTo(db.user, {
  foreignKey: 'user_id_from', 
  as: 'id_from'
});
db.conversationMessage.belongsTo(db.user, {
  foreignKey: 'user_id_to',
  as: 'id_to'
});
db.conversationMessage.belongsTo(db.userConversation, {
  foreignKey: 'conversation_id',
  as: 'UserConversation'
});


module.exports = db;