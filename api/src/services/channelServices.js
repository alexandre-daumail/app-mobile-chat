const { securityMiddleware } = require("../middlewares/securityMiddleware");

const db = require("../models");
const Channel = db.channel;
const UserChannel = db.userChannel
const Messages = db.channelMessage
const { Op } = require("sequelize");


/* PUBLIC : CHANNELS LIST */
async function getAllChannel(req, res){
  await Channel.findAll({
    attributes: [
      'id', 
      'name',
      'creator',
      'private',
    ],
  })
  .then(channels => {
    res.status(200).send({
      status: 'Success',
      data: channels,
    });
  })
  .catch(err => {
    res.status(500).send({ 
      status: 'Error',
      message: err.message 
    });
  });
}


/* PUBLIC : CHANNELS LIST WITH USERS */
async function getAllUsersInChannel(req, res){
  id = req.params.id;

  await UserChannel.findAll({
    attributes: ['id', 'created_at'],
    where: { ChannelId: id }
  })
  .then(channelAndUsers => { 
    res.status(200).send({
      status: 'Success',
      data: channelAndUsers,
    });
  })
  .catch(err => {
    res.status(500).send({ 
      status: 'Error',
      message: err.message 
    });
  });
}

/* PRIVATE : GET USER CHANNEL */
async function getUserChannels(req, res){
  const id = req.params.id;

  const userToken = req.body.tokenData;
  const userControl = await securityMiddleware(userToken, id)

  if((userControl === 1) || (userControl === 2)) {
    await Channel.findAll({
      attributes: [
        'id', 
        'name',
        'creator',
        'private',
      ],
      where: { creator: id }
    })
    .then(channels => {
      res.status(200).send({
        status: 'Success',
        data: channels,
      });
    })
    .catch(err => {
      res.status(500).send({ 
        status: 'Error',
        message: err.message 
      });
    });
  } else {
    res.status(500).send({
      status: 'Error',
      message: "You're not autorized",
    });
  }
}


/* PRIVATE : CREATE A NEW CHANNEL */
async function createChannel(req, res){
  const id = req.params.id;

  const userToken = req.body.tokenData;
  const userControl = await securityMiddleware(userToken, id)

  const channel = {
    name: req.body.name,
    private: req.body.private,
    creator: userToken.id,
  };

  if((userControl === 1) || (userControl === 2)) {
    Channel.create(channel)
    .then(channel => {
      const joinChannel = {
        UserId: channel.creator,
        ChannelId: channel.id,
      };
      UserChannel.create(joinChannel)

      res.status(200).send({
        status: 'Success',
        data: channel,
      });
    })
    .catch(err => {
      res.status(500).send({ 
        status: 'Error',
        message: err.message 
      });
    });
  } else {
    res.status(500).send({
      status: 'Error',
      message: "You're not autorized to create a Channel",
    });
  }
}


/* PRIVATE : UPDATE AN EXISTING CHANNEL */
async function updateChannel(req, res){
  const id = req.params.id;
  const channelId = req.params.channel_id;

  const channel = await Channel.findByPk(channelId);

  const userToken = req.body.tokenData;
  const userControl = await securityMiddleware(userToken, id);

  if((userControl === 1) || (userControl === 2)) {
    Channel.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status: 'Success',
          data: {
            channel_id: channel.id,
            updated: req.body.name,
          }
        });
      } else {
        res.status(500).send({
          status: 'Error',
          message: "Cannot update channel. Please retry."
        });
      }
    })
    .catch(err => {
      res.status(500).send({ 
        status: 'Error',
        message: err.message 
      });
    });
  } else {
    res.status(500).send({
      status: 'Error',
      message: "You're not autorized to update this Channel",
    });
  }
}


/* PRIVATE : DELETE AN EXISTING CHANNEL */
async function deleteChannel(req, res){
  const id = req.params.id;
  const channelId = req.params.channel_id;

  const channel = await Channel.findByPk(channelId);

  const userToken = req.body.tokenData;
  const userControl = await securityMiddleware(userToken, channel.creator);

  if((userControl === 1) || (userControl === 2)) {
    let deleteMessages = await Messages.findAll({
      where: { channel_id: channel.id }
    });
    
    const deleteMessagesIds = deleteMessages.map(el => el.id);
    
    await Messages.destroy({
      where: {
        [Op.and]: {
          id: deleteMessagesIds,
        },
      },
    });

    Channel.destroy({ 
      where: { id: id } 
    })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status: 'Success',
          data: {
            user_id: id,
            info: "Channel was deleted successfully!",
          }
        });
      } else {
        res.status(500).send({
          status: 'Error',
          message: "Cannot delete channel. Please retry."
        });
      }
    })
    .catch(err => {
      res.status(500).send({ 
        status: 'Error',
        message: err.message 
      });
    });
  } else {
    res.status(500).send({
      status: 'Error',
      message: "You're not autorized to delete this Channel",
    });
  }
}


module.exports = {
  getAllChannel,
  getAllUsersInChannel,
  getUserChannels,
  createChannel,
  updateChannel,
  deleteChannel
}