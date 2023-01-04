const { rolesMiddleware } = require("../middlewares/roleMiddleware");
const db = require("../models");
const Messages = db.chanelMessage;


/* 
  PUBLIC : 
  GROUPES LIST 
*/
async function getAllMessages(req, res){
  const id = req.params.id;

  return Messages.findAll({
    attributes: ['message', 'created_at'],
    where: { 
      channel_id: id
    }
  })
  .then(msg => {
    res.json(msg);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving messages."
    });
  });
}

/* 
  PRIVATE (ADMIN) : 
  CREATE A GROUP 
*/
async function createMessage(req, res){
  const userRole = await rolesMiddleware(req.body.tokenData);

  const channelId = req.params.id;
  const userId = req.params.user_id;

  const userToken = req.body.tokenData;
  const msg = {
    message: req.body.message,
    channel_id: channelId,
    user_id: userToken.id
  };

  if((userRole === 'USER' && userToken.id == userId) || (userRole === 'ADMIN')) {
    Messages.create(msg)
    .then(data => {
      res.send({
        message: `Message added : ${data.message}`,
        user_id: userId
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the message."
      });
    });
  } else {
    res.status(500).send({
      message: "You're not autorized to create a message"
    });
  }
}

/* 
  PRIVATE (ADMIN) : 
  UPDATE A GROUP 
*/
async function updateMessage(req, res){
  const userRole = await rolesMiddleware(req.body.tokenData);

  const channelId = req.params.id;
  const userId = req.params.user_id;
  const msgId = req.params.message_id;

  const userToken = req.body.tokenData;
  const msg = {
    message: req.body.message,
  };

  if((userRole === 'USER' && userToken.id == userId) || (userRole === 'ADMIN')) {
    Messages.update(msg, {
      where: {
        id: msgId,
        channel_id: channelId,
        user_id: userId
      }
    })
    .then(data => {
      res.send({
        message: `Message added : ${data.message}`,
        user_id: userId
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the message."
      });
    });
  } else {
    res.status(500).send({
      message: "You're not autorized to create a message"
    });
  }
}

/* 
  PRIVATE (ADMIN) : 
  DELETE A GROUP
*/
async function deleteMessage(req, res){
  const userRole = await rolesMiddleware(req.body.tokenData);

  const channelId = req.params.id;
  const userId = req.params.user_id;
  const msgId = req.params.message_id;

  const userToken = req.body.tokenData;

  if((userRole === 'USER' && userToken.id == userId) || (userRole === 'ADMIN')) {
    Messages.destroy({
      where: { 
        id: msgId,
        channel_id: channelId,
        user_id: userId
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Message was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Channel with id n°${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Channel with id n°" + id
      });
    });
  } else {
    res.status(500).send({
      message: "You're not autorized to delete a Channel"
    });
  }
}


module.exports = {
  getAllMessages,
  createMessage,
  updateMessage,
  deleteMessage,
}