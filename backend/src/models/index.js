const dbConfig = require("../config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER, 
  dbConfig.PASSWORD, 
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    port: 8889,

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
// db.account = require("./account.model.js")(sequelize, Sequelize);
db.chanelMessage = require("./chanelMessage.model.js")(sequelize, Sequelize);
db.privateMessage = require("./privateMessage.model.js")(sequelize, Sequelize);

/* Channel ManyToMany User */
db.user.belongsToMany(db.channel, { through: db.userChannel });
db.channel.belongsToMany(db.user, { through: db.userChannel });

/* Foreign key ChannelMessage -> User */
db.chanelMessage.belongsTo(db.user, {
  foreignKey: 'user_id', 
  as: 'User'
});

/* Foreign key Group -> Channel messages */
db.chanelMessage.belongsTo(db.channel, {
  foreignKey: 'channel_id', 
  as: 'Channel'
});
db.channel.hasMany(db.chanelMessage, {
  foreignKey: 'channel_id'
});

module.exports = db;