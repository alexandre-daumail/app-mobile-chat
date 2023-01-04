const { securityMiddleware } = require("../middlewares/securityMiddleware");

const db = require("../models");
const Channel = db.channel;
const UserChannel = db.userChannel


/* 
  PUBLIC : 
  CHANNELS LIST 
*/
async function getAllChannel(req, res){
  return Channel.findAll({
    attributes: ['name', 'private']
  })
  .then(groups => {
    res.json(groups);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Channel list."
    });
  });
}


/* 
  PUBLIC : 
  CHANNELS LIST WITH USERS
*/
async function getAllUsersInChannel(req, res){
  await Channel.findAll({
    attributes: ['name', 'private'],
    include: [
      { 
        model: db.user, 
        attributes: ['firstname', 'lastname']
      }
    ]
  })
  .then(channel => {
    res.json(channel);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving this Channel."
    });
  });
}


/* 
  PRIVATE (ADMIN) : 
  CREATE A NEW CHANNEL 
*/
async function createChannel(req, res){
  const userToken = req.body.tokenData;
  const userControl = await securityMiddleware(userToken, userToken.id)

  const channel = {
    name: req.body.name,
    private: req.body.private,
    creator: userToken.id,
  };

  if((userControl === 1) || (userControl === 2)) {
    Channel.create(channel)
    .then(data => {
      const joinChannel = {
        UserId: data.creator,
        ChannelId: data.id,
      };
      UserChannel.create(joinChannel)

      res.send({
        message: `Channel "${data.name}" was created successfully.`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while creating this Channel. Please retry."
      });
    });
  } else {
    res.status(500).send({
      message: "You're not autorized to create a Channel"
    });
  }
}


/* 
  PRIVATE (ADMIN) : 
  UPDATE AN EXISTING CHANNEL
*/
async function updateChannel(req, res){
  const id = req.params.id;
  const userToken = req.body.tokenData;

  const channel = await Channel.findByPk(id);
  const userControl = await securityMiddleware(userToken, channel.creator);

  if((userControl === 1) || (userControl === 2)) {
    Channel.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Channel name was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Channel name with id n°${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while updating this Channel. Please retry."
      });
    });
  } else {
    res.status(500).send({
      message: "You're not autorized to update this Channel"
    });
  }
}


/* 
  PRIVATE (ADMIN) : 
  DELETE AN EXISTING CHANNEL
*/
async function deleteChannel(req, res){
  const id = req.params.id;
  const userToken = req.body.tokenData;

  const channel = await Channel.findByPk(id);
  const userControl = await securityMiddleware(userToken, channel.creator);

  if((userControl === 1) || (userControl === 2)) {
    Channel.destroy({
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Channel was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Channel with id n°${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while deleting this Channel. Please retry."
      });
    });
  } else {
    res.status(500).send({
      message: "You're not autorized to delete this Channel"
    });
  }
}


module.exports = {
  getAllChannel,
  getAllUsersInChannel,
  createChannel,
  updateChannel,
  deleteChannel
}