const { securityMiddleware } = require("../middlewares/securityMiddleware");

const db = require("../models");
const UserConversation = db.userConversation;
const Messages = db.conversationMessage;
const { Op } = require('sequelize');


/* PRIVATE : GET ALL PRIVATE CONVERSATIONS */
async function getAllConversations(req, res){
  const id = req.params.id;
  const userToken = req.body.tokenData;
  
  const userControl = await securityMiddleware(userToken, id);

  if((userControl === 1)) {
    await UserConversation.findAll({
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
    .then(conversations => {
      res.status(200).send({
        status: 'Success',
        data: conversations,
      });
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
      message: "You're not autorized to see this or these message",
    });
  }
}


/* PRIVATE : GET ONE PRIVATE CONVERSATION MESSAGES */
async function getOneConversation(req, res){
  const id = req.params.id;
  const conversationId = req.params.conversation_id;
  const userToken = req.body.tokenData;
  
  const userControl = await securityMiddleware(userToken, id);

  if((userControl === 1)) {
    await Messages.findAll({
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
    .then(conversation => {
      res.status(200).send({
        status: 'Success',
        data: conversation,
      });
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
      message: "You're not autorized to see this or these message",
    });
  }
}


/* PRIVATE : CREATE A NEW CONVERSATION */
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
    .then(conversation => {
      res.status(201).send({
        status: 'Success',
        data: conversation,
      });
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
      message: "You're not autorized to create a Conversation",
    });
  }
}


/* PRIVATE : DELETE A PRIVATE CONVERSATION */
async function deleteConversation(req, res){
  const id = req.params.id;
  const conversationId = req.params.conversation_id;

  const userToken = req.body.tokenData;
  const userControl = await securityMiddleware(userToken, id);

  const conversation = await UserConversation.findByPk(conversationId);

  if((userControl === 1) || (userControl === 2)) {
    let deleteMessages = await Messages.findAll({
      where: { conversation_id: conversation.id }
    });
    
    const deleteMessagesIds = deleteMessages.map(el => el.id);
    
    await Messages.destroy({
      where: {
        [Op.and]: {
          id: deleteMessagesIds,
        },
      },
    });

    UserConversation.destroy({ 
      where: { id: conversationId } 
    })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status: 'Success',
          data: {
            user_id: id,
            info: "Conversation was deleted successfully!",
          }
        });
      } else {
        res.status(500).send({
          status: 'Error',
          message: "Cannot delete this conversation. Please retry."
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
      message: "You're not autorized to delete this conversation",
    });
  }

}

module.exports = {
  getAllConversations,
  getOneConversation,
  createConversation,
  deleteConversation,
}