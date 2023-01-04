const { securityMiddleware } = require("../middlewares/securityMiddleware");

const db = require("../models");
const UserConversation = db.userConversation;
const Messages = db.conversationMessage;
const { Op } = require('sequelize');


/* 
  PRIVATE : 
  GET ALL PRIVATE CONVERSATIONS 
*/
async function getAllConversations(req, res){
  const id = req.params.id;
  const userToken = req.body.tokenData;
  
  const userControl = await securityMiddleware(userToken, id);

  if((userControl === 1)) {
    return UserConversation.findAll({
      attributes: ['id', 'created_at'],
      include: [
        { 
          model: db.user, as: 'id_from',
          attributes: ['firstname', 'lastname']
        },
        { 
          model: db.user, as: 'id_to',
          attributes: ['firstname', 'lastname']
        },
      ],
      where: {
        [Op.or]: [
          {user_id_from: id}, 
          {user_id_to: id}
        ],
      }
    })
    .then(msg => {
      res.json(msg);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving your conversations."
      });
    });
  } else {
    res.status(500).send({
      message: "You're not autorized to see this or these message"
    });
  }
}

/* 
  PRIVATE : 
  GET ONE PRIVATE CONVERSATION MESSAGES 
*/
async function getOneConversation(req, res){
  const id = req.params.id;
  const conversationId = req.params.conversation_id;
  const userToken = req.body.tokenData;
  
  const userControl = await securityMiddleware(userToken, id);

  if((userControl === 1)) {
    return Messages.findAll({
      attributes: ['message', 'created_at'],
      include: [
        { 
          model: db.user, as: 'id_from',
          attributes: ['firstname', 'lastname']
        },
        { 
          model: db.user, as: 'id_to',
          attributes: ['firstname', 'lastname']
        }
      ],
      where: {
        conversation_id: conversationId,
      }
    })
    .then(msg => {
      res.json(msg);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving messages."
      });
    });
  } else {
    res.status(500).send({
      message: "You're not autorized to see this or these message"
    });
  }
}

/* 
  PRIVATE (ADMIN) : 
  CREATE A NEW CONVERSATION 
*/
async function createConversation(req, res){
  const id = req.params.id;
  const userIdTo = req.params.user_id_to;

  const userToken = req.body.tokenData;
  const userControl = await securityMiddleware(userToken, id)

  const conversation = {
    user_id_from: userToken.id,
    user_id_to: userIdTo,
  }

  if((userControl === 1) || (userControl === 2)) {
    UserConversation.create(conversation)
    .then(data => {
      res.send({
        message: `Conversation was created successfully.`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error while creating this Conversation. Please retry."
      });
    });
  } else {
    res.status(500).send({
      message: "You're not autorized to create a Conversation"
    });
  }
}

/* 
  PRIVATE : 
  CREATE A MESSAGE INSIDE A CONVERSATION
*/
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
      .then(data => {
        res.send({
          message: `Message sent to ${userConversation.user_id_to} : ${data.message}`,
        });
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating your message."
        });
      });
    }
  } else {
    res.status(500).send({
      message: "You're not autorized to create a message"
    });
  }
}

/* 
  PRIVATE : 
  UPDATE A MESSAGE INSIDE A CONVERSATION  
*/
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
    .then(data => {
      res.send({
        message: `Updated message : ${data.message}`,
        user_id: id
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the message."
      });
    });
  } else {
    res.status(500).send({
      message: "You're not autorized to create a message"
    });
  }
}

/* 
  PRIVATE : 
  DELETE A MESSAGE INSIDE A CONVERSATION 
*/
async function deleteMessage(req, res){
  const id = req.params.id;
  const msgId = req.params.message_id;

  const userToken = req.body.tokenData;
  const userControl = await securityMiddleware(userToken, id);

  if((userControl === 1)) {
    Messages.destroy({
      where: { id: msgId }
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
        message: err.message || "Could not delete Channel with id n°" + id
      });
    });
  } else {
    res.status(500).send({
      message: "You're not autorized to delete a Channel"
    });
  }
}


module.exports = {
  getAllConversations,
  getOneConversation,
  createConversation,
  createMessage,
  updateMessage,
  deleteMessage,
}