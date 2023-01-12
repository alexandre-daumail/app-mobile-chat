const { securityMiddleware } = require('../middlewares/securityMiddleware');
const db = require("../models");
const Messages = db.channelMessage;


/* PRIVATE : LIST OF MESSAGES IN A CHANNEL */
async function getAllMessages(req, res){
  const id = req.params.id;

  await Messages.findAll({
    order: [
      ['created_at', 'ASC'],
    ],
    attributes: [
      'id', 
      'user_id', 
      'message', 
      'created_at', 
      'updated_at'
    ],
    include: [
      { 
        model: db.user,
        attributes: ['firstname', 'lastname']
      },
    ],
    where: { channel_id: id }
  })
  .then(msg => { 
    res.status(200).send({
      status: 'Success',
      data: {
        channel_id: id,
        messages: msg,
      }
    });
   })
  .catch(err => {
    res.status(500).send({
      status: 'Error',
      message: err.message,
    });
  });
}


/* PRIVATE : CREATE A MESSAGE IN A CHANNEL */
async function createMessage(req, res){
  const userId = req.params.id;
  const channelId = req.params.channel_id;

  const userToken = req.body.tokenData;
  const userControl = await securityMiddleware(userToken, userId);

  const msg = {
    message: req.body.message,
    channel_id: channelId,
    user_id: userToken.id
  };

  if((userControl === 1) || (userControl === 2)) {
    Messages.create(msg)
    .then(msg => {
      res.status(201).send({
        status: 'Success',
        data : {
          id: msg.id,
          channel_id: msg.channel_id,
          user_id: msg.user_id,
          message: msg.message,
        }
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
      message: "You're not autorized to create a message",
    });
  }
}


/* PRIVATE : UPDATE A MESSAGE IN A CHANNEL */
async function updateMessage(req, res){
  const userId = req.params.id;
  const channelId = req.params.channel_id;
  const msgId = req.params.message_id;

  const userToken = req.body.tokenData;
  const userControl = await securityMiddleware(userToken, userId);

  const msg = {
    message: req.body.message,
  };

  if((userControl === 1) || (userControl === 2)) {
    Messages.update(msg, {
      where: {
        id: msgId,
        channel_id: channelId,
        user_id: userId
      }
    })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status: 'Success',
          data: {
            id: msgId,
            channel_id: channelId,
            user_id: userId,
            updated: req.body.message,
          }
        });
      } else {
        res.status(500).send({
          status: 'Error',
          message: "Cannot update message. Please retry."
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
      message: "You're not autorized to create a message",
    });
  }
}


/* PRIVATE : DELETE A MESSAGE IN A CHANNEL */
async function deleteMessage(req, res){
  const userId = req.params.id;
  const channelId = req.params.channel_id;
  const msgId = req.params.message_id;

  const userToken = req.body.tokenData;
  const userControl = await securityMiddleware(userToken, userId);

  if((userControl === 1) || (userControl === 2)) {
    Messages.destroy({
      where: { 
        id: msgId,
        channel_id: channelId,
        user_id: userId
      }
    })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status: 'Success',
          data: {
            channel_id: channelId,
            user_id: userId,
            message_id: msgId,
            info: "Message was deleted successfully!",
          }
        });
      } else {
        res.status(500).send({
          status: 'Error',
          message: "Cannot delete message. Please retry."
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
      message: "You're not autorized to delete a message",
    });
  }
}


module.exports = {
  getAllMessages,
  createMessage,
  updateMessage,
  deleteMessage,
}