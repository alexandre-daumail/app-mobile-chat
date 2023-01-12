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
    where: { channel_id: id }
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
    await UserChannel.findAll({
      attributes: [
        'id', 
        'user_id',
        'channel_id',
      ],
      include: [
        { 
          model: Channel,
          attributes: ['id', 'name']
        },
      ],
      where: { user_id: id }
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
        user_id: channel.creator,
        channel_id: channel.id,
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

  const userToken = req.body.tokenData;
  const userControl = await securityMiddleware(userToken, id);

  if((userControl === 1) || (userControl === 2)) {
    Channel.update(req.body, {
      where: { id: channelId }
    })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status: 'Success',
          data: {
            channel_id: channelId,
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


/* PRIVATE : CREATOR CAN ADD USER IN HIS/HER CHANNEL */
async function addUserChannel(req, res){  
  const id = req.params.id;
  const channelId = req.params.channel_id;
  const userToAdd = req.params.id_to_add;

  const userToken = req.body.tokenData;
  const userControl = await securityMiddleware(userToken, id);

  const userToAddInChannel = await UserChannel.findOne({ 
    where: { 
      user_id: userToAdd,
      channel_id: channelId,
    }
  })

  if((userControl === 1) || (userControl === 2)) {
    await Channel.findOne({
      attributes: [
        'id', 
        'creator',
      ],
      where: {
        id: channelId,
      }
    })
    .then(channel => { 
      if (channel.creator == id) {
        UserChannel.create({
          user_id: userToAdd,
          channel_id: channelId,
        })
        .then(userChannel => {
          res.status(201).send({
            status: 'Success',
            data: userChannel,
          })
        })
        .catch(err => {
          res.status(500).send({
            status: 'Error',
            message: err.message,
          });
        });
      } else {
        res.status(500).send({
          status: 'Error',
          message: 'You doesn\'t have authorizations to add user in this channel',
        });
      }
     })
    .catch(err => {
      res.status(500).send({
        status: 'Error',
        message: err.message,
      });
    });
  } else {
    res.status(500).send({
      status: 'Error',
      message: "You're not autorized to make this action",
    });
  }
}


/* PRIVATE : CREATOR CAN REMOVE USER IN HIS/HER CHANNEL */
async function revokeUserChannel(req, res){
  const id = req.params.id;
  const channelId = req.params.channel_id;
  const userToRemove = req.params.id_to_remove;

  const userChannel = await UserChannel.findOne({
    where: {
      user_id: userToRemove,
      channel_id: channelId,
    }
  });

  const userToken = req.body.tokenData;
  const userControl = await securityMiddleware(userToken, id);

  if((userControl === 1) || (userControl === 2)) {
    let deleteMessages = await Messages.findAll({
      where: { channel_id: channelId }
    });
    
    const deleteMessagesIds = deleteMessages.map(el => el.id);
    
    await Messages.destroy({
      where: {
        [Op.and]: {
          id: deleteMessagesIds,
        },
      },
    });

    UserChannel.destroy({ 
      where: { 
        user_id: userToRemove,
        channel_id: channelId,
      } 
    })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status: 'Success',
          data: {
            user_id: id,
            info: "User was deleted successfully from your channel!",
          }
        });
      } else {
        res.status(500).send({
          status: 'Error',
          message: "Cannot deletethis user from your channel. Please retry."
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


/* PRIVATE : DELETE AN EXISTING CHANNEL */
async function deleteChannel(req, res){
  const id = req.params.id;
  const channelId = req.params.channel_id;

  const userToken = req.body.tokenData;
  const userControl = await securityMiddleware(userToken, id);

  if((userControl === 1) || (userControl === 2)) {
    let deleteMessages = await Messages.findAll({
      where: { channel_id: channelId }
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
      where: { id: channelId } 
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
  addUserChannel,
  revokeUserChannel,
  deleteChannel,
}