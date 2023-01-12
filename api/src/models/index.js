require('dotenv').config()

const dbConfig = require("../config");
const Sequelize = require("sequelize");
const { LoadDefaultData } = require('../fixtures/defaultData');

const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER, 
  dbConfig.PASSWORD, 
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    port: process.env.MYSQL_PORT,

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
db.channelMessage = require("./channelMessage.model.js")(sequelize, Sequelize);
db.userConversation = require("./userConversation.model")(sequelize, Sequelize);
db.conversationMessage = require("./conversationMessage.model.js")(sequelize, Sequelize);

db.channel.hasMany(db.channelMessage, {
  foreignKey: 'channel_id'
});

//LoadDefaultData(db);

module.exports = db;