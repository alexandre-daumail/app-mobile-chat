const { securityMiddleware } = require("../middlewares/securityMiddleware");

const db = require("../models");
const UserConversation = db.userConversation;
const Messages = db.conversationMessage;


/* PRIVATE : LIST OF MESSAGES IN A CONVERSATION */
async function getAllMessages(req, res){
  const id = req.params.id;
  const conversationId = req.params.conversation_id

  const userToken = req.body.tokenData;
  const userControl = await securityMiddleware(userToken, id);

  if((userControl === 1)) {
    await Messages.findAll({
      order: [
        ['created_at', 'ASC'],
      ],
      attributes: [
        'id', 
        'user_id_from',
        'user_id_to',
        'message', 
        'created_at', 
        'updated_at'
      ],
      include: [
        { 
          model: db.user, as: 'id_from',
          attributes: ['id', 'firstname', 'lastname']
        },
        { 
          model: db.user, as: 'id_to',
          attributes: ['id', 'firstname', 'lastname']
        },
      ],
      where: { conversation_id: conversationId }
    })
    .then(msg => { 
      res.status(200).send({
        status: 'Success',
        data: {
          conversation_id: conversationId,
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
}

/* PRIVATE : CREATE A MESSAGE INSIDE A CONVERSATION */
async function createMessage(req, res){
  const id = req.params.id;
  const conversationId = req.params.conversation_id;
  const userToken = req.body.tokenData;

  const userControl = await securityMiddleware(userToken, id);


  if((userControl === 1)) {
    const userConversation = await UserConversation.findByPk(conversationId)

    if(!userConversation) {
      res.status(500).send({
        message: "You're not autorized to send a message"
      });
    } else {
      const msg = {
        message: req.body.message,
        user_id_from: userToken.id,
        user_id_to: userConversation.user_id_to,
        conversation_id: userConversation.id,
      };

      Messages.create(msg)
      .then(msg => {
        res.status(201).send({
          status: 'Success',
          data: msg,
        });
      })
      .catch(err => {
        res.status(500).send({
          status: 'Error',
          message: err.message,
        });
      });
    }
  } else {
    res.status(500).send({
      status: 'Error',
      message: "You're not autorized to create a message",
    });
  }
}


/* PRIVATE : UPDATE A MESSAGE INSIDE A CONVERSATION  */
async function updateMessage(req, res){
  const id = req.params.id;
  const msgId = req.params.message_id;

  const userToken = req.body.tokenData;
  const userControl = await securityMiddleware(userToken, id);

  const msg = {
    message: req.body.message,
  };

  if((userControl === 1)) {
    Messages.update(msg, {
      where: {
        id: msgId,
        user_id_from: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status: 'Success',
          data: {
            id: msgId,
            user_id: id,
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


/* PRIVATE : DELETE A MESSAGE INSIDE A CONVERSATION */
async function deleteMessage(req, res){
  const id = req.params.id;
  const msgId = req.params.message_id;

  const userToken = req.body.tokenData;
  const userControl = await securityMiddleware(userToken, id);

  if((userControl === 1)) {
    Messages.destroy({
      where: { 
        id: msgId,
        user_id_from: id,
      }
    })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status: 'Success',
          data: {
            user_id: id,
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
      message: "You're not autorized to delete a Channel",
    });
  }
}


module.exports = {
  getAllMessages,
  createMessage,
  updateMessage,
  deleteMessage,
}